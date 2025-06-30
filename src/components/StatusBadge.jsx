const StatusBadge = ({ status, className = '' }) => {
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'online':
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
      case 'offline':
      case 'disconnected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(status)} ${className}`}
    >
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
export { StatusBadge };