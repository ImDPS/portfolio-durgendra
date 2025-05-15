'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  // Size mapping
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  // Color mapping
  const colorMap = {
    primary: 'text-primary',
    white: 'text-white',
    gray: 'text-gray-500'
  };
  
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <motion.div
        className={`${sizeMap[size]} ${colorMap[color]}`}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="animate-spin"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </motion.div>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 