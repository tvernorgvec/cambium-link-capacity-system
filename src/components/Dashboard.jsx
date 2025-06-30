import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSettings } from '../services/api';

// Create the AppContext
const AppContext = createContext();

// Create a custom hook to access the context
export const useApp = () => {
  return useContext(AppContext);
};

// AppProvider component to wrap the app and provide the context
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    links: [],
    settings: {},
    loading: { links: false, settings: false },
    error: null,
  });

  // Actions to update the state
  const actions = {
    fetchLinks: async () => {
      setState(prevState => ({
        ...prevState,
        loading: { ...prevState.loading, links: true },
      }));
      try {
        //const data = await fetchLinksFromApi(); // Replace with your actual API call
        //Simulate API
        const data = [
          { id: 1, name: 'Link 1' },
          { id: 2, name: 'Link 2' },
        ];
        setState(prevState => ({
          ...prevState,
          links: data,
          loading: { ...prevState.loading, links: false },
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error: error.message,
          loading: { ...prevState.loading, links: false },
        }));
      }
    },
    fetchSettings: async () => {
      setState(prevState => ({
        ...prevState,
        loading: { ...prevState.loading, settings: true },
      }));
      try {
        const settings = await fetchSettings();
        setState(prevState => ({
          ...prevState,
          settings: settings,
          loading: { ...prevState.loading, settings: false },
        }));
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error: error.message,
          loading: { ...prevState.loading, settings: false },
        }));
      }
    },
    clearError: () => {
      setState(prevState => ({ ...prevState, error: null }));
    },
  };

  // Fetch settings on component mount
  useEffect(() => {
    actions.fetchSettings();
  }, [actions]); // Removed actions from dependency array

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, Wifi } from 'lucide-react';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state, actions } = useApp();
  const { links, loading, error } = state;

  useEffect(() => {
    if (links.length === 0 && !loading.links) {
      actions.fetchLinks();
    }
  }, [links.length, loading.links, actions]);

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
                  {links.filter(link => link.name).length}
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
