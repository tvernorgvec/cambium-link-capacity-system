// Environment configuration
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  },

  app: {
    title: import.meta.env.VITE_APP_TITLE || 'GVEC Link Capacity Web App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },

  features: {
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },

  polling: {
    capacityInterval:
      parseInt(import.meta.env.VITE_CAPACITY_POLL_INTERVAL) || 30000,
    statusInterval:
      parseInt(import.meta.env.VITE_STATUS_POLL_INTERVAL) || 10000,
  },

  chart: {
    maxDataPoints: parseInt(import.meta.env.VITE_MAX_DATA_POINTS) || 100,
    defaultTimeRange: import.meta.env.VITE_DEFAULT_TIME_RANGE || '24h',
  },

  security: {
    jwtExpireTime: parseInt(import.meta.env.VITE_JWT_EXPIRE_TIME) || 3600000,
  },

  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
