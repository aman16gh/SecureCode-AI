# SecureCode AI

AI-powered platform for scanning source code and GitHub repositories for common security vulnerabilities.

**Live Demo:** https://secure-code-ai.vercel.app/

## Overview

SecureCode AI is split into two applications:

- Backend: FastAPI service that runs static checks, optional AI analysis, and returns structured findings.
- Frontend: React + Vite web app for code input, GitHub repository scanning, and result visualization.

## About

SecureCode AI is a developer-focused security tool designed to make vulnerability detection fast and accessible.
Developers paste a code snippet or provide a GitHub repository URL, and the platform runs static analysis across the codebase,
maps matches to a vulnerability database, and optionally uses Groq AI to explain the issue and suggest a fix.
Results are shown in a clean dashboard with a security score, severity breakdown, and per-finding remediation guidance.
The goal is to give developers immediate security feedback without needing a dedicated security team.

## Technologies & Languages

### Backend

| Technology | Language | Used For |
|---|---|---|
| FastAPI | Python | REST API framework and endpoint routing |
| Pydantic | Python | Request/response schema validation |
| Uvicorn | Python | ASGI server for running FastAPI |
| Groq AI SDK | Python | AI-powered vulnerability explanation and fix generation |
| GitPython / subprocess | Python | Cloning GitHub repositories for analysis |
| Custom regex engine | Python | Static pattern-based vulnerability detection |
| python-dotenv | Python | Environment variable loading from .env |
| Docker | — | Containerizing the backend for portable deployment |

### Frontend

| Technology | Language | Used For |
|---|---|---|
| React 18 | JavaScript (JSX) | UI component model and application state |
| Vite | JavaScript | Dev server, build tooling, and API proxy |
| React Router | JavaScript | Client-side page routing |
| Axios | JavaScript | HTTP calls to backend endpoints |
| Monaco Editor | JavaScript | In-browser code editor with syntax highlighting |
| Tailwind CSS | CSS | Utility-first styling and responsive layout |
| PostCSS | CSS | CSS transformation pipeline for Tailwind |
| React Hot Toast | JavaScript | Non-blocking toast notifications |
| Lucide React | JavaScript | Icon library for UI elements |

## Key Features

- Code snippet scanning via API and UI
- GitHub repository scanning by repository URL
- Rule-based static analysis for common vulnerability patterns
- AI-assisted explanation and remediation recommendations
- Security score and finding severity reporting
- Multi-language support for common application codebases

## High-Level Architecture

1. User submits code or repository URL from the frontend.
2. Frontend calls backend endpoints.
3. Backend runs static analyzer and vulnerability mapping.
4. Backend optionally enriches findings through Groq AI.
5. Frontend renders findings, scores, and suggested fixes.

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- Git

### 1) Start Backend

Option A: Run backend with Docker (as requested):

```bash
cd backend
docker run -p 8000:8000 --env-file .env securecode-backend
```

Test backend API docs:

```text
http://localhost:8000/docs
```

Option B: Run backend locally with Python:

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

Run backend:

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2) Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173
Backend URL: http://localhost:8000

## API Endpoints

- GET /health/
- POST /scan/
- POST /github-scan?repo_url=<https://github.com/owner/repo>

Sample request for POST /scan/:

```json
{
  "code": "const query = \"SELECT * FROM users WHERE id = \" + userInput;"
}
```

## Repository Structure

```text
securecode-ai/
|-- README.md
|-- backend/
|   |-- README.md
|   |-- Dockerfile
|   |-- requirements.txt
|   `-- app/
|       |-- main.py
|       |-- ai/groq_client.py
|       |-- api/
|       |   |-- scan.py
|       |   |-- github_scan.py
|       |   `-- health.py
|       |-- models/
|       |   |-- scan_request.py
|       |   `-- scan_response.py
|       |-- security/
|       |   |-- regex_rules.py
|       |   |-- static_analyzer.py
|       |   `-- vulnerability_db.py
|       |-- services/
|       |   |-- ai_service.py
|       |   |-- github_service.py
|       |   `-- scanner_service.py
|       `-- utils/
|           |-- config.py
|           `-- logger.py
`-- frontend/
    |-- README.md
    |-- index.html
    |-- package.json
    |-- postcss.config.js
    |-- tailwind.config.js
    |-- vite.config.js
    |-- scripts/inspect_githubscanner.py
    `-- src/
        |-- main.jsx
        |-- App.jsx
        |-- index.css
        |-- components/
        |   |-- CodeEditor.jsx
        |   |-- Navbar.jsx
        |   |-- ResultCard.jsx
        |   |-- ScanButton.jsx
        |   |-- SecurityScore.jsx
        |   `-- ThemeToggle.jsx
        |-- pages/
        |   |-- Dashboard.jsx
        |   |-- GitHubScanner.jsx
        |   `-- ScanPage.jsx
        |-- services/api.js
        `-- utils/
            |-- helpers.js
            `-- storage.js
```

## What Each Top-Level README Covers

- Root README (this file): overall architecture, full setup flow, and repository map.
- backend/README.md: backend internals, API behavior, and backend file responsibilities.
- frontend/README.md: frontend internals, page/component flow, and frontend file responsibilities.

## Security Coverage Areas

- Injection flaws (SQLi, command injection, XSS-style patterns)
- Authentication and authorization weaknesses
- Sensitive data exposure patterns
- Cryptography misuse indicators
- Configuration and input validation issues

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make changes with clear commit history.
4. Update docs when behavior changes.
5. Open a pull request.

## Support

- Open a GitHub issue for bugs or feature requests.
- Review backend docs in backend/README.md.
- Review frontend docs in frontend/README.md.
- Inspect live API docs at http://localhost:8000/docs while backend is running.
