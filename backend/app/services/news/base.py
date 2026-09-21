from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class RawNewsItem:
    title: str
    description: str
    url: str
    published_at: datetime
    image_url: str | None = None


class NewsSource(ABC):
    name: str
    enabled: bool = True
    default_region: str | None = "India"

    @abstractmethod
    def fetch(self) -> list[RawNewsItem]:
        """Retrieve source-specific items without leaking source formats upstream."""
