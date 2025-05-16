'use client';

import PageLayout from '@/components/layout/PageLayout';
import MotionItem from '@/components/motion/MotionItem';
import GradientSection from '@/components/ui/GradientSection';
import SkillsGlobe from '@/components/3d/SkillsGlobe';
import InteractiveAvatar from '@/components/3d/InteractiveAvatar';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaDownload } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <PageLayout fullWidth>
      <div className="mb-8 w-full flex justify-center">
        <InteractiveAvatar />
      </div>
      
      <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
        About Me
      </h1>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-8 text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <svg className="text-primary w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 10 6a2.5 2.5 0 0 1 0 5.5z" /></svg> Raipur, Chhattisgarh, India
        </div>
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <svg className="text-primary w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 6.94a1.5 1.5 0 0 1 2.12 0l4.94 4.94 4.94-4.94a1.5 1.5 0 1 1 2.12 2.12l-6 6a1.5 1.5 0 0 1-2.12 0l-6-6a1.5 1.5 0 0 1 0-2.12z" /></svg> <a href="mailto:dpsmad999@gmail.com" className="hover:underline">dpsmad999@gmail.com</a>
        </div>
        <div className="flex items-center gap-2">
          <svg className="text-primary w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h13A1.5 1.5 0 0 1 18 3.5v13A1.5 1.5 0 0 1 16.5 18h-13A1.5 1.5 0 0 1 2 16.5v-13zm2 0v13h12v-13H4zm6 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm8 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm8 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /></svg> <span className="select-all">(+91) 9131706915</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/Durgendra_Pratap_Singh_Resume.md" download className="flex items-center gap-1 text-primary hover:underline"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7h-2V3H9v4H7l3 3 3-3zm-2 6v-2H9v2H5v2h10v-2h-4z" /></svg> Download Resume (.md)</a>
        </div>
      </div>
      
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
        Results-driven Data Scientist and Team Lead with 5+ years of experience delivering sophisticated solutions in machine learning, geospatial analysis, and full-stack development. Expert in leading complex projects across agriculture, manufacturing, and power sectors, including AI-driven disease detection, geospatial visualization platforms, and automated petition systems. Recognized for achieving significant efficiency gains and cost reductions through innovative use of cloud technologies and data analytics.
      </p>
      <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
        I'm passionate about building impactful technology for agriculture, manufacturing, and power sectors, and thrive on solving complex problems with data and code.
      </p>

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
    </PageLayout>
  );
} 