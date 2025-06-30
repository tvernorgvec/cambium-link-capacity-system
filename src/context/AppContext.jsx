
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentTest, setCurrentTest] = useState(null);
  const [testHistory, setTestHistory] = useState([]);
  const [scheduledTests, setScheduledTests] = useState([]);
  const [settings, setSettings] = useState({
    autoRefresh: true,
    refreshInterval: 30,
    notifications: true,
    theme: 'light',
  });

  const startTest = useCallback((testConfig) => {
    const test = {
      id: Date.now(),
      ...testConfig,
      status: 'running',
      startTime: new Date(),
    };
    setCurrentTest(test);
  }, []);

  const stopTest = useCallback(() => {
    if (currentTest) {
      const completedTest = {
        ...currentTest,
        status: 'completed',
        endTime: new Date(),
      };
      setTestHistory(prev => [completedTest, ...prev]);
      setCurrentTest(null);
    }
  }, [currentTest]);

  const scheduleTest = useCallback((testConfig) => {
    const scheduledTest = {
      id: Date.now(),
      ...testConfig,
      status: 'scheduled',
    };
    setScheduledTests(prev => [...prev, scheduledTest]);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const value = {
    currentTest,
    testHistory,
    scheduledTests,
    settings,
    startTest,
    stopTest,
    scheduleTest,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
