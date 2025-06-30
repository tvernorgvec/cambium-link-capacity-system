# ruff: noqa: N816 BLE001 INP001

import argparse
import asyncio
import csv
import logging
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path

import puresnmp
from puresnmp import V2C, Client, ObjectIdentifier
from puresnmp.types import Integer, OctetString

try:
    from icmplib import async_ping
except ImportError:
    print("ERROR: icmplib not installed. Run 'python -m pip install icmplib' to install")  # noqa: T201
    sys.exit(1)
try:
    from netaddr import EUI
except ImportError:
    print("ERROR: netaddr not installed. Run 'python -m pip install netaddr' to install")  # noqa: T201
    sys.exit(1)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s", "%Y-%m-%d %H:%M:%S")

file_handler = logging.FileHandler("link_test_data.log")
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(formatter)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)

OPDIR = ".\\data"
FILENAME = "{}/linktest-{}-{}.csv".format(OPDIR, time.strftime("%Y%m%d"), time.strftime("%H%M%S"))
Path(OPDIR).mkdir(parents=True, exist_ok=True)
HEADER = [
    "timestamp",
    "ap_mac",
    "ap_name",
    "sm_luid",
    "sm_mac",
    "sm_type",
    "sm_name",
    "uplink_rssi",
    "downlink_efficiency",
    "uplink_efficiency",
    "downlink_throughput_total",
    "downlink_throughput_tested",
    "downlink_throughput_untested",
    "uplink_throughput_total",
    "uplink_throughput_tested",
    "uplink_throughput_untested",
    "avg_rate_uplink",
    "avg_rate_downlink",
]
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

LINK_TEST_DURATION = 10
HEADER = [
    "timestamp",
    "ap_mac",
    "ap_name",
    "sm_luid",
    "sm_mac",
    "sm_type",
    "sm_name",
    "uplink_rssi",
    "downlink_efficiency",
    "uplink_efficiency",
    "downlink_throughput_total",
    "downlink_throughput_tested",
    "downlink_throughput_untested",
    "uplink_throughput_total",
    "uplink_throughput_tested",
    "uplink_throughput_untested",
    "avg_rate_uplink",
    "avg_rate_downlink",
]

productTypeName = ".1.3.6.1.4.1.161.19.3.3.1.266.0"
linkTestModeBox = ".1.3.6.1.4.1.161.19.3.3.18.1.5.0"
linkTestPriorityLevelBox = ".1.3.6.1.4.1.161.19.3.3.18.1.15.0"
linkTestMumimoBox = ".1.3.6.1.4.1.161.19.3.3.18.1.12.0"
linkTestIgnoreCIRBox = ".1.3.6.1.4.1.161.19.3.3.18.1.17.0"
linkTestBlockUserTrafficBox = ".1.3.6.1.4.1.161.19.3.3.18.1.19.0"
linkTestDurationBox = ".1.3.6.1.4.1.161.19.3.3.18.1.2.0"
linkTestDirectionBox = ".1.3.6.1.4.1.161.19.3.3.18.1.10.0"
linkTestPktLengthBox = ".1.3.6.1.4.1.161.19.3.3.18.1.4.0"
linkLUID = ".1.3.6.1.4.1.161.19.3.1.4.1.1"
linkSessState = ".1.3.6.1.4.1.161.19.3.1.4.1.19"
linkTestLUIDListBox = ".1.3.6.1.4.1.161.19.3.3.18.1.18.0"
linkTestLUID = ".1.3.6.1.4.1.161.19.3.1.2.1.1.0"
linkTestActionBox = ".1.3.6.1.4.1.161.19.3.3.18.1.3.0"
linkTestLastRunTime = ".1.3.6.1.4.1.161.19.3.3.18.2.55.0"
whispBoxEsn = ".1.3.6.1.4.1.161.19.3.3.1.3.0"
sysName = ".1.3.6.1.2.1.1.5.0"
linkESN = ".1.3.6.1.4.1.161.19.3.1.4.1.20"
productType = ".1.3.6.1.4.1.161.19.3.1.4.1.90"
linkSiteName = ".1.3.6.1.4.1.161.19.3.1.4.1.33"
avgPowerLevel = ".1.3.6.1.4.1.161.19.3.1.4.1.34"
linkTestMVCEfficiencyTotalDL = ".1.3.6.1.4.1.161.19.3.3.18.5.5.0"
linkTestMVCEfficiencyTotalUL = ".1.3.6.1.4.1.161.19.3.3.18.5.12.0"
linkTestMVCThroughputTotalDL = ".1.3.6.1.4.1.161.19.3.3.18.5.3.0"
linkTestMVCThroughputTotalUntestedVCsDL = ".1.3.6.1.4.1.161.19.3.3.18.5.4.0"
linkTestMVCThroughputTotalUL = ".1.3.6.1.4.1.161.19.3.3.18.5.10.0"
linkTestMVCThroughputTotalUntestedDataChannelsUL = ".1.3.6.1.4.1.161.19.3.3.18.5.11.0"
linkTestMVCLuid = ".1.3.6.1.4.1.161.19.3.3.18.6.1.12"
linkTestMVCAverageRateUL = ".1.3.6.1.4.1.161.19.3.3.18.6.1.23"
linkTestMVCAverageRateDL = ".1.3.6.1.4.1.161.19.3.3.18.6.1.22"
linkTestModeBox = ".1.3.6.1.4.1.161.19.3.3.18.1.5.0"
linkTestWithDualPath = ".1.3.6.1.4.1.161.19.3.1.2.1.7.0"
linkTestErrorBox = ".1.3.6.1.4.1.161.19.3.3.18.2.3.0"

LT_WITH_DUAL_PATH = {
    "lowpriorityvconly": 0,
    "highandlowpriorityvcs": 1,
}

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

start = 1


DECODE = {
    1: lambda val: "".join(["%.2x" % x for x in val]),
    2: lambda val: val.asOctets().decode("utf-8"),
    None: None,
}


async def snmp_get(ip: str, community: str, oid: str, **kwargs) -> str | int:
    """Perform SNMP GET operation."""
    logger.debug(f"SNMP GET: {ip} {community} {oid}")
    _decode_func = DECODE[kwargs.get("decode_func")]

    client = Client(ip, V2C(community))
    try:
        response = await client.get(ObjectIdentifier(oid))
    except puresnmp.exc.Timeout as e:
        logger.error(f"{ip=} {oid=} Timeout: {e}")
        raise e

    logger.debug(f"SNMP GET response: {response}")
    value = response.value
    if _decode_func:
        return _decode_func(value)
    if isinstance(value, OctetString):
        return str(value)
    if isinstance(value, Integer):
        return int(value)
    if isinstance(value, bytes):
        return value.decode("utf-8")
    return value


async def snmp_set(ip: str, community: str, oid: str, value: str | int, **kwargs) -> None:
    """Perform SNMP SET operation."""
    logger.debug(f"SNMP SET: {ip} {community} {oid} {value}")
    _decode_func = DECODE[kwargs.get("decode_func")]

    if isinstance(value, str):
        value = OctetString(value)
    elif isinstance(value, int):
        value = Integer(value)

    client = Client(ip, V2C(community))
    try:
        value = await client.set(ObjectIdentifier(oid), value)
    except puresnmp.exc.WrongType as e:
        logger.error(f"{ip=} {oid=} {value=} WrongType: {e}")
        raise e
    except puresnmp.exc.Timeout as e:
        logger.error(f"{ip=} {oid=} {value=} Timeout: {e}")
        raise e
    logger.debug(f"SNMP SET response: {value}")


async def snmp_walk(ip: str, community: str, oid: str) -> dict:
    """Perform SNMP WALK operation."""
    logger.debug(f"SNMP WALK: {ip} {community} {oid}")

    async def walk_and_collect():
        client = Client(ip, V2C(community))
        result = {}
        async for k, v in client.walk(ObjectIdentifier(oid)):
            value = v.value
            if isinstance(value, OctetString):
                value = value.decode("utf-8")
            elif isinstance(value, Integer):
                value = int(value)
            result[str(k)] = value
        logger.debug(f"SNMP WALK result: {result}")
        return result

    return await walk_and_collect()


class Snmp:
    """SNMP client for Canopy devices."""

    def __init__(self, ip: str, community: str):
        self.ip = ip
        self.community = community

    async def get(self, oid: str, **kwargs) -> str | int:
        return await snmp_get(self.ip, self.community, oid, **kwargs)

    async def set(self, oid: str, value: str | int) -> None:
        await snmp_set(self.ip, self.community, oid, value)

    async def walk(self, oid: str) -> dict:
        return await snmp_walk(self.ip, self.community, oid)


@dataclass
class Data:
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


class LinkTest:
    """Class to handle link tests on Canopy devices."""

    def __init__(self, ip: str, community: str, link_test_duration: int, pkt_length: int, 
                 direction: str, link_test_mode: str, link_test_with_dual_path: str):
        self.ip = ip
        self.community = community
        self.ap = Snmp(ip, community)
        self.link_test_duration = link_test_duration
        self.pkt_length = pkt_length
        self.direction = direction
        self.mode = link_test_mode
        self.dual_path = link_test_with_dual_path

    async def run_lt(self, luid: str) -> list:
        count = 0
        for i in range(5):
            try:
                await self.ap.set(linkTestLUID, luid)
                await self.ap.set(linkTestActionBox, start)
            except puresnmp.exc.Timeout as e:
                logger.error(f"Failed to start link test on {self.ip}:{luid}: {e}")
                if i == 4:
                    raise e
                await asyncio.sleep(self.link_test_duration)
                continue

            await asyncio.sleep(max(self.link_test_duration * 3, 20))
            _val = await self.ap.get(linkTestErrorBox)
            if not _val:
                count += 1
            if count == 3 and _val == 0:
                break
        if count < 1:
            logger.error(f"Failed to start link test on {self.ip}:{luid} after 5 attempts")
            raise Exception(f"Failed to start link test on {self.ip}:{luid} after 5 attempts")

    async def collect_data(self, luid) -> list:
        get = self.ap.get
        data = Data()
        data.timestamp = await get(linkTestLastRunTime)
        data.ap_mac = EUI(await get(whispBoxEsn))
        data.ap_name = await get(sysName)
        data.sm_luid = luid
        data.sm_mac = EUI(await get(f"{linkESN}.{luid}", decode_func=1))
        data.sm_type = PRODUCT_TYPE[await get(f"{productType}.{luid}")]
        data.sm_name = await get(f"{linkSiteName}.{luid}")
        data.uplink_rssi = await get(f"{avgPowerLevel}.{luid}")
        data.downlink_efficiency = await get(linkTestMVCEfficiencyTotalDL)
        data.uplink_efficiency = await get(linkTestMVCEfficiencyTotalUL)
        data.downlink_throughput_total = await get(linkTestMVCThroughputTotalDL)
        data.downlink_throughput_untested = await get(linkTestMVCThroughputTotalUntestedVCsDL)
        data.downlink_throughput_tested = (
            data.downlink_throughput_total - data.downlink_throughput_untested
        )
        data.uplink_throughput_total = await get(linkTestMVCThroughputTotalUL)
        data.uplink_throughput_untested = await get(
            linkTestMVCThroughputTotalUntestedDataChannelsUL
        )
        data.uplink_throughput_tested = (
            data.uplink_throughput_total - data.uplink_throughput_untested
        )
        return data

    async def get_luid_list(self) -> list:
        """Get the list of LUIDs from the device."""
        try:
            luids = await self.ap.walk(linkLUID)
            return list(luids.values())
        except Exception as e:
            logger.error(f"Failed to get LUIDs from device {self.ip}: {e}")
            return []

    async def configure_ap(self) -> None:
        if not (await async_ping(self.ip, privileged=False)).is_alive:
            raise Exception(f"AP {self.ip} is not reachable via ICMP ping")

        try:
            product_type = await self.ap.get(productTypeName)
        except puresnmp.exc.Timeout as e:
            logger.error(f"Make sure community string is correct for {self.ip}")
            raise e

        if product_type != "PMP 450v 4x4":
            raise Exception(f'AP {self.ip} is not a "PMP 450v 4x4", product type: {product_type}')

        tasks = []
        tasks.append(self.ap.set(linkTestDurationBox, self.link_test_duration))
        tasks.append(self.ap.set(linkTestDirectionBox, self.direction))
        tasks.append(self.ap.set(linkTestPktLengthBox, self.pkt_length))
        tasks.append(self.ap.set(linkTestModeBox, self.mode))
        tasks.append(self.ap.set(linkTestWithDualPath, self.dual_path))
        await asyncio.gather(*tasks)

    async def run(self, semaphore: asyncio.Semaphore, lock: asyncio.Lock):
        async with semaphore:
            logger.info(f"Running link test on {self.ip}")
            try:
                await self.configure_ap()
            except Exception as e:
                logger.error(f"Error configuring AP {self.ip}: {e}")
                return
            luids = await self.get_luid_list()
            for luid in luids:
                
                try:
                    await self.run_lt(luid)
                except Exception as e:
                    logger.error(f"Error running link test for {self.ip}:{luid}: {e}")
                    continue
                try:
                    data = await self.collect_data(luid)
                    await self.write_data_rows(lock, data)
                except Exception as e:
                    logger.error(f"Error collecting data from {self.ip}: {e}")
                    logger.info(f"Link test for {self.ip}:{luid} - fail")
                    continue
                logger.info(f"Link test for {self.ip}:{luid} - ok")
                percent_done = (luids.index(luid) + 1) / len(luids) * 100 if luids else 100
                logger.info(f"Link test progress for {self.ip}: {percent_done:.1f}% of LUIDs done")

    async def write_data_rows(self, lock, row: Data) -> None:
        """Write data rows to the CSV file."""
        async with lock:
            with open(FILENAME, "a") as f:
                writer = csv.writer(
                    f, lineterminator="\n", quoting=csv.QUOTE_MINIMAL, escapechar="\\"
                )
                row = [getattr(row, header) for header in HEADER]
                writer.writerow(row)


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--ap_list",
        help="Path to a file containing a list of APs to run the link test on",
        required=True,
    )
    parser.add_argument(
        "--pool_size",
        help="Size of the thread pool to use for running the link test",
        required=False,
        default=4,
    )
    parser.add_argument(
        "--link_test_duration",
        help="Duration for the link test",
        required=False,
        type=int,
        metavar="SECONDS",
        default=10,
    )
    parser.add_argument(
        "--pkt_length",
        help="Packet length for the link test (64-1714)",
        required=False,
        type=int,
        metavar="BYTES",
        default=1714,
        choices=range(64, 1715),
    )
    parser.add_argument(
        "--direction",
        help="Direction for the link test (bidirectional, uplinkonly, downlinkonly)",
        required=False,
        default="bidirectional",
        choices=["bidirectional", "uplinkonly", "downlinkonly"],
    )
    parser.add_argument(
        "--link_test_mode",
        help="Link test mode (linktestwithoutbridging, linktestwithbridging, "
             "linktestwithbridgingandmir, extrapolatedlinktest, linktestwithmultipleVCs)",
        required=False,
        default="linktestwithbridging",
        choices=[
            "linktestwithoutbridging",
            "linktestwithbridging",
            "linktestwithbridgingandmir",
            "extrapolatedlinktest",
            "linktestwithmultipleVCs",
        ],
    )
    parser.add_argument(
        "--link_test_with_dual_path",
        help="Link test with dual path (lowpriorityvconly, highandlowpriorityvcs)",
        required=False,
        default="lowpriorityvconly",
        choices=["lowpriorityvconly", "highandlowpriorityvcs"],
    )

    args = parser.parse_args()
    pool_size = int(args.pool_size)
    semaphore = asyncio.Semaphore(pool_size)
    lock = asyncio.Lock()
    lt_duration = args.link_test_duration
    pkt_length = args.pkt_length
    direction = LT_DIRECTION[args.direction]
    mode = LINK_TEST_MODE[args.link_test_mode]
    lt_with_dual_path = LT_WITH_DUAL_PATH[args.link_test_with_dual_path]
    logger.info(f"Using thread pool size: {pool_size}")
    ap_list = []

    with open(args.ap_list, "r") as ap_list_file:
        reader = csv.reader(ap_list_file)
        for ip, community in reader:
            ap_list.append((ip, community))

    with open(FILENAME, "w") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(HEADER)

    lts = []
    for ip, community in ap_list:
        lt = LinkTest(ip, community, lt_duration, pkt_length, direction, mode, lt_with_dual_path)
        lts.append(lt)
    tasks = [lt.run(semaphore, lock) for lt in lts]
    await asyncio.gather(*tasks)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Link test interrupted by user")
