
import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/linktest/login';
    }
    return Promise.reject(error);
  }
);

// Link Capacity API endpoints
export const linkCapacityApi = {
  // Get all links
  getLinks: () => apiClient.get('/links'),
  
  // Get link by ID
  getLink: (id) => apiClient.get(`/links/${id}`),
  
  // Create new link
  createLink: (linkData) => apiClient.post('/links', linkData),
  
  // Update link
  updateLink: (id, linkData) => apiClient.put(`/links/${id}`, linkData),
  
  // Delete link
  deleteLink: (id) => apiClient.delete(`/links/${id}`),
  
  // Get capacity data
  getCapacityData: (linkId, timeRange) => 
    apiClient.get(`/links/${linkId}/capacity?range=${timeRange}`),
  
  // Schedule capacity test
  scheduleTest: (testData) => apiClient.post('/tests/schedule', testData),
  
  // Get test history
  getTestHistory: (params) => apiClient.get('/tests/history', { params }),
  
  // Get system settings
  getSettings: () => apiClient.get('/settings'),
  
  // Update settings
  updateSettings: (settings) => apiClient.put('/settings', settings),
};

export default apiClient;
