
import asyncio
import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Union
from datetime import datetime
import os

# Only import SNMP modules if not in development mode
if not os.getenv('DOCKER_CONTAINER'):
    # Mock SNMP for development
    class MockSnmpClient:
        def __init__(self, ip: str, community: str):
            self.ip = ip
            self.community = community
        
        async def get(self, oid: str, **kwargs) -> Union[str, int]:
            return f"mock_value_for_{oid}"
        
        async def set(self, oid: str, value: Union[str, int]) -> None:
            pass
        
        async def walk(self, oid: str) -> Dict:
            return {"1": 1, "2": 2}
    
    async def async_ping(ip: str, privileged: bool = False):
        class MockPing:
            is_alive = True
        return MockPing()
    
    def EUI(mac: str):
        return mac
else:
    # Production SNMP imports
    import puresnmp
    from puresnmp import V2C, Client, ObjectIdentifier
    from puresnmp.types import Integer, OctetString
    from icmplib import async_ping
    from netaddr import EUI

logger = logging.getLogger(__name__)

# SNMP OIDs for Cambium devices
PRODUCT_TYPE = {
    0: "unknown",
    1: "pmp450MIMOOFDM",
    2: "pmp430SISOOFDM", 
    3: "pmp450SISOOFDM",
    4: "ptp450",
    5: "pmp450i",
    6: "ptp450i",
    7: "pmp450b",
    8: "ptp450b",
}

# OID definitions
OIDS = {
    "productTypeName": ".1.3.6.1.4.1.161.19.3.3.1.266.0",
    "linkTestModeBox": ".1.3.6.1.4.1.161.19.3.3.18.1.5.0",
    "linkTestDurationBox": ".1.3.6.1.4.1.161.19.3.3.18.1.2.0",
    "linkTestDirectionBox": ".1.3.6.1.4.1.161.19.3.3.18.1.10.0",
    "linkTestPktLengthBox": ".1.3.6.1.4.1.161.19.3.3.18.1.4.0",
    "linkLUID": ".1.3.6.1.4.1.161.19.3.1.4.1.1",
    "linkSessState": ".1.3.6.1.4.1.161.19.3.1.4.1.19",
    "linkTestLUID": ".1.3.6.1.4.1.161.19.3.1.2.1.1.0",
    "linkTestActionBox": ".1.3.6.1.4.1.161.19.3.3.18.1.3.0",
    "linkTestLastRunTime": ".1.3.6.1.4.1.161.19.3.3.18.2.55.0",
    "whispBoxEsn": ".1.3.6.1.4.1.161.19.3.3.1.3.0",
    "sysName": ".1.3.6.1.2.1.1.5.0",
    "linkESN": ".1.3.6.1.4.1.161.19.3.1.4.1.20",
    "productType": ".1.3.6.1.4.1.161.19.3.1.4.1.90",
    "linkSiteName": ".1.3.6.1.4.1.161.19.3.1.4.1.33",
    "avgPowerLevel": ".1.3.6.1.4.1.161.19.3.1.4.1.34",
    "linkTestMVCEfficiencyTotalDL": ".1.3.6.1.4.1.161.19.3.3.18.5.5.0",
    "linkTestMVCEfficiencyTotalUL": ".1.3.6.1.4.1.161.19.3.3.18.5.12.0",
    "linkTestMVCThroughputTotalDL": ".1.3.6.1.4.1.161.19.3.3.18.5.3.0",
    "linkTestMVCThroughputTotalUntestedVCsDL": ".1.3.6.1.4.1.161.19.3.3.18.5.4.0",
    "linkTestMVCThroughputTotalUL": ".1.3.6.1.4.1.161.19.3.3.18.5.10.0",
    "linkTestMVCThroughputTotalUntestedDataChannelsUL": ".1.3.6.1.4.1.161.19.3.3.18.5.11.0",
    "linkTestErrorBox": ".1.3.6.1.4.1.161.19.3.3.18.2.3.0",
    "linkTestWithDualPath": ".1.3.6.1.4.1.161.19.3.1.2.1.7.0",
}

# Test configuration constants
LINK_TEST_MODE = {
    "linktestwithoutbridging": 0,
    "linktestwithbridging": 1,
    "linktestwithbridgingandmir": 2,
    "extrapolatedlinktest": 3,
    "linktestwithmultipleVCs": 4,
}

LT_DIRECTION = {
    "bidirectional": 0,
    "uplinkonly": 1,
    "downlinkonly": 2,
}

LT_WITH_DUAL_PATH = {
    "lowpriorityvconly": 0,
    "highandlowpriorityvcs": 1,
}

@dataclass
class LinkTestData:
    timestamp: str = field(default="")
    ap_mac: str = field(default="")
    ap_name: str = field(default="")
    sm_luid: str = field(default="")
    sm_mac: str = field(default="")
    sm_type: str = field(default="")
    sm_name: str = field(default="")
    uplink_rssi: float = field(default=0.0)
    downlink_efficiency: float = field(default=0.0)
    uplink_efficiency: float = field(default=0.0)
    downlink_throughput_total: int = field(default=0)
    downlink_throughput_tested: int = field(default=0)
    downlink_throughput_untested: int = field(default=0)
    uplink_throughput_total: int = field(default=0)
    uplink_throughput_tested: int = field(default=0)
    uplink_throughput_untested: int = field(default=0)
    avg_rate_uplink: int = field(default=0)
    avg_rate_downlink: int = field(default=0)

class SnmpClient:
    """SNMP client for Cambium devices."""
    
    def __init__(self, ip: str, community: str):
        self.ip = ip
        self.community = community
        
        if os.getenv('DOCKER_CONTAINER'):
            self.client = Client(ip, V2C(community))
        else:
            self.client = MockSnmpClient(ip, community)
    
    async def get(self, oid: str, **kwargs) -> Union[str, int]:
        """Perform SNMP GET operation."""
        if os.getenv('DOCKER_CONTAINER'):
            try:
                response = await self.client.get(ObjectIdentifier(oid))
                value = response.value
                if isinstance(value, OctetString):
                    return str(value)
                elif isinstance(value, Integer):
                    return int(value)
                elif isinstance(value, bytes):
                    return value.decode("utf-8")
                return value
            except Exception as e:
                logger.error(f"SNMP GET error for {self.ip} {oid}: {e}")
                raise
        else:
            # Mock for development
            return f"mock_{oid.split('.')[-1]}"
    
    async def set(self, oid: str, value: Union[str, int]) -> None:
        """Perform SNMP SET operation."""
        if os.getenv('DOCKER_CONTAINER'):
            try:
                if isinstance(value, str):
                    value = OctetString(value)
                elif isinstance(value, int):
                    value = Integer(value)
                await self.client.set(ObjectIdentifier(oid), value)
            except Exception as e:
                logger.error(f"SNMP SET error for {self.ip} {oid}: {e}")
                raise
        else:
            # Mock for development
            logger.info(f"Mock SNMP SET: {self.ip} {oid} = {value}")
    
    async def walk(self, oid: str) -> Dict:
        """Perform SNMP WALK operation."""
        if os.getenv('DOCKER_CONTAINER'):
            try:
                result = {}
                async for k, v in self.client.walk(ObjectIdentifier(oid)):
                    value = v.value
                    if isinstance(value, OctetString):
                        value = value.decode("utf-8")
                    elif isinstance(value, Integer):
                        value = int(value)
                    result[str(k)] = value
                return result
            except Exception as e:
                logger.error(f"SNMP WALK error for {self.ip} {oid}: {e}")
                raise
        else:
            # Mock for development
            return {"1": 100, "2": 200}

class LinkTest450v:
    """Link test implementation for 450v APs."""
    
    def __init__(self, ip: str, community: str, duration: int = 10):
        self.ip = ip
        self.community = community
        self.duration = duration
        self.snmp = SnmpClient(ip, community)
    
    async def configure_ap(self) -> None:
        """Configure AP for link testing."""
        if os.getenv('DOCKER_CONTAINER'):
            # Check if AP is reachable
            ping_result = await async_ping(self.ip, privileged=False)
            if not ping_result.is_alive:
                raise Exception(f"AP {self.ip} is not reachable")
            
            # Verify product type
            product_type = await self.snmp.get(OIDS["productTypeName"])
            if product_type != "PMP 450v 4x4":
                raise Exception(f"AP {self.ip} is not a PMP 450v 4x4, got: {product_type}")
        
        # Configure test parameters
        await self.snmp.set(OIDS["linkTestDurationBox"], self.duration)
        await self.snmp.set(OIDS["linkTestDirectionBox"], LT_DIRECTION["bidirectional"])
        await self.snmp.set(OIDS["linkTestPktLengthBox"], 1714)
        await self.snmp.set(OIDS["linkTestModeBox"], LINK_TEST_MODE["linktestwithbridging"])
        await self.snmp.set(OIDS["linkTestWithDualPath"], LT_WITH_DUAL_PATH["lowpriorityvconly"])
    
    async def get_luid_list(self) -> List[int]:
        """Get list of active LUIDs."""
        luids_dict = await self.snmp.walk(OIDS["linkLUID"])
        return list(luids_dict.values())
    
    async def run_test(self, luid: int) -> LinkTestData:
        """Run link test for specific LUID."""
        # Start the test
        await self.snmp.set(OIDS["linkTestLUID"], luid)
        await self.snmp.set(OIDS["linkTestActionBox"], 1)  # start
        
        # Wait for test completion
        await asyncio.sleep(max(self.duration * 3, 20))
        
        # Check for errors
        error_code = await self.snmp.get(OIDS["linkTestErrorBox"])
        if error_code and error_code != 0:
            raise Exception(f"Link test failed with error code: {error_code}")
        
        # Collect test data
        data = LinkTestData()
        data.timestamp = await self.snmp.get(OIDS["linkTestLastRunTime"])
        data.ap_mac = str(EUI(await self.snmp.get(OIDS["whispBoxEsn"])))
        data.ap_name = await self.snmp.get(OIDS["sysName"])
        data.sm_luid = str(luid)
        data.sm_mac = str(EUI(await self.snmp.get(f"{OIDS['linkESN']}.{luid}")))
        data.sm_type = PRODUCT_TYPE.get(await self.snmp.get(f"{OIDS['productType']}.{luid}"), "unknown")
        data.sm_name = await self.snmp.get(f"{OIDS['linkSiteName']}.{luid}")
        data.uplink_rssi = float(await self.snmp.get(f"{OIDS['avgPowerLevel']}.{luid}"))
        data.downlink_efficiency = float(await self.snmp.get(OIDS["linkTestMVCEfficiencyTotalDL"]))
        data.uplink_efficiency = float(await self.snmp.get(OIDS["linkTestMVCEfficiencyTotalUL"]))
        data.downlink_throughput_total = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalDL"]))
        data.downlink_throughput_untested = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalUntestedVCsDL"]))
        data.downlink_throughput_tested = data.downlink_throughput_total - data.downlink_throughput_untested
        data.uplink_throughput_total = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalUL"]))
        data.uplink_throughput_untested = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalUntestedDataChannelsUL"]))
        data.uplink_throughput_tested = data.uplink_throughput_total - data.uplink_throughput_untested
        
        return data

class LinkTest450m:
    """Link test implementation for 450m APs."""
    
    def __init__(self, ip: str, community: str, duration: int = 10):
        self.ip = ip
        self.community = community
        self.duration = duration
        self.snmp = SnmpClient(ip, community)
    
    async def configure_ap(self) -> None:
        """Configure AP for link testing."""
        if os.getenv('DOCKER_CONTAINER'):
            # Check if AP is reachable
            ping_result = await async_ping(self.ip, privileged=False)
            if not ping_result.is_alive:
                raise Exception(f"AP {self.ip} is not reachable")
            
            # Verify product type
            product_type = await self.snmp.get(OIDS["productTypeName"])
            if product_type != "PMP 450m":
                raise Exception(f"AP {self.ip} is not a PMP 450m, got: {product_type}")
        
        # Configure test parameters for 450m
        await self.snmp.set(OIDS["linkTestModeBox"], LINK_TEST_MODE["linktestwithmultipleVCs"])
        await self.snmp.set(OIDS["linkTestDurationBox"], self.duration)
        await self.snmp.set(OIDS["linkTestDirectionBox"], LT_DIRECTION["bidirectional"])
        await self.snmp.set(OIDS["linkTestPktLengthBox"], 1714)
    
    async def get_luid_list(self) -> List[int]:
        """Get list of active LUIDs."""
        luids_dict = await self.snmp.walk(OIDS["linkLUID"])
        return list(luids_dict.values())
    
    async def run_flood_test(self, luids: List[int]) -> List[LinkTestData]:
        """Run flood test for multiple LUIDs simultaneously."""
        # Set LUID list for flood test
        luid_str = ",".join(map(str, luids))
        await self.snmp.set(".1.3.6.1.4.1.161.19.3.3.18.1.18.0", luid_str)  # linkTestLUIDListBox
        await self.snmp.set(OIDS["linkTestActionBox"], 1)  # start
        
        # Wait for test completion
        await asyncio.sleep(self.duration * 3)
        
        # Check for errors
        error_code = await self.snmp.get(OIDS["linkTestErrorBox"])
        if error_code and error_code != 0:
            raise Exception(f"Flood test failed with error code: {error_code}")
        
        # Collect data for all tested LUIDs
        results = []
        for luid in luids:
            try:
                data = await self._collect_luid_data(luid)
                results.append(data)
            except Exception as e:
                logger.error(f"Failed to collect data for LUID {luid}: {e}")
                continue
        
        return results
    
    async def run_individual_test(self, luid: int) -> LinkTestData:
        """Run individual test for single LUID."""
        # Set single LUID
        await self.snmp.set(".1.3.6.1.4.1.161.19.3.3.18.1.18.0", str(luid))
        await self.snmp.set(OIDS["linkTestActionBox"], 1)  # start
        
        # Wait for test completion
        await asyncio.sleep(self.duration * 3)
        
        # Check for errors
        error_code = await self.snmp.get(OIDS["linkTestErrorBox"])
        if error_code and error_code != 0:
            raise Exception(f"Individual test failed with error code: {error_code}")
        
        return await self._collect_luid_data(luid)
    
    async def _collect_luid_data(self, luid: int) -> LinkTestData:
        """Collect test data for a specific LUID."""
        data = LinkTestData()
        data.timestamp = await self.snmp.get(OIDS["linkTestLastRunTime"])
        data.ap_mac = str(EUI(await self.snmp.get(OIDS["whispBoxEsn"])))
        data.ap_name = await self.snmp.get(OIDS["sysName"])
        data.sm_luid = str(luid)
        data.sm_mac = str(EUI(await self.snmp.get(f"{OIDS['linkESN']}.{luid}")))
        data.sm_type = PRODUCT_TYPE.get(await self.snmp.get(f"{OIDS['productType']}.{luid}"), "unknown")
        data.sm_name = await self.snmp.get(f"{OIDS['linkSiteName']}.{luid}")
        data.uplink_rssi = float(await self.snmp.get(f"{OIDS['avgPowerLevel']}.{luid}"))
        data.downlink_efficiency = float(await self.snmp.get(OIDS["linkTestMVCEfficiencyTotalDL"]))
        data.uplink_efficiency = float(await self.snmp.get(OIDS["linkTestMVCEfficiencyTotalUL"]))
        data.downlink_throughput_total = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalDL"]))
        data.downlink_throughput_untested = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalUntestedVCsDL"]))
        data.downlink_throughput_tested = data.downlink_throughput_total - data.downlink_throughput_untested
        data.uplink_throughput_total = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalUL"]))
        data.uplink_throughput_untested = int(await self.snmp.get(OIDS["linkTestMVCThroughputTotalUntestedDataChannelsUL"]))
        data.uplink_throughput_tested = data.uplink_throughput_total - data.uplink_throughput_untested
        
        return data

class LinkCapacityService:
    """Main service for managing link capacity tests."""
    
    def __init__(self):
        self.active_tests = {}
        self.test_semaphore = asyncio.Semaphore(5)  # Limit concurrent tests
    
    async def run_450v_test(self, ip: str, community: str, duration: int = 10) -> List[LinkTestData]:
        """Run link capacity test on 450v AP."""
        async with self.test_semaphore:
            test = LinkTest450v(ip, community, duration)
            await test.configure_ap()
            luids = await test.get_luid_list()
            
            results = []
            for luid in luids:
                try:
                    # Check if SM is in session
                    session_state = await test.snmp.get(f"{OIDS['linkSessState']}.{luid}")
                    if session_state != 1:  # inSession
                        logger.warning(f"LUID {luid} not in session, skipping")
                        continue
                    
                    data = await test.run_test(luid)
                    results.append(data)
                except Exception as e:
                    logger.error(f"Failed to test LUID {luid} on {ip}: {e}")
                    continue
            
            return results
    
    async def run_450m_test(self, ip: str, community: str, mode: str = "individual", 
                           duration: int = 10) -> List[LinkTestData]:
        """Run link capacity test on 450m AP."""
        async with self.test_semaphore:
            test = LinkTest450m(ip, community, duration)
            await test.configure_ap()
            luids = await test.get_luid_list()
            
            # Filter only SMs in session
            active_luids = []
            for luid in luids:
                try:
                    session_state = await test.snmp.get(f"{OIDS['linkSessState']}.{luid}")
                    if session_state == 1:  # inSession
                        active_luids.append(luid)
                except Exception as e:
                    logger.error(f"Failed to check session state for LUID {luid}: {e}")
                    continue
            
            if mode == "flood":
                return await test.run_flood_test(active_luids)
            else:
                results = []
                for luid in active_luids:
                    try:
                        data = await test.run_individual_test(luid)
                        results.append(data)
                    except Exception as e:
                        logger.error(f"Failed to test LUID {luid} on {ip}: {e}")
                        continue
                return results
    
    async def discover_aps(self, ip_list: List[str], community: str) -> Dict[str, str]:
        """Discover AP types from IP list."""
        results = {}
        tasks = []
        
        for ip in ip_list:
            tasks.append(self._check_ap_type(ip, community))
        
        ap_types = await asyncio.gather(*tasks, return_exceptions=True)
        
        for ip, ap_type in zip(ip_list, ap_types):
            if isinstance(ap_type, Exception):
                logger.error(f"Failed to check AP type for {ip}: {ap_type}")
                continue
            results[ip] = ap_type
        
        return results
    
    async def _check_ap_type(self, ip: str, community: str) -> Optional[str]:
        """Check AP product type."""
        try:
            snmp = SnmpClient(ip, community)
            product_type = await snmp.get(OIDS["productTypeName"])
            
            if "450v" in product_type:
                return "450v"
            elif "450m" in product_type:
                return "450m"
            else:
                return None
        except Exception as e:
            logger.error(f"Failed to get product type for {ip}: {e}")
            return None
