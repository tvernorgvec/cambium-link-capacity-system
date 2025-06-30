import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from 'react';
import { api } from '../services/api';

const AppContext = createContext();

const initialState = {
  loading: false,
  error: null,
  data: {
    linkCapacity: [],
    testResults: [],
    scheduledTests: [],
    settings: {
      refreshInterval: 30000,
      autoRefresh: true,
      theme: 'light',
    },
  },
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LINK_CAPACITY':
      return {
        ...state,
        data: { ...state.data, linkCapacity: action.payload },
        loading: false,
        error: null,
      };
    case 'SET_TEST_RESULTS':
      return {
        ...state,
        data: { ...state.data, testResults: action.payload },
        loading: false,
        error: null,
      };
    case 'SET_SCHEDULED_TESTS':
      return {
        ...state,
        data: { ...state.data, scheduledTests: action.payload },
        loading: false,
        error: null,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        data: {
          ...state.data,
          settings: { ...state.data.settings, ...action.payload },
        },
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const intervalRef = useRef(null);

  const loadInitialData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const [linkCapacity, testResults, scheduledTests] = await Promise.all([
        api.getLinkCapacity(),
        api.getTestResults(),
        api.getScheduledTests(),
      ]);

      dispatch({ type: 'SET_LINK_CAPACITY', payload: linkCapacity });
      dispatch({ type: 'SET_TEST_RESULTS', payload: testResults });
      dispatch({ type: 'SET_SCHEDULED_TESTS', payload: scheduledTests });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Load initial data only once
  useEffect(() => {
    loadInitialData();
  }, []);

  // Handle auto-refresh with proper cleanup
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only set up auto-refresh if enabled
    if (state.data.settings.autoRefresh) {
      intervalRef.current = setInterval(async () => {
        try {
          const [linkCapacity, testResults, scheduledTests] = await Promise.all(
            [
              api.getLinkCapacity(),
              api.getTestResults(),
              api.getScheduledTests(),
            ]
          );

          dispatch({ type: 'SET_LINK_CAPACITY', payload: linkCapacity });
          dispatch({ type: 'SET_TEST_RESULTS', payload: testResults });
          dispatch({ type: 'SET_SCHEDULED_TESTS', payload: scheduledTests });
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      }, state.data.settings.refreshInterval);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.data.settings.autoRefresh, state.data.settings.refreshInterval]);

  const value = {
    state,
    dispatch,
    actions: {
      refreshData: loadInitialData,
      updateSettings: settings =>
        dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
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
