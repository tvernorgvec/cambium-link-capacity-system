
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from typing import List, Dict, Any
from datetime import datetime
import asyncio

app = FastAPI(title="GVEC Link Capacity Test System", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data for development
mock_link_capacity = [
    {
        "id": "1",
        "ap_mac": "00:04:56:AA:BB:CC",
        "sm_mac": "00:04:56:11:22:33",
        "name": "WestHill-AP1-SM1",
        "model": "450v",
        "tower_name": "WestHill",
        "ip_address": "10.67.1.100",
        "status": "active",
        "uplink_mbps": 63.4,
        "downlink_mbps": 128.2,
        "snr_dl": 26.1,
        "snr_ul": 24.8,
        "last_test": "2024-01-15T10:30:00Z"
    },
    {
        "id": "2", 
        "ap_mac": "00:04:56:BB:CC:DD",
        "sm_mac": "00:04:56:22:33:44",
        "name": "EastTower-AP2-SM1",
        "model": "450m",
        "tower_name": "EastTower",
        "ip_address": "10.67.2.50",
        "status": "active",
        "uplink_mbps": 45.2,
        "downlink_mbps": 89.7,
        "snr_dl": 23.5,
        "snr_ul": 22.1,
        "last_test": "2024-01-15T10:25:00Z"
    }
]

mock_test_results = [
    {
        "id": "1",
        "ap_mac": "00:04:56:AA:BB:CC",
        "sm_mac": "00:04:56:11:22:33",
        "test_type": "individual",
        "status": "completed",
        "uplink_mbps": 63.4,
        "downlink_mbps": 128.2,
        "started_at": "2024-01-15T10:30:00Z",
        "completed_at": "2024-01-15T10:35:00Z",
        "duration_seconds": 300
    }
]

mock_scheduled_tests = []

@app.get("/linktest/api/healthz")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/linktest/api/link-capacity")
async def get_link_capacity():
    return mock_link_capacity

@app.get("/linktest/api/test-results")
async def get_test_results():
    return mock_test_results

@app.get("/linktest/api/scheduled-tests")
async def get_scheduled_tests():
    return mock_scheduled_tests

@app.post("/linktest/api/scheduled-tests")
async def schedule_test(test_data: Dict[str, Any]):
    new_test = {
        "id": str(len(mock_scheduled_tests) + 1),
        "ap_mac": test_data.get("ap_mac"),
        "sm_mac": test_data.get("sm_mac"),
        "test_type": test_data.get("test_type", "individual"),
        "status": "scheduled",
        "scheduled_time": test_data.get("scheduled_time"),
        "created_at": datetime.utcnow().isoformat()
    }
    mock_scheduled_tests.append(new_test)
    return new_test

@app.delete("/linktest/api/scheduled-tests/{test_id}")
async def delete_scheduled_test(test_id: str):
    global mock_scheduled_tests
    mock_scheduled_tests = [t for t in mock_scheduled_tests if t["id"] != test_id]
    return {"message": "Test deleted successfully"}

@app.put("/linktest/api/settings")
async def update_settings(settings: Dict[str, Any]):
    return {"message": "Settings updated successfully", "settings": settings}

# Serve React app
if os.path.exists("dist"):
    app.mount("/linktest", StaticFiles(directory="dist", html=True), name="static")
    
    @app.get("/linktest/{full_path:path}")
    async def serve_react_app(full_path: str):
        return FileResponse("dist/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
