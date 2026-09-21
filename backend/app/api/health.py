from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Confirm the backend is running."""
    return {"status": "ok", "service": "forgeai-backend"}
