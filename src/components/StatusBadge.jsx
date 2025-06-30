import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    success: {
      classes: 'bg-green-100 text-green-800',
      text: 'Success',
    },
    failed: {
      classes: 'bg-red-100 text-red-800',
      text: 'Failed',
    },
    running: {
      classes: 'bg-yellow-100 text-yellow-800',
      text: 'Running',
    },
    queued: {
      classes: 'bg-gray-100 text-gray-800',
      text: 'Queued',
    },
    online: {
      classes: 'bg-green-100 text-green-800',
      text: 'Online',
    },
    offline: {
      classes: 'bg-red-100 text-red-800',
      text: 'Offline',
    },
  };

  const config = statusConfig[status] || statusConfig.queued;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;
