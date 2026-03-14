from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import scan, github_scan, health

app = FastAPI(
    title="SecureCode AI",
    description="AI Security Copilot for Developers",
    version="1.0.0"
)

# Allow requests from the frontend (and other origins during development).
# For production, tighten this to your frontend URL (e.g. https://secure-code-ai.vercel.app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan.router)
app.include_router(github_scan.router)
app.include_router(health.router)


@app.get("/")
def root():
    return {"message": "SecureCode AI Backend Running"}
