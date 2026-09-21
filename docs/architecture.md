# ForgeAI architecture

## Vision

ForgeAI will turn real-world signals into structured engineering opportunities. The implementation in this repository is limited to the Phase 1 foundation: a frontend shell and a backend health service.

## Planned pipeline

```text
Live News
    ↓
Problem Detection
    ↓
Root Cause Analysis
    ↓
Existing Solutions
    ↓
Innovation Gap
    ↓
Engineering Opportunity
    ↓
Solution Blueprint
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

Phase 1 deliberately includes no news APIs, web scraping, AI providers, databases, authentication, vector search, or solution generation. Those integrations will be introduced only after the foundational UX and service boundary are stable.
