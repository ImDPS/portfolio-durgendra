'use client';

import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import ScrollSection from '@/components/gsap/ScrollSection';
import GradientSection from '@/components/ui/GradientSection';
import SkillsGlobe from '@/components/3d/SkillsGlobe';
import InteractiveAvatar from '@/components/3d/InteractiveAvatar';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';

export default function AboutPage() {
  return (
    <MotionPage className="py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <MotionSection>
            <MotionItem>
              <div className="mb-8 w-full flex justify-center">
                <InteractiveAvatar />
              </div>
            </MotionItem>
            
            <MotionItem>
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                About Me
              </h1>
            </MotionItem>
            
            <div className="mb-12">
              <MotionItem delay={0.1}>
                <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  I'm a passionate web developer with a focus on creating fast, accessible, and user-friendly digital experiences.
                  With expertise in modern frontend and backend technologies, I strive to build applications that are not only
                  functional but also provide exceptional user experiences.
                </p>
              </MotionItem>
              <MotionItem delay={0.2}>
                <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                  My journey in web development started over 5 years ago, and since then I've worked on various projects ranging
                  from small business websites to complex web applications. I'm constantly learning and adapting to new technologies
                  to stay at the forefront of the ever-evolving web development landscape.
                </p>
              </MotionItem>
            </div>
          </MotionSection>

          <GradientSection className="mb-12">
            <MotionItem>
              <h2 className="mb-4 text-2xl font-bold">
                Skills & Expertise
              </h2>
            </MotionItem>
            
            <div className="mb-8">
              <MotionSection>
                <SkillsGlobe />
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  Interactive 3D visualization of my technical skills. Hover over points to explore.
                </p>
              </MotionSection>
            </div>

            <div className="mt-12 mb-8">
              <MotionItem delay={0.1}>
                <h3 className="mb-3 text-xl font-semibold">Frontend Development</h3>
              </MotionItem>
              
              <motion.ul 
                className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'WebGL'].map((skill, index) => (
                  <motion.li 
                    key={skill} 
                    variants={fadeInUp}
                    custom={index * 0.05}
                    className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div className="mb-8">
              <MotionItem delay={0.2}>
                <h3 className="mb-3 text-xl font-semibold">Backend Development</h3>
              </MotionItem>
              
              <motion.ul 
                className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST APIs', 'Firebase', 'AWS'].map((skill, index) => (
                  <motion.li 
                    key={skill} 
                    variants={fadeInUp}
                    custom={index * 0.05}
                    className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </GradientSection>

          <MotionSection className="mb-12" delay={0.3}>
            <MotionItem>
              <h2 className="mb-4 text-2xl font-bold">Work Philosophy</h2>
            </MotionItem>
            
            <MotionItem delay={0.1}>
              <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
                I believe in writing clean, maintainable, and well-documented code. My approach to web development
                centers around these core principles:
              </p>
            </MotionItem>
            
            <motion.ul 
              className="mb-4 list-inside list-disc space-y-2 text-lg text-gray-700 dark:text-gray-300"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                'Prioritizing accessibility and inclusivity',
                'Building with performance in mind from the start',
                'Creating responsive designs that work across all devices',
                'Following best practices and industry standards',
                'Continuously learning and improving my skills'
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={fadeInUp}
                  custom={index * 0.1}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
} 