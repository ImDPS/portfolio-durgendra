'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '@/utils/animations';
import { useReducedMotion } from '@/utils/use-reduced-motion';

interface MotionSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const MotionSection = ({ 
  children, 
  delay = 0,
  className = '' 
}: MotionSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 }
      }
    : {
        initial: containerVariants.initial,
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2 + delay,
          }
        }
      };

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.25 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection; 