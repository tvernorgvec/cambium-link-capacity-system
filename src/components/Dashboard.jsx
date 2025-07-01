
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  Wifi, 
  TrendingUp, 
  AlertTriangle,
  RefreshCw,
  Server,
  Radio
} from 'lucide-react';
import Card from './Card';
import StatusBadge from './StatusBadge';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const { state, actions } = useApp();
  const { linkCapacity, accessPoints, loading, error } = state;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    actions.fetchLinkCapacity();
    actions.fetchAccessPoints();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        actions.fetchLinkCapacity(),
        actions.fetchAccessPoints()
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading && !linkCapacity.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h3 className="text-red-800 font-medium">Error Loading Dashboard</h3>
        </div>
        <p className="text-red-700 mt-2">{error}</p>
        <button 
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate statistics
  const totalLinks = linkCapacity.length;
  const activeLinks = linkCapacity.filter(link => link.status === 'active').length;
  const totalCapacity = linkCapacity.reduce((sum, link) => sum + (link.downlink_mbps || 0), 0);
  const averageEfficiency = linkCapacity.length > 0 
    ? linkCapacity.reduce((sum, link) => sum + (link.downlink_efficiency || 0), 0) / linkCapacity.length
    : 0;

  const stats = [
    {
      name: 'Active Links',
      value: activeLinks,
      total: totalLinks,
      icon: Wifi,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Total Capacity',
      value: `${totalCapacity.toFixed(1)} Mbps`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Avg Efficiency',
      value: `${averageEfficiency.toFixed(1)}%`,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Access Points',
      value: accessPoints.length,
      icon: Server,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Real-time link capacity monitoring</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.total && (
                      <p className="text-sm text-gray-500">of {stat.total} total</p>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Link Capacity Table */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Link Capacity Status</h2>
          <StatusBadge
            status={activeLinks > 0 ? 'success' : 'error'}
            text={`${activeLinks} Active Links`}
          />
        </div>

        {linkCapacity.length === 0 ? (
          <div className="text-center py-12">
            <Radio className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Links Found</h3>
            <p className="text-gray-600">No link capacity data available. Check your AP connections.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downlink
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uplink
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SNR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Test
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {linkCapacity.map((link) => (
                  <motion.tr
                    key={link.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {link.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {link.tower_name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {link.model}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={link.status === 'active' ? 'success' : 'error'}
                        text={link.status}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {link.downlink_mbps ? `${link.downlink_mbps.toFixed(1)} Mbps` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {link.uplink_mbps ? `${link.uplink_mbps.toFixed(1)} Mbps` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {link.snr_dl ? `${link.snr_dl.toFixed(1)} dB` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {link.last_test ? new Date(link.last_test).toLocaleString() : 'Never'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
