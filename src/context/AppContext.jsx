import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import * as api from '../services/api.js';

const AppContext = createContext();

const initialState = {
  data: {
    linkCapacity: [],
    testResults: [],
    scheduledTests: [],
    settings: {
      autoRefresh: true,
      refreshInterval: 30000,
      alertThreshold: 80,
      darkMode: false,
    },
  },
  loading: false,
  error: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_LINK_CAPACITY':
      return {
        ...state,
        data: {
          ...state.data,
          linkCapacity: action.payload,
        },
        loading: false,
      };
    case 'SET_TEST_RESULTS':
      return {
        ...state,
        data: {
          ...state.data,
          testResults: action.payload,
        },
        loading: false,
      };
    case 'SET_SCHEDULED_TESTS':
      return {
        ...state,
        data: {
          ...state.data,
          scheduledTests: action.payload,
        },
        loading: false,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        data: {
          ...state.data,
          settings: {
            ...state.data.settings,
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const intervalRef = useRef(null);

  const loadInitialData = useCallback(async () => {
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
      console.error('Failed to load initial data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  // Load initial data only once on mount
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Handle auto-refresh with proper cleanup
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Extract settings to avoid object reference issues
    const { autoRefresh, refreshInterval } = state.data.settings;

    // Only set up auto-refresh if enabled
    if (autoRefresh) {
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
      }, refreshInterval);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.data.settings]);

  const contextValue = {
    state,
    dispatch,
    actions: {
      setLoading: loading =>
        dispatch({ type: 'SET_LOADING', payload: loading }),
      setError: error => dispatch({ type: 'SET_ERROR', payload: error }),
      setLinkCapacity: data =>
        dispatch({ type: 'SET_LINK_CAPACITY', payload: data }),
      setTestResults: data =>
        dispatch({ type: 'SET_TEST_RESULTS', payload: data }),
      setScheduledTests: data =>
        dispatch({ type: 'SET_SCHEDULED_TESTS', payload: data }),
      updateSettings: settings =>
        dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
      refreshData: loadInitialData,
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
