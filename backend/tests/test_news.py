from datetime import UTC, datetime

import pytest
from fastapi.testclient import TestClient

from app.api import news as news_api
from app.config.categories import classify_category
from app.config.geography import classify_region
from app.main import app
from app.models.news import NewsCategory
from app.services.news.base import NewsSource, RawNewsItem
from app.services.news.rss import RSSNewsSource
from app.services.news.service import NewsService


class FakeSource(NewsSource):
    def __init__(self, name: str, items: list[RawNewsItem], default_region: str = "India") -> None:
        self.name, self.items, self.default_region = name, items, default_region
        self.enabled = True

    def fetch(self) -> list[RawNewsItem]:
        return self.items


class FailingSource(FakeSource):
    def fetch(self) -> list[RawNewsItem]:
        raise OSError("source unavailable")


def raw(title: str, description: str = "") -> RawNewsItem:
    return RawNewsItem(title=title, description=description, url="https://example.com/story", published_at=datetime(2026, 1, 1, tzinfo=UTC))


def service_with_tamil_article() -> NewsService:
    return NewsService([FakeSource("Test RSS", [raw("Chennai metro infrastructure expands", "Tamil Nadu transport project")])], cache_ttl_minutes=10)


def test_article_normalization() -> None:
    article = service_with_tamil_article().all_articles()[0]
    assert article.source_name == "Test RSS"
    assert article.region == "Tamil Nadu"
    assert article.category == NewsCategory.INFRASTRUCTURE
    assert article.id


def test_geographic_classification() -> None:
    assert classify_region("New water project announced in Chennai") == "Tamil Nadu"
    assert classify_region("India launches a new national programme") == "India"


def test_category_classification() -> None:
    assert classify_category("Flood warning and monsoon forecast") == NewsCategory.CLIMATE
    assert classify_category("Election campaign update") == NewsCategory.GENERAL


def test_duplicate_removal() -> None:
    source = FakeSource("One", [raw("Chennai metro plan"), raw("Chennai metro plan")])
    assert len(NewsService([source]).all_articles()) == 1


def test_malformed_rss_handling(monkeypatch: pytest.MonkeyPatch) -> None:
    class Response:
        def read(self) -> bytes: return b"not xml"
        def __enter__(self): return self
        def __exit__(self, *args): return False
    monkeypatch.setattr("urllib.request.urlopen", lambda *args, **kwargs: Response())
    with pytest.raises(ValueError, match="Malformed RSS"):
        RSSNewsSource("Broken", "https://example.com/feed").fetch()


def test_source_failure_is_skipped() -> None:
    articles = NewsService([FailingSource("Fail", []), FakeSource("Good", [raw("India water project")])]).all_articles()
    assert len(articles) == 1


def test_news_api_and_health(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(news_api, "get_news_service", service_with_tamil_article)
    client = TestClient(app)
    assert client.get("/health").json() == {"status": "ok", "service": "forgeai-backend"}
    response = client.get("/news?region=Tamil%20Nadu&category=Infrastructure&limit=20")
    assert response.status_code == 200
    assert response.json()["count"] == 1
    assert response.json()["articles"][0]["region"] == "Tamil Nadu"


def test_invalid_region_returns_helpful_error() -> None:
    client = TestClient(app)
    response = client.get("/news?region=Atlantis")
    assert response.status_code == 400
    assert "Unsupported region" in response.json()["detail"]
