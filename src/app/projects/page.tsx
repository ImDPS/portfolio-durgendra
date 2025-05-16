'use client';

import PageLayout from '@/components/layout/PageLayout';
import MotionItem from '@/components/motion/MotionItem';
import { projects } from '@/data/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <PageLayout fullWidth>
      <h1 className="mb-8 text-3xl font-bold md:text-4xl lg:text-5xl">
        My Projects
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-2xl dark:hover:shadow-primary/20"
          >
            <img 
              src={project.imageUrl || `https://placehold.co/600x400/334155/e2e8f0?text=${project.title.replace(/\s+/g, '+')}`} 
              alt={project.title} 
              className="w-full h-48 object-cover"
              onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/334155/e2e8f0?text=Image+Not+Found`)}
            />
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 h-20 overflow-hidden">
                {project.description}
              </p>
              <Link href={`/projects/${project.id}`} className="inline-block mt-2 text-primary hover:underline font-semibold">
                View Details <span>&rarr;</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
} 