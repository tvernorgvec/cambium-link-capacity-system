import { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
    isLoading: false,
    user: null,
    theme: 'light',
    notifications: [],
    settings: {
      autoRefresh: true,
      refreshInterval: 30000,
      notifications: true,
      theme: 'light'
    }
  });

  const updateState = useCallback((newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  }, []);

  // Load settings from localStorage - only run once on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setState(prevState => ({
          ...prevState,
          settings: { ...prevState.settings, ...parsedSettings }
        }));
      } catch (error) {
        // Console statement removed by auto-fix
      }
    }
  }, []); // Empty dependency array - only run once

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(state.settings));
  }, [state.settings]);

  const value = {
    ...state,
    updateState,
    setLoading: useCallback((isLoading) => updateState({ isLoading }), [updateState]),
    setUser: useCallback((user) => updateState({ user }), [updateState]),
    setTheme: useCallback((theme) => updateState({ theme }), [updateState]),
    addNotification: useCallback((notification) => {
      const newNotification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...notification
      };
      setState(prevState => ({
        ...prevState,
        notifications: [...prevState.notifications, newNotification]
      }));
    }, []),
    removeNotification: useCallback((id) => {
      setState(prevState => ({
        ...prevState,
        notifications: prevState.notifications.filter(n => n.id !== id)
      }));
    }, []),
    updateSettings: useCallback((newSettings) => {
      setState(prevState => ({
        ...prevState,
        settings: { ...prevState.settings, ...newSettings }
      }));
    }, [])
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};