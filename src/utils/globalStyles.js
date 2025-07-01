// Comprehensive style utilities for entire application
export const globalStyles = {
  // Form elements
  input:
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
  textarea:
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical',
  select:
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white',

  // Buttons
  button:
    'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
  buttonSecondary:
    'px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors',
  buttonDanger:
    'px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors',

  // Layout
  card: 'bg-white rounded-lg shadow-md p-6 border border-gray-200',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8',

  // Typography
  heading: 'text-2xl font-bold text-gray-900 mb-4',
  subheading: 'text-lg font-semibold text-gray-700 mb-2',
  label: 'block text-sm font-medium text-gray-700 mb-2',
  text: 'text-gray-600',

  // Status indicators
  success: 'text-green-600 bg-green-100 px-2 py-1 rounded',
  warning: 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded',
  error: 'text-red-600 bg-red-100 px-2 py-1 rounded',
  info: 'text-blue-600 bg-blue-100 px-2 py-1 rounded',
};

export const animations = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
};
