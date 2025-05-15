'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '@/utils/animations';
import { useReducedMotion } from '@/utils/use-reduced-motion';

interface MotionPageProps {
  children: ReactNode;
  className?: string;
}

const MotionPage = ({ children, className = '' }: MotionPageProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
      }
    : pageVariants;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={`min-h-[calc(100vh-4rem)] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MotionPage; 