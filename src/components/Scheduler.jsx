import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Settings, Plus, Trash2 } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import { useApp } from '../context/AppContext';
import { DataTable } from './DataTable';

const Scheduler = () => {
  const [accessPoints, setAccessPoints] = useState([]);
  const [selectedAP, setSelectedAP] = useState('');
  const [testType, setTestType] = useState('individual');
  const [scheduledTests, setScheduledTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const { scheduleTest } = useApp();

  useEffect(() => {
    fetchAccessPoints();
    fetchScheduledTests();
  }, []);

  const fetchAccessPoints = async () => {
    try {
      // Mock data for demonstration
      setAccessPoints([
        {
          id: 1,
          name: 'WestHill-AP1',
          mac: '00:04:56:AA:BB:CC',
          model: '450v',
          ip: '192.168.1.100',
          online: true,
          smCount: 12,
        },
        {
          id: 2,
          name: 'EastTower-AP2',
          mac: '00:04:56:DD:EE:FF',
          model: '450m',
          ip: '192.168.1.101',
          online: true,
          smCount: 8,
        },
        {
          id: 3,
          name: 'SouthSite-AP3',
          mac: '00:04:56:11:22:33',
          model: '450v',
          ip: '192.168.1.102',
          online: false,
          smCount: 0,
        },
      ]);
      setLoading(false);
    } catch (error) {
      // Console statement removed by auto-fix
      setLoading(false);
    }
  };

  const fetchScheduledTests = async () => {
    try {
      // Mock data for demonstration
      setScheduledTests([
        {
          id: 1,
          apName: 'WestHill-AP1',
          apMac: '00:04:56:AA:BB:CC',
          testType: 'individual',
          status: 'queued',
          scheduledAt: '2024-01-15T14:00:00Z',
        },
        {
          id: 2,
          apName: 'EastTower-AP2',
          apMac: '00:04:56:DD:EE:FF',
          testType: 'flood',
          status: 'running',
          scheduledAt: '2024-01-15T13:30:00Z',
        },
      ]);
    } catch (error) {
      // Console statement removed by auto-fix
    }
  };

  const handleScheduleTest = async () => {
    if (!selectedAP) {
      return;
    }

    const ap = accessPoints.find(ap => ap.mac === selectedAP);
    if (!ap) {
      return;
    }

    const newTest = {
      id: Date.now(),
      apName: ap.name,
      apMac: ap.mac,
      testType,
      status: 'queued',
      scheduledAt: new Date().toISOString(),
    };

    scheduleTest(newTest);
    setSelectedAP('');

    // Test scheduling logic would be implemented here
  };

  const handleDeleteTest = testId => {
    setScheduledTests(prev => prev.filter(test => test.id !== testId));

    // Remove scheduled test logic would be implemented here
  };

  const handleRunTest = async testId => {
    setIsRunning(true);
    setScheduledTests(prev =>
      prev.map(test =>
        test.id === testId ? { ...test, status: 'running' } : test
      )
    );

    // Simulate test execution
    setTimeout(() => {
      setScheduledTests(prev =>
        prev.map(test =>
          test.id === testId ? { ...test, status: 'success' } : test
        )
      );
      setIsRunning(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredTasks = scheduledTests.map(test => ({
    id: test.id,
    name: test.apName,
    schedule: new Date(test.scheduledAt).toLocaleString(),
    status: test.status,
    lastRun: null, // Add logic to determine last run time
    apMac: test.apMac,
    testType: test.testType,
  }));

  const handleEdit = task => {
    // Console statement removed by auto-fix
  };

  const handleDelete = taskId => {
    handleDeleteTest(taskId);
  };

  return (
    <div className="space-y-6">
      {/* Schedule New Test */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Schedule New Test
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Point
              </label>
              <select
                value={selectedAP}
                onChange={e => setSelectedAP(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Access Point</option>
                {accessPoints
                  .filter(ap => ap.online)
                  .map(ap => (
                    <option key={ap.mac} value={ap.mac}>
                      {ap.name} ({ap.model}) - {ap.smCount} SMs
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Type
              </label>
              <select
                value={testType}
                onChange={e => setTestType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="individual">Individual SM</option>
                <option value="flood">Flood Mode (450m only)</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleScheduleTest}
                disabled={!selectedAP}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Test
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Scheduled Tests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Scheduled Tests
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {scheduledTests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tests scheduled
            </div>
          ) : (
            <DataTable
              title=""
              data={filteredTasks}
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'schedule', label: 'Schedule' },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'lastRun', label: 'Last Run', type: 'datetime' },
              ]}
              onEdit={handleEdit}
              onDelete={handleDelete}
              emptyMessage="No scheduled tasks found."
            />
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Scheduler;
