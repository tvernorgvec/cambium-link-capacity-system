import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    testResults: [],
    currentTest: null,
    isTestRunning: false,
    settings: {
      testDuration: 60,
      testInterval: 5,
      maxRetries: 3,
      timeout: 30,
      serverUrl: 'https://speedtest.gvec.coop',
      enableNotifications: true,
      autoSave: true,
    },
    theme: 'light',
    user: {
      name: 'User',
      preferences: {},
    },
  });

  // Load data from localStorage only once on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('gvec-app-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setState(prevState => ({ ...prevState, ...parsedData }));
      }
    } catch (error) {
      // Console statement removed by auto-fix
    }
  }, []); // Empty dependency array - runs only on mount

  // Save to localStorage when state changes (with debounce)
  useEffect(() => {
    // Skip saving on initial render
    const isInitialRender =
      state.testResults.length === 0 &&
      state.currentTest === null &&
      !state.isTestRunning;

    if (isInitialRender) {
      return;
    }

    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem('gvec-app-data', JSON.stringify(state));
      } catch (error) {
        // Console statement removed by auto-fix
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state]); // Only depend on state

  const updateState = useCallback(updates => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  const addTestResult = useCallback(result => {
    setState(prevState => ({
      ...prevState,
      testResults: [...prevState.testResults, { ...result, id: Date.now() }],
    }));
  }, []);

  const clearTestResults = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      testResults: [],
    }));
  }, []);

  const updateSettings = useCallback(newSettings => {
    setState(prevState => ({
      ...prevState,
      settings: { ...prevState.settings, ...newSettings },
    }));
  }, []);

  const setCurrentTest = useCallback(test => {
    setState(prevState => ({
      ...prevState,
      currentTest: test,
    }));
  }, []);

  const setTestRunning = useCallback(isRunning => {
    setState(prevState => ({
      ...prevState,
      isTestRunning: isRunning,
    }));
  }, []);

  const contextValue = {
    ...state,
    updateState,
    addTestResult,
    clearTestResults,
    updateSettings,
    setCurrentTest,
    setTestRunning,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
