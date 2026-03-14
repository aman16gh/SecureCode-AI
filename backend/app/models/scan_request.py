from pydantic import BaseModel

class ScanRequest(BaseModel):
    code: str