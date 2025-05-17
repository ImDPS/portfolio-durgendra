'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FiCode, FiServer, FiCloud, FiBarChart2, FiCpu, FiTool } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiDjango, SiTensorflow, SiPytorch, SiPostgresql, SiMongodb, SiPython, SiJavascript, SiGooglecloud, SiDocker, SiKubernetes, SiPandas, SiScikitlearn, SiOpencv, SiGit, SiVisualstudiocode, SiJupyter, SiFigma } from 'react-icons/si';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';

// Types
type SkillItem = {
  name: string;
  level: number;
  icon: React.ReactNode;
};

type SkillCategory = {
  category: string;
  icon: React.ReactNode;
  items: SkillItem[];
};

// Skills Data
const skills: SkillCategory[] = [
  {
    category: 'Web Development',
    icon: <FiCode className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'React', level: 9, icon: <SiReact className="w-5 h-5 text-[#61DAFB]" /> },
      { name: 'Next.js', level: 8, icon: <SiNextdotjs className="w-5 h-5 text-white" /> },
      { name: 'TypeScript', level: 8, icon: <SiJavascript className="w-5 h-5 text-[#3178C6]" /> },
      { name: 'Node.js', level: 8, icon: <SiJavascript className="w-5 h-5 text-[#68A063]" /> },
    ],
  },
  {
    category: 'Backend',
    icon: <FiServer className="w-6 h-6 text-[#4ECDC4]" />,
    items: [
      { name: 'Python', level: 9, icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
      { name: 'Django', level: 8, icon: <SiDjango className="w-5 h-5 text-[#092E20]" /> },
      { name: 'PostgreSQL', level: 8, icon: <SiPostgresql className="w-5 h-5 text-[#4169E1]" /> },
      { name: 'MongoDB', level: 7, icon: <SiMongodb className="w-5 h-5 text-[#47A248]" /> },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: <FiCloud className="w-6 h-6 text-[#6CB2EB]" />,
    items: [
      { name: 'AWS', level: 8, icon: <span className="w-5 h-5 text-[#FF9900]">AWS</span> },
      { name: 'Google Cloud', level: 7, icon: <SiGooglecloud className="w-5 h-5 text-[#4285F4]" /> },
      { name: 'Docker', level: 8, icon: <SiDocker className="w-5 h-5 text-[#2496ED]" /> },
      { name: 'Kubernetes', level: 7, icon: <SiKubernetes className="w-5 h-5 text-[#326CE5]" /> },
    ],
  },
  {
    category: 'Data Science',
    icon: <FiBarChart2 className="w-6 h-6 text-[#9F7AEA]" />,
    items: [
      { name: 'Python', level: 9, icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
      { name: 'TensorFlow', level: 8, icon: <SiTensorflow className="w-5 h-5 text-[#FF6F00]" /> },
      { name: 'PyTorch', level: 7, icon: <SiPytorch className="w-5 h-5 text-[#EE4C2C]" /> },
      { name: 'Pandas', level: 8, icon: <SiPandas className="w-5 h-5 text-[#150458]" /> },
    ],
  },
  {
    category: 'Machine Learning',
    icon: <FiCpu className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'Scikit-learn', level: 8, icon: <SiScikitlearn className="w-5 h-5 text-[#F7931E]" /> },
      { name: 'OpenCV', level: 7, icon: <SiOpencv className="w-5 h-5 text-[#5C3EE8]" /> },
      { name: 'NLTK', level: 7, icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
      { name: 'Hugging Face', level: 7, icon: <span className="w-5 h-5 text-[#FFD21E]">HF</span> },
    ],
  },
  {
    category: 'Other Tools',
    icon: <FiTool className="w-6 h-6 text-[#4ECDC4]" />,
    items: [
      { name: 'Git', level: 9, icon: <SiGit className="w-5 h-5 text-[#F05032]" /> },
      { name: 'VS Code', level: 9, icon: <SiVisualstudiocode className="w-5 h-5 text-[#007ACC]" /> },
      { name: 'Jupyter', level: 8, icon: <SiJupyter className="w-5 h-5 text-[#F37626]" /> },
      { name: 'Figma', level: 7, icon: <SiFigma className="w-5 h-5 text-[#F24E1E]" /> },
    ],
  },
];

// Experience data removed as per user request

// Dynamically import the 3D components with no SSR
const SkillsGlobe = dynamic(
  () => import('@/components/3d/SkillsGlobe'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="animate-pulse text-gray-500">Loading 3D skills visualization...</div>
      </div>
    )
  }
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1824] to-[#1A2837] text-white">
      <MotionPage className="py-12 md:py-20">
        <Container>
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <MotionSection>
              <MotionItem>
                <div className="text-center mb-16">
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2837] to-[#FF6B6B]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    About Me
                  </motion.h1>
                  <motion.p 
                    className="text-lg max-w-2xl mx-auto text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Passionate about creating elegant solutions to complex problems through code and data.
                  </motion.p>
                </div>
              </MotionItem>
            </MotionSection>

            {/* Skills Section */}
            <MotionSection className="mt-20">
              <MotionItem>
                <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2837] to-[#FF6B6B]">
                  My Skills
                </h2>
              </MotionItem>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {skills.map((category, index) => (
                  <motion.div
                    key={category.category}
                    className="bg-[#1A2837] rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#2D3E50]/50 hover:border-[#FF6B6B]/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    transition={{ 
                      delay: 0.05 * index,
                      type: 'spring',
                      stiffness: 100
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-[#2D3E50] rounded-xl shadow-inner">
                        {React.cloneElement(category.icon as React.ReactElement, {
                          className: 'w-6 h-6'
                        })}
                      </div>
                      <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-white">
                        {category.category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((skill) => (
                        <motion.div 
                          key={skill.name} 
                          className="flex items-center gap-3 p-3 rounded-lg bg-[#2D3E50] hover:bg-[#3a4d63] text-[#FF6B6B] transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="p-1.5 bg-[#1A2837] rounded-lg">
                            {React.cloneElement(skill.icon as React.ReactElement, {
                              className: 'w-5 h-5 flex-shrink-0'
                            })}
                          </div>
                          <span className="text-sm font-medium text-[#FF6B6B]">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 3D Skills Globe */}
              <div className="h-[500px] w-full bg-[#1A2837] rounded-xl overflow-hidden">
                <SkillsGlobe />
              </div>
            </MotionSection>
          </div>
        </Container>
      </MotionPage>
    </div>
  );
}
