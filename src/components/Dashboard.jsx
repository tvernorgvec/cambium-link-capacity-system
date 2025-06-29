import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Wifi, AlertTriangle, TrendingUp } from "lucide-react";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAPs: 0,
    onlineAPs: 0,
    totalSMs: 0,
    onlineSMs: 0,
    activeTests: 0,
    avgThroughput: 0,
  });
  const [recentTests, setRecentTests] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data for demonstration
      setStats({
        totalAPs: 24,
        onlineAPs: 22,
        totalSMs: 156,
        onlineSMs: 142,
        activeTests: 3,
        avgThroughput: 85.6,
      });

      setRecentTests([
        {
          id: 1,
          apName: "WestHill-AP1",
          smMac: "00:04:56:11:22:33",
          status: "success",
          throughput: 128.5,
          timestamp: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          apName: "EastTower-AP2",
          smMac: "00:04:56:44:55:66",
          status: "running",
          throughput: null,
          timestamp: "2024-01-15T10:25:00Z",
        },
        {
          id: 3,
          apName: "SouthSite-AP3",
          smMac: "00:04:56:77:88:99",
          status: "failed",
          throughput: null,
          timestamp: "2024-01-15T10:20:00Z",
        },
      ]);

      setAlerts([
        {
          id: 1,
          type: "warning",
          message: "Low throughput detected on WestHill-AP1",
          timestamp: "2024-01-15T10:15:00Z",
        },
        {
          id: 2,
          type: "error",
          message: "SNMP timeout on EastTower-AP2",
          timestamp: "2024-01-15T10:10:00Z",
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Access Points
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.onlineAPs}/{stats.totalAPs}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Subscriber Modules
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.onlineSMs}/{stats.totalSMs}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Tests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeTests}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Throughput
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgThroughput} Mbps
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tests */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Tests
              </h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{test.apName}</p>
                    <p className="text-sm text-gray-500">{test.smMac}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {test.throughput && (
                      <span className="text-sm font-medium text-gray-900">
                        {test.throughput} Mbps
                      </span>
                    )}
                    <StatusBadge status={test.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Alerts</h3>
              <Button variant="outline" size="sm">
                Clear All
              </Button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <AlertTriangle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.type === "error"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
