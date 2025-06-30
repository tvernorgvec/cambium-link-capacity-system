import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, Wifi } from 'lucide-react';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { state, actions } = useApp();
  const { links, loading, error } = state;

  useEffect(() => {
    if (links.length === 0 && !loading.links) {
      actions.fetchLinks();
    }
  }, []);

  if (loading.links) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <div className="ml-3">
            <p className="text-red-800">Error loading data: {error}</p>
            <button
              onClick={() => {
                actions.clearError();
                actions.fetchLinks();
              }}
              className="mt-2 text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Access Points
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {links.length}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Links
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {links.filter(link => link.name).length}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tests Running
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  0
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex items-center p-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Throughput
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  -- Mbps
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <div className="text-center py-8 text-gray-500">
              No recent activity
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
```

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSettings } from '../services/api';

// Create the AppContext
const AppContext = createContext();

// Create a custom hook to access the context
export const useApp = () => {
  return useContext(AppContext);
};

// AppProvider component to wrap the app and provide the context
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    links: [],
    settings: {},
    loading: { links: false, settings: false },
    error: null,
  });

  // Actions to update the state
  const actions = {
    fetchLinks: async () => {
      setState(prevState => ({ ...prevState, loading: { ...prevState.loading, links: true } }));
      try {
        //const data = await fetchLinksFromApi(); // Replace with your actual API call
        //Simulate API
        const data = [{ id: 1, name: 'Link 1' }, { id: 2, name: 'Link 2' }];
        setState(prevState => ({ ...prevState, links: data, loading: { ...prevState.loading, links: false } }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: error.message, loading: { ...prevState.loading, links: false } }));
      }
    },
    fetchSettings: async () => {
      setState(prevState => ({ ...prevState, loading: { ...prevState.loading, settings: true } }));
      try {
        const settings = await fetchSettings();
        setState(prevState => ({ ...prevState, settings: settings, loading: { ...prevState.loading, settings: false } }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: error.message, loading: { ...prevState.loading, settings: false } }));
      }
    },
    clearError: () => {
      setState(prevState => ({ ...prevState, error: null }));
    },
  };

  // Fetch settings on component mount
  useEffect(() => {
    actions.fetchSettings();
  }, []); // Removed actions from dependency array

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};
```

```jsx
import React from 'react';
import { AppProvider } from './context/AppContext';
import App from './App';

function Main() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default Main;
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
```

```jsx
import React from 'react';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
```

```jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Scheduler from './components/Scheduler';
import Settings from './components/Settings';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';
import { useApp } from '../context/AppContext'; // Corrected import
import ErrorBoundary from './components/ErrorBoundary';

const Layout = () => {
  const { state, actions } = useApp(); // Corrected hook usage
  const { loading, error } = state;
  const location = useLocation();

  useEffect(() => {
    document.title = `G-Vec Link Capacity - ${
      location.pathname === '/'
        ? 'Dashboard'
        : location.pathname.slice(1).charAt(0).toUpperCase() +
          location.pathname.slice(2)
    }`;
  }, [location.pathname]);

  if (loading.settings) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-red-400"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.67-.759 1.785-.759 2.455 0l8.25 9.33a1 1 0 00-.212 1.585H17v2a1 1 0 001 1h-2v-2h-3v2h-2v-2H5v2H3a1 1 0 001-1h.212l8.25-9.33zM10 5a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <p className="text-red-800">Error: {error}</p>
            <button
              onClick={() => actions.clearError()}
              className="mt-2 text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      x: -50,
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: 50,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3,
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              G-Vec Link Capacity
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/scheduler"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Scheduler
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ErrorBoundary>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={pageTransition}
                    >
                      <Dashboard />
                    </motion.div>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={pageTransition}
                    >
                      <History />
                    </motion.div>
                  }
                />
                <Route
                  path="/scheduler"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={pageTransition}
                    >
                      <Scheduler />
                    </motion.div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                      transition={pageTransition}
                    >
                      <Settings />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </ErrorBoundary>
        </main>

        <footer className="bg-white shadow mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} G-Vec Link Capacity. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default Layout;
```

```jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const History = () => {
  const { state } = useApp();
  const [filter, setFilter] = useState('all');

  const testData = [
    { id: 1, timestamp: '2024-01-01T12:00:00Z', status: 'completed', results: { throughput: '100Mbps' } },
    { id: 2, timestamp: '2024-01-02T14:30:00Z', status: 'failed', results: { throughput: 'N/A' } },
    { id: 3, timestamp: '2024-01-03T09:15:00Z', status: 'pending', results: { throughput: 'N/A' } },
  ];

  const filteredTests = filter === 'all' ? testData : testData.filter(test => test.status === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Test History</h1>

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by Status:</label>
        <select
          id="filter"
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Throughput</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((test) => (
              <tr key={test.id}>
                <td className="py-2 px-4 border-b">{test.id}</td>
                <td className="py-2 px-4 border-b">{new Date(test.timestamp).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">{test.status}</td>
                <td className="py-2 px-4 border-b">{test.results.throughput}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
```

```jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Scheduler = () => {
  const { state, actions } = useApp();
  const [schedule, setSchedule] = useState({
    time: '08:00',
    days: ['Monday', 'Wednesday', 'Friday'],
  });

  const handleInputChange = (e) => {
    setSchedule({ ...schedule, time: e.target.value });
  };

  const handleDayToggle = (day) => {
    if (schedule.days.includes(day)) {
      setSchedule({ ...schedule, days: schedule.days.filter(d => d !== day) });
    } else {
      setSchedule({ ...schedule, days: [...schedule.days, day] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(schedule));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Scheduler</h1>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
            Time:
          </label>
          <input
            type="time"
            id="time"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={schedule.time}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">Days:</p>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <label key={day} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={schedule.days.includes(day)}
                onChange={() => handleDayToggle(day)}
              />
              <span className="ml-2 text-gray-700">{day}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default Scheduler;
```

```jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { state, actions } = useApp();
  const { settings } = state;

  const [formSettings, setFormSettings] = useState({
    theme: 'light',
    notificationsEnabled: true,
    language: 'en',
  });

  useEffect(() => {
    // Initialize form settings with the values from the context
    if (settings) {
      setFormSettings(settings);
    }
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formSettings));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="theme" className="block text-gray-700 text-sm font-bold mb-2">
            Theme:
          </label>
          <select
            id="theme"
            name="theme"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formSettings.theme || ''}
            onChange={handleInputChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="notificationsEnabled" className="inline-flex items-center">
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={formSettings.notificationsEnabled || false}
              onChange={handleInputChange}
            />
            <span className="ml-2 text-gray-700">Enable Notifications</span>
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
            Language:
          </label>
          <select
            id="language"
            name="language"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formSettings.language || ''}
            onChange={handleInputChange}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
```

```jsx
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'medium' }) => {
  let buttonClasses =
    'font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

  switch (variant) {
    case 'primary':
      buttonClasses +=
        ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      buttonClasses +=
        ' bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500';
      break;
    case 'outline':
      buttonClasses +=
        ' border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500';
      break;
    default:
      buttonClasses += ' bg-blue-500 text-white hover:bg-blue-700';
  }

  switch (size) {
    case 'small':
      buttonClasses += ' px-2.5 py-1.5 text-xs';
      break;
    case 'medium':
      buttonClasses += ' px-4 py-2 text-sm';
      break;
    case 'large':
      buttonClasses += ' px-6 py-3 text-base';
      break;
    default:
      buttonClasses += ' px-4 py-2 text-sm';
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
```

```jsx
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
```

```jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
```

```jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  let badgeClasses = 'px-2 py-1 rounded-full text-xs font-semibold';

  switch (status) {
    case 'active':
      badgeClasses += ' bg-green-100 text-green-800';
      break;
    case 'inactive':
      badgeClasses += ' bg-red-100 text-red-800';
      break;
    case 'pending':
      badgeClasses += ' bg-yellow-100 text-yellow-800';
      break;
    case 'completed':
      badgeClasses += ' bg-blue-100 text-blue-800';
      break;
    default:
      badgeClasses += ' bg-gray-100 text-gray-800';
  }

  return <span className={badgeClasses}>{status}</span>;
};

export default StatusBadge;
```

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Something went wrong!</strong>
          <span className="block sm:inline"> Please try again later.</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

```javascript
export const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
```

```javascript
export const fetchSettings = async () => {
    // Simulate fetching settings from an API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          theme: 'light',
          notificationsEnabled: true,
          language: 'en',
        });
      }, 500);
    });
  };
```

```javascript
// types/index.js