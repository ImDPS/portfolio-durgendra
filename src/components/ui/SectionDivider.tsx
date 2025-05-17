"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

// Anime.js type declarations
declare global {
  interface Window {
    anime: {
      (params: any): {
        finished: Promise<void>;
      };
      timeline: () => {
        add: (params: any, offset?: string | number) => any;
      };
      remove: (targets: any) => void;
      random: (min: number, max: number) => number;
      stagger: (amount: number) => (el: any, i: number) => number;
    };
  }
}

// Helper function
const animeRandom = (min: number, max: number) => Math.random() * (max - min) + min;

interface SectionDividerProps {
  className?: string;
  gradient?: boolean;
}

// Framer Motion Variants for Dot Hover
const dotHoverBase = {
  scale: 1.25,
  rotate: 45,
  transition: {
    duration: 0.25,
    type: 'spring',
    stiffness: 350,
    damping: 12,
  },
};

const dotGradientHoverVariants = {
  hover: { 
    ...dotHoverBase, 
    boxShadow: "0 0 18px 4px rgba(255, 107, 107, 0.65)",
    background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"
  }
};

const dotGreyHoverVariants = {
  hover: { 
    ...dotHoverBase, 
    boxShadow: "0 0 18px 4px rgba(26, 40, 55, 0.55)",
    backgroundColor: "#1A2837"
  }
};

const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  gradient = true,
}) => {
  // Refs
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const lineBubblesContainerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  
  // State
  const [hasAnimatedInView, setHasAnimatedInView] = useState(false);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  // Number of bubbles and their size
  const numBubbles = 70;
  const bubbleSize = "w-[3px] h-[3px] md:w-[4px] md:h-[4px]";

  // Load anime.js script on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkAnime = () => {
      if ((window as any).anime) {
        setAnimeLoaded(true);
        return true;
      }
      return false;
    };

    if (checkAnime()) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.async = true;
    script.onload = () => setAnimeLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Hover effect for the dot
  const handleDotHover = useCallback(() => {
    if (!dotRef.current || !animeLoaded) return;

    const dot = dotRef.current;
    const particleCount = 8;
    const animeInstance = (window as any).anime;
    
    if (!animeInstance) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = `absolute rounded-full bg-gradient-to-br from-primary-400 to-primary-600 w-1.5 h-1.5`;
      dot.parentNode?.appendChild(particle);

      animeInstance({
        targets: particle,
        translateX: Math.cos((i / particleCount) * Math.PI * 2) * 30,
        translateY: Math.sin((i / particleCount) * Math.PI * 2) * 30,
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        complete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    }
  }, [animeLoaded]);

  // Animation for the line of bubbles and dot
  useEffect(() => {
    if (!isInView || hasAnimatedInView || !animeLoaded) return;
    
    const bubbleElements = lineBubblesContainerRef.current?.querySelectorAll('.bubble');
    const dotElement = dotRef.current;
    
    if (!bubbleElements || !bubbleElements.length || !dotElement) return;

    const animeInstance = (window as any).anime;
    if (!animeInstance) return;

    const initAnimation = async () => {
      setHasAnimatedInView(true);

      // Reset initial states
      await animeInstance({
        targets: bubbleElements,
        opacity: 0,
        scale: 0,
        duration: 0,
      }).finished;

      await animeInstance({
        targets: dotElement,
        opacity: 0,
        scale: 0,
        duration: 0,
      }).finished;
      
      // Create timeline for sequenced animations
      const tl = animeInstance.timeline();

      // Animate bubbles
      tl.add({
        targets: bubbleElements,
        opacity: [0, 0.7],
        scale: [0, 1],
        translateY: [() => animeRandom(-15, 5), 0],
        delay: animeInstance.stagger(10),
        duration: 350,
        easing: 'easeOutElastic(1, .6)',
      });

      // Animate dot
      tl.add({
        targets: dotElement,
        opacity: [0, 1],
        scale: [
          { value: 0, duration: 0 },
          { value: 1.3, duration: 400, easing: 'easeOutExpo' },
          { value: 1, duration: 350, easing: 'easeOutElastic(1, .7)' }
        ],
        translateZ: 0,
      }, '-=300');
    };

    initAnimation();
  }, [isInView, hasAnimatedInView, animeLoaded]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if ((window as any).anime) {
        (window as any).anime.remove('.bubble, .dot');
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={`relative w-full h-16 md:h-20 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1A2837]/50 to-transparent" />
      </div>
      
      {/* Bubbles */}
      <div 
        ref={lineBubblesContainerRef}
        className="absolute left-0 right-0 h-full flex items-center justify-between px-4 md:px-8 pointer-events-none"
      >
        {Array.from({ length: numBubbles }).map((_, i) => (
          <div 
            key={i} 
            className={`bubble rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] opacity-0 ${bubbleSize}`}
          />
        ))}
      </div>

      {/* Center Dot */}
      <motion.div
        ref={dotRef}
        className={`dot absolute rounded-full ${
          gradient 
            ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53]' 
            : 'bg-[#1A2837]'
        } w-3 h-3 md:w-4 md:h-4 z-10`}
        variants={gradient ? dotGradientHoverVariants : dotGreyHoverVariants}
        whileHover="hover"
        onHoverStart={handleDotHover}
      />
    </div>
  );
};

export default SectionDivider;