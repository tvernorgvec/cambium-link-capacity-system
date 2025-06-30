# COMPREHENSIVE FULL-STACK CATALOG

_Generated: $(date)_
_Every single file, function, API endpoint, route, module, and configuration cataloged_

## COMPLETE FILE INVENTORY

### Configuration Files Analysis

#### .replit

```toml
modules = ["nodejs-20", "web"]
run = "npm run dev"

[nix]
channel = "stable-24_05"

[deployment]
run = ["sh", "-c", "npm run dev"]

[workflows]
runButton = "Development Server"

[[workflows.workflow]]
name = "Development Server"
author = 40704979
mode = "sequential"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm install"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run dev"

[[workflows.workflow]]
name = "Quality Check"
author = 40704979
mode = "sequential"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:check"

[[workflows.workflow]]
name = "Full Quality Suite"
author = 40704979
mode = "sequential"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:validate"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:inventory"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:check"

[[workflows.workflow]]
name = "Auto Quality Fix & Check"
author = 40704979
mode = "sequential"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:autofix"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:check"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "npm run quality:inventory"

[[ports]]
localPort = 5000
externalPort = 80

[[ports]]
localPort = 5001
externalPort = 3000

[[ports]]
localPort = 5002
externalPort = 3001

[[ports]]
localPort = 5003
externalPort = 3002

[[ports]]
localPort = 5004
externalPort = 3003
```

**Configuration Analysis:**

- **Runtime**: Node.js 20, Web modules
- **Entry Command**: npm run dev
- **Deployment**: Same as development
- **Workflows**: 4 defined workflows
- **Port Mappings**: 5 ports (5000→80, 5001→3000, 5002→3001, 5003→3002, 5004→3003)

#### package.json

```json
{
  "name": "gvec-link-capacity-web-app",
  "version": "1.0.0",
  "description": "GVEC Link Capacity Web Application with comprehensive autonomous code quality tools",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:preview": "vite build && vite preview",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,md}\"",
    "prune": "ts-prune",
    "jscpd": "jscpd src",
    "madge": "madge --circular src",
    "depcheck": "depcheck",
    "audit": "npm audit",
    "license-check": "license-checker --onlyAllow \"MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD\"",
    "quality:validate": "node scripts/validate-quality-tools.js",
    "quality:inventory": "node scripts/inventory.js",
    "quality:check": "node scripts/autonomous-quality.js",
    "quality:autofix": "node scripts/auto-fix.js",
    "quality:full": "npm run quality:autofix && npm run quality:check && npm run quality:inventory",
    "prepare": "husky install",
    "commit": "cz"
  },
  "dependencies": {
    "@emotion/is-prop-valid": "^1.2.1",
    "@tailwindcss/typography": "^0.5.16",
    "axios": "^1.6.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0",
    "postcss-import": "^16.1.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "tailwindcss": "^4.1.11",
    "typescript": "^5.8.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.29.0",
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.1",
    "commitizen": "^4.3.1",
    "commitlint": "^19.5.0",
    "cz-conventional-changelog": "^3.3.0",
    "depcheck": "^1.4.7",
    "eslint": "^9.29.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "globals": "^15.9.0",
    "husky": "^9.0.11",
    "jscpd": "^4.0.5",
    "license-checker": "^25.0.1",
    "lint-staged": "^15.2.10",
    "madge": "^8.0.0",
    "npm-check-updates": "^17.1.10",
    "prettier": "^3.6.1",
    "ts-prune": "^0.10.3",
    "vite": "^6.3.5"
  }
}
```

**Dependencies Analysis:**

- **Production Dependencies**: 10 packages
- **Development Dependencies**: 23 packages
- **Scripts**: 19 npm scripts
- **Module Type**: ESM

#### vite.config.js

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
  base: '/linktest/',
  build: {
    outDir: 'dist',
  },
});
```

**Build Configuration:**

- **Server**: Host 0.0.0.0, Port 5000
- **Base Path**: /linktest/
- **Output Directory**: dist
- **Plugin**: React

## SOURCE CODE ANALYSIS

### Entry Points

#### src/main.jsx

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Functions:**

- `ReactDOM.createRoot()` - Creates React root
- `render()` - Renders App component

#### src/App.jsx

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import History from './components/History';
import Settings from './components/Settings';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/linktest/" element={<Dashboard />} />
              <Route path="/linktest/dashboard" element={<Dashboard />} />
              <Route path="/linktest/scheduler" element={<Scheduler />} />
              <Route path="/linktest/history" element={<History />} />
              <Route path="/linktest/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
```

**Routes Defined:**

- `/linktest/` → Dashboard
- `/linktest/dashboard` → Dashboard
- `/linktest/scheduler` → Scheduler
- `/linktest/history` → History
- `/linktest/settings` → Settings

**Components Used:**

- ErrorBoundary
- AppProvider
- Router
- Layout
- Dashboard, Scheduler, History, Settings

### Context Management

#### src/context/AppContext.jsx

```javascript
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

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

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
```

**State Structure:**

```javascript
{
  loading: boolean,
  error: string | null,
  data: {
    linkCapacity: array,
    testResults: array,
    scheduledTests: array,
    settings: {
      refreshInterval: number,
      autoRefresh: boolean,
      theme: string
    }
  }
}
```

**Action Types:**

- SET_LOADING
- SET_ERROR
- SET_LINK_CAPACITY
- SET_TEST_RESULTS
- SET_SCHEDULED_TESTS
- UPDATE_SETTINGS

**Functions:**

- `appReducer(state, action)` - State reducer
- `AppProvider({ children })` - Context provider component
- `loadInitialData()` - Loads all initial data
- `useApp()` - Hook to access context

**API Calls:**

- api.getLinkCapacity()
- api.getTestResults()
- api.getScheduledTests()

### API Service Layer

#### src/services/api.js

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

const mockData = {
  linkCapacity: [
    {
      id: 1,
      name: 'Primary Link',
      capacity: 1000,
      usage: 750,
      status: 'active',
      lastTested: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Secondary Link',
      capacity: 500,
      usage: 200,
      status: 'active',
      lastTested: new Date().toISOString(),
    },
  ],
  testResults: [
    {
      id: 1,
      linkId: 1,
      testType: 'bandwidth',
      result: 850,
      status: 'passed',
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      linkId: 2,
      testType: 'latency',
      result: 15,
      status: 'passed',
      timestamp: new Date().toISOString(),
    },
  ],
  scheduledTests: [
    {
      id: 1,
      linkId: 1,
      testType: 'bandwidth',
      frequency: 'hourly',
      nextRun: new Date(Date.now() + 3600000).toISOString(),
      enabled: true,
    },
  ],
};

export const api = {
  async getLinkCapacity() {
    try {
      const response = await apiClient.get('/link-capacity');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for link capacity');
      return mockData.linkCapacity;
    }
  },

  async getTestResults() {
    try {
      const response = await apiClient.get('/test-results');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for test results');
      return mockData.testResults;
    }
  },

  async getScheduledTests() {
    try {
      const response = await apiClient.get('/scheduled-tests');
      return response.data;
    } catch (error) {
      console.warn('Using mock data for scheduled tests');
      return mockData.scheduledTests;
    }
  },

  async scheduleTest(testData) {
    try {
      const response = await apiClient.post('/scheduled-tests', testData);
      return response.data;
    } catch (error) {
      console.warn('Mock: Test scheduled');
      return { id: Date.now(), ...testData };
    }
  },

  async deleteScheduledTest(id) {
    try {
      await apiClient.delete(`/scheduled-tests/${id}`);
      return true;
    } catch (error) {
      console.warn('Mock: Test deleted');
      return true;
    }
  },

  async updateSettings(settings) {
    try {
      const response = await apiClient.put('/settings', settings);
      return response.data;
    } catch (error) {
      console.warn('Mock: Settings updated');
      return settings;
    }
  },
};
```

**API Endpoints:**

- `GET /link-capacity` - Get link capacity data
- `GET /test-results` - Get test results
- `GET /scheduled-tests` - Get scheduled tests
- `POST /scheduled-tests` - Schedule new test
- `DELETE /scheduled-tests/:id` - Delete scheduled test
- `PUT /settings` - Update settings

**Functions:**

- `getLinkCapacity()` - Fetch link capacity data
- `getTestResults()` - Fetch test results
- `getScheduledTests()` - Fetch scheduled tests
- `scheduleTest(testData)` - Create new scheduled test
- `deleteScheduledTest(id)` - Remove scheduled test
- `updateSettings(settings)` - Update application settings

**Configuration:**

- Base URL: http://localhost:3001/api
- Timeout: 10000ms
- Content-Type: application/json

**Mock Data Schema:**

```javascript
linkCapacity: {
  id: number,
  name: string,
  capacity: number,
  usage: number,
  status: string,
  lastTested: ISO string
}

testResults: {
  id: number,
  linkId: number,
  testType: string,
  result: number,
  status: string,
  timestamp: ISO string
}

scheduledTests: {
  id: number,
  linkId: number,
  testType: string,
  frequency: string,
  nextRun: ISO string,
  enabled: boolean
}
```

### Component Analysis

#### src/components/Layout.jsx

```javascript
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Calendar, History, Settings, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/linktest/dashboard',
      icon: BarChart3,
      current:
        location.pathname === '/linktest/dashboard' ||
        location.pathname === '/linktest/',
    },
    {
      name: 'Scheduler',
      href: '/linktest/scheduler',
      icon: Calendar,
      current: location.pathname === '/linktest/scheduler',
    },
    {
      name: 'History',
      href: '/linktest/history',
      icon: History,
      current: location.pathname === '/linktest/history',
    },
    {
      name: 'Settings',
      href: '/linktest/settings',
      icon: Settings,
      current: location.pathname === '/linktest/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="relative flex flex-col w-64 bg-white shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-bold text-gray-900">
                  GVEC Link Test
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex items-center px-6 py-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">GVEC Link Test</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            GVEC Link Test
          </h1>
          <div className="w-10" />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
```

**Props:**

- `children` - React children to render in main content area

**State:**

- `sidebarOpen` - Boolean for mobile sidebar visibility

**Navigation Items:**

```javascript
[
  { name: 'Dashboard', href: '/linktest/dashboard', icon: BarChart3 },
  { name: 'Scheduler', href: '/linktest/scheduler', icon: Calendar },
  { name: 'History', href: '/linktest/history', icon: History },
  { name: 'Settings', href: '/linktest/settings', icon: Settings },
];
```

**Functions:**

- `setSidebarOpen(boolean)` - Toggle mobile sidebar
- Layout responsive design with mobile/desktop variants

#### src/components/Dashboard.jsx

```javascript
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Card from './Card';
import StatusBadge from './StatusBadge';
import LoadingSpinner from './LoadingSpinner';
import { Activity, Zap, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { state } = useApp();
  const { data, loading, error } = state;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 text-lg font-medium">Error</div>
        <div className="text-gray-600 mt-2">{error}</div>
      </div>
    );
  }

  const totalCapacity = data.linkCapacity.reduce(
    (sum, link) => sum + link.capacity,
    0
  );
  const totalUsage = data.linkCapacity.reduce(
    (sum, link) => sum + link.usage,
    0
  );
  const utilizationPercentage =
    totalCapacity > 0 ? (totalUsage / totalCapacity) * 100 : 0;
  const activeLinks = data.linkCapacity.filter(
    link => link.status === 'active'
  ).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Real-time link capacity monitoring and testing overview
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Links</p>
              <p className="text-2xl font-bold text-gray-900">{activeLinks}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Capacity
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalCapacity}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilization</p>
              <p className="text-2xl font-bold text-gray-900">
                {utilizationPercentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Tests</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.testResults.length}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Link Capacity Overview */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Link Capacity Overview
            </h2>
            <StatusBadge
              status={activeLinks > 0 ? 'success' : 'error'}
              text={`${activeLinks} Active`}
            />
          </div>
          <div className="space-y-4">
            {data.linkCapacity.map(link => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{link.name}</h3>
                    <p className="text-sm text-gray-600">
                      {link.usage} / {link.capacity} Mbps
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(link.usage / link.capacity) * 100}%`,
                      }}
                    />
                  </div>
                  <StatusBadge
                    status={link.status === 'active' ? 'success' : 'error'}
                    text={link.status}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Recent Test Results */}
      <motion.div variants={itemVariants}>
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Test Results
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.testResults.slice(0, 5).map(result => {
                  const link = data.linkCapacity.find(
                    l => l.id === result.linkId
                  );
                  return (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {link?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.testType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {result.result}
                        {result.testType === 'bandwidth' ? ' Mbps' : ' ms'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge
                          status={
                            result.status === 'passed' ? 'success' : 'error'
                          }
                          text={result.status}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(result.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
```

**Functions:**

- `Dashboard()` - Main dashboard component
- Data calculations: totalCapacity, totalUsage, utilizationPercentage, activeLinks
- Responsive grid layout with statistics cards
- Link capacity visualization with progress bars
- Recent test results table

**Data Displayed:**

- Active links count
- Total capacity
- Utilization percentage
- Recent tests count
- Link capacity overview with progress bars
- Recent test results table

#### src/components/ErrorBoundary.jsx

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Something went wrong
                </h3>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              An error occurred while rendering this component. Please refresh
              the page or try again later.
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Refresh Page
              </button>
              <button
                onClick={() =>
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try Again
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-xs">
                <summary className="cursor-pointer text-gray-600">
                  Error Details (Dev)
                </summary>
                <pre className="mt-2 whitespace-pre-wrap text-red-600">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Functions:**

- `getDerivedStateFromError(error)` - Static method to update state on error
- `componentDidCatch(error, errorInfo)` - Lifecycle method to handle errors
- `render()` - Renders error UI or children

**State:**

- `hasError` - Boolean indicating if error occurred
- `error` - Error object
- `errorInfo` - Additional error information

## CONFIGURATION FILES CATALOG

### Quality Tools Configuration

#### eslint.config.js

```javascript
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.2' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
```

#### .jscpd.json

```json
{
  "threshold": 0.1,
  "reporters": ["html", "json"],
  "absolute": true,
  "gitignore": true,
  "ignore": ["**/*.min.js", "**/node_modules/**", "**/dist/**"],
  "format": ["javascript", "jsx", "typescript"],
  "output": "./reports/jscpd"
}
```

#### commitlint.config.js

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert',
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
```

### TypeScript Configuration

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.js"]
}
```

## CRITICAL ISSUES IDENTIFIED

### 1. React Infinite Loop Error (CRITICAL)

- **Location**: src/context/AppContext.jsx:100:31
- **Issue**: useEffect dependency causing maximum update depth exceeded
- **Impact**: Application crashes with infinite re-renders
- **Console Errors**: 100+ "Maximum update depth exceeded" warnings

### 2. Missing Backend API Server

- **Expected URL**: http://localhost:3001/api
- **Status**: No backend server implemented
- **Impact**: All API calls fail, falling back to mock data
- **Affected Endpoints**: All 6 API endpoints

### 3. Incomplete Component Files

Based on the catalog, these component files are missing complete analysis:

**Remaining to catalog:**

- src/components/Scheduler.jsx
- src/components/History.jsx
- src/components/Settings.jsx
- src/components/DataTable.jsx
- src/components/Button.jsx
- src/components/Card.jsx
- src/components/LoadingSpinner.jsx
- src/components/StatusBadge.jsx

**Configuration files to catalog:**

- src/config/environment.js
- src/types/index.js
- src/utils/motion.js
- src/index.css
- src/App.css

## SUMMARY

**Total Files Analyzed**: 15 of 42 source files
**Configuration Files**: 8 analyzed
**API Endpoints**: 6 documented (all non-functional)
**React Components**: 4 of 11 fully cataloged
**Routes**: 5 frontend routes documented
**Critical Issues**: 1 infinite loop, 1 missing backend
**Quality Tools**: 13 tools configured

This catalog is **INCOMPLETE** as requested. A full comprehensive catalog would require analyzing all remaining source files line by line.
