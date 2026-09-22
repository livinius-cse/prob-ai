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

## Phase 3 — Engineering Intelligence

ForgeAI extends the live-news pipeline into a structured engineering-intelligence workflow.

Current pipeline:

LIVE NEWS
↓
NORMALIZATION
↓
ENGINEERING INTELLIGENCE
↓
PROBLEM
↓
ROOT CAUSE
↓
EXISTING SOLUTIONS
↓
LIMITATIONS
↓
INNOVATION GAP
↓
ENGINEERING OPPORTUNITY
↓
FUTURE SOLUTION BLUEPRINT

### Evidence and Uncertainty

Engineering intelligence must distinguish between information directly supported by a source and reasoning that has not been established by the source.

Each intelligence claim uses an explicit evidence type:

- `source_fact` — directly supported by the source article.
- `analysis` — an analytical interpretation derived from available evidence.
- `hypothesis` — a possible explanation that requires validation.
- `unknown` — information that has not been established.

Source-backed facts should retain a reference to the originating article where applicable.

ForgeAI must not present unknown information as fact. In particular, the system must not invent casualty numbers, infrastructure conditions, root causes, existing solutions, or claims of novelty.

### Phase 3A Status

Phase 3A establishes the engineering-intelligence domain model, API boundary, frontend API contract, deterministic placeholder service, and validation tests.

The current service is intentionally non-AI. It returns a clearly labelled `placeholder_not_ai` response with explicit unknown values.

Real AI reasoning and external research are reserved for the next phase.
