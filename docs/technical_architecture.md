Technical Architecture
Core Tech Stack

Next.js 14+ (App Router): Server components, route handling, API routes
TypeScript: Full type safety throughout the project
Framer Motion: Component animations, page transitions
GSAP: Advanced timeline animations, scroll triggers
Three.js + React Three Fiber: 3D scenes and interactive elements
Tailwind CSS: Styling with utility classes
Zustand: Global state management
ContentLayer: Structured content management (for projects, blog posts)
MDX: Enhanced markdown for content
React Hook Form: Form handling with validation
Zod: Schema validation
ESLint + Prettier: Code quality and formatting

Architecture Decisions
Server Components vs. Client Components

Use server components for static content rendering (projects list, about sections)
Use client components for interactive elements (3D scenes, animations, forms)
Implement clear boundaries with 'use client' directives

State Management

Use Zustand for global theme state, animation state, and any shared UI state
Implement context providers where appropriate for localized state (e.g., 3D scene context)

Content Strategy

Implement ContentLayer for structured content management
Store project data, testimonials, and skills as structured data
Use MDX for any long-form content with custom components

Animation Strategy

Separate animation concerns from component logic
Create reusable animation hooks and components
Implement performance optimizations (useInView, shouldReduceMotion)

3D Implementation

Centralize Three.js scenes in a core experience manager
Implement React Three Fiber for React integration
Use Drei helpers for common Three.js patterns
Create fallbacks for devices with limited WebGL support

