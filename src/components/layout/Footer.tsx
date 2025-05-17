import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

// Simple text-based icon replacement
const IconText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    {children}
  </span>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0E1824] text-gray-300 pt-16 pb-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FF6B6B]">
              Durgendra
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Crafting exceptional digital experiences with modern web technologies and innovative solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <motion.a
                href="https://github.com/ImDPS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <IconText>GH</IconText>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/durgendra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <IconText>IN</IconText>
              </motion.a>
              <motion.a
                href="mailto:dpsmad999@gmail.com"
                className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <IconText>@</IconText>
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FF6B6B] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <IconText className="text-[#FF6B6B] mt-0.5 mr-3 flex-shrink-0">@</IconText>
                <a 
                  href="mailto:dpsmad999@gmail.com" 
                  className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300"
                >
                  dpsmad999@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <IconText className="text-[#FF6B6B] mt-0.5 mr-3 flex-shrink-0">📍</IconText>
                <span className="text-gray-400">Raipur, Chhattisgarh, India</span>
              </div>
              <div className="flex items-center">
                <IconText className="text-[#FF6B6B] mt-0.5 mr-3 flex-shrink-0">📞</IconText>
                <a href="tel:+919131706915" className="text-gray-400 hover:text-[#FF6B6B] transition-colors duration-300">
                  (+91) 9131706915
                </a>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Subscribe to my newsletter for updates on new projects and articles.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white shadow-sm focus:border-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="rounded-md bg-[#FF6B6B] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#FF5252] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/50"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500">
            {currentYear} Durgendra. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Built with Next.js, Tailwind CSS, and React
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;