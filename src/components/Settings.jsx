import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

const Settings = () => {
  const [settings, setSettings] = useState({
    snmpTimeout: 5,
    snmpRetries: 2,
    snmpVersion: '2c',
    testConcurrency: 3,
    enableAI: true,
    alertThresholds: {
      lowThroughput: 50,
      lowSNR: 15,
      highLatency: 100,
    },
    cnMaestroSettings: {
      apiUrl: 'https://cnmaestro.gvec.net/api/v2/',
      clientId: '',
      clientSecret: '',
      refreshInterval: 300,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testConnection, setTestConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Mock data for demonstration
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setTestConnection(true);
    setConnectionStatus(null);

    try {
      // Mock connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus('success');
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setTestConnection(false);
    }
  };

  const updateSetting = (path, value) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current = newSettings;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
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
      {/* SNMP Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            SNMP Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timeout (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.snmpTimeout}
                onChange={e =>
                  updateSetting('snmpTimeout', parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retries
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={settings.snmpRetries}
                onChange={e =>
                  updateSetting('snmpRetries', parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Version
              </label>
              <select
                value={settings.snmpVersion}
                onChange={e => updateSetting('snmpVersion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">SNMPv1</option>
                <option value="2c">SNMPv2c</option>
                <option value="3">SNMPv3</option>
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Test Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Test Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concurrent Tests
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.testConcurrency}
                onChange={e =>
                  updateSetting('testConcurrency', parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum number of simultaneous tests
              </p>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableAI}
                  onChange={e => updateSetting('enableAI', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Enable AI Analysis
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Use machine learning for anomaly detection and forecasting
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Alert Thresholds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Alert Thresholds
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low Throughput (Mbps)
              </label>
              <input
                type="number"
                min="1"
                value={settings.alertThresholds.lowThroughput}
                onChange={e =>
                  updateSetting(
                    'alertThresholds.lowThroughput',
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low SNR (dB)
              </label>
              <input
                type="number"
                min="1"
                value={settings.alertThresholds.lowSNR}
                onChange={e =>
                  updateSetting(
                    'alertThresholds.lowSNR',
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                High Latency (ms)
              </label>
              <input
                type="number"
                min="1"
                value={settings.alertThresholds.highLatency}
                onChange={e =>
                  updateSetting(
                    'alertThresholds.highLatency',
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* cnMaestro Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            cnMaestro Integration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API URL
              </label>
              <input
                type="url"
                value={settings.cnMaestroSettings.apiUrl}
                onChange={e =>
                  updateSetting('cnMaestroSettings.apiUrl', e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client ID
                </label>
                <input
                  type="text"
                  value={settings.cnMaestroSettings.clientId}
                  onChange={e =>
                    updateSetting('cnMaestroSettings.clientId', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Secret
                </label>
                <input
                  type="password"
                  value={settings.cnMaestroSettings.clientSecret}
                  onChange={e =>
                    updateSetting(
                      'cnMaestroSettings.clientSecret',
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                min="60"
                max="3600"
                value={settings.cnMaestroSettings.refreshInterval}
                onChange={e =>
                  updateSetting(
                    'cnMaestroSettings.refreshInterval',
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleTestConnection}
                disabled={testConnection}
                variant="outline"
              >
                {testConnection ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Test Connection
              </Button>
              {connectionStatus && (
                <div
                  className={`flex items-center space-x-2 ${
                    connectionStatus === 'success'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {connectionStatus === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span className="text-sm">
                    {connectionStatus === 'success'
                      ? 'Connection successful'
                      : 'Connection failed'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={saving} size="lg">
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
