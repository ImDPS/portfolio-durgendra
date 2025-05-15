'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Durgendra
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="px-3 py-2 text-gray-700 hover:text-primary dark:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="px-3 py-2 text-gray-700 hover:text-primary dark:text-gray-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="px-3 py-2 text-gray-700 hover:text-primary dark:text-gray-200">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="px-3 py-2 text-gray-700 hover:text-primary dark:text-gray-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="ml-4 md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col bg-white px-4 py-2 dark:bg-gray-900">
            <li>
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-primary dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-primary dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="block py-2 text-gray-700 hover:text-primary dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-primary dark:text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header; 