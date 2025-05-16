export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  type: 'website' | 'dashboard' | 'mobile';
};

export const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'A complete e-commerce solution with product management, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    imageUrl: '/images/projects/ecommerce.png', // Use a subtle illustration or icon
    type: 'website',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'A modern portfolio website with interactive 3D elements and animations.',
    technologies: ['Next.js', 'Three.js', 'GSAP'],
    imageUrl: '/images/projects/portfolio.png',
    type: 'website',
  },
  {
    id: 'dashboard',
    title: 'Dashboard Application',
    description: 'A data visualization dashboard with real-time updates and analytics.',
    technologies: ['React', 'D3.js', 'GraphQL'],
    imageUrl: '/images/projects/dashboard.png',
    type: 'dashboard',
  },
  {
    id: 'mobile-app',
    title: 'Mobile Application',
    description: 'A cross-platform mobile app for task management and productivity.',
    technologies: ['React Native', 'Redux', 'Firebase'],
    imageUrl: '/images/projects/mobile.png',
    type: 'mobile',
  },
]; 