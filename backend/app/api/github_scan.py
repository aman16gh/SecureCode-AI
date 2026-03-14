from fastapi import APIRouter
from app.services.github_service import scan_github_repo

router = APIRouter()

@router.post("/github-scan")
def github_scan(repo_url: str):
    return scan_github_repo(repo_url)