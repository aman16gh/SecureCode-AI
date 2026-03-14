from fastapi import APIRouter, HTTPException
from app.models.scan_request import ScanRequest
from app.services.scanner_service import scan_code

router = APIRouter(prefix="/scan", tags=["Scan"])

@router.post("/")
def scan_endpoint(request: ScanRequest):

    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty")

    return scan_code(request.code)