import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import GradientSection from '@/components/ui/GradientSection';
import Image from 'next/image';

const blogPosts = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    content: `Next.js is a powerful React framework that enables you to build fast, SEO-friendly, and user-friendly web applications. In this post, we'll explore the basics of getting started with Next.js and why it's a great choice for your next project.\n\n## Why Choose Next.js?\n\nNext.js offers several advantages over a plain React application:\n\n- **Server-side rendering (SSR)** - Improves performance and SEO\n- **Static site generation (SSG)** - Pre-renders pages at build time for even faster loading\n- **File-based routing** - Simplifies navigation structure\n- **API Routes** - Build API endpoints within your Next.js app\n- **Image Optimization** - Automatic image optimization with the Image component\n- **Zero Config** - Works out of the box with sensible defaults\n\n## Setting Up Your First Next.js Project\n\nGetting started with Next.js is straightforward. Here's how you can create your first project:\n\n\`\`\`bash\nnpx create-next-app@latest my-next-app\ncd my-next-app\nnpm run dev\n\`\`\`\n\nThis will create a new Next.js project and start the development server. You can access your application at http://localhost:3000.\n\n## Conclusion\n\nNext.js provides a powerful framework for building modern web applications with React. Its built-in features for performance optimization, routing, and server-side rendering make it an excellent choice for both small and large-scale projects.`,
  },
  {
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS',
    date: '2023-07-20',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    content: `Tailwind CSS has revolutionized the way developers approach styling web applications. With its utility-first approach, Tailwind allows you to build complex, responsive layouts without leaving your HTML or JSX.\n\n## Why Utility-First CSS?\n\n- **Faster development** - No need to switch between HTML and CSS files\n- **Consistency** - Predefined design constraints help maintain a consistent UI\n- **Responsive by default** - Built-in responsive utility variants\n- **Smaller file sizes in production** - PurgeCSS removes unused styles\n\n## Essential Tailwind Techniques\n\n### 1. Responsive Design\n\nTailwind makes responsive design straightforward with breakpoint prefixes.\n\n### 2. Dark Mode\n\nImplementing dark mode is simple with Tailwind's dark variant.\n\n### 3. Custom Utilities with @apply\n\nWhen you find yourself repeatedly using the same utility combinations, you can extract them into custom utility classes using @apply.\n\n## Advanced Tailwind Configuration\n\nExplore the Tailwind docs for more advanced configuration tips!`,
  },
  {
    slug: 'building-3d-experiences',
    title: 'Building 3D Experiences with React Three Fiber',
    date: '2023-08-10',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    content: `React Three Fiber brings the power of Three.js to React, enabling you to create immersive 3D experiences on the web.\n\n## Why 3D on the Web?\n\n- **Engagement**: 3D elements can make your site more interactive and engaging.\n- **Visualization**: Great for data, products, and creative portfolios.\n\n## Getting Started\n\nInstall the necessary packages and start building your first 3D scene!\n\n## Tips\n\n- Use Drei for helpers and abstractions.\n- Optimize performance for complex scenes.\n- Combine with GSAP or Framer Motion for animation.`,
  },
  {
    slug: 'animation-techniques',
    title: 'Animation Techniques for Modern Web Apps',
    date: '2023-09-05',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    content: `Modern web apps rely on smooth, engaging animations to enhance user experience.\n\n## Animation Libraries\n\n- **GSAP**: Powerful timeline-based animations.\n- **Framer Motion**: Declarative animations for React.\n- **Three.js**: 3D and WebGL animations.\n\n## Best Practices\n\n- Keep animations purposeful and not distracting.\n- Use motion to guide user attention.\n- Test performance on all devices.`,
  },
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <MotionPage className="py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <MotionSection>
            <MotionItem>
              <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">{post.title}</h1>
            </MotionItem>
            <MotionItem delay={0.1}>
              <div className="mb-6">
                <Image src={post.image} alt={post.title} width={800} height={400} className="rounded-xl w-full object-cover" />
              </div>
              <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              </div>
              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </MotionItem>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
} 