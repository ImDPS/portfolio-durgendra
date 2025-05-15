import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Durgendra Portfolio',
  description: 'Explore my portfolio of web development projects and case studies',
};

export default function ProjectsPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">My Projects</h1>
          <p className="mb-8 max-w-3xl text-lg text-gray-700 dark:text-gray-300">
            Here are some of the projects I've worked on. Each project represents unique challenges 
            and solutions implemented using modern web technologies.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-full bg-gray-300 object-cover transition-transform duration-300 group-hover:scale-105 dark:bg-gray-600">
                  {/* Image placeholder */}
                  <div className="flex h-full items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Project Image</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">E-Commerce Platform</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  A complete e-commerce solution with product management, shopping cart, and payment integration.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">React</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">Node.js</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">MongoDB</span>
                </div>
                <a href="/projects/ecommerce" className="inline-flex items-center text-primary hover:underline">
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-full bg-gray-300 object-cover transition-transform duration-300 group-hover:scale-105 dark:bg-gray-600">
                  {/* Image placeholder */}
                  <div className="flex h-full items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Project Image</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">Portfolio Website</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  A modern portfolio website with interactive 3D elements and animations.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">Next.js</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">Three.js</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">GSAP</span>
                </div>
                <a href="/projects/portfolio" className="inline-flex items-center text-primary hover:underline">
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Card 3 */}
            <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="h-full w-full bg-gray-300 object-cover transition-transform duration-300 group-hover:scale-105 dark:bg-gray-600">
                  {/* Image placeholder */}
                  <div className="flex h-full items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Project Image</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">Dashboard Application</h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  A data visualization dashboard with real-time updates and analytics.
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">React</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">D3.js</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">GraphQL</span>
                </div>
                <a href="/projects/dashboard" className="inline-flex items-center text-primary hover:underline">
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 