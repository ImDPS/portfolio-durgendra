import Link from 'next/link';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Durgendra</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data Scientist & Full-Stack Engineer specializing in modern web technologies and frameworks.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/durgendra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/ImDPS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400"
                aria-label="GitHub Profile"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary dark:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary dark:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-primary dark:text-gray-400">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary dark:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="h-4 w-4 text-primary" />
                <a href="mailto:dpsmad999@gmail.com" className="hover:text-primary">
                  dpsmad999@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="h-4 w-4 text-primary" />
                <span>Raipur, Chhattisgarh, India</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaPhoneAlt className="h-4 w-4 text-primary" />
                <span className="select-all">(+91) 9131706915</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Subscribe to my newsletter for updates on new projects and articles.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Durgendra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 