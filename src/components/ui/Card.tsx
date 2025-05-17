import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
  date?: string;
  category?: string;
  className?: string;
  children?: React.ReactNode;
  type?: 'project' | 'blog';
  demoUrl?: string;
  githubUrl?: string;
}

export const Card = ({
  title,
  description,
  href,
  image,
  tags = [],
  date,
  category,
  className = '',
  children,
  type = 'blog',
  demoUrl,
  githubUrl
}: CardProps) => {
  return (
    <motion.article 
      className={`group flex flex-col h-full overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#FF6B6B]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF6B6B]/10 ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={href} className="block">
        {image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white mb-4 ml-4 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 transition-colors rounded-full">
                {type === 'project' ? 'View Project' : 'Read More'}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          {date && (
            <div className="flex items-center text-sm text-[#FF6B6B] mb-3">
              <svg className="mr-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}</span>
            </div>
          )}
          
          <h3 className="text-xl font-bold leading-tight text-white mb-3 line-clamp-2">
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {description}
          </p>
        </div>

        {(tags.length > 0 || type === 'project') && (
          <div className="mt-4 pt-4 border-t border-white/10">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {type === 'project' && (
              <div className="flex gap-2 mt-3">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Code
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 rounded-lg transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {children}
    </motion.article>
  );
};

export default Card;
