"""Engineering intelligence endpoints."""

from fastapi import APIRouter

from app.models.intelligence import AnalyzeArticleRequest, EngineeringIntelligenceResponse
from app.services.intelligence import get_engineering_intelligence_service

router = APIRouter(prefix="/intelligence", tags=["intelligence"])


@router.post("/analyze", response_model=EngineeringIntelligenceResponse)
def analyze_article(request: AnalyzeArticleRequest) -> EngineeringIntelligenceResponse:
    """Create a clearly labelled Phase 3A placeholder dossier for a news article."""
    return get_engineering_intelligence_service().analyze(request)
