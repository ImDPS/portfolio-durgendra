'use client';

import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import ProjectModel from '@/components/3d/ProjectModel';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cardVariants, staggerContainer } from '@/utils/animations';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
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
                <div className="flex items-center justify-center h-48 bg-gray-50 dark:bg-gray-900">
                  <img src={project.imageUrl} alt={project.title} className="h-32 object-contain" />
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