# SecureCode AI Backend

FastAPI backend for security analysis of code snippets and GitHub repositories.

## Responsibilities

- Expose REST endpoints for health and scan operations.
- Run static analysis using rule-based detectors.
- Enrich findings with AI-generated explanations and remediations.
- Return normalized response objects for frontend consumption.

## Tech Stack

- FastAPI
- Pydantic
- Uvicorn
- Custom static analysis engine
- Groq API client integration

## Setup

### Prerequisites

- Python 3.8+
- Git installed and available in PATH

### Install

```bash
cd backend
python -m venv venv
# Windows PowerShell
venv\Scripts\Activate.ps1
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create backend/.env:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run

**Option A — Docker (recommended):**

```bash
cd backend
docker run -p 8000:8000 --env-file .env securecode-backend
```

**Option B — Python directly:**

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API base URL: http://localhost:8000

**Test backend (Swagger UI):** http://localhost:8000/docs

## API Contracts

### GET /health/

Returns service status.

### POST /scan/

Scans raw code text.

Request body:

```json
{
  "code": "print('hello')"
}
```

### POST /github-scan?repo_url=<repo>

Clones and scans the given public repository.

Example:

```text
POST /github-scan?repo_url=https://github.com/owner/repo
```

## Backend Structure

```text
backend/
|-- README.md
|-- Dockerfile
|-- requirements.txt
`-- app/
    |-- main.py
    |-- ai/
    |   `-- groq_client.py
    |-- api/
    |   |-- scan.py
    |   |-- github_scan.py
    |   `-- health.py
    |-- models/
    |   |-- scan_request.py
    |   `-- scan_response.py
    |-- security/
    |   |-- regex_rules.py
    |   |-- static_analyzer.py
    |   `-- vulnerability_db.py
    |-- services/
    |   |-- ai_service.py
    |   |-- github_service.py
    |   `-- scanner_service.py
    `-- utils/
        |-- config.py
        `-- logger.py
```

## File Purpose Reference

- Dockerfile: Backend container image build steps.
- requirements.txt: Python dependency lock list for runtime and development.
- app/main.py: FastAPI app bootstrap, router registration, and middleware setup.

### app/ai

- app/ai/groq_client.py: Handles direct calls to Groq AI APIs.

### app/api

- app/api/health.py: Lightweight health-check endpoint.
- app/api/scan.py: Endpoint to analyze user-submitted code.
- app/api/github_scan.py: Endpoint to analyze a repository URL.

### app/models

- app/models/scan_request.py: Input schema and validation for scan requests.
- app/models/scan_response.py: Output schema for findings, severity, and score.

### app/security

- app/security/regex_rules.py: Static regex signatures for known risk patterns.
- app/security/static_analyzer.py: Rule execution engine that produces raw findings.
- app/security/vulnerability_db.py: Canonical metadata for vulnerability types and remediation hints.

### app/services

- app/services/scanner_service.py: Main scan orchestration pipeline.
- app/services/ai_service.py: AI enrichment layer for explanation and fix guidance.
- app/services/github_service.py: GitHub repository download and file extraction logic.

### app/utils

- app/utils/config.py: Environment variable loading and defaults.
- app/utils/logger.py: Logging format/level setup helpers.

## Development Notes

- Keep route logic in app/api thin; move heavy logic to app/services.
- Add static checks to app/security before AI enrichment for deterministic baseline coverage.
- Keep request/response contract changes synchronized with frontend/src/services/api.js.

## Manual Verification

1. Start backend and frontend locally.
2. Hit GET /health/ to verify service readiness.
3. Submit a vulnerable snippet to POST /scan/.
4. Submit a public repository URL to POST /github-scan.
