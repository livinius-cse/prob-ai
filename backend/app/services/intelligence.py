"""Boundary for engineering-intelligence generation providers.

Phase 3A deliberately has no AI provider. This implementation returns only
source-backed identity/title information and explicit unknowns, so it cannot be
mistaken for generated engineering analysis.
"""

from app.models.intelligence import (
    AnalyzeArticleRequest,
    EngineeringIntelligenceResponse,
    EngineeringOpportunity,
    EngineeringProblem,
    EventUnderstanding,
    EvidenceItem,
    EvidenceType,
    ExistingSolutions,
    InnovationGap,
    RootCauseAnalysis,
    SourceArticleIdentity,
    ValidationPlan,
)


class EngineeringIntelligenceService:
    """Creates the Phase 3A deterministic, non-AI dossier placeholder."""

    _UNKNOWN = "Unknown: Phase 3A has not performed AI analysis or external research for this article."

    @staticmethod
    def _unknown() -> EvidenceItem:
        return EvidenceItem(statement=EngineeringIntelligenceService._UNKNOWN, evidence_type=EvidenceType.UNKNOWN)

    def analyze(self, request: AnalyzeArticleRequest) -> EngineeringIntelligenceResponse:
        article = request.article
        unknown = self._unknown
        source_fact = EvidenceItem(
            statement=f"Source article title: {article.title}",
            evidence_type=EvidenceType.SOURCE_FACT,
            source_reference=article.source_url,
            confidence=1,
        )
        return EngineeringIntelligenceResponse(
            analysis_status="placeholder_not_ai",
            analysis_notice="Placeholder only: no AI engineering analysis or external research has been performed.",
            source_article=SourceArticleIdentity(
                article_id=article.id, title=article.title, source=article.source_name,
                url=article.source_url, published_at=article.published_at.isoformat(),
                region=article.region, category=article.category,
            ),
            event_understanding=EventUnderstanding(
    what_happened=source_fact,
    affected_area=unknown(),
    affected_population=unknown(),
    impact=unknown(),
),
engineering_problem=EngineeringProblem(
    problem_statement=unknown(),
    problem_type=unknown(),
    severity=unknown(),
    evidence=[unknown()],
),
root_cause=RootCauseAnalysis(
    root_causes=[unknown()],
    contributing_factors=[unknown()],
    uncertainty=[unknown()],
),
existing_solutions=ExistingSolutions(
    existing_solutions=[unknown()],
    current_approaches=[unknown()],
    known_limitations=[unknown()],
),
innovation_gap=InnovationGap(
    gap_statement=unknown(),
    unmet_need=unknown(),
    opportunity_area=unknown(),
    evidence=[unknown()],
),
engineering_opportunity=EngineeringOpportunity(
    opportunity_statement=unknown(),
    potential_solution_directions=[unknown()],
    technologies=[unknown()],
    disciplines=[unknown()],
    skills=[unknown()],
),
validation=ValidationPlan(
    assumptions=[unknown()],
    validation_questions=[unknown()],
    data_needed=[unknown()],
    suggested_next_steps=[unknown()],
),
)


_engineering_intelligence_service = EngineeringIntelligenceService()


def get_engineering_intelligence_service() -> EngineeringIntelligenceService:
    return _engineering_intelligence_service
