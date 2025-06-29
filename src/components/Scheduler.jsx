import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Settings, Plus, Trash2 } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

const Scheduler = () => {
  const [accessPoints, setAccessPoints] = useState([]);
  const [selectedAP, setSelectedAP] = useState("");
  const [testType, setTestType] = useState("individual");
  const [scheduledTests, setScheduledTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

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
          name: "WestHill-AP1",
          mac: "00:04:56:AA:BB:CC",
          model: "450v",
          ip: "192.168.1.100",
          online: true,
          smCount: 12,
        },
        {
          id: 2,
          name: "EastTower-AP2",
          mac: "00:04:56:DD:EE:FF",
          model: "450m",
          ip: "192.168.1.101",
          online: true,
          smCount: 8,
        },
        {
          id: 3,
          name: "SouthSite-AP3",
          mac: "00:04:56:11:22:33",
          model: "450v",
          ip: "192.168.1.102",
          online: false,
          smCount: 0,
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching access points:", error);
      setLoading(false);
    }
  };

  const fetchScheduledTests = async () => {
    try {
      // Mock data for demonstration
      setScheduledTests([
        {
          id: 1,
          apName: "WestHill-AP1",
          apMac: "00:04:56:AA:BB:CC",
          testType: "individual",
          status: "queued",
          scheduledAt: "2024-01-15T14:00:00Z",
        },
        {
          id: 2,
          apName: "EastTower-AP2",
          apMac: "00:04:56:DD:EE:FF",
          testType: "flood",
          status: "running",
          scheduledAt: "2024-01-15T13:30:00Z",
        },
      ]);
    } catch (error) {
      console.error("Error fetching scheduled tests:", error);
    }
  };

  const handleScheduleTest = async () => {
    if (!selectedAP) return;

    const ap = accessPoints.find((ap) => ap.mac === selectedAP);
    if (!ap) return;

    const newTest = {
      id: Date.now(),
      apName: ap.name,
      apMac: ap.mac,
      testType,
      status: "queued",
      scheduledAt: new Date().toISOString(),
    };

    setScheduledTests((prev) => [...prev, newTest]);
    setSelectedAP("");
  };

  const handleDeleteTest = (testId) => {
    setScheduledTests((prev) => prev.filter((test) => test.id !== testId));
  };

  const handleRunTest = async (testId) => {
    setIsRunning(true);
    setScheduledTests((prev) =>
      prev.map((test) =>
        test.id === testId ? { ...test, status: "running" } : test,
      ),
    );

    // Simulate test execution
    setTimeout(() => {
      setScheduledTests((prev) =>
        prev.map((test) =>
          test.id === testId ? { ...test, status: "success" } : test,
        ),
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
                onChange={(e) => setSelectedAP(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Access Point</option>
                {accessPoints
                  .filter((ap) => ap.online)
                  .map((ap) => (
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
                onChange={(e) => setTestType(e.target.value)}
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
            <div className="space-y-3">
              {scheduledTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {test.apName}
                        </p>
                        <p className="text-sm text-gray-500">{test.apMac}</p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            test.testType === "flood"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {test.testType === "flood"
                            ? "Flood Mode"
                            : "Individual"}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            test.status === "running"
                              ? "bg-yellow-100 text-yellow-800"
                              : test.status === "success"
                                ? "bg-green-100 text-green-800"
                                : test.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {test.status.charAt(0).toUpperCase() +
                            test.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Scheduled: {new Date(test.scheduledAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {test.status === "queued" && (
                      <Button
                        size="sm"
                        onClick={() => handleRunTest(test.id)}
                        disabled={isRunning}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    {test.status === "running" && (
                      <Button size="sm" variant="outline" disabled>
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTest(test.id)}
                      disabled={test.status === "running"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Scheduler;
