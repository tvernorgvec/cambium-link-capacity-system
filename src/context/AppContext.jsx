import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  settings: {
    theme: 'light',
    notifications: true,
    language: 'en',
  },
  data: {
    linkCapacity: [],
    history: [],
    scheduledTasks: [],
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
      };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'SET_LINK_CAPACITY':
      return {
        ...state,
        data: { ...state.data, linkCapacity: action.payload },
      };
    case 'SET_HISTORY':
      return { ...state, data: { ...state.data, history: action.payload } };
    case 'SET_SCHEDULED_TASKS':
      return {
        ...state,
        data: { ...state.data, scheduledTasks: action.payload },
      };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data only once on mount
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      if (!isMounted) return;

      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        // Mock data
        const mockLinkCapacity = [
          { id: 1, name: 'Link A', capacity: 80, status: 'active' },
          { id: 2, name: 'Link B', capacity: 65, status: 'warning' },
          { id: 3, name: 'Link C', capacity: 45, status: 'normal' },
        ];

        const mockHistory = [
          {
            id: 1,
            action: 'Link capacity updated',
            timestamp: new Date().toISOString(),
          },
          {
            id: 2,
            action: 'Scheduled task completed',
            timestamp: new Date().toISOString(),
          },
        ];

        const mockScheduledTasks = [
          {
            id: 1,
            name: 'Daily Report',
            schedule: '0 9 * * *',
            status: 'active',
          },
          {
            id: 2,
            name: 'Weekly Backup',
            schedule: '0 0 * * 0',
            status: 'inactive',
          },
        ];

        if (isMounted) {
          dispatch({ type: 'SET_LINK_CAPACITY', payload: mockLinkCapacity });
          dispatch({ type: 'SET_HISTORY', payload: mockHistory });
          dispatch({
            type: 'SET_SCHEDULED_TASKS',
            payload: mockScheduledTasks,
          });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    ...state,
    dispatch,
    // Action creators
    setLoading: loading => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: error => dispatch({ type: 'SET_ERROR', payload: error }),
    setUser: user => dispatch({ type: 'SET_USER', payload: user }),
    updateSettings: settings =>
      dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    logout: () => dispatch({ type: 'LOGOUT' }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
