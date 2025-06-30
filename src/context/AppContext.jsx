import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    tests: [],
    isLoading: false,
    error: null,
    currentView: 'dashboard',
    settings: {
      theme: 'light',
      notifications: true,
      autoRefresh: true,
      refreshInterval: 30000,
    },
    history: [],
    scheduler: {
      schedules: [],
      isRunning: false,
    },
  });

  // Load data from localStorage on mount only
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem('gvec-app-data');
        if (saved) {
          const data = JSON.parse(saved);
          setState(prevState => ({ ...prevState, ...data }));
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    };

    loadFromStorage();
  }, []);

  // Save to localStorage when state changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem('gvec-app-data', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]);

  const updateState = useCallback(updates => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  const setCurrentView = useCallback(view => {
    setState(prevState => ({ ...prevState, currentView: view }));
  }, []);

  const setLoading = useCallback(isLoading => {
    setState(prevState => ({ ...prevState, isLoading }));
  }, []);

  const setError = useCallback(error => {
    setState(prevState => ({ ...prevState, error }));
  }, []);

  const addTest = useCallback(test => {
    setState(prevState => ({
      ...prevState,
      tests: [...prevState.tests, { ...test, id: Date.now() }],
    }));
  }, []);

  const updateTest = useCallback((id, updates) => {
    setState(prevState => ({
      ...prevState,
      tests: prevState.tests.map(test =>
        test.id === id ? { ...test, ...updates } : test
      ),
    }));
  }, []);

  const deleteTest = useCallback(id => {
    setState(prevState => ({
      ...prevState,
      tests: prevState.tests.filter(test => test.id !== id),
    }));
  }, []);

  const addToHistory = useCallback(entry => {
    setState(prevState => ({
      ...prevState,
      history: [
        { ...entry, timestamp: new Date().toISOString() },
        ...prevState.history,
      ],
    }));
  }, []);

  const updateSettings = useCallback(newSettings => {
    setState(prevState => ({
      ...prevState,
      settings: { ...prevState.settings, ...newSettings },
    }));
  }, []);

  const addSchedule = useCallback(schedule => {
    setState(prevState => ({
      ...prevState,
      scheduler: {
        ...prevState.scheduler,
        schedules: [
          ...prevState.scheduler.schedules,
          { ...schedule, id: Date.now() },
        ],
      },
    }));
  }, []);

  const updateSchedule = useCallback((id, updates) => {
    setState(prevState => ({
      ...prevState,
      scheduler: {
        ...prevState.scheduler,
        schedules: prevState.scheduler.schedules.map(schedule =>
          schedule.id === id ? { ...schedule, ...updates } : schedule
        ),
      },
    }));
  }, []);

  const deleteSchedule = useCallback(id => {
    setState(prevState => ({
      ...prevState,
      scheduler: {
        ...prevState.scheduler,
        schedules: prevState.scheduler.schedules.filter(
          schedule => schedule.id !== id
        ),
      },
    }));
  }, []);

  const setSchedulerRunning = useCallback(isRunning => {
    setState(prevState => ({
      ...prevState,
      scheduler: { ...prevState.scheduler, isRunning },
    }));
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      ...state,
      updateState,
      setCurrentView,
      setLoading,
      setError,
      addTest,
      updateTest,
      deleteTest,
      addToHistory,
      updateSettings,
      addSchedule,
      updateSchedule,
      deleteSchedule,
      setSchedulerRunning,
    }),
    [
      state,
      updateState,
      setCurrentView,
      setLoading,
      setError,
      addTest,
      updateTest,
      deleteTest,
      addToHistory,
      updateSettings,
      addSchedule,
      updateSchedule,
      deleteSchedule,
      setSchedulerRunning,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};