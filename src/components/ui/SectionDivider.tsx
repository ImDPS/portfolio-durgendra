import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
  gradient?: boolean;
}

const lineVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 90,
    transition: {
      duration: 0.3,
    },
  },
};

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  className = '',
  gradient = true 
}) => {
  return (
    <div className={`relative w-full my-16 md:my-24 ${className}`}>
      <motion.div 
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {gradient ? (
          <motion.div 
            variants={lineVariants}
            className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#FF6B6B]/30 to-transparent"
          />
        ) : (
          <motion.div 
            variants={lineVariants}
            className="h-0.5 w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent"
          />
        )}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          variants={dotVariants}
          whileHover="hover"
        >
          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] p-1.5 rounded-full">
            <div className="w-3 h-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionDivider;
