
import axios from 'axios';
import { config } from '../config/environment';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/linktest/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (config.debug) {
      console.log('API Request:', config);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Network error';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

export const apiService = {
  // Health check
  async healthCheck() {
    return api.get('/healthz');
  },

  // Link capacity endpoints
  async getLinkCapacity() {
    return api.get('/link-capacity');
  },

  // Device endpoints
  async getAccessPoints(filters = {}) {
    return api.get('/access-points', { params: filters });
  },

  async getSubscriberModules(apMac = null) {
    const params = apMac ? { ap_mac: apMac } : {};
    return api.get('/subscriber-modules', { params });
  },

  async getNetworkTopology() {
    return api.get('/network-topology');
  },

  // Test management
  async runLinkTest(testConfig) {
    return api.post('/run-test', testConfig);
  },

  async getTestStatus(testId) {
    return api.get(`/test-status/${testId}`);
  },

  async getActiveTests() {
    return api.get('/active-tests');
  },

  async cancelTest(testId) {
    return api.delete(`/test/${testId}`);
  },

  async getTestResults(limit = 100, offset = 0) {
    return api.get('/test-results', { 
      params: { limit, offset } 
    });
  },

  // Discovery
  async discoverAccessPoints(ipList, community = 'public') {
    return api.post('/discover-aps', {
      ip_list: ipList,
      community: community
    });
  },

  // Scheduled tests
  async getScheduledTests() {
    return api.get('/scheduled-tests');
  },

  async scheduleTest(testData) {
    return api.post('/scheduled-tests', testData);
  },

  async deleteScheduledTest(testId) {
    return api.delete(`/scheduled-tests/${testId}`);
  },

  // Settings
  async updateSettings(settings) {
    return api.put('/settings', settings);
  }
};

export default api;
