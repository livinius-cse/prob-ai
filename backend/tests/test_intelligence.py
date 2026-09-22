from datetime import datetime, timezone

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.main import app
from app.models.intelligence import EvidenceItem, EvidenceType
from app.models.news import NewsArticle, NewsCategory


client = TestClient(app)


def make_article() -> dict:
    return {
        "id": "test-article-001",
        "title": "Test infrastructure incident",
        "description": "A test article for engineering intelligence validation.",
        "source_name": "Test Source",
        "source_url": "https://example.com/test-article",
        "published_at": datetime.now(timezone.utc).isoformat(),
        "region": "Tamil Nadu",
        "category": NewsCategory.INFRASTRUCTURE.value,
        "image_url": None,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
    }


def test_source_fact_requires_source_reference():
    with pytest.raises(ValidationError):
        EvidenceItem(
            statement="A source-backed claim",
            evidence_type=EvidenceType.SOURCE_FACT,
        )


def test_unknown_evidence_does_not_require_source_reference():
    item = EvidenceItem(
        statement="This information is currently unknown.",
        evidence_type=EvidenceType.UNKNOWN,
    )

    assert item.evidence_type == EvidenceType.UNKNOWN
    assert item.source_reference is None


def test_all_evidence_types_are_supported():
    for evidence_type in EvidenceType:
        kwargs = {
            "statement": "Test evidence",
            "evidence_type": evidence_type,
        }

        if evidence_type == EvidenceType.SOURCE_FACT:
            kwargs["source_reference"] = "https://example.com/source"

        item = EvidenceItem(**kwargs)

        assert item.evidence_type == evidence_type


def test_intelligence_endpoint_returns_placeholder_dossier():
    response = client.post(
        "/intelligence/analyze",
        json={"article": make_article()},
    )

    assert response.status_code == 200

    data = response.json()

    assert data["analysis_status"] == "placeholder_not_ai"
    assert "no AI engineering analysis" in data["analysis_notice"]

    assert data["source_article"]["article_id"] == "test-article-001"
    assert data["source_article"]["region"] == "Tamil Nadu"

    assert data["event_understanding"]["what_happened"]["evidence_type"] == "source_fact"
    assert data["event_understanding"]["affected_area"]["evidence_type"] == "unknown"

    assert data["engineering_problem"]["problem_statement"]["evidence_type"] == "unknown"
    assert data["root_cause"]["uncertainty"][0]["evidence_type"] == "unknown"
    assert data["innovation_gap"]["gap_statement"]["evidence_type"] == "unknown"
    assert data["engineering_opportunity"]["opportunity_statement"]["evidence_type"] == "unknown"


def test_intelligence_endpoint_rejects_invalid_article():
    response = client.post(
        "/intelligence/analyze",
        json={
            "article": {
                "id": "",
                "title": "",
            }
        },
    )

    assert response.status_code == 422


def test_intelligence_endpoint_requires_article():
    response = client.post(
        "/intelligence/analyze",
        json={},
    )

    assert response.status_code == 422