'use client';

import { useEffect, useRef, ReactNode, createElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/utils/use-reduced-motion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
}

const SplitText = ({
  children,
  as = 'div',
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  threshold = 0.2,
}: SplitTextProps) => {
  const textRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const element = textRef.current;
    if (!element) return;
    
    // Split text into spans for individual words
    const originalText = element.textContent || '';
    const words = originalText.split(' ');
    
    element.innerHTML = '';
    const wordSpans: HTMLSpanElement[] = [];
    
    words.forEach((word, index) => {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('inline-block');
      wordSpan.textContent = word + (index < words.length - 1 ? ' ' : '');
      element.appendChild(wordSpan);
      wordSpans.push(wordSpan);
    });
    
    // Create GSAP animation
    gsap.fromTo(
      wordSpans,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: staggerDelay,
        duration: 0.5,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: 'play none none none',
        },
      }
    );
    
    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, delay, prefersReducedMotion, staggerDelay, threshold]);

  return createElement(
    as,
    { ref: textRef, className },
    children
  );
};

export default SplitText; 