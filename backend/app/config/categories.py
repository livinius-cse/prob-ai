import re

from app.models.news import NewsCategory

CATEGORY_KEYWORDS: dict[NewsCategory, tuple[str, ...]] = {
    NewsCategory.INFRASTRUCTURE: ("infrastructure", "bridge", "road", "construction", "dam"),
    NewsCategory.TRANSPORTATION: ("traffic", "metro", "rail", "train", "airport", "transport", "bus"),
    NewsCategory.CLIMATE: ("climate", "heatwave", "monsoon", "weather", "flood", "drought"),
    NewsCategory.ENVIRONMENT: ("pollution", "environment", "waste", "biodiversity", "forest", "air quality"),
    NewsCategory.ENERGY: ("energy", "power", "electricity", "solar", "renewable", "grid"),
    NewsCategory.WATER: ("water", "river", "groundwater", "drinking water", "reservoir"),
    NewsCategory.HEALTHCARE: ("health", "hospital", "disease", "healthcare", "medical"),
    NewsCategory.AGRICULTURE: ("farm", "farmer", "crop", "agriculture", "harvest"),
    NewsCategory.TECHNOLOGY: ("technology", "digital", "software", "internet", "startup", "ai"),
    NewsCategory.PUBLIC_SAFETY: ("safety", "fire", "accident", "emergency", "disaster"),
    NewsCategory.EDUCATION: ("school", "education", "university", "student", "college"),
    NewsCategory.MANUFACTURING: ("manufacturing", "factory", "industry", "production"),
    NewsCategory.URBAN_DEVELOPMENT: ("urban", "housing", "city planning", "municipal", "smart city"),
}


def classify_category(text: str) -> NewsCategory:
    haystack = text.casefold()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(re.search(rf"\b{re.escape(keyword)}\b", haystack) for keyword in keywords):
            return category
    return NewsCategory.GENERAL
