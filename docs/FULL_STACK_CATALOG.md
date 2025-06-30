
# FULL STACK CATALOG

Generated: $(date)

## PROJECT STRUCTURE ANALYSIS

### Root Configuration Files

#### package.json
- **Type**: Node.js Project Configuration
- **Dependencies**: 10 production dependencies including React 18.2.0, Tailwind CSS, Framer Motion
- **Dev Dependencies**: 23 development tools for quality assurance
- **Scripts**: 19 npm scripts for development, building, quality checks
- **Key Features**: ESM modules, comprehensive quality toolchain

#### .replit
- **Type**: Replit Configuration
- **Modules**: nodejs-20, web
- **Run Command**: npm run dev
- **Workflows**: 4 defined workflows (Development Server, Quality Check, Full Quality Suite, Auto Quality Fix & Check)
- **Ports**: 5 port configurations (5000-5004 mapped to 80, 3000-3003)

#### vite.config.js
- **Type**: Vite Build Configuration
- **Server**: Port 5000, host 0.0.0.0
- **Base**: /linktest/
- **Build**: dist directory
- **Plugins**: React plugin

### Source Code Architecture

#### src/main.jsx
- **Type**: Application Entry Point
- **Imports**: React, ReactDOM, App component, CSS
- **Function**: Renders App wrapped in StrictMode to #root

#### src/App.jsx
- **Type**: Root Application Component
- **Routes Defined**:
  - `/linktest/` → Dashboard
  - `/linktest/dashboard` → Dashboard
  - `/linktest/scheduler` → Scheduler
  - `/linktest/history` → History
  - `/linktest/settings` → Settings
- **Wrapper**: AppProvider context, ErrorBoundary, Router
- **Dependencies**: BrowserRouter, Routes, Route, motion components

#### src/context/AppContext.jsx
- **Type**: React Context Provider
- **State Management**: useReducer pattern
- **Initial State**:
  ```javascript
  {
    data: {
      linkCapacity: [],
      testResults: [],
      scheduledTests: [],
      settings: {
        autoRefresh: true,
        refreshInterval: 30000,
        alertThreshold: 80,
        darkMode: false
      }
    },
    loading: false,
    error: null
  }
  ```
- **Actions**: SET_LOADING, SET_ERROR, SET_LINK_CAPACITY, SET_TEST_RESULTS, SET_SCHEDULED_TESTS, UPDATE_SETTINGS
- **Side Effects**: Auto-refresh with intervals, initial data loading
- **API Integration**: Calls api.getLinkCapacity(), api.getTestResults(), api.getScheduledTests()

### Component Architecture

#### src/components/Layout.jsx
- **Type**: Layout Component
- **Navigation**: Sidebar with 4 main routes
- **Features**: Responsive design, mobile menu, animations
- **Dependencies**: React Router (useLocation, Link), Framer Motion, Lucide icons
- **Props**: children

#### src/components/Dashboard.jsx
- **Type**: Main Dashboard View
- **Features**: Real-time capacity monitoring, status cards, recent tests table
- **Data Sources**: linkCapacity, testResults from context
- **Components Used**: Card, StatusBadge, LoadingSpinner
- **Animations**: Framer Motion variants

#### src/components/Scheduler.jsx
- **Type**: Test Scheduling Interface
- **Features**: Schedule new tests, view scheduled tests, delete tests
- **Form Fields**: URL, test type, frequency, notifications
- **State**: Local form state, scheduled tests from context
- **API Calls**: scheduleTest, deleteScheduledTest

#### src/components/History.jsx
- **Type**: Test History View
- **Features**: Filterable test results, pagination, detailed view
- **Filters**: Date range, test type, status
- **Components Used**: DataTable, StatusBadge, Button
- **Data Processing**: Sorts and filters test results

#### src/components/Settings.jsx
- **Type**: Application Settings
- **Settings Categories**:
  - General: Auto-refresh, refresh interval
  - Alerts: Threshold configuration
  - Appearance: Dark mode
  - Notifications: Email settings
- **Form Handling**: Local state with context updates

#### src/components/DataTable.jsx
- **Type**: Reusable Data Table
- **Features**: Sortable columns, pagination, row selection
- **Props**: data, columns, onRowClick, className
- **State**: sorting, pagination, selection

#### src/components/ErrorBoundary.jsx
- **Type**: React Error Boundary
- **Features**: Catches JavaScript errors, fallback UI
- **State**: hasError, error details
- **Methods**: componentDidCatch, getDerivedStateFromError

#### Utility Components:
- **Button.jsx**: Reusable button with variants
- **Card.jsx**: Container component with styling
- **LoadingSpinner.jsx**: Loading indicator
- **StatusBadge.jsx**: Status display component

### Services Layer

#### src/services/api.js
- **Type**: API Service Layer
- **Base Configuration**: 
  - Base URL: http://localhost:3001/api
  - Timeout: 10000ms
  - JSON content type
- **Endpoints**:
  - `GET /link-capacity` → getLinkCapacity()
  - `GET /test-results` → getTestResults()
  - `GET /scheduled-tests` → getScheduledTests()
  - `POST /scheduled-tests` → scheduleTest(testData)
  - `DELETE /scheduled-tests/:id` → deleteScheduledTest(id)
  - `PUT /settings` → updateSettings(settings)
- **Error Handling**: Axios interceptors, console logging
- **Mock Data**: Fallback mock responses for development

### Configuration & Types

#### src/config/environment.js
- **Type**: Environment Configuration
- **Variables**: API_BASE_URL, REFRESH_INTERVAL, ALERT_THRESHOLD
- **Environment Detection**: Development vs production settings

#### src/types/index.js
- **Type**: Type Definitions
- **Exports**: Common type constants and validation schemas

#### src/utils/motion.js
- **Type**: Animation Utilities
- **Exports**: Framer Motion animation variants and transitions

### Styling

#### src/index.css
- **Type**: Global Styles
- **Framework**: Tailwind CSS imports
- **Custom**: Base styles, CSS variables

#### src/App.css
- **Type**: Application Styles
- **Custom Components**: Button variants, card styles, responsive utilities

### Quality Assurance Scripts

#### scripts/autonomous-quality.js
- **Type**: Quality Check Orchestrator
- **Checks**: 11 different quality validations
- **Features**: Auto-fix capabilities, reporting, unused import detection
- **Output**: Detailed quality report with pass/fail status

#### scripts/auto-fix.js
- **Type**: Automated Code Fixer
- **Fixes**: Import cleanup, formatting, security issues, React patterns
- **Pattern Detection**: Infinite loops, unused code, console statements

#### scripts/inventory.js
- **Type**: Project Inventory Generator
- **Output**: JSON and Markdown inventory reports
- **Analysis**: File structure, dependencies, git status, technology stack

#### scripts/validate-quality-tools.js
- **Type**: Quality Tool Validator
- **Validation**: Ensures all quality tools are properly installed and configured

## API ROUTES ANALYSIS

### Frontend Routes (React Router)
```
/linktest/
├── / (Dashboard)
├── /dashboard (Dashboard)
├── /scheduler (Scheduler) 
├── /history (History)
└── /settings (Settings)
```

### Backend API Endpoints (Expected by Frontend)
```
http://localhost:3001/api/
├── GET /link-capacity
├── GET /test-results  
├── GET /scheduled-tests
├── POST /scheduled-tests
├── DELETE /scheduled-tests/:id
└── PUT /settings
```

## DATA FLOW ANALYSIS

### State Management Flow
1. **AppContext** provides global state via useReducer
2. **Components** consume state via useContext(AppContext)
3. **API calls** trigger state updates via dispatch actions
4. **Auto-refresh** mechanism updates data periodically

### Component Hierarchy
```
App
├── ErrorBoundary
│   └── AppProvider
│       └── BrowserRouter
│           └── Layout
│               ├── Navigation Sidebar
│               └── Route Components
│                   ├── Dashboard
│                   ├── Scheduler
│                   ├── History
│                   └── Settings
```

## CRITICAL ISSUES IDENTIFIED

### 1. Infinite Loop in AppContext.jsx (Line 100:31)
- **Problem**: useEffect dependency array causing re-renders
- **Impact**: Maximum update depth exceeded warnings
- **Root Cause**: State object reference changes triggering useEffect

### 2. Missing Backend Server
- **Problem**: API calls to localhost:3001 failing
- **Impact**: All data operations failing
- **Status**: Frontend expects REST API that doesn't exist

### 3. Unused Imports
- **Files Affected**: Multiple components have unused imports
- **Impact**: Bundle size, code clarity
- **Auto-fixable**: Yes, via quality scripts

## TECHNOLOGY STACK SUMMARY

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router DOM 6.16.0
- **Styling**: Tailwind CSS 4.1.11
- **Animation**: Framer Motion 10.16.0
- **HTTP Client**: Axios 1.6.0
- **Icons**: Lucide React 0.292.0

### Development Tools
- **Linting**: ESLint 9.29.0
- **Formatting**: Prettier 3.6.1
- **Quality**: 13 different quality assurance tools
- **Type Checking**: TypeScript 5.8.3
- **Git Hooks**: Husky 9.0.11
- **Commit Lint**: Commitlint 19.5.0

### Build & Deployment
- **Platform**: Replit
- **Node**: v20.18.1
- **Package Manager**: npm 10.8.2
- **Environment**: ESM modules
- **Port**: 5000 (mapped to 80/443 in production)

## RECOMMENDATIONS

1. **Fix Infinite Loop**: Restructure AppContext useEffect dependencies
2. **Implement Backend**: Create REST API server to match frontend expectations
3. **Clean Unused Code**: Run auto-fix scripts to remove unused imports
4. **Add Error Boundaries**: Implement proper error handling for API failures
5. **Add Testing**: No test files detected, need test coverage
6. **Environment Variables**: Use .env for configuration instead of hardcoded values

---
*Complete codebase analysis generated automatically*
