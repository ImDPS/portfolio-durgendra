'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/utils/use-reduced-motion';

type MotionButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} & HTMLMotionProps<'button'>;

const MotionButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: MotionButtonProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-primary/50 dark:border-gray-600 dark:hover:bg-gray-800'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const motionVariants = prefersReducedMotion
    ? {
        initial: { scale: 1 },
        hover: { scale: 1 },
        tap: { scale: 1 }
      }
    : {
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      };
  
  return (
    <motion.button
      className={buttonStyles}
      whileHover={!props.disabled ? "hover" : undefined}
      whileTap={!props.disabled ? "tap" : undefined}
      variants={motionVariants}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton; 