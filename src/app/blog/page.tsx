'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import { motion } from 'framer-motion';
import styles from './gradientBackground.module.css';
// Inline SVG Icons with updated coral pink color
const ArrowRightIcon = () => (
  <svg className="inline ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="mr-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TagIcon = () => (
  <svg className="text-[#FF6B6B] mt-0.5 mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
  </svg>
);
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
    <div className={styles.gradientBackground}>
      <MotionPage className="py-12 md:py-20">
        <div className={styles.content}>
          <Container>
            <div className="max-w-7xl mx-auto">
              <MotionSection>
              <MotionItem>
                <div className="text-center mb-16">
                  <div className="relative inline-block">
                    <motion.h1 
                      className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Blog & Articles
                    </motion.h1>
                    <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/20 blur-xl"></div>
                  </div>
                  <motion.p 
                    className="text-lg max-w-2xl mx-auto text-gray-300 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Thoughts, stories and ideas about software development, design, and more.
                  </motion.p>
                </div>
              </MotionItem>
            </MotionSection>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.length === 0 ? (
                <p className="text-center col-span-full py-12 text-gray-500 dark:text-gray-400">
                  No posts available yet. Check back soon!
                </p>
              ) : (
                posts.map((post, index) => (
                  <MotionItem key={post.url} delay={index * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <motion.article
                        className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#4BF795]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4BF795]/10"
                        whileHover={{ scale: 1.02 }}
                      >
                      <Link href={post.url} className="flex flex-col h-full">
                        <div className="relative aspect-video overflow-hidden">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={`${post.title} cover image`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0E1824] to-[#1A2837]">
                              <span className="text-gray-400">No image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <span className="inline-block px-4 py-2 text-sm font-medium text-white mb-4 ml-4 bg-[#FF6B6B] text-white rounded-full">
                              Read Article <ArrowRightIcon />
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-center text-sm text-[#FF6B6B] mb-3">
                            <CalendarIcon />
                            <time dateTime={post.date.toISOString()}>
                              {formatDate(post.date)}
                            </time>
                          </div>
                          <h2 className="text-xl font-bold leading-tight text-white mb-3 line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-gray-300 mb-4 line-clamp-3">
                            {post.description}
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-white/10">
                              <TagIcon />
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20">
                                  +{post.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                      </motion.article>
                    </motion.div>
                  </MotionItem>
                ))
              )}
            </div>
            
            <MotionSection delay={0.3} className="mt-24">
              <div className="relative bg-[#1A2837] p-8 rounded-2xl border border-white/10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF6B6B]/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF6B6B]/5 rounded-full filter blur-3xl"></div>
                
                <div className="relative max-w-3xl mx-auto text-center z-10">
                  <MotionItem>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B6B]">
                      Stay Updated
                    </h2>
                  </MotionItem>
                  
                  <MotionItem delay={0.1}>
                    <p className="mb-8 text-lg text-gray-300">
                      Subscribe to my newsletter to receive updates on new blog posts, projects, and insights.
                    </p>
                  </MotionItem>
                  
                  <MotionItem delay={0.2}>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 rounded-lg bg-white/5 border border-white/10 px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-200"
                        required
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FF6B6B]/90 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF6B6B]/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 focus:ring-offset-[#1A2837]"
                      >
                        Subscribe
                      </button>
                    </form>
                  </MotionItem>
                </div>
              </div>
              </MotionSection>
            </div>
          </Container>
        </div>
      </MotionPage>
    </div>
  );
}