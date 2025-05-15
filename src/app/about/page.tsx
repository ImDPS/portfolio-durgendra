import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Durgendra Portfolio',
  description: 'Learn more about Durgendra, skills, experience, and background',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">About Me</h1>
          
          <div className="mb-12">
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              I'm a passionate web developer with a focus on creating fast, accessible, and user-friendly digital experiences.
              With expertise in modern frontend and backend technologies, I strive to build applications that are not only
              functional but also provide exceptional user experiences.
            </p>
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              My journey in web development started over 5 years ago, and since then I've worked on various projects ranging
              from small business websites to complex web applications. I'm constantly learning and adapting to new technologies
              to stay at the forefront of the ever-evolving web development landscape.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Skills & Expertise</h2>
            
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">Frontend Development</h3>
              <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">React</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Next.js</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">TypeScript</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Tailwind CSS</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Framer Motion</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">GSAP</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Three.js</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">WebGL</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">Backend Development</h3>
              <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Node.js</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Express</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">MongoDB</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">PostgreSQL</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">GraphQL</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">REST APIs</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">Firebase</li>
                <li className="rounded-md bg-gray-100 px-3 py-1 dark:bg-gray-800">AWS</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Work Philosophy</h2>
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              I believe in writing clean, maintainable, and well-documented code. My approach to web development
              centers around these core principles:
            </p>
            <ul className="mb-4 list-inside list-disc space-y-2 text-lg text-gray-700 dark:text-gray-300">
              <li>Prioritizing accessibility and inclusivity</li>
              <li>Building with performance in mind from the start</li>
              <li>Creating responsive designs that work across all devices</li>
              <li>Following best practices and industry standards</li>
              <li>Continuously learning and improving my skills</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
} 