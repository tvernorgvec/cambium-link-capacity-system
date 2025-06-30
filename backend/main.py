
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from typing import List, Dict, Any, Optional
from datetime import datetime
import asyncio
import logging

from .services.snmp_service import LinkCapacityService, LinkTestData
from .services.cnmaestro_service import CnMaestroService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="GVEC Link Capacity Test System", version="1.0.0")

# Initialize services
link_service = LinkCapacityService()
active_tests = {}

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
    """Get current link capacity data from cnMaestro."""
    try:
        async with CnMaestroService() as cnmaestro:
            aps = await cnmaestro.get_access_points()
            sms = await cnmaestro.get_subscriber_modules()
            
            # Combine AP and SM data for link capacity view
            link_data = []
            for ap in aps:
                ap_sms = [sm for sm in sms if sm['ap_mac'] == ap['mac']]
                for sm in ap_sms:
                    link_data.append({
                        "id": f"{ap['mac']}-{sm['mac']}",
                        "ap_mac": ap['mac'],
                        "sm_mac": sm['mac'],
                        "name": f"{ap['name']}-{sm['name']}",
                        "model": ap['model'],
                        "tower_name": ap['tower_name'],
                        "ip_address": ap['ip_address'],
                        "status": "active" if ap['status'] == 'online' and sm['status'] == 'online' else "inactive",
                        "uplink_mbps": 0,  # Will be populated from test results
                        "downlink_mbps": 0,
                        "snr_dl": 0,
                        "snr_ul": 0,
                        "last_test": None
                    })
            
            return link_data
    except Exception as e:
        logger.error(f"Failed to get link capacity data: {e}")
        return mock_link_capacity

@app.get("/linktest/api/access-points")
async def get_access_points(model: Optional[str] = None, status: Optional[str] = None):
    """Get access points from cnMaestro."""
    try:
        async with CnMaestroService() as cnmaestro:
            filters = {}
            if model:
                filters['model'] = model
            if status:
                filters['status'] = status
            
            aps = await cnmaestro.get_access_points(filters)
            return aps
    except Exception as e:
        logger.error(f"Failed to get access points: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/linktest/api/subscriber-modules")
async def get_subscriber_modules(ap_mac: Optional[str] = None):
    """Get subscriber modules from cnMaestro."""
    try:
        async with CnMaestroService() as cnmaestro:
            sms = await cnmaestro.get_subscriber_modules(ap_mac)
            return sms
    except Exception as e:
        logger.error(f"Failed to get subscriber modules: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/linktest/api/network-topology")
async def get_network_topology():
    """Get network topology data."""
    try:
        async with CnMaestroService() as cnmaestro:
            topology = await cnmaestro.get_network_topology()
            return topology
    except Exception as e:
        logger.error(f"Failed to get network topology: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/linktest/api/run-test")
async def run_link_test(background_tasks: BackgroundTasks, test_request: Dict[str, Any]):
    """Start a link capacity test."""
    ap_ip = test_request.get("ap_ip")
    ap_mac = test_request.get("ap_mac") 
    community = test_request.get("community", "public")
    model = test_request.get("model", "450v")
    test_mode = test_request.get("test_mode", "individual")
    duration = test_request.get("duration", 10)
    
    if not ap_ip:
        raise HTTPException(status_code=400, detail="AP IP address is required")
    
    test_id = f"{ap_mac}-{datetime.now().isoformat()}"
    
    # Store test status
    active_tests[test_id] = {
        "id": test_id,
        "ap_ip": ap_ip,
        "ap_mac": ap_mac,
        "model": model,
        "test_mode": test_mode,
        "status": "running",
        "started_at": datetime.utcnow().isoformat(),
        "progress": 0,
        "results": []
    }
    
    # Start test in background
    background_tasks.add_task(execute_link_test, test_id, ap_ip, community, model, test_mode, duration)
    
    return {"test_id": test_id, "status": "started", "message": "Link test started successfully"}

async def execute_link_test(test_id: str, ap_ip: str, community: str, model: str, test_mode: str, duration: int):
    """Execute the link test in background."""
    try:
        active_tests[test_id]["status"] = "configuring"
        
        if model == "450v":
            results = await link_service.run_450v_test(ap_ip, community, duration)
        elif model == "450m":
            results = await link_service.run_450m_test(ap_ip, community, test_mode, duration)
        else:
            raise ValueError(f"Unsupported model: {model}")
        
        # Convert results to dict format
        test_results = []
        for result in results:
            test_results.append({
                "timestamp": result.timestamp,
                "ap_mac": result.ap_mac,
                "ap_name": result.ap_name,
                "sm_luid": result.sm_luid,
                "sm_mac": result.sm_mac,
                "sm_type": result.sm_type,
                "sm_name": result.sm_name,
                "uplink_rssi": result.uplink_rssi,
                "downlink_efficiency": result.downlink_efficiency,
                "uplink_efficiency": result.uplink_efficiency,
                "downlink_throughput_total": result.downlink_throughput_total,
                "downlink_throughput_tested": result.downlink_throughput_tested,
                "uplink_throughput_total": result.uplink_throughput_total,
                "uplink_throughput_tested": result.uplink_throughput_tested,
                "avg_rate_uplink": result.avg_rate_uplink,
                "avg_rate_downlink": result.avg_rate_downlink
            })
        
        active_tests[test_id].update({
            "status": "completed",
            "completed_at": datetime.utcnow().isoformat(),
            "progress": 100,
            "results": test_results,
            "result_count": len(test_results)
        })
        
        logger.info(f"Test {test_id} completed successfully with {len(test_results)} results")
        
    except Exception as e:
        logger.error(f"Test {test_id} failed: {e}")
        active_tests[test_id].update({
            "status": "failed",
            "completed_at": datetime.utcnow().isoformat(),
            "error": str(e)
        })

@app.get("/linktest/api/test-status/{test_id}")
async def get_test_status(test_id: str):
    """Get the status of a running test."""
    if test_id not in active_tests:
        raise HTTPException(status_code=404, detail="Test not found")
    
    return active_tests[test_id]

@app.get("/linktest/api/active-tests")
async def get_active_tests():
    """Get all active tests."""
    return list(active_tests.values())

@app.delete("/linktest/api/test/{test_id}")
async def cancel_test(test_id: str):
    """Cancel a running test."""
    if test_id not in active_tests:
        raise HTTPException(status_code=404, detail="Test not found")
    
    test = active_tests[test_id]
    if test["status"] == "running":
        test["status"] = "cancelled"
        test["completed_at"] = datetime.utcnow().isoformat()
    
    return {"message": "Test cancelled successfully"}

@app.post("/linktest/api/discover-aps")
async def discover_access_points(discovery_request: Dict[str, Any]):
    """Discover access points from IP list."""
    ip_list = discovery_request.get("ip_list", [])
    community = discovery_request.get("community", "public")
    
    if not ip_list:
        raise HTTPException(status_code=400, detail="IP list is required")
    
    try:
        discovered_aps = await link_service.discover_aps(ip_list, community)
        return {"discovered_aps": discovered_aps, "total": len(discovered_aps)}
    except Exception as e:
        logger.error(f"AP discovery failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/linktest/api/test-results")
async def get_test_results(limit: int = 100, offset: int = 0):
    """Get historical test results."""
    # This would typically query a database
    # For now, return results from active tests
    all_results = []
    for test in active_tests.values():
        if test.get("results"):
            for result in test["results"]:
                result["test_id"] = test["id"]
                all_results.append(result)
    
    # Apply pagination
    paginated_results = all_results[offset:offset + limit]
    
    return {
        "results": paginated_results,
        "total": len(all_results),
        "limit": limit,
        "offset": offset
    }

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
