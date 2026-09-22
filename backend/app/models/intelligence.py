"""Structured, evidence-aware engineering intelligence API models."""

from enum import Enum

from pydantic import BaseModel, Field, HttpUrl, model_validator

from app.models.news import NewsArticle, NewsCategory


class EvidenceType(str, Enum):
    SOURCE_FACT = "source_fact"
    ANALYSIS = "analysis"
    HYPOTHESIS = "hypothesis"
    UNKNOWN = "unknown"


class EvidenceItem(BaseModel):
    """One claim and its provenance. Unknowns are intentional, not omissions."""

    statement: str = Field(min_length=1)
    evidence_type: EvidenceType
    source_reference: HttpUrl | None = None
    confidence: float | None = Field(default=None, ge=0, le=1)

    @model_validator(mode="after")
    def require_reference_for_source_facts(self) -> "EvidenceItem":
        if self.evidence_type == EvidenceType.SOURCE_FACT and self.source_reference is None:
            raise ValueError("source_fact evidence requires a source_reference")
        return self


class SourceArticleIdentity(BaseModel):
    article_id: str = Field(min_length=1)
    title: str = Field(min_length=1)
    source: str = Field(min_length=1)
    url: HttpUrl
    published_at: str = Field(min_length=1)
    region: str = Field(min_length=1)
    category: NewsCategory


class EventUnderstanding(BaseModel):
    what_happened: EvidenceItem
    affected_area: EvidenceItem
    affected_population: EvidenceItem
    impact: EvidenceItem


class EngineeringProblem(BaseModel):
    problem_statement: EvidenceItem
    problem_type: EvidenceItem
    severity: EvidenceItem
    evidence: list[EvidenceItem] = Field(min_length=1)


class RootCauseAnalysis(BaseModel):
    root_causes: list[EvidenceItem] = Field(min_length=1)
    contributing_factors: list[EvidenceItem] = Field(min_length=1)
    uncertainty: list[EvidenceItem] = Field(min_length=1)


class ExistingSolutions(BaseModel):
    existing_solutions: list[EvidenceItem] = Field(min_length=1)
    current_approaches: list[EvidenceItem] = Field(min_length=1)
    known_limitations: list[EvidenceItem] = Field(min_length=1)


class InnovationGap(BaseModel):
    gap_statement: EvidenceItem
    unmet_need: EvidenceItem
    opportunity_area: EvidenceItem
    evidence: list[EvidenceItem] = Field(min_length=1)


class EngineeringOpportunity(BaseModel):
    opportunity_statement: EvidenceItem
    potential_solution_directions: list[EvidenceItem] = Field(min_length=1)
    technologies: list[EvidenceItem] = Field(min_length=1)
    disciplines: list[EvidenceItem] = Field(min_length=1)
    skills: list[EvidenceItem] = Field(min_length=1)


class ValidationPlan(BaseModel):
    assumptions: list[EvidenceItem] = Field(min_length=1)
    validation_questions: list[EvidenceItem] = Field(min_length=1)
    data_needed: list[EvidenceItem] = Field(min_length=1)
    suggested_next_steps: list[EvidenceItem] = Field(min_length=1)


class AnalyzeArticleRequest(BaseModel):
    """Analysis always begins with an article already normalized by ForgeAI."""

    article: NewsArticle


class EngineeringIntelligenceResponse(BaseModel):
    """A future-ready dossier. `analysis_status` prevents placeholder misuse."""

    analysis_status: str = Field(min_length=1)
    analysis_notice: str = Field(min_length=1)
    source_article: SourceArticleIdentity
    event_understanding: EventUnderstanding
    engineering_problem: EngineeringProblem
    root_cause: RootCauseAnalysis
    existing_solutions: ExistingSolutions
    innovation_gap: InnovationGap
    engineering_opportunity: EngineeringOpportunity
    validation: ValidationPlan
