import hashlib
import logging
import re
from datetime import UTC, datetime, timedelta
from urllib.parse import urlsplit, urlunsplit

from app.config.categories import classify_category
from app.config.geography import classify_region
from app.core.config import get_cache_ttl_minutes
from app.models.news import NewsArticle, SourceStatus
from app.services.news.base import NewsSource, RawNewsItem
from app.services.news.rss import RSSNewsSource

logger = logging.getLogger(__name__)

RSS_SOURCE_CONFIG = (
    {"name": "The Hindu National", "url": "https://www.thehindu.com/news/national/feeder/default.rss", "default_region": "India"},
    {"name": "The Indian Express India", "url": "https://indianexpress.com/section/india/feed/", "default_region": "India"},
)


def _normalize_url(value: str) -> str:
    parts = urlsplit(value)
    return urlunsplit((parts.scheme.lower(), parts.netloc.lower(), parts.path.rstrip("/"), "", ""))


def _normalize_title(value: str) -> str:
    return re.sub(r"\s+", " ", value.casefold()).strip()


class NewsService:
    def __init__(self, sources: list[NewsSource] | None = None, cache_ttl_minutes: int | None = None) -> None:
        self.sources = sources if sources is not None else [RSSNewsSource(**config) for config in RSS_SOURCE_CONFIG]
        self.cache_ttl = timedelta(minutes=cache_ttl_minutes or get_cache_ttl_minutes())
        self._cached_articles: list[NewsArticle] = []
        self._cache_expires_at: datetime | None = None

    def source_statuses(self) -> list[SourceStatus]:
        return [SourceStatus(name=source.name, enabled=source.enabled, status="not_checked") for source in self.sources]

    def normalize(self, item: RawNewsItem, source: NewsSource, fetched_at: datetime) -> NewsArticle | None:
        region = classify_region(f"{item.title} {item.description}", source.default_region)
        if region is None:
            return None
        normalized_url = _normalize_url(item.url)
        article_id = hashlib.sha256(f"{source.name}|{normalized_url}|{_normalize_title(item.title)}".encode()).hexdigest()[:16]
        return NewsArticle(
            id=article_id, title=item.title, description=item.description, source_name=source.name,
            source_url=normalized_url, published_at=item.published_at, region=region,
            category=classify_category(f"{item.title} {item.description}"), image_url=item.image_url, fetched_at=fetched_at,
        )

    def _refresh(self) -> list[NewsArticle]:
        fetched_at = datetime.now(UTC)
        articles: list[NewsArticle] = []
        for source in self.sources:
            if not source.enabled:
                continue
            try:
                articles.extend(filter(None, (self.normalize(item, source, fetched_at) for item in source.fetch())))
            except Exception as exc:  # source failures are isolated by design
                logger.warning("Skipping RSS source %s: %s", source.name, exc)
        self._cached_articles = self.deduplicate(articles)
        self._cache_expires_at = fetched_at + self.cache_ttl
        return self._cached_articles

    def all_articles(self) -> list[NewsArticle]:
        if self._cache_expires_at is None or datetime.now(UTC) >= self._cache_expires_at:
            return self._refresh()
        return self._cached_articles

    @staticmethod
    def deduplicate(articles: list[NewsArticle]) -> list[NewsArticle]:
        seen_urls: set[str] = set()
        seen_titles: set[str] = set()
        unique: list[NewsArticle] = []
        for article in sorted(articles, key=lambda item: item.published_at, reverse=True):
            url_key = _normalize_url(str(article.source_url))
            title_key = _normalize_title(article.title)
            if url_key not in seen_urls and title_key not in seen_titles:
                seen_urls.add(url_key)
                seen_titles.add(title_key)
                unique.append(article)
        return unique

    def get_articles(self, region: str, category: str | None, limit: int) -> list[NewsArticle]:
        articles = self.all_articles()
        filtered = [article for article in articles if region == "India" or article.region == region]
        if category:
            filtered = [article for article in filtered if article.category.value == category]
        return filtered[:limit]


_news_service: NewsService | None = None


def get_news_service() -> NewsService:
    global _news_service
    if _news_service is None:
        _news_service = NewsService()
    return _news_service
