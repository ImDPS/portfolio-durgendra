import { motion } from 'framer-motion';
import MotionSection from '../motion/MotionSection';
import MotionItem from '../motion/MotionItem';

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export const NewsletterSection = ({
  title = "Stay Updated",
  description = "Subscribe to my newsletter to receive updates on new blog posts, projects, and insights.",
  className = '',
  children
}: NewsletterSectionProps) => {
  return (
    <MotionSection className={`mt-24 ${className}`}>
      <div className="relative bg-[#1A2837] p-8 rounded-2xl border border-white/10 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF6B6B]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FF6B6B]/5 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-3xl mx-auto text-center z-10">
          <MotionItem>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B6B]">
              {title}
            </h2>
          </MotionItem>
          
          <MotionItem delay={0.1}>
            <p className="mb-8 text-lg text-gray-300">
              {description}
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
            {children}
          </MotionItem>
        </div>
      </div>
    </MotionSection>
  );
};

export default NewsletterSection;
