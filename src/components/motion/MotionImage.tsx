'use client';

import { motion } from 'framer-motion';
import Image, { ImageProps } from 'next/image';
import { cardVariants } from '@/utils/animations';
import { useReducedMotion } from '@/utils/use-reduced-motion';

interface MotionImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  className?: string;
  containerClassName?: string;
}

const MotionImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  containerClassName = '',
  ...props 
}: MotionImageProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 1, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        hover: { scale: 1 }
      }
    : cardVariants;
    
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      variants={variants}
      className={containerClassName}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...props}
      />
    </motion.div>
  );
};

export default MotionImage; 