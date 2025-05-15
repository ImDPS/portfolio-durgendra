'use client';

import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import MotionButton from '@/components/motion/MotionButton';
import ScrollSection from '@/components/gsap/ScrollSection';
import ParallaxSection from '@/components/gsap/ParallaxSection';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, cardVariants } from '@/utils/animations';

export default function Home() {
  return (
    <MotionPage className="py-12 md:py-20">
      <Container>
        <MotionSection className="mb-16">
          <MotionItem>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Hi, I'm <span className="text-primary">Durgendra</span> 
              <br />
              Web Developer & Designer
            </h1>
          </MotionItem>
          
          <MotionItem delay={0.1}>
            <p className="mb-8 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
              I build exceptional digital experiences with cutting-edge technologies.
              Specialized in creating fast, responsive, and user-friendly web applications.
            </p>
          </MotionItem>
          
          <MotionItem delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" passHref>
                <MotionButton variant="primary" size="lg">
                  Get in Touch
                </MotionButton>
              </Link>
              <Link href="/projects" passHref>
                <MotionButton variant="outline" size="lg">
                  View Projects
                </MotionButton>
              </Link>
            </div>
          </MotionItem>
        </MotionSection>

        <ParallaxSection className="mb-16 py-0">
          <div className="py-16 px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
            <ScrollSection className="text-center" animation="fade-in">
              <h2 className="mb-8 text-3xl font-bold">Making the web beautiful</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                Combining artistic design with technical expertise to create memorable user experiences that stand out.
              </p>
            </ScrollSection>
          </div>
        </ParallaxSection>

        <MotionSection className="mb-16" delay={0.3}>
          <MotionItem>
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
              Featured Projects
            </h2>
          </MotionItem>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((project, index) => (
              <motion.div
                key={`project-${project}`}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="bg-gray-200 p-4 dark:bg-gray-700">Project Image Placeholder</div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">Project {project}</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    A brief description of the project, technologies used, and outcomes.
                  </p>
                  <Link href="#" className="text-primary hover:underline">
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
