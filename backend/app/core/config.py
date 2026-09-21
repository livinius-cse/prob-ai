from functools import lru_cache
from os import getenv


@lru_cache
def get_allowed_origins() -> list[str]:
    """Return configured local-development CORS origins."""
    raw_origins = getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


@lru_cache
def get_cache_ttl_minutes() -> int:
    """Return a bounded in-memory RSS cache lifetime."""
    try:
        return max(5, min(15, int(getenv("CACHE_TTL_MINUTES", "10"))))
    except ValueError:
        return 10
