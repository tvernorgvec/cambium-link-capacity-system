import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, Wifi } from 'lucide-react';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { data, loading, error, setLoading, setError } = useAppContext();
  const { linkCapacity: links } = data;

  useEffect(() => {
    if (links.length === 0 && !loading) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [links.length, loading, setLoading]);

  if (loading) {
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
                setError(null);
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
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
            <div className="flex items-center p-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Access Points
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {links.length}
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
            <div className="flex items-center p-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Links
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {links.filter(link => link.status === 'active').length}
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
            <div className="flex items-center p-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tests Running
                </p>
                <p className="text-2xl font-bold text-gray-900">0</p>
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
            <div className="flex items-center p-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Throughput
                </p>
                <p className="text-2xl font-bold text-gray-900">-- Mbps</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;