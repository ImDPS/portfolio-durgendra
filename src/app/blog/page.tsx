'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import GradientSection from '@/components/ui/GradientSection';
import { motion } from 'framer-motion';
import { cardVariants, staggerContainer } from '@/utils/animations';

// Helper function to format dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// This would typically come from Contentlayer but for demo purposes, we'll use mock data
const posts = [
  {
    title: 'Getting Started with Next.js',
    description: 'Learn how to build modern web applications with Next.js',
    date: new Date('2023-06-15'),
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    tags: ['nextjs', 'react', 'javascript'],
    url: '/blog/getting-started-with-nextjs',
  },
  {
    title: 'Mastering Tailwind CSS',
    description: 'Tips and tricks for building beautiful interfaces with Tailwind CSS',
    date: new Date('2023-07-20'),
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tags: ['css', 'tailwind', 'frontend'],
    url: '/blog/mastering-tailwind-css',
  },
  {
    title: 'Building 3D Experiences with React Three Fiber',
    description: 'Create immersive 3D experiences on the web using React and Three.js',
    date: new Date('2023-08-10'),
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tags: ['three.js', 'react', '3d'],
    url: '/blog/building-3d-experiences',
  },
  {
    title: 'Animation Techniques for Modern Web Apps',
    description: 'Learn advanced animation techniques using GSAP and Framer Motion',
    date: new Date('2023-09-05'),
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    tags: ['animation', 'gsap', 'framer-motion'],
    url: '/blog/animation-techniques',
  },
];

export default function BlogPage() {
  return (
    <MotionPage className="py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-6xl">
          <MotionSection>
            <MotionItem>
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">Blog</h1>
            </MotionItem>
            
            <MotionItem delay={0.1}>
              <p className="mb-8 max-w-3xl text-lg text-gray-700 dark:text-gray-300">
                Thoughts, ideas, and tutorials about web development, design, and technology.
              </p>
            </MotionItem>
          </MotionSection>
          
          <GradientSection className="mb-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.length === 0 ? (
                <p className="text-center col-span-full py-12 text-gray-500 dark:text-gray-400">
                  No posts available yet. Check back soon!
                </p>
              ) : (
                posts.map((post, index) => (
                  <MotionItem key={post.url} delay={index * 0.1}>
                    <article
                      className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Link href={post.url} className="block h-full">
                        <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={`${post.title} cover image`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col h-full">
                          <div className="mb-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <time dateTime={post.date.toISOString()}>
                              {formatDate(post.date)}
                            </time>
                          </div>
                          <h2 className="mb-2 text-xl font-semibold leading-tight text-gray-900 dark:text-white">
                            {post.title}
                          </h2>
                          <p className="mb-4 text-gray-600 dark:text-gray-400">
                            {post.description}
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    </article>
                  </MotionItem>
                ))
              )}
            </div>
          </GradientSection>
          
          <MotionSection delay={0.3}>
            <MotionItem>
              <h2 className="mb-4 text-2xl font-bold">Newsletter</h2>
            </MotionItem>
            
            <MotionItem delay={0.1}>
              <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                Subscribe to my newsletter to receive updates on new blog posts and projects.
              </p>
            </MotionItem>
            
            <MotionItem delay={0.2}>
              <form className="flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  required
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-6 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Subscribe
                </button>
              </form>
            </MotionItem>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
} 