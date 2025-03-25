from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class ScanData(BaseModel):
    data: str

# In-memory store (for now)
scanned_data = []

@app.post("/scan-data")
def receive_scan(scan: ScanData):
    record = {
        "id": len(scanned_data) + 1,
        "data": scan.data,
        "timestamp": datetime.now().isoformat()
    }
    scanned_data.append(record)
    return record

@app.get("/scan-data/{scan_id}")
def get_scan(scan_id: int):
    for item in scanned_data:
        if item["id"] == scan_id:
            return item
    return {"error": "Not found"}
