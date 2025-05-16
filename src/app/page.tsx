'use client';

import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem'; // Assuming this is your custom animated item
import MotionButton from '@/components/motion/MotionButton';
// import ScrollSection from '@/components/gsap/ScrollSection'; // Not used in this snippet
import GradientSection from '@/components/ui/GradientSection';
import HeroBackground from '@/components/3d/HeroBackground'; // Your 3D background
import Link from 'next/link';
import { motion, Variants } from 'framer-motion'; // Imported Variants
import { projects } from '@/data/projects'; // Assuming this is your projects data
import InteractiveAvatar from '@/components/3d/InteractiveAvatar'; // Your 3D avatar

// Animation variants for the main heading
const headingNameVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({ // Added custom type for i
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1, // Stagger animation of children (if any, or for future use)
      delay: i * 0.1, // Use custom delay passed from MotionItem
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  }),
};

// Animation variants for the subtitle
const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05, // Stagger if subtitle is broken into spans
      delay: i * 0.1 + 0.3, // Delay slightly more than the name
      type: 'spring',
      damping: 12,
      stiffness: 80,
    },
  }),
};

// Animation variants for the paragraph
const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5, // Overall delay for the paragraph
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// Card variants (assuming these are defined elsewhere, kept for completeness)
const cardVariants: Variants = {
  initial: (i: number) => ({ // Added custom type for i
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
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 }
  }
};


export default function Home() {
  return (
    <MotionPage className="py-12 md:py-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-24">
        {/* Background Element */}
        <div className="absolute inset-0 w-full h-[700px] md:h-[750px] lg:h-[800px]"> {/* Adjusted height for responsiveness */}
          <HeroBackground />
        </div>

        <Container>
          <MotionSection className="min-h-[600px] md:min-h-[650px] flex flex-col justify-center items-center text-center relative z-10"> {/* Centered content */}
            
            {/* Interactive Avatar */}
            <MotionItem delay={0}> {/* Avatar can appear first or with minimal delay */}
              <div className="mb-6 md:mb-8 w-full flex justify-center">
                <InteractiveAvatar />
              </div>
            </MotionItem>
            
            {/* Main Heading */}
            {/* Using motion.h1 directly for more control with variants */}
            <motion.h1
              className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
              variants={headingNameVariants}
              initial="hidden"
              animate="visible"
              custom={1} // Corresponds to 'i' in variants for delay calculation
            >
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent animate-gradient-move">
                Hi, I'm Durgendra Pratap Singh
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2 // Changed to h2 for semantic structure, assuming h1 is main page title
              className="mb-8 text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300" // Adjusted text color for better contrast
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              custom={2} // Stagger delay after the main name
            >
              Data Scientist & Full-Stack Engineer
            </motion.h2>
            
            {/* Introductory Paragraph */}
            <motion.p
              className="mb-10 md:mb-12 max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-400" // Adjusted text color
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
            >
              Building impactful solutions at the intersection of data, AI, and web technology.
            </motion.p>
            
            {/* Action Buttons */}
            {/* Kept MotionItem for buttons for consistency with its potential wrapper logic */}
            <MotionItem delay={0.7}> {/* Delay buttons slightly more */}
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="mailto:dpsmad999@gmail.com">
                  <MotionButton variant="primary" size="lg" aria-label="Get in touch via email">
                    Get in Touch
                  </MotionButton>
                </a>
                <Link href="/projects" passHref legacyBehavior>
                  <MotionButton variant="outline" size="lg" aria-label="View my projects">
                    View Projects
                  </MotionButton>
                </Link>
              </div>
            </MotionItem>
          </MotionSection>
        </Container>
      </div>

      {/* Rest of the page content */}
      <Container>
        <GradientSection className="mb-16 py-12 md:py-16"> {/* Added padding to GradientSection */}
          <div className="text-center">
            <motion.h2 
              className="mb-6 text-3xl font-bold md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Making the Web Beautiful & Intelligent
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-2xl text-lg text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Combining artistic design with technical expertise to create memorable, data-driven user experiences that stand out.
            </motion.p>
          </div>
        </GradientSection>

        <MotionSection className="mb-16" delay={0.3}> {/* Using the correct delay prop that MotionSection accepts */}
          <MotionItem>
            <h2 className="mb-8 text-2xl font-bold md:text-3xl text-center md:text-left"> {/* Centered on small, left on medium+ */}
              Featured Projects
            </h2>
          </MotionItem>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants} // Using the defined cardVariants
                initial="initial"
                whileInView="animate" // Animate when in view
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of card is visible
                custom={index} // For staggered delay in cardVariants if defined
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-2xl dark:hover:shadow-primary/20" // Enhanced shadow and hover
              >
                {/* It's highly recommended to use Next.js <Image> component here for optimization */}
                <img 
                  src={project.imageUrl || `https://placehold.co/600x400/334155/e2e8f0?text=${project.title.replace(/\s+/g, '+')}`} 
                  alt={project.title} 
                  className="w-full h-48 object-cover" // Changed to object-cover and fixed height
                  onError={(e) => (e.currentTarget.src = `https://placehold.co/600x400/334155/e2e8f0?text=Image+Not+Found`)}
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 h-20 overflow-hidden"> {/* Fixed height for description, adjust as needed */}
                    {project.description}
                  </p>
                  <Link href={`/projects/${project.id}`} className="inline-block mt-2 text-primary hover:underline font-semibold">
                    View Details <span>&rarr;</span>
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

