# ForgeAI architecture

## Vision

ForgeAI will turn real-world signals into structured engineering opportunities. Phase 2A implements the live-news foundation: a regional frontend feed and a backend RSS service boundary.

## Live-signal pipeline (Phase 2A)

```text
REGION
    ↓
NEWS SOURCES
    ↓
SOURCE ADAPTERS
    ↓
NORMALIZATION
    ↓
GEOGRAPHIC CLASSIFIER
    ↓
CATEGORIES
    ↓
DEDUPLICATION
    ↓
CACHE
    ↓
FORGEAI FEED
    ↓
FUTURE AI ANALYSIS
```

## Planned components (future phases)

| Pipeline stage | Planned responsibility | Phase 1 status |
| --- | --- | --- |
| Live News | Ingest and normalize trusted news and event sources. | Not implemented |
| Problem Detection | Identify real-world problems with engineering relevance. | Not implemented |
| Root Cause Analysis | Organize contributing causes and constraints. | Not implemented |
| Existing Solutions | Research current approaches and their limitations. | Not implemented |
| Innovation Gap | Highlight unmet needs and opportunities for improvement. | Not implemented |
| Engineering Opportunity | Frame a tractable engineering challenge. | Not implemented |
| Solution Blueprint | Propose validated directions for future solution work. | Not implemented |

## Phase 1 components

- **Next.js frontend:** responsive ForgeAI landing page and a dashboard-style preview shell. It presents the product concept without representing any analysis or news as live.
- **FastAPI backend:** modular application entry point with `GET /health` for local service verification.
- **CORS:** local development origins are configured so the frontend can call the backend in future phases.

## Boundaries

Phase 2A deliberately does **not** perform AI problem analysis, root-cause analysis, innovation-gap analysis, solution generation, or engineering-blueprint generation. It also has no database, authentication, vector search, or web scraping.
