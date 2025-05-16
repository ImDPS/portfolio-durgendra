'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/utils/use-reduced-motion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const ParallaxSection = ({
  children,
  className = '',
  speed = 0.1,
  direction = 'up',
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;
    
    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    // Apply the parallax effect
    const yFactor = direction === 'up' ? -1 : 1;
    const distance = Math.min(20, section.offsetHeight * speed);
    
    const animation = gsap.fromTo(
      content,
      { y: 0 },
      {
        y: yFactor * distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          onEnter: () => {
            // Make sure content is visible
            content.style.visibility = 'visible';
          }
        }
      }
    );

    // Update on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Kill the animation which will also clean up the associated ScrollTrigger
      if (animation) {
        animation.kill();
      }
      
      // Clean up ScrollTrigger
      ScrollTrigger.refresh();
    };
  }, [prefersReducedMotion, speed, direction]);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection; 