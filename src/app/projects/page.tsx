'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import { Card } from '@/components/ui/Card';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import styles from './gradientBackground.module.css';

// Reusable Icons with consistent styling
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.293 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <MotionItem key={project.id} delay={index * 0.1}>
      <Card
        title={project.title}
        description={project.description}
        href={`/projects/${project.id}`}
        image={project.imageUrl}
        tags={project.technologies}
        date={project.duration}
        category={project.category}
        type="project"
      >
        {/* GitHub and External Link Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-[#FF6B6B] hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubIcon />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-[#FF6B6B] hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </Card>
    </MotionItem>
  );
};

export default function ProjectsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.gradientBackground}>
      <MotionPage className="py-12 md:py-20">
        <div className={styles.content}>
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <MotionSection>
                <MotionItem>
                  <div className="text-center mb-16">
                    <motion.h1 
                      className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2837] to-[#FF6B6B]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      My Projects
                    </motion.h1>
                    <motion.p 
                      className="text-lg max-w-2xl mx-auto text-gray-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      A collection of my latest projects and case studies. Each project represents a unique challenge and solution.
                    </motion.p>
                  </div>
                </MotionItem>
              </MotionSection>

              {/* Projects Grid */}
              <MotionSection>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project, index) => (
                    <MotionItem key={project.id} delay={index * 0.1}>
                      <Card
                        title={project.title}
                        description={project.description}
                        href={`/projects/${project.id}`}
                        image={project.imageUrl}
                        tags={project.technologies}
                        date={project.duration}
                        type="project"
                        demoUrl={project.demoUrl}
                        githubUrl={project.githubUrl}
                      />
                    </MotionItem>
                  ))}
                </div>
              </MotionSection>

              {/* CTA Section */}
              <NewsletterSection 
                title="Have a project in mind?"
                description="I'm always open to discussing product design work or partnership opportunities."
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#FF6B6B] px-6 py-3 text-base font-medium text-white transition-colors hover:bg-[#FF6B6B]/90 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#1A2837]"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-full bg-white/5 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#1A2837]"
                  >
                    Learn More About Me
                  </Link>
                </div>
              </NewsletterSection>
            </div>
          </Container>
        </div>
      </MotionPage>
    </div>
  );
}
