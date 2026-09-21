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
