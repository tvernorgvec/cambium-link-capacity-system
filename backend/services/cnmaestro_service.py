
import aiohttp
import asyncio
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class CnMaestroService:
    """Service for interacting with cnMaestro API."""
    
    def __init__(self):
        self.base_url = os.getenv('CNMAESTRO_API_URL', 'https://cnmaestro.gvec.net/api/v2/')
        self.client_id = os.getenv('CNMAESTRO_CLIENT_ID')
        self.client_secret = os.getenv('CNMAESTRO_CLIENT_SECRET')
        self.session = None
        self.token = None
        self.token_expires = None
    
    async def __aenter__(self):
        """Async context manager entry."""
        connector = aiohttp.TCPConnector(ssl=False)  # Ignore SSL errors as per instructions
        self.session = aiohttp.ClientSession(connector=connector)
        await self.authenticate()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit."""
        if self.session:
            await self.session.close()
    
    async def authenticate(self) -> None:
        """Authenticate with cnMaestro API."""
        if not self.client_id or not self.client_secret:
            logger.warning("cnMaestro credentials not configured, using mock data")
            return
        
        auth_url = f"{self.base_url}auth/token"
        auth_data = {
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret
        }
        
        try:
            async with self.session.post(auth_url, data=auth_data) as response:
                if response.status == 200:
                    token_data = await response.json()
                    self.token = token_data.get('access_token')
                    # Token typically expires in 3600 seconds
                    self.token_expires = datetime.now().timestamp() + token_data.get('expires_in', 3600)
                    logger.info("Successfully authenticated with cnMaestro")
                else:
                    logger.error(f"Failed to authenticate with cnMaestro: {response.status}")
                    raise Exception(f"Authentication failed: {response.status}")
        except Exception as e:
            logger.error(f"cnMaestro authentication error: {e}")
            raise
    
    async def _ensure_authenticated(self) -> None:
        """Ensure we have a valid token."""
        if not self.token or (self.token_expires and datetime.now().timestamp() > self.token_expires):
            await self.authenticate()
    
    async def _make_request(self, endpoint: str, params: Dict = None) -> List[Dict]:
        """Make authenticated request to cnMaestro API with pagination."""
        if not self.client_id:
            # Return mock data for development
            return self._get_mock_data(endpoint)
        
        await self._ensure_authenticated()
        
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        all_data = []
        page = 1
        page_size = 100
        
        while True:
            request_params = {
                'page': page,
                'pageSize': page_size
            }
            if params:
                request_params.update(params)
            
            url = f"{self.base_url}{endpoint}"
            
            try:
                async with self.session.get(url, headers=headers, params=request_params) as response:
                    if response.status == 200:
                        data = await response.json()
                        
                        # Handle different response structures
                        if isinstance(data, dict):
                            items = data.get('data', data.get('items', []))
                            total_pages = data.get('totalPages', 1)
                        else:
                            items = data
                            total_pages = 1
                        
                        all_data.extend(items)
                        
                        if page >= total_pages or len(items) < page_size:
                            break
                        
                        page += 1
                        
                        # Rate limiting - wait between requests
                        await asyncio.sleep(0.1)
                    else:
                        logger.error(f"cnMaestro API error: {response.status}")
                        break
                        
            except Exception as e:
                logger.error(f"Error fetching from cnMaestro: {e}")
                break
        
        return all_data
    
    def _get_mock_data(self, endpoint: str) -> List[Dict]:
        """Return mock data for development."""
        if 'access-points' in endpoint:
            return [
                {
                    "id": "1",
                    "name": "WestHill-AP1",
                    "mac": "00:04:56:AA:BB:CC",
                    "model": "PMP 450v",
                    "ipAddress": "10.67.1.100",
                    "tower": "WestHill",
                    "status": "online",
                    "lastSeen": "2024-01-15T10:30:00Z"
                },
                {
                    "id": "2", 
                    "name": "EastTower-AP2",
                    "mac": "00:04:56:BB:CC:DD",
                    "model": "PMP 450m",
                    "ipAddress": "10.67.2.50",
                    "tower": "EastTower",
                    "status": "online",
                    "lastSeen": "2024-01-15T10:25:00Z"
                }
            ]
        elif 'subscriber-modules' in endpoint:
            return [
                {
                    "id": "1",
                    "name": "WestHill-AP1-SM1",
                    "mac": "00:04:56:11:22:33",
                    "accessPointMac": "00:04:56:AA:BB:CC",
                    "luid": 1,
                    "ipAddress": "10.67.1.101",
                    "status": "online",
                    "lastSeen": "2024-01-15T10:30:00Z"
                },
                {
                    "id": "2",
                    "name": "EastTower-AP2-SM1", 
                    "mac": "00:04:56:22:33:44",
                    "accessPointMac": "00:04:56:BB:CC:DD",
                    "luid": 1,
                    "ipAddress": "10.67.2.51",
                    "status": "online",
                    "lastSeen": "2024-01-15T10:25:00Z"
                }
            ]
        else:
            return []
    
    async def get_access_points(self, filters: Dict = None) -> List[Dict]:
        """Get access points from cnMaestro."""
        params = {}
        if filters:
            if 'model' in filters:
                params['model'] = filters['model']
            if 'status' in filters:
                params['status'] = filters['status']
            if 'tower' in filters:
                params['tower'] = filters['tower']
        
        access_points = await self._make_request('access-points', params)
        
        # Normalize the data structure
        normalized_aps = []
        for ap in access_points:
            normalized_ap = {
                'id': ap.get('id', ap.get('esn')),
                'name': ap.get('name', ap.get('deviceName')),
                'mac': ap.get('mac', ap.get('esn')),
                'model': ap.get('model', ap.get('productType')),
                'ip_address': ap.get('ipAddress', ap.get('ip')),
                'tower_name': ap.get('tower', ap.get('towerName', ap.get('site'))),
                'status': ap.get('status', 'unknown').lower(),
                'last_seen': ap.get('lastSeen', ap.get('lastConnected')),
                'snmp_community': ap.get('snmpCommunity', 'public')
            }
            normalized_aps.append(normalized_ap)
        
        return normalized_aps
    
    async def get_subscriber_modules(self, ap_mac: str = None) -> List[Dict]:
        """Get subscriber modules from cnMaestro."""
        params = {}
        if ap_mac:
            params['accessPointMac'] = ap_mac
        
        sms = await self._make_request('subscriber-modules', params)
        
        # Normalize the data structure
        normalized_sms = []
        for sm in sms:
            normalized_sm = {
                'id': sm.get('id', sm.get('esn')),
                'name': sm.get('name', sm.get('deviceName')),
                'mac': sm.get('mac', sm.get('esn')),
                'ap_mac': sm.get('accessPointMac', sm.get('apEsn')),
                'luid': sm.get('luid'),
                'ip_address': sm.get('ipAddress', sm.get('ip')),
                'status': sm.get('status', 'unknown').lower(),
                'last_seen': sm.get('lastSeen', sm.get('lastConnected')),
                'snmp_community': sm.get('snmpCommunity', 'public')
            }
            normalized_sms.append(normalized_sm)
        
        return normalized_sms
    
    async def get_device_statistics(self, device_mac: str) -> Dict:
        """Get device statistics from cnMaestro."""
        try:
            stats = await self._make_request(f'devices/{device_mac}/statistics')
            if stats:
                return stats[0] if isinstance(stats, list) else stats
            return {}
        except Exception as e:
            logger.error(f"Failed to get statistics for {device_mac}: {e}")
            return {}
    
    async def get_network_topology(self) -> Dict:
        """Get network topology data."""
        try:
            # Get all APs and SMs
            aps = await self.get_access_points()
            sms = await self.get_subscriber_modules()
            
            # Group SMs by AP
            topology = {}
            for ap in aps:
                ap_mac = ap['mac']
                ap_sms = [sm for sm in sms if sm['ap_mac'] == ap_mac]
                
                topology[ap_mac] = {
                    'ap': ap,
                    'sms': ap_sms,
                    'sm_count': len(ap_sms),
                    'online_sms': len([sm for sm in ap_sms if sm['status'] == 'online'])
                }
            
            return topology
        except Exception as e:
            logger.error(f"Failed to get network topology: {e}")
            return {}
    
    async def refresh_device_cache(self) -> Dict[str, int]:
        """Refresh device cache and return counts."""
        try:
            aps = await self.get_access_points()
            sms = await self.get_subscriber_modules()
            
            return {
                'access_points': len(aps),
                'subscriber_modules': len(sms),
                'online_aps': len([ap for ap in aps if ap['status'] == 'online']),
                'online_sms': len([sm for sm in sms if sm['status'] == 'online']),
                'last_updated': datetime.now().isoformat()
            }
        except Exception as e:
            logger.error(f"Failed to refresh device cache: {e}")
            return {'error': str(e)}
