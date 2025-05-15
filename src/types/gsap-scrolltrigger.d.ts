declare module 'gsap/ScrollTrigger' {
  import { Plugin } from 'gsap/gsap-core';
  
  interface ScrollTriggerInstance {
    kill(revert?: boolean): void;
    refresh(): void;
    enable(reset?: boolean): void;
    disable(reset?: boolean): void;
    update(resetStart?: boolean): void;
  }
  
  interface ScrollTrigger extends Plugin {
    create(vars: object): ScrollTriggerInstance;
    getAll(): ScrollTriggerInstance[];
    refresh(safe?: boolean): void;
    update(force?: boolean): void;
    clearScrollMemory(): void;
    kill(revert?: boolean): void;
  }
  
  export const ScrollTrigger: ScrollTrigger;
  export default ScrollTrigger;
} 