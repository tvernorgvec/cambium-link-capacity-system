import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService } from '../services/api';

const AppContext = createContext();

const initialState = {
  loading: false,
  error: null,
  linkCapacity: [],
  accessPoints: [],
  subscriberModules: [],
  testResults: [],
  activeTests: [],
  settings: {
    snmpTimeout: 5,
    snmpRetries: 2,
    snmpCommunity: 'public',
    testDuration: 10,
    autoRefresh: true,
    refreshInterval: 30,
  },
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LINK_CAPACITY':
      return { ...state, linkCapacity: action.payload, loading: false };
    case 'SET_ACCESS_POINTS':
      return { ...state, accessPoints: action.payload };
    case 'SET_SUBSCRIBER_MODULES':
      return { ...state, subscriberModules: action.payload };
    case 'SET_TEST_RESULTS':
      return { ...state, testResults: action.payload };
    case 'SET_ACTIVE_TESTS':
      return { ...state, activeTests: action.payload };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'ADD_TEST_RESULT':
      return {
        ...state,
        testResults: [action.payload, ...state.testResults].slice(0, 1000),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setLoading: loading => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: error => dispatch({ type: 'SET_ERROR', payload: error }),

    async fetchLinkCapacity() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await apiService.getLinkCapacity();
        dispatch({ type: 'SET_LINK_CAPACITY', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    },

    async fetchAccessPoints(filters = {}) {
      try {
        const data = await apiService.getAccessPoints(filters);
        dispatch({ type: 'SET_ACCESS_POINTS', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    },

    async fetchSubscriberModules(apMac = null) {
      try {
        const data = await apiService.getSubscriberModules(apMac);
        dispatch({ type: 'SET_SUBSCRIBER_MODULES', payload: data });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    },

    async fetchTestResults(limit = 100, offset = 0) {
      try {
        const data = await apiService.getTestResults(limit, offset);
        dispatch({ type: 'SET_TEST_RESULTS', payload: data.results });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    },

    async runLinkTest(testConfig) {
      try {
        const result = await apiService.runLinkTest(testConfig);
        return result;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        throw error;
      }
    },

    updateSettings: settings => {
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
    },
  };

  // Auto-refresh data
  useEffect(() => {
    if (state.settings.autoRefresh) {
      const interval = setInterval(() => {
        actions.fetchLinkCapacity();
      }, state.settings.refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [state.settings.autoRefresh, state.settings.refreshInterval]);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
