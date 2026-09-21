# ForgeAI

ForgeAI is an engineering problem discovery platform. It will help engineers identify meaningful real-world problems and explore where new engineering solutions could make an impact.

## Current phase

**Phase 1 — Project foundation.** This repository currently contains a responsive landing page and a FastAPI health endpoint. Live news ingestion, AI analysis, databases, authentication, and solution generation are intentionally deferred.

## Technology stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Python, FastAPI, Uvicorn

## Folder structure

```text
prob-ai/
├── frontend/              # Next.js application
├── backend/               # FastAPI application
├── docs/                  # Project documentation
├── .gitignore
└── README.md
```

## Run locally

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Verify the service at [http://localhost:8000/health](http://localhost:8000/health). The interactive API docs are at [http://localhost:8000/docs](http://localhost:8000/docs).

## Environment configuration

Copy `frontend/.env.example` to `frontend/.env.local` if you need to override the local backend URL. Backend configuration is documented in `backend/.env.example`. No keys are required in Phase 1.

## Future roadmap

1. Live-news ingestion and normalization
2. Problem detection and engineering relevance scoring
3. Root-cause and existing-solution research
4. Innovation-gap identification
5. Engineering opportunity and solution-blueprint workflows

See [docs/architecture.md](docs/architecture.md) for the planned system design.

## Phase 2A — India Live News Intelligence

ForgeAI now turns a selected Indian geography into a live, normalized signal feed. The backend reads configured public RSS feeds through adapters, normalizes articles into a provider-independent model, assigns transparent deterministic geography/category labels, removes exact URL/title duplicates, and caches results in process memory for 5–15 minutes.

Supported regions include India plus Andhra Pradesh, Assam, Bihar, Chhattisgarh, Delhi, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Madhya Pradesh, Maharashtra, Odisha, Punjab, Rajasthan, Tamil Nadu, Telangana, Uttar Pradesh, Uttarakhand, and West Bengal. Categories are Infrastructure, Transportation, Climate, Environment, Energy, Water, Healthcare, Agriculture, Technology, Public Safety, Education, Manufacturing, Urban Development, and General.

The frontend offers a regional selector and source-backed cards with loading, empty, network-error, and API-error states. It is a live-signal input for future discovery—not AI analysis.

### API

```text
GET /health
GET /news?region=India&limit=20
GET /news?region=Tamil%20Nadu&category=Infrastructure&limit=20
GET /news/sources
```

`/news` accepts a configured region, a `limit` from 1 to 50, and an optional controlled category. Invalid regions receive a helpful `400` response. RSS source configuration lives in `backend/app/services/news/service.py`; cache length is set with `CACHE_TTL_MINUTES` in the backend environment.

### Backend tests

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest
```
