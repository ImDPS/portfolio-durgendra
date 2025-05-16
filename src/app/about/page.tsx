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
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaDownload } from 'react-icons/fa';

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
            <MotionItem delay={0.1}>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-8 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <FaMapMarkerAlt className="text-primary" /> Raipur, Chhattisgarh, India
                </div>
                <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <FaEnvelope className="text-primary" /> <a href="mailto:dpsmad999@gmail.com" className="hover:underline">dpsmad999@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-primary" /> <span className="select-all">(+91) 9131706915</span>
                </div>
                <div className="flex items-center gap-2">
                  <a href="/Durgendra_Pratap_Singh_Resume.pdf" download className="flex items-center gap-1 text-primary hover:underline"><FaDownload /> Download Resume</a>
                </div>
              </div>
            </MotionItem>
            <MotionItem delay={0.2}>
              <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
                Results-driven Data Scientist and Team Lead with over 5 years of experience delivering sophisticated solutions in machine learning, geospatial analysis, and full-stack development. I’m passionate about building impactful technology for agriculture, manufacturing, and power sectors, and thrive on solving complex problems with data and code.
              </p>
            </MotionItem>
          </MotionSection>

          <GradientSection className="mb-12">
            <MotionItem>
              <h2 className="mb-4 text-2xl font-bold">Technical Skills</h2>
            </MotionItem>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Web Development</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>React, NextJS, React Native, Django</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Geospatial Tools</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>OpenLayer, GeoServer, PostGIS, Maplibre GL JS, Deck.gl</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ML/DL Libraries</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>Scikit-Learn, SciPy, NumPy, Pandas, TensorFlow, PyTorch, OpenCV</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">DBMS</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>PostgreSQL, Firebase, MongoDB</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Programming Languages</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>Python, JavaScript, R, HTML, CSS, SQL</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Visualization</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>Tableau, Power BI</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ETL Tools</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>Talend, KNIME Analytics Tool</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cloud Platforms</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>Google Cloud Platform, Amazon Web Service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Hardware Prototyping</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  <li>Arduino Uno, Raspberry Pi</li>
                </ul>
              </div>
            </div>
            <SkillsGlobe />
          </GradientSection>

          <GradientSection className="mb-12">
            <MotionItem>
              <h2 className="mb-4 text-2xl font-bold">Education</h2>
            </MotionItem>
            <div className="mb-4">
              <div className="font-semibold">Dr. SPM International Institute of Information Technology, Naya Raipur, India</div>
              <div>Bachelors of Technology, Computer Science, 2015–2019</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">Amresh Sharma Public School, Dhanora, Chhattisgarh, India</div>
              <div>Intermediate, Percentage: 81.00%</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold">M. L. Jain Higher Secondary School, Sakti, Chhattisgarh, India</div>
              <div>Matriculation, Percentage: 85.00%</div>
            </div>
          </GradientSection>
        </div>
      </Container>
    </MotionPage>
  );
} 