import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  devices: [],
  tests: [],
  settings: {
    autoRefresh: true,
    refreshInterval: 30000,
    enableNotifications: true,
  },
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_DEVICES':
      return { ...state, devices: action.payload };
    case 'SET_TESTS':
      return { ...state, tests: action.payload };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'ADD_TEST':
      return { ...state, tests: [...state.tests, action.payload] };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load initial data
    const loadInitialData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // This would typically make API calls
        // For now, just simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadInitialData();
  }, []);

  const value = {
    ...state,
    dispatch,
    actions: {
      setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
      setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
      setDevices: (devices) => dispatch({ type: 'SET_DEVICES', payload: devices }),
      setTests: (tests) => dispatch({ type: 'SET_TESTS', payload: tests }),
      updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
      addTest: (test) => dispatch({ type: 'ADD_TEST', payload: test }),
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Export alias for useAppContext
export const useAppContext = useApp;

export default AppContext;