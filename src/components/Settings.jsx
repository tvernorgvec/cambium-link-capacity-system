
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  Database,
  Network,
  Bell,
  Shield,
} from 'lucide-react';
import Card from './Card';
import StatusBadge from './StatusBadge';

const Settings = () => {
  const { state } = useApp();
  const [settings, setSettings] = useState({
    // API Settings
    cnMaestroUrl: 'https://cnmaestro.gvec.net/api/v2/',
    cnMaestroApiKey: '',
    refreshInterval: 300,
    
    // Database Settings
    postgresHost: 'localhost',
    postgresPort: 5432,
    postgresDatabase: 'gvec_linktest',
    influxDbUrl: 'http://localhost:8086',
    influxDbDatabase: 'link_capacity',
    
    // Test Settings
    testDuration: 30,
    testPacketLength: 1518,
    testDirection: 'downlink',
    parallelTests: 10,
    
    // Notifications
    enableEmailAlerts: true,
    alertThreshold: 70,
    emailRecipients: 'admin@gvec.net',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleInputChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const testConnection = async (type) => {
    console.log(`Testing ${type} connection...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure application settings</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* API Configuration */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <Network className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">API Configuration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              cnMaestro URL
            </label>
            <input
              type="url"
              value={settings.cnMaestroUrl}
              onChange={(e) => handleInputChange('api', 'cnMaestroUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <input
              type="password"
              value={settings.cnMaestroApiKey}
              onChange={(e) => handleInputChange('api', 'cnMaestroApiKey', e.target.value)}
              placeholder="Enter API key"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Refresh Interval (seconds)
            </label>
            <input
              type="number"
              value={settings.refreshInterval}
              onChange={(e) => handleInputChange('api', 'refreshInterval', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => testConnection('cnMaestro')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Test Connection</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Database Configuration */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <Database className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Database Configuration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PostgreSQL Host
            </label>
            <input
              type="text"
              value={settings.postgresHost}
              onChange={(e) => handleInputChange('db', 'postgresHost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PostgreSQL Port
            </label>
            <input
              type="number"
              value={settings.postgresPort}
              onChange={(e) => handleInputChange('db', 'postgresPort', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Database Name
            </label>
            <input
              type="text"
              value={settings.postgresDatabase}
              onChange={(e) => handleInputChange('db', 'postgresDatabase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              InfluxDB URL
            </label>
            <input
              type="url"
              value={settings.influxDbUrl}
              onChange={(e) => handleInputChange('db', 'influxDbUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Test Configuration */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Test Configuration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Duration (seconds)
            </label>
            <input
              type="number"
              value={settings.testDuration}
              onChange={(e) => handleInputChange('test', 'testDuration', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Packet Length (bytes)
            </label>
            <input
              type="number"
              value={settings.testPacketLength}
              onChange={(e) => handleInputChange('test', 'testPacketLength', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test Direction
            </label>
            <select
              value={settings.testDirection}
              onChange={(e) => handleInputChange('test', 'testDirection', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="downlink">Downlink</option>
              <option value="uplink">Uplink</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parallel Tests
            </label>
            <input
              type="number"
              value={settings.parallelTests}
              onChange={(e) => handleInputChange('test', 'parallelTests', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="h-5 w-5 text-orange-600" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.enableEmailAlerts}
              onChange={(e) => handleInputChange('notifications', 'enableEmailAlerts', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Enable email alerts
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Threshold (%)
              </label>
              <input
                type="number"
                value={settings.alertThreshold}
                onChange={(e) => handleInputChange('notifications', 'alertThreshold', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Recipients
              </label>
              <input
                type="email"
                value={settings.emailRecipients}
                onChange={(e) => handleInputChange('notifications', 'emailRecipients', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
