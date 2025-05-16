'use client';

import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import MotionButton from '@/components/motion/MotionButton';
import ScrollSection from '@/components/gsap/ScrollSection';
import GradientSection from '@/components/ui/GradientSection';
import HeroBackground from '@/components/3d/HeroBackground';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, cardVariants } from '@/utils/animations';
import { projects } from '@/data/projects';
import InteractiveAvatar from '@/components/3d/InteractiveAvatar';

export default function Home() {
  return (
    <MotionPage className="py-12 md:py-20">
      <div className="relative overflow-hidden mb-24">
        <div className="absolute inset-0 w-full h-[700px]">
          <HeroBackground />
        </div>
        <Container>
          <MotionSection className="min-h-[600px] flex flex-col justify-center relative z-10">
            <MotionItem>
              <div className="mb-8 w-full flex justify-center">
                <InteractiveAvatar />
              </div>
            </MotionItem>
            
            <MotionItem delay={0.1}>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Hi, I'm <span className="text-primary">Durgendra Pratap Singh</span>
                <br />
                Data Scientist & Full-Stack Engineer
              </h1>
            </MotionItem>
            
            <MotionItem delay={0.2}>
              <p className="mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
                Results-driven Data Scientist and Team Lead with 5+ years of experience delivering sophisticated solutions in machine learning, geospatial analysis, and full-stack development. Expert in leading complex projects across agriculture, manufacturing, and power sectors, including AI-driven disease detection, geospatial visualization platforms, and automated petition systems. Recognized for achieving significant efficiency gains and cost reductions through innovative use of cloud technologies and data analytics.
              </p>
            </MotionItem>
            
            <MotionItem delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:dpsmad999@gmail.com">
                  <MotionButton variant="primary" size="lg">
                    Get in Touch
                  </MotionButton>
                </a>
                <Link href="/projects" passHref>
                  <MotionButton variant="outline" size="lg">
                    View Projects
                  </MotionButton>
                </Link>
              </div>
            </MotionItem>
          </MotionSection>
        </Container>
      </div>

      <Container>
        <GradientSection className="mb-16">
          <div className="text-center">
            <h2 className="mb-8 text-3xl font-bold">Making the web beautiful</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
              Combining artistic design with technical expertise to create memorable user experiences that stand out.
            </p>
          </div>
        </GradientSection>

        <MotionSection className="mb-16" delay={0.3}>
          <MotionItem>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              Featured Projects
            </h2>
          </MotionItem>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-contain bg-gray-50 p-4" />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionSection>
      </Container>
    </MotionPage>
  );
}
