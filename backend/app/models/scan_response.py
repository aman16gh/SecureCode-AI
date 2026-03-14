from pydantic import BaseModel
from typing import List

class Issue(BaseModel):
    type: str
    risk: str
    message: str
    fix: str

class ScanResponse(BaseModel):
    issues: List[Issue]
    security_score: int
    