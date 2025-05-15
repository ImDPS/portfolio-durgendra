'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/utils/use-reduced-motion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-in' | 'scale-in';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollSection = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const section = sectionRef.current;
    if (!section) return;
    
    // Ensure GSAP is registered
    if (!ScrollTrigger) return;
    
    let animationConfig = {};
    
    switch (animation) {
      case 'fade-up':
        animationConfig = {
          y: 50,
          opacity: 0,
        };
        break;
      case 'fade-in':
        animationConfig = {
          opacity: 0,
        };
        break;
      case 'slide-in':
        animationConfig = {
          x: -50,
          opacity: 0,
        };
        break;
      case 'scale-in':
        animationConfig = {
          scale: 0.9,
          opacity: 0,
        };
        break;
    }
    
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: 'play none none none',
        once: true
      }
    });
    
    tl.fromTo(
      section,
      animationConfig,
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
      }
    );
    
    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [animation, delay, duration, prefersReducedMotion, threshold]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollSection; 