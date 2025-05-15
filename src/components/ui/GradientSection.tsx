'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientSectionProps {
  children: ReactNode;
  className?: string;
}

const GradientSection = ({
  children,
  className = '',
}: GradientSectionProps) => {
  return (
    <motion.div 
      className={`py-16 px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default GradientSection; 