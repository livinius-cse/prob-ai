from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field, HttpUrl


class NewsCategory(str, Enum):
    INFRASTRUCTURE = "Infrastructure"
    TRANSPORTATION = "Transportation"
    CLIMATE = "Climate"
    ENVIRONMENT = "Environment"
    ENERGY = "Energy"
    WATER = "Water"
    HEALTHCARE = "Healthcare"
    AGRICULTURE = "Agriculture"
    TECHNOLOGY = "Technology"
    PUBLIC_SAFETY = "Public Safety"
    EDUCATION = "Education"
    MANUFACTURING = "Manufacturing"
    URBAN_DEVELOPMENT = "Urban Development"
    GENERAL = "General"


class NewsArticle(BaseModel):
    """A normalized article exposed by ForgeAI, independent of a news provider."""

    id: str
    title: str = Field(min_length=1)
    description: str = ""
    source_name: str
    source_url: HttpUrl
    published_at: datetime
    region: str
    category: NewsCategory
    image_url: HttpUrl | None = None
    fetched_at: datetime


class NewsFeedResponse(BaseModel):
    region: str
    count: int
    articles: list[NewsArticle]


class SourceStatus(BaseModel):
    name: str
    enabled: bool
    status: str


class SourcesResponse(BaseModel):
    sources: list[SourceStatus]
