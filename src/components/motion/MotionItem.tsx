'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/animations';
import { useReducedMotion } from '@/utils/use-reduced-motion';

interface MotionItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const MotionItem = ({ 
  children, 
  className = '',
  delay = 0 
}: MotionItemProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 }
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring", 
            stiffness: 50, 
            damping: 15,
            delay: delay
          }
        }
      };

  return (
    <motion.div
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem; 