import html
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import UTC, datetime
from email.utils import parsedate_to_datetime

from app.services.news.base import NewsSource, RawNewsItem


def _text(element: ET.Element | None) -> str:
    return "" if element is None or element.text is None else element.text.strip()


def _clean_html(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html.unescape(value))).strip()


def _date(value: str) -> datetime:
    if not value:
        return datetime.now(UTC)
    try:
        parsed = parsedate_to_datetime(value)
        return parsed if parsed.tzinfo else parsed.replace(tzinfo=UTC)
    except (TypeError, ValueError):
        return datetime.now(UTC)


class RSSNewsSource(NewsSource):
    def __init__(self, name: str, url: str, *, enabled: bool = True, default_region: str | None = "India") -> None:
        self.name = name
        self.url = url
        self.enabled = enabled
        self.default_region = default_region

    def fetch(self) -> list[RawNewsItem]:
        request = urllib.request.Request(self.url, headers={"User-Agent": "ForgeAI/0.2 (RSS reader)"})
        with urllib.request.urlopen(request, timeout=10) as response:  # nosec B310 - configured public RSS URLs
            payload = response.read()
        try:
            root = ET.fromstring(payload)
        except ET.ParseError as exc:
            raise ValueError(f"Malformed RSS from {self.name}") from exc

        items: list[RawNewsItem] = []
        for item in root.findall(".//item"):
            title = _clean_html(_text(item.find("title")))
            url = _text(item.find("link"))
            if not title or not url:
                continue
            description = _clean_html(_text(item.find("description")))
            published = _date(_text(item.find("pubDate")))
            image = next((value for child in item.iter() if child.tag.endswith("thumbnail") for value in [child.attrib.get("url")] if value), None)
            items.append(RawNewsItem(title=title, description=description, url=url, published_at=published, image_url=image))
        return items
