import axios from 'axios';

// Base API configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/linktest/login';
    }
    return Promise.reject(error);
  }
);

// API functions with fallback mock data
export const getLinkCapacity = async () => {
  try {
    const response = await apiClient.get('/link-capacity');
    return response.data;
  } catch (error) {
    console.warn('API call failed, returning mock data:', error.message);
    return [
      {
        id: "1",
        ap_mac: "00:04:56:AA:BB:CC",
        sm_mac: "00:04:56:11:22:33",
        name: "WestHill-AP1-SM1",
        model: "450v",
        tower_name: "WestHill",
        ip_address: "10.67.1.100",
        status: "active",
        uplink_mbps: 63.4,
        downlink_mbps: 128.2,
        snr_dl: 26.1,
        snr_ul: 24.8,
        last_test: "2024-01-15T10:30:00Z"
      }
    ];
  }
};

export const getTestResults = async () => {
  try {
    const response = await apiClient.get('/test-results');
    return response.data;
  } catch (error) {
    console.warn('API call failed, returning mock data:', error.message);
    return [];
  }
};

export const getScheduledTests = async () => {
  try {
    const response = await apiClient.get('/scheduled-tests');
    return response.data;
  } catch (error) {
    console.warn('API call failed, returning mock data:', error.message);
    return [];
  }
};

export const scheduleTest = async (testData) => {
  try {
    const response = await apiClient.post('/scheduled-tests', testData);
    return response.data;
  } catch (error) {
    console.warn('API call failed:', error.message);
    throw error;
  }
};

export const deleteScheduledTest = async (testId) => {
  try {
    const response = await apiClient.delete(`/scheduled-tests/${testId}`);
    return response.data;
  } catch (error) {
    console.warn('API call failed:', error.message);
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await apiClient.put('/settings', settings);
    return response.data;
  } catch (error) {
    console.warn('API call failed:', error.message);
    throw error;
  }
};

export default apiClient;
