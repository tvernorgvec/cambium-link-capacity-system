// Comprehensive constants for entire application
export const API_ENDPOINTS = {
  BASE_URL:
    process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000',
  LINK_CAPACITY: '/link-capacity',
  HISTORY: '/history',
  SCHEDULER: '/scheduler',
  SETTINGS: '/settings',
};

export const STATUS_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  LOADING: 'loading',
};

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^s@]+@[^s@]+.[^s@]+$/,
  PHONE_REGEX: /^(d{3}) d{3}-d{4}$/,
  IP_REGEX: /^(d{1,3}.){3}d{1,3}$/,
  MAC_REGEX: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
};

export const DEFAULTS = {
  REFRESH_INTERVAL: 30000,
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  PAGE_SIZE: 20,
};
