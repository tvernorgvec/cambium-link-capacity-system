import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentTest, setCurrentTest] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [settings, setSettings] = useState({
    autoSave: true,
    darkMode: false,
    notifications: true,
    testInterval: 300000,
    maxRetries: 3,
    timeout: 30000,
  });

  const addTestResult = useCallback(result => {
    setTestResults(prev => [...prev, { ...result, id: Date.now() }]);
  }, []);

  const clearTestResults = useCallback(() => {
    setTestResults([]);
  }, []);

  const updateSettings = useCallback(newSettings => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, [setSettings]);

  const value = {
    currentTest,
    setCurrentTest,
    testResults,
    addTestResult,
    clearTestResults,
    isTestRunning,
    setIsTestRunning,
    settings,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;