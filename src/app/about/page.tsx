'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import icons as React components
import { FiCode, FiBarChart2, FiCloud, FiDatabase, FiCpu, FiMonitor, FiServer } from 'react-icons/fi';
// Import icons as React components
import { 
  SiReact, 
  SiNextdotjs, 
  SiDjango, 
  SiTensorflow, 
  SiPytorch, 
  SiPostgresql, 
  SiMongodb, 
  SiPython, 
  SiJavascript, 
  SiGooglecloud,
  SiArduino, 
  SiRaspberrypi
} from 'react-icons/si';

// Custom AWS icon component to avoid type issues
const AwsIcon = () => (
  <svg className="w-5 h-5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);
import { FaMicrosoft, FaChartBar } from 'react-icons/fa';

// Type for skill item
interface SkillItem {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

// Type for skill category
interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

// Skills data with icons
const skills: SkillCategory[] = [
  {
    category: 'Web Development',
    icon: <FiCode className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'React', level: 9, icon: <SiReact className="w-5 h-5 text-[#61DAFB]" /> },
      { name: 'Next.js', level: 9, icon: <SiNextdotjs className="w-5 h-5 text-black dark:text-white" /> },
      { name: 'JavaScript', level: 9, icon: <SiJavascript className="w-5 h-5 text-[#F7DF1E]" /> },
    ],
  },
  {
    category: 'Data Science & ML',
    icon: <FiBarChart2 className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'Python', level: 10, icon: <SiPython className="w-5 h-5 text-[#3776AB]" /> },
      { name: 'TensorFlow', level: 8, icon: <SiTensorflow className="w-5 h-5 text-[#FF6F00]" /> },
      { name: 'PyTorch', level: 7, icon: <SiPytorch className="w-5 h-5 text-[#EE4C2C]" /> },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: <FiCloud className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'Google Cloud', level: 7, icon: <SiGooglecloud className="w-5 h-5 text-[#4285F4]" /> },
      { name: 'AWS', level: 7, icon: <AwsIcon /> },
      { name: 'Docker', level: 8 },
    ],
  },
  {
    category: 'Databases',
    icon: <FiDatabase className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'PostgreSQL', level: 8, icon: <SiPostgresql className="w-5 h-5 text-[#336791]" /> },
      { name: 'MongoDB', level: 7, icon: <SiMongodb className="w-5 h-5 text-[#47A248]" /> },
      { name: 'Firestore', level: 7 },
    ],
  },
  {
    category: 'Data Analytics',
    icon: <FiMonitor className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'Tableau', level: 7, icon: <FaChartBar className="w-5 h-5 text-[#E97627]" /> },
      { name: 'Power BI', level: 7, icon: <FaMicrosoft className="w-5 h-5 text-[#F2C811]" /> },
      { name: 'Excel', level: 8 },
    ],
  },
  {
    category: 'Server & Deployment',
    icon: <FiServer className="w-6 h-6 text-[#FF6B6B]" />,
    items: [
      { name: 'Django', level: 8, icon: <SiDjango className="w-5 h-5 text-[#092E20]" /> },
      { name: 'Node.js', level: 8 },
      { name: 'Express', level: 7 },
    ],
  },
];

// Dynamically import the 3D components with no SSR to avoid window is not defined errors
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

// Type for skill item
interface SkillItem {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

// Type for skill category
interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0E1824] to-[#1A2837] text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1A2837] to-[#FF6B6B]">
            About Me
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            I'm a passionate developer with expertise in web development, data science, and cloud technologies.
            Here's a quick overview of my technical skills and experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-[500px] w-full"
            >
              <SkillsGlobe />
            </motion.div>

            {/* Learning Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#1A2837] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-[#2D3E50] hover:border-[#FF6B6B] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B6B] flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Learning Journey
              </h3>
              <div className="space-y-4">
                <div className="relative pl-6 border-l-2 border-[#FF6B6B] space-y-4">
                  <div className="absolute w-3 h-3 bg-[#FF6B6B] rounded-full -left-[7px] top-1"></div>
                  <div>
                    <h4 className="font-medium">2023 - Present</h4>
                    <p className="text-sm text-gray-300">Advanced Full-Stack Development</p>
                    <p className="text-xs text-gray-400">Mastering Next.js, TypeScript, and cloud architecture</p>
                  </div>
                  
                  <div className="absolute w-3 h-3 bg-[#FF6B6B] rounded-full -left-[7px] top-20"></div>
                  <div>
                    <h4 className="font-medium">2021 - 2023</h4>
                    <p className="text-sm text-gray-300">Frontend Specialization</p>
                    <p className="text-xs text-gray-400">Deep dive into React ecosystem and state management</p>
                  </div>
                  
                  <div className="absolute w-3 h-3 bg-[#FF6B6B] rounded-full -left-[7px] top-40"></div>
                  <div>
                    <h4 className="font-medium">2019 - 2021</h4>
                    <p className="text-sm text-gray-300">Full-Stack Foundations</p>
                    <p className="text-xs text-gray-400">JavaScript, Node.js, and database fundamentals</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[#2D3E50] bg-opacity-50 rounded-lg">
                  <p className="text-sm font-medium">Currently Learning:</p>
                  <p className="text-sm text-gray-300">Rust, WebAssembly, and advanced cloud architectures</p>
                </div>
              </div>
            </motion.div>

            {/* Coding Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#1A2837] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-[#2D3E50] hover:border-[#FF6B6B] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B6B] flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Coding Stats
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-[#2D3E50] rounded-lg">
                    <p className="text-2xl font-bold text-[#FF6B6B]">5+</p>
                    <p className="text-xs text-gray-400">Years Experience</p>
                  </div>
                  <div className="p-3 bg-[#2D3E50] rounded-lg">
                    <p className="text-2xl font-bold text-[#FF6B6B]">100+</p>
                    <p className="text-xs text-gray-400">Projects</p>
                  </div>
                  <div className="p-3 bg-[#2D3E50] rounded-lg">
                    <p className="text-2xl font-bold text-[#FF6B6B]">50K+</p>
                    <p className="text-xs text-gray-400">Lines of Code</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>JavaScript/TypeScript</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-[#2D3E50] rounded-full h-2">
                    <div className="bg-[#FF6B6B] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Python</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-[#2D3E50] rounded-full h-2">
                    <div className="bg-[#FF6B6B] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1A2837] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-[#2D3E50] hover:border-[#FF6B6B] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B6B] flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Tech Philosophy
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-[#2D3E50] bg-opacity-50 rounded-lg">
                  <p className="text-sm italic text-gray-300">"Write code that is easy to delete, not easy to extend."</p>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B]">→</span>
                    <span>Focus on clean, maintainable, and self-documenting code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B]">→</span>
                    <span>Prioritize user experience and performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B]">→</span>
                    <span>Continuous learning and knowledge sharing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B6B]">→</span>
                    <span>Strong opinions, weakly held</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Beyond Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1A2837] bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-[#2D3E50] hover:border-[#FF6B6B] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#FF6B6B] flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Beyond Code
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Hobbies & Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs">Photography</span>
                    <span className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs">Hiking</span>
                    <span className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs">Open Source</span>
                    <span className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs">Reading</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Tech Communities</h4>
                  <div className="flex flex-wrap gap-2">
                    <a href="#" className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs hover:bg-[#FF6B6B] transition-colors">Dev.to</a>
                    <a href="#" className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs hover:bg-[#FF6B6B] transition-colors">GitHub</a>
                    <a href="#" className="px-3 py-1 bg-[#2D3E50] rounded-full text-xs hover:bg-[#FF6B6B] transition-colors">Stack Overflow</a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">My Skills</h2>
              <p className="text-gray-300 mb-6">
                I've worked with a variety of technologies in the web development and data science world.
                Here are some of the technologies I'm proficient in:
              </p>
            </div>

            <div className="space-y-6">
              {skills.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="bg-[#1A2837] bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-[#2D3E50] hover:border-[#FF6B6B] transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#1A2837] rounded-lg mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{category.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-[#2D3E50] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FF6B6B] rounded-full"
                              style={{ width: `${item.level * 10}%` }}
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-400 w-8">{item.level}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default AboutPage;
