'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FiArrowLeft } from 'react-icons/fi';

// Dynamically import the 3D animation with no SSR
const NotFoundAnimation = dynamic(
  () => import('@/components/3d/NotFoundAnimation'),
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-[#0E1824]" /> }
);

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center text-white">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10">
        <NotFoundAnimation />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0E1824]/90 via-[#0E1824]/70 to-[#1A2837]/90" />
      
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 -z-10 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] sm:text-[12rem]">
                404
              </h1>
              <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/20 blur-xl"></div>
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Oops! Page Not Found
            </h2>
            <p className="mx-auto max-w-md text-lg text-gray-300">
              The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B6B]/30"
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-sm text-gray-400"
          >
            <p>Error code: 404 | Page not found</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
