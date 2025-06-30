import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const defaultState = {
  currentTest: null,
  testResults: [],
  isTestRunning: false,
  settings: {
    autoSave: true,
    darkMode: false,
    notifications: true,
    testInterval: 300000, // 5 minutes
    maxRetries: 3,
    timeout: 30000, // 30 seconds
  },
  user: {
    preferences: {
      dashboard: {
        refreshInterval: 30000,
        showAdvanced: false,
      },
    },
  },
  ui: {
    sidebarCollapsed: false,
    activeTab: 'dashboard',
  },
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('appState');
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
      return defaultState;
    }
  });

  // Save to localStorage when specific parts of state change
  useEffect(() => {
    const saveState = () => {
      try {
        const stateToSave = {
          settings: state.settings,
          user: state.user,
          ui: state.ui,
        };
        localStorage.setItem('appState', JSON.stringify(stateToSave));
      } catch (error) {
        console.warn('Failed to save state to localStorage:', error);
      }
    };

    const timeoutId = setTimeout(saveState, 500);
    return () => clearTimeout(timeoutId);
  }, [state.settings, state.user, state.ui]); // Only watch specific parts

  const updateState = useCallback((updates) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  const value = {
    ...state,
    updateState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};