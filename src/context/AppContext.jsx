
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Simple state management without problematic useEffects
  const [state, setState] = useState({
    links: [],
    settings: {
      snmpTimeout: 5,
      snmpRetries: 3,
      snmpVersion: '2c',
      testConcurrency: 3,
      enableAI: false,
      alertThresholds: {
        lowThroughput: 10,
        lowSNR: 15,
        highLatency: 100
      },
      cnMaestroSettings: {
        apiUrl: '',
        clientId: '',
        clientSecret: '',
        refreshInterval: 300
      }
    },
    loading: { links: false, settings: false },
    error: null,
  });

  // Simple actions without causing re-renders
  const actions = {
    fetchLinks: () => {
      setState(prev => ({ ...prev, loading: { ...prev.loading, links: true } }));
      // Simulate API call
      setTimeout(() => {
        setState(prev => ({ 
          ...prev, 
          links: [{ id: 1, name: 'Link 1' }, { id: 2, name: 'Link 2' }], 
          loading: { ...prev.loading, links: false } 
        }));
      }, 1000);
    },
    clearError: () => {
      setState(prev => ({ ...prev, error: null }));
    },
    updateSettings: (path, value) => {
      setState(prev => {
        const newSettings = { ...prev.settings };
        if (path.includes('.')) {
          const keys = path.split('.');
          let current = newSettings;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = value;
        } else {
          newSettings[path] = value;
        }
        return { ...prev, settings: newSettings };
      });
    }
  };

  // Additional context values for backwards compatibility
  const contextValue = {
    state,
    actions,
    // Legacy support
    testHistory: [],
    scheduledTests: [],
    settings: state.settings,
    currentTest: null,
    startTest: () => {},
    stopTest: () => {},
    scheduleTest: () => {},
    updateSettings: actions.updateSettings
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
