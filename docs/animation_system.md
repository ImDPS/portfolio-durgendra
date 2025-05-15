# Animation System

## Global Animation Settings
- Custom easing functions for brand consistency
- Duration presets (fast: 0.2s, medium: 0.5s, slow: 0.8s)
- Animation sequence orchestration system
- Reduced motion alternative animations

## Framer Motion Implementation
### Reusable Animation Variants
```javascript
// Sample animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } 
  },
};

export const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } 
  },
};
```

### Animation Components
- `<AnimateOnScroll />` - Triggers animations when in view
- `<MotionText />` - Text with specialized animations
- `<FadeIn />` - Simple fade-in wrapper
- `<StaggerChildren />` - Staggers child animations

### Page Transitions
- Custom page transitions using Framer Motion
- Exit and entry animations for routes
- Shared element transitions for related content
- Loading states during page transitions

## GSAP Implementation
### ScrollTrigger Sections
- Scroll-based animations for section reveals
- Parallax effects for backgrounds
- Pin sections for special scrolling experiences
- Horizontal scroll sections where appropriate

### Timeline Animations
- Sequenced animations using GSAP timelines
- Complex multi-element animations
- Hero section animation sequence
- Interactive timeline for experience/education

### Special Effects
- Text scramble/reveal effects
- Advanced cursor interactions
- SVG path animations
- Counter/number animations

## Custom Hooks
### useAnimationInView
```javascript
export const useAnimationInView = (
  threshold = 0.1,
  triggerOnce = true
) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return { ref, controls, inView };
};
```

### useParallax
```javascript
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return { y: offset * speed };
};

