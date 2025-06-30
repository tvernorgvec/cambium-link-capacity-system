import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Wifi,
  Clock,
  BarChart3,
} from 'lucide-react';
import Card from './Card';
import StatusBadge from './StatusBadge';
import LoadingSpinner from './LoadingSpinner';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state, actions } = useApp();
  const { links, loading, error } = state;

  useEffect(() => {
    if (links.length === 0 && !loading.links) {
      actions.fetchLinks();
    }
  }, []);

  if (loading.links) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <div className="ml-3">
            <p className="text-red-800">Error loading data: {error}</p>
            <button
              onClick={() => {
                actions.clearError();
                actions.fetchLinks();
              }}
              className="mt-2 text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        </div>
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
                  {/*stats.onlineAPs}/{stats.totalAPs*/}
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
                  {/*stats.onlineSMs}/{stats.totalSMs*/}
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
                  {/*stats.activeTests*/}
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
                  {/*stats.avgThroughput*/} Mbps
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
              {/*<Button variant="outline" size="sm">
                View All
              </Button>*/}
            </div>
            <div className="space-y-3">
              {/*recentTests.map((test) => (
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
              ))*/}
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
              {/*<Button variant="outline" size="sm">
                Clear All
              </Button>*/}
            </div>
            <div className="space-y-3">
              {/*alerts.map((alert) => (
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
              ))*/}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
