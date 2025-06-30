import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses =
    'bg-white rounded-lg shadow-sm border border-gray-200 p-6';
  const hoverClasses = hover
    ? 'hover:shadow-md transition-shadow cursor-pointer'
    : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
