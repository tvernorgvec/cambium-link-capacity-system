import argparse
import csv
import signal
import sys
import time
from contextlib import suppress
from dataclasses import dataclass, field
from functools import partial
from multiprocessing import Pool
from pathlib import Path

from pysnmp.hlapi import (CommunityData, ContextData, ObjectIdentity,
                          ObjectType, OctetString, SnmpEngine,
                          UdpTransportTarget, getCmd, nextCmd, setCmd)
from pysnmp.proto.rfc1902 import Integer32

try:
    from icmplib import ping
except ImportError:
    print("ERROR: icmplib not installed. Run 'python -m pip install icmplib' to install")
    sys.exit(1)
try:
    from netaddr import EUI
except ImportError:
    print("ERROR: netaddr not installed. Run 'python -m pip install netaddr' to install")
    sys.exit(1)

SNMPv1 = 0
SNMPv2c = 1
OBJ_TYPE = {"i": Integer32, "s": OctetString}
DECODE = {
    1: lambda val: "".join(["%.2x" % x for x in val]),
    2: lambda val: val.asOctets().decode("utf-8"),
    None: None,
}


class SnmpError(Exception):
    pass


def snmp_set(ip, community, oid, val, obj_type, **kwargs):
    _version = kwargs.get("version", SNMPv2c)
    _port = kwargs.get("port", 161)
    _decode_func = DECODE[kwargs.get("decode_func", None)]

    try:
        _type = OBJ_TYPE[obj_type]
    except IndexError:
        raise TypeError(f"{_type} is not a valid type.")

    auth_obj = CommunityData(community, mpModel=_version)
    error_indication, error_status, error_index, var_binds = next(
        setCmd(
            SnmpEngine(),
            auth_obj,
            UdpTransportTarget((ip, _port), timeout=2.0, retries=3),
            ContextData(),
            ObjectType(ObjectIdentity(oid), _type(val)),
        )
    )

    if error_indication or error_status:
        raise SnmpError(f"snmpset for oid: {oid}@{ip} err: {error_indication}/{error_status}")

    if _decode_func:
        return _decode_func(var_binds[0][1])
    with suppress(Exception):
        return int(var_binds[0][1].prettyPrint())
    return var_binds[0][1].prettyPrint()


def snmp_get(ip, community, oid, **kwargs):
    _version = kwargs.get("version", SNMPv2c)
    _port = kwargs.get("port", 161)
    _decode_func = DECODE[kwargs.get("decode_func", None)]

    auth_obj = CommunityData(community, mpModel=_version)
    error_indication, error_status, error_index, var_binds = next(
        getCmd(
            SnmpEngine(),
            auth_obj,
            UdpTransportTarget((ip, _port), timeout=2, retries=3),
            ContextData(),
            ObjectType(ObjectIdentity(oid)),
        )
    )

    if error_indication or error_status:
        raise SnmpError(f"snmpget for oid: {oid}@{ip} err: {error_indication}/{error_status}")

    if "No Such Instance currently exists at this OID" in \
            var_binds[0][1].prettyPrint():
        raise SnmpError(f"No Such Instance at {oid} for {ip}")

    if _decode_func:
        return _decode_func(var_binds[0][1])
    with suppress(Exception):
        return int(var_binds[0][1].prettyPrint())
    return var_binds[0][1].prettyPrint()


def snmp_walk(ip, community, oid, **kwargs):
    _port = kwargs.get("port", 161)
    auth_obj = CommunityData(community, mpModel=SNMPv2c)
    transport_target = UdpTransportTarget((ip, _port), timeout=3, retries=3)
    obj = ObjectIdentity(oid)
    _next_cmd = nextCmd(
        SnmpEngine(),
        auth_obj,
        transport_target,
        ContextData(),
        ObjectType(obj),
        lookupMib=False,
        lexicographicMode=kwargs.get("lexicographicMode", False),
    )

    op = []
    for error_indication, error_status, error_index, var_binds in _next_cmd:
        if error_indication or error_status:
            msg = f"snmp walk error_indication: {error_indication} error_status: {error_status}"
            raise SnmpError(msg)
        else:
            if kwargs.get("trim_idx", True):
                idx = var_binds[0][0].prettyPrint().split(".")[-1]
            else:
                idx = var_binds[0][0].prettyPrint().split("::")[-1]
            with suppress(Exception):
                idx = int(idx)
            val = var_binds[0][1].prettyPrint()
            with suppress(Exception):
                val = int(val)
            op.append([idx, val])
    return op


OPDIR = ".\\data"
FILENAME = "{}/linktest-{}-{}.csv".format(OPDIR,
                                          time.strftime("%Y%m%d"),
                                          time.strftime("%H%M%S"))
Path(OPDIR).mkdir(parents=True, exist_ok=True)
PRODUCT_TYPE = {
    1: "pmp450MIMOOFDM",
    2: "pmp430SISOOFDM",
    3: "pmp450SISOOFDM",
    4: "ptp450",
    5: "pmp450i",
    6: "ptp450i",
    7: "pmp450b",
    8: "ptp450b"
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
    "avg_rate_downlink"
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
linkTestMVCThroughputTotalUntestedDataChannelsUL = ".1.3.6.1.4.1.161.19.3.3.18.5.11.0"  # noqa: E501
linkTestMVCLuid = ".1.3.6.1.4.1.161.19.3.3.18.6.1.12"
linkTestMVCAverageRateUL = ".1.3.6.1.4.1.161.19.3.3.18.6.1.23"
linkTestMVCAverageRateDL = ".1.3.6.1.4.1.161.19.3.3.18.6.1.22"

linktestwithmultipleVCs = 4
lowpriority = 0
enable = 1
disable = 0
bidirectional = 0
inSession = 1
start = 1


class Logger(object):
    def __init__(self):
        self.terminal = sys.stdout
        self.log = open("logfile.log", "w")

    def write(self, message):
        self.terminal.write(message)
        self.log.write(message)

    def flush(self):
        self.log.flush()
        self.terminal.flush()


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


def write_data(data):
    """Write the data to a file"""
    with open(FILENAME, "a") as f:
        writer = csv.writer(f,
                            lineterminator="\n",
                            quoting=csv.QUOTE_MINIMAL,
                            escapechar="\\")
        row = [getattr(data, header) for header in HEADER]
        writer.writerow(row)


def get_link_test_data(apip, community, luid):

    snmp_set(apip, community, linkTestLUIDListBox, str(luid), "s")
    snmp_set(apip, community, linkTestActionBox, start, "i")
    time.sleep(LINK_TEST_DURATION * 3)

    data = Data()
    get = partial(snmp_get, apip, community)
    data.timestamp = get(linkTestLastRunTime)
    data.ap_mac = EUI(get(whispBoxEsn))
    data.ap_name = get(sysName)
    data.sm_luid = luid
    data.sm_mac = EUI(get(f"{linkESN}.{luid}", decode_func=1))
    data.sm_type = PRODUCT_TYPE[get(f"{productType}.{luid}")]
    data.sm_name = get(f"{linkSiteName}.{luid}")
    data.uplink_rssi = get(f"{avgPowerLevel}.{luid}")
    data.downlink_efficiency = get(linkTestMVCEfficiencyTotalDL)
    data.uplink_efficiency = get(linkTestMVCEfficiencyTotalUL)
    data.downlink_throughput_total = get(linkTestMVCThroughputTotalDL)
    data.downlink_throughput_untested = get(linkTestMVCThroughputTotalUntestedVCsDL)  # noqa: E501
    data.downlink_throughput_tested = (data.downlink_throughput_total -
                                       data.downlink_throughput_untested)
    data.uplink_throughput_total = get(linkTestMVCThroughputTotalUL)
    data.uplink_throughput_untested = get(linkTestMVCThroughputTotalUntestedDataChannelsUL)  # noqa: E501
    data.uplink_throughput_tested = (data.uplink_throughput_total -
                                     data.uplink_throughput_untested)

    vcluid = snmp_walk(apip, community, linkTestMVCLuid)
    try:
        vc = [_vc for _vc, _luid in vcluid if luid == _luid][0]
    except Exception as e:
        print(f"ERROR: failed to get vc  for {luid=}, {vcluid=}: {e}")
        return data

    data.avg_rate_uplink = get(f"{linkTestMVCAverageRateUL}.{vc}")
    data.avg_rate_downlink = get(f"{linkTestMVCAverageRateDL}.{vc}")
    data.avg_rate_uplink = f"{int(data.avg_rate_uplink) / 10}X"
    data.avg_rate_downlink = f"{int(data.avg_rate_downlink) / 10}X"

    return data


def loop_through_clients(apip, community):
    print(f"Looping through clients on AP {apip}")
    try:
        luids = snmp_walk(apip, community, linkLUID)
    except Exception as e:
        print(f"ERROR: Failed to get linkLUIDs from AP {apip}: {e}")
        return None

    print(f"Found {len(luids)} clients on AP {apip}")
    data_list = []
    for _, luid in luids:
        print(f"Checking link {luid} on AP {apip}")
        try:
            if snmp_get(apip, community, f"{linkSessState}.{luid}") != inSession:  # noqa: E501
                print(f"ERROR: Link {luid} is not in session on AP {apip}")
                continue
        except Exception as e:
            print("ERROR: Failed to get linkSessState for luid "
                  "{} from AP {}: {}".format(luid, apip, e))
            continue

        print(f"Getting link test data for luid {luid} from AP {apip}")
        counter = 1
        _data = None
        for _ in range(5):
            try:
                _data = get_link_test_data(apip, community, luid)
            except Exception as e:
                print(f"ERROR: Failed to get link test data for luid {luid} "
                      f"from AP {apip}: {e}")
                time.sleep(15)
                continue

            if _data is not None:
                counter += 1
                if counter > 3:
                    break

        if 1 < counter < 3:
            print("WARNING: Failed to run link test 3 times for ap:luid "
                  f"{apip}:{luid}")
        data_list.append(_data)

    return data_list


def run(ap):
    signal.signal(signal.SIGINT, signal_handler)
    apip, community = ap
    if not ping(apip, privileged=False).is_alive:
        print("AP {} is not reachable".format(apip))
        return None

    if snmp_get(apip, community, productTypeName) != "PMP 450m":
        print(f"WARNING: AP ({apip}) is not a PMP 450m")
        return None

    print(f"Configuring link test parameters on AP {apip}")
    set = partial(snmp_set, apip, community)
    try:
        set(linkTestModeBox, linktestwithmultipleVCs, "i")
        set(linkTestPriorityLevelBox, lowpriority, "i")
        set(linkTestMumimoBox, enable, "i")
        set(linkTestIgnoreCIRBox, enable, "i")
        set(linkTestBlockUserTrafficBox, disable, "i")
        set(linkTestDurationBox, LINK_TEST_DURATION, "i")
        set(linkTestDirectionBox, bidirectional, "i")
        set(linkTestPktLengthBox, 1714, "i")
    except Exception as e:
        print(f"ERROR: Failed to set link test parameters on AP {apip}: {e}")
        return None

    return loop_through_clients(apip, community)


def signal_handler(sig, frame):
    raise Exception("Ctrl+C pressed")


def main():
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
        default=5,
    )
    args = parser.parse_args()

    pool_size = int(args.pool_size)
    print(f"Running link test on {pool_size} APs at a time")
    ap_list = []
    with open(args.ap_list, "r") as ap_list_file:
        reader = csv.reader(ap_list_file)
        for ip, community in reader:
            ap_list.append((ip, community))

    # initialize output file
    with open(FILENAME, "w") as f:
        writer = csv.writer(f, lineterminator="\n")
        writer.writerow(HEADER)

    with Pool(pool_size) as p:
        try:
            ltresults = p.map(run, ap_list)
        except Exception as e:
            print(f"ERROR: Failed to run link test: {e}")
            p.terminate()
            sys.exit(1)

    for ltresult in ltresults:
        if ltresult is None:
            continue
        for data in ltresult:
            write_data(data)


if __name__ == "__main__":
    sys.stdout = Logger()
    main()
