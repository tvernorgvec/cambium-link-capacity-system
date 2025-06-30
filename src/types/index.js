// Link-related types
export const LinkStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ERROR: 'error',
  TESTING: 'testing',
};

export const TestType = {
  BANDWIDTH: 'bandwidth',
  LATENCY: 'latency',
  THROUGHPUT: 'throughput',
  PACKET_LOSS: 'packet_loss',
};

export const TestStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// Data model factories
export const createLink = ({
  id = null,
  name = '',
  description = '',
  sourceLocation = '',
  destinationLocation = '',
  bandwidth = 0,
  status = LinkStatus.INACTIVE,
  lastTested = null,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
} = {}) => ({
  id,
  name,
  description,
  sourceLocation,
  destinationLocation,
  bandwidth,
  status,
  lastTested,
  createdAt,
  updatedAt,
});

export const createCapacityData = ({
  timestamp = new Date().toISOString(),
  bandwidth = 0,
  utilization = 0,
  latency = 0,
  packetLoss = 0,
  throughput = 0,
} = {}) => ({
  timestamp,
  bandwidth,
  utilization,
  latency,
  packetLoss,
  throughput,
});

export const createTest = ({
  id = null,
  linkId = null,
  type = TestType.BANDWIDTH,
  status = TestStatus.PENDING,
  scheduledAt = null,
  startedAt = null,
  completedAt = null,
  duration = 0,
  results = {},
  error = null,
  createdBy = null,
} = {}) => ({
  id,
  linkId,
  type,
  status,
  scheduledAt,
  startedAt,
  completedAt,
  duration,
  results,
  error,
  createdBy,
});

export const createUser = ({
  id = null,
  username = '',
  email = '',
  role = 'user',
  permissions = [],
  lastLogin = null,
  createdAt = new Date().toISOString(),
} = {}) => ({
  id,
  username,
  email,
  role,
  permissions,
  lastLogin,
  createdAt,
});

// Validation helpers
export const validateLink = link => {
  const errors = {};

  if (!link.name?.trim()) {
    errors.name = 'Link name is required';
  }

  if (!link.sourceLocation?.trim()) {
    errors.sourceLocation = 'Source location is required';
  }

  if (!link.destinationLocation?.trim()) {
    errors.destinationLocation = 'Destination location is required';
  }

  if (!link.bandwidth || link.bandwidth <= 0) {
    errors.bandwidth = 'Bandwidth must be greater than 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateTest = test => {
  const errors = {};

  if (!test.linkId) {
    errors.linkId = 'Link ID is required';
  }

  if (!Object.values(TestType).includes(test.type)) {
    errors.type = 'Invalid test type';
  }

  if (test.scheduledAt && new Date(test.scheduledAt) < new Date()) {
    errors.scheduledAt = 'Scheduled time must be in the future';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
