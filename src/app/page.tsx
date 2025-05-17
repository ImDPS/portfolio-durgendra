'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';

// Components
import Container from '@/components/ui/Container';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import MotionButton from '@/components/motion/MotionButton';
// Removed GradientSection import as it wasn't correctly used and its definition is unknown
// If you intend to use GradientSection, ensure it's implemented and used correctly.
// import GradientSection from '@/components/ui/GradientSection'; 
import SectionDivider from '@/components/ui/SectionDivider';
import { projects } from '@/data/projects';

// 3D Components (dynamically imported with no SSR)

// Dynamically import 3D components with no SSR
const ParticleBackground = dynamic(
  () => import('@/components/3d/ParticleBackground'),
  { ssr: false }
);

const InteractiveRocket = dynamic(
  () => import('@/components/3d/InteractiveRocket'),
  { ssr: false }
);

// Animation variants
const headingNameVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delay: i * 0.1,
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  }),
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delay: i * 0.1 + 0.3,
      type: 'spring',
      damping: 12,
      stiffness: 80,
    },
  }),
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  initial: (i: number) => ({
    opacity: 0,
    y: 30,
    transition: { delay: i * 0.1 }
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { 
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

export default function Home() {
  return (
    <motion.div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-16 md:pt-32">
        <Container>
          <MotionSection className="min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="order-2 lg:order-1">
                <motion.div
                  className="mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={headingNameVariants}
                  custom={1}
                >
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
                      Hi, I'm Durgendra
                    </span>
                  </motion.h1>
                  
                  <motion.h2
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: 0.2 }}
                  >
                    Data Scientist &<br />
                    Full-Stack Engineer
                  </motion.h2>

                  <motion.p
                    className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: 0.4 }}
                  >
                    Building impactful solutions at the intersection of data, AI, and web technology.
                  </motion.p>

                  <motion.div 
                    className="flex flex-wrap gap-4"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ delay: 0.6 }}
                  >
                    <a href="mailto:dpsmad999@gmail.com">
                      <MotionButton 
                        variant="primary" 
                        size="lg" 
                        aria-label="Get in touch via email"
                        className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white"
                      >
                        Get in Touch
                      </MotionButton>
                    </a>
                    <Link href="/projects" passHref>
                      <MotionButton 
                        variant="outline" 
                        size="lg" 
                        aria-label="View my projects"
                        className="border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B]/10"
                      >
                        View Projects
                      </MotionButton>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column - 3D Rocket */}
              <motion.div 
                className="order-1 lg:order-2 flex justify-center lg:justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                }}
              >
                <div className="w-full h-96 lg:h-[32rem] relative">
                  <InteractiveRocket />
                </div>
              </motion.div>
            </div>
          </MotionSection>
        </Container>
      </div>

      <SectionDivider />

      {/* About Section */}
      <div className="relative py-20 bg-transparent">
        <Container>
          <MotionSection>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Data-Driven Solutions & Scalable Systems
              </motion.h2>
              <motion.p 
                className="text-lg text-white/90 max-w-3xl mx-auto px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transforming complex data into actionable insights and building robust, scalable applications that drive business value through innovative technology solutions.
              </motion.p>
            </div>
          </MotionSection>
        </Container>
      </div>
      
      <SectionDivider gradient={false} />

      {/* Featured Projects */}
      <div className="py-20 bg-transparent">
        <Container>
          {/* The erroneous </div> and </GradientSection> were here and have been removed. */}
          {/* If GradientSection was intended, it should be properly opened and closed around its content. */}
          {/* For example:
            <GradientSection>
              <MotionSection> ... H2 and P ... </MotionSection>
            </GradientSection>
           Or:
            <MotionSection>
              <GradientSection> ... H2 and P ... </GradientSection>
            </MotionSection>
           Adjust according to your GradientSection component's design.
           For now, I've assumed the H2 and P are directly in a MotionSection.
          */}

          <MotionSection className="mb-16"> {/* This MotionSection is for the project cards */}
            <MotionItem>
              <h2 className="mb-8 text-2xl font-bold md:text-3xl text-center md:text-left">
                Featured Projects
              </h2>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="bg-[#1A2837]/70 backdrop-blur-sm rounded-xl overflow-hidden border border-[#2D3E50]/50 hover:border-[#FF6B6B] transition-all duration-300"
                    variants={cardVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={index}
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-[#2D3E50] rounded-full text-sm text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link 
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center text-[#FF6B6B] hover:text-[#FF8E53] transition-colors"
                      >
                        View Project
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FF6B6B] hover:bg-[#FF5252] transition-colors"
                >
                  View All Projects
                </Link>
              </motion.div>
            </MotionItem> {/* MotionItem closes here */}
          </MotionSection> {/* MotionSection for cards closes here */}
        </Container>
      </div>
    </motion.div>
  );
}