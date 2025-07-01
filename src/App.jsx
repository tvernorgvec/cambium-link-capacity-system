
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import History from './components/History';
import Settings from './components/Settings';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router basename="/linktest">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
