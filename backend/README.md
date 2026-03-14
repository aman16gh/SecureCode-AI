# SecureCode AI Backend

FastAPI backend for SecureCode AI responsible for:
- receiving scan requests (code snippets + GitHub repos)
- running static analysis and AI-powered analysis
- returning structured security findings

## Features

- **FastAPI** REST API with auto-generated OpenAPI docs
- **Groq AI integration** for intelligent vulnerability recommendations
- **GitHub repo scanning** using `git clone` + analysis
- **Regex-based rules** for fast static security checks
- **Pydantic models** for request/response validation

## Prerequisites

- **Python 3.8+**
- **Git** (required for repository cloning)

## Setup

1. **Create / activate a virtual environment (recommended)**:

```bash
cd backend
python -m venv venv
# Windows (PowerShell)
venv\Scripts\Activate.ps1
# macOS / Linux
source venv/bin/activate
```

2. **Install dependencies**:

```bash
pip install -r requirements.txt
```

3. **Configure environment variables**:

Create a `.env` file in the backend folder with your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

4. **Run the backend**:

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Health check
- `GET /health/`

### Code scanning
- `POST /scan/`

Request body:
```json
{
  "code": "..."
}
```

### GitHub repository scanning
- `POST /github-scan?repo_url=...`

Example:
```
POST /github-scan?repo_url=https://github.com/owner/repo
```

## Development Notes

- The backend uses a modular architecture under `app/`:
  - `api/` contains FastAPI routers
  - `services/` contains business logic
  - `security/` contains scanning rules and analysis

- The openapi docs are available at `http://localhost:8000/docs` when the server is running.

## Testing

This repo currently does not include automated tests. You can manually verify behavior via the endpoints or by running the frontend against the backend.
