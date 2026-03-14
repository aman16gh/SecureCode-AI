import os
import shutil

try:
    from git import Repo
    GIT_AVAILABLE = True
except ImportError:
    GIT_AVAILABLE = False
    print("Warning: Git not available. GitHub scanning will be disabled.")

from app.services.scanner_service import scan_code

TEMP_DIR = "/tmp/repos"

def scan_github_repo(repo_url):
    if not GIT_AVAILABLE:
        return {
            "issues": [{
                "type": "Configuration Error",
                "risk": "high",
                "message": "Git is not installed. Please install Git to enable GitHub repository scanning.",
                "fix": "Install Git from https://git-scm.com/downloads and restart the server."
            }],
            "security_score": 0
        }

    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)

    repo_name = repo_url.split("/")[-1]
    repo_path = os.path.join(TEMP_DIR, repo_name)

    # remove if exists
    if os.path.exists(repo_path):
        shutil.rmtree(repo_path)

    # clone repo
    Repo.clone_from(repo_url, repo_path)

    results = []

    # scan files
    for root, dirs, files in os.walk(repo_path):
        for file in files:

            if file.endswith((".py", ".js", ".java", ".php")):

                file_path = os.path.join(root, file)

                with open(file_path, "r", errors="ignore") as f:
                    code = f.read()

                result = scan_code(code)

                results.append({
                    "file": file_path,
                    "analysis": result
                })

    return results