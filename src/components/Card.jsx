import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
export { Card };