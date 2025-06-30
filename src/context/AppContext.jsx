import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { linkCapacityApi } from '../services/api';

// Initial state
const initialState = {
  links: [],
  selectedLink: null,
  capacityData: {},
  testHistory: [],
  settings: {},
  user: null,
  loading: {
    links: false,
    capacity: false,
    tests: false,
    settings: false,
  },
  error: null,
};

// Action types
export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_LINKS: 'SET_LINKS',
  SET_SELECTED_LINK: 'SET_SELECTED_LINK',
  SET_CAPACITY_DATA: 'SET_CAPACITY_DATA',
  SET_TEST_HISTORY: 'SET_TEST_HISTORY',
  SET_SETTINGS: 'SET_SETTINGS',
  SET_USER: 'SET_USER',
  ADD_LINK: 'ADD_LINK',
  UPDATE_LINK: 'UPDATE_LINK',
  DELETE_LINK: 'DELETE_LINK',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };

    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    case actionTypes.SET_LINKS:
      return { ...state, links: action.payload };

    case actionTypes.SET_SELECTED_LINK:
      return { ...state, selectedLink: action.payload };

    case actionTypes.SET_CAPACITY_DATA:
      return {
        ...state,
        capacityData: {
          ...state.capacityData,
          [action.payload.linkId]: action.payload.data,
        },
      };

    case actionTypes.SET_TEST_HISTORY:
      return { ...state, testHistory: action.payload };

    case actionTypes.SET_SETTINGS:
      return { ...state, settings: action.payload };

    case actionTypes.SET_USER:
      return { ...state, user: action.payload };

    case actionTypes.ADD_LINK:
      return { ...state, links: [...state.links, action.payload] };

    case actionTypes.UPDATE_LINK:
      return {
        ...state,
        links: state.links.map(link =>
          link.id === action.payload.id ? action.payload : link
        ),
      };

    case actionTypes.DELETE_LINK:
      return {
        ...state,
        links: state.links.filter(link => link.id !== action.payload),
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = useMemo(
    () => ({
      setLoading: (key, value) =>
        dispatch({ type: actionTypes.SET_LOADING, payload: { key, value } }),

      setError: error =>
        dispatch({ type: actionTypes.SET_ERROR, payload: error }),

      clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR }),

      fetchLinks: useCallback(async () => {
        try {
          actions.setLoading('links', true);
          const response = await linkCapacityApi.getLinks();
          dispatch({ type: actionTypes.SET_LINKS, payload: response.data });
        } catch (error) {
          actions.setError(error.message);
        } finally {
          actions.setLoading('links', false);
        }
      }, [actions]),

      selectLink: link =>
        dispatch({ type: actionTypes.SET_SELECTED_LINK, payload: link }),

      fetchCapacityData: async (linkId, timeRange) => {
        try {
          actions.setLoading('capacity', true);
          const response = await linkCapacityApi.getCapacityData(
            linkId,
            timeRange
          );
          dispatch({
            type: actionTypes.SET_CAPACITY_DATA,
            payload: { linkId, data: response.data },
          });
        } catch (error) {
          actions.setError(error.message);
        } finally {
          actions.setLoading('capacity', false);
        }
      },

      fetchTestHistory: async params => {
        try {
          actions.setLoading('tests', true);
          const response = await linkCapacityApi.getTestHistory(params);
          dispatch({
            type: actionTypes.SET_TEST_HISTORY,
            payload: response.data,
          });
        } catch (error) {
          actions.setError(error.message);
        } finally {
          actions.setLoading('tests', false);
        }
      },

      fetchSettings: useCallback(async () => {
        try {
          actions.setLoading('settings', true);
          const response = await linkCapacityApi.getSettings();
          dispatch({ type: actionTypes.SET_SETTINGS, payload: response.data });
        } catch (error) {
          actions.setError(error.message);
        } finally {
          actions.setLoading('settings', false);
        }
      }, [actions]),
    }),
    [dispatch]
  );

  // Load initial data
  useEffect(() => {
    actions.fetchLinks();
    actions.fetchSettings();
  }, [actions.fetchLinks, actions.fetchSettings]);

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
