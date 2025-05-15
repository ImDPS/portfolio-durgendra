'use client';

import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import ProjectModel from '@/components/3d/ProjectModel';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cardVariants, staggerContainer } from '@/utils/animations';

export default function ProjectsPage() {
  const projects = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      description: 'A complete e-commerce solution with product management, shopping cart, and payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      imageUrl: '/placeholder.jpg',
      type: 'website',
    },
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      description: 'A modern portfolio website with interactive 3D elements and animations.',
      technologies: ['Next.js', 'Three.js', 'GSAP'],
      imageUrl: '/placeholder.jpg',
      type: 'website',
    },
    {
      id: 'dashboard',
      title: 'Dashboard Application',
      description: 'A data visualization dashboard with real-time updates and analytics.',
      technologies: ['React', 'D3.js', 'GraphQL'],
      imageUrl: '/placeholder.jpg',
      type: 'dashboard',
    },
    {
      id: 'mobile-app',
      title: 'Mobile Application',
      description: 'A cross-platform mobile app for task management and productivity.',
      technologies: ['React Native', 'Redux', 'Firebase'],
      imageUrl: '/placeholder.jpg',
      type: 'mobile',
    }
  ];

  return (
    <MotionPage className="py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-6xl">
          <MotionSection>
            <MotionItem>
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">My Projects</h1>
            </MotionItem>
            
            <MotionItem delay={0.1}>
              <p className="mb-8 max-w-3xl text-lg text-gray-700 dark:text-gray-300">
                Here are some of the projects I've worked on. Each project represents unique challenges 
                and solutions implemented using modern web technologies.
              </p>
            </MotionItem>
          </MotionSection>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index * 0.1}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <ProjectModel 
                    type={project.type as any}
                    image={project.imageUrl}
                    height={240}
                    interactive={false}
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">{project.title}</h2>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="inline-flex items-center text-primary hover:underline"
                    aria-label={`View details about ${project.title}`}
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <MotionSection className="mt-16">
            <MotionItem>
              <h2 className="mb-4 text-2xl font-bold">Let's Work Together</h2>
            </MotionItem>
            
            <MotionItem delay={0.1}>
              <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                Have a project in mind? I'm always open to discussing new opportunities and challenges.
              </p>
            </MotionItem>
            
            <MotionItem delay={0.2}>
              <Link 
                href="/contact" 
                className="inline-block rounded-md bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Get in Touch
              </Link>
            </MotionItem>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
} 