from fastapi import APIRouter, HTTPException, Query

from app.config.geography import canonical_region
from app.models.news import NewsCategory, NewsFeedResponse, SourcesResponse
from app.services.news.service import get_news_service

router = APIRouter(prefix="/news", tags=["news"])


@router.get("", response_model=NewsFeedResponse)
def get_news(region: str = Query("India"), limit: int = Query(20, ge=1, le=50), category: NewsCategory | None = None) -> NewsFeedResponse:
    selected_region = canonical_region(region)
    if selected_region is None:
        raise HTTPException(status_code=400, detail="Unsupported region. Use a configured Indian state, region, or India.")
    articles = get_news_service().get_articles(selected_region, category.value if category else None, limit)
    return NewsFeedResponse(region=selected_region, count=len(articles), articles=articles)


@router.get("/sources", response_model=SourcesResponse)
def get_sources() -> SourcesResponse:
    return SourcesResponse(sources=get_news_service().source_statuses())
