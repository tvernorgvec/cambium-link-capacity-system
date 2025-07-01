
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Play,
  Pause,
  Calendar,
  Settings as SettingsIcon,
  Plus,
  Trash2,
} from 'lucide-react';
import Card from './Card';
import StatusBadge from './StatusBadge';

const Scheduler = () => {
  const { state, actions } = useApp();
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    schedule: 'daily',
    time: '02:00',
    enabled: true,
  });

  const schedules = [
    {
      id: 1,
      name: 'Daily Capacity Test',
      schedule: 'Daily at 2:00 AM',
      enabled: true,
      lastRun: '2024-01-20T02:00:00Z',
      status: 'success',
    },
    {
      id: 2,
      name: 'Weekly Report',
      schedule: 'Weekly on Sunday',
      enabled: false,
      lastRun: '2024-01-14T06:00:00Z',
      status: 'pending',
    },
  ];

  const handleCreateSchedule = () => {
    console.log('Creating schedule:', newSchedule);
    setNewSchedule({
      name: '',
      schedule: 'daily',
      time: '02:00',
      enabled: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduler</h1>
          <p className="text-gray-600">Manage automated link capacity tests</p>
        </div>
      </div>

      {/* Create New Schedule */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Create New Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Schedule name"
            value={newSchedule.name}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, name: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newSchedule.schedule}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, schedule: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input
            type="time"
            value={newSchedule.time}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, time: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateSchedule}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </button>
        </div>
      </Card>

      {/* Existing Schedules */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Scheduled Tasks
        </h2>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">{schedule.name}</h3>
                  <p className="text-sm text-gray-500">{schedule.schedule}</p>
                  <p className="text-xs text-gray-400">
                    Last run: {new Date(schedule.lastRun).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusBadge
                  status={schedule.status === 'success' ? 'success' : 'warning'}
                  text={schedule.status}
                />
                <button
                  className={`p-2 rounded-md transition-colors ${
                    schedule.enabled
                      ? 'text-green-600 hover:bg-green-100'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {schedule.enabled ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Scheduler;
