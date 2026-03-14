from fastapi import FastAPI
from app.api import scan, github_scan, health
from app.api import github_scan

app = FastAPI(
    title="SecureCode AI",
    description="AI Security Copilot for Developers",
    version="1.0.0"
)

app.include_router(scan.router)
app.include_router(github_scan.router)
app.include_router(health.router)


@app.get("/")
def root():
    return {"message": "SecureCode AI Backend Running"}