'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import MotionButton from '@/components/motion/MotionButton';
import GradientSection from '@/components/ui/GradientSection';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import ContactAvatar from '@/components/3d/ContactAvatar'; // This will be our new 3D component

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3 }
    }));
  }, [controls]);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Please enter a valid email address';
    if (formData.subject.length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form data:', formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitError('Something went wrong. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Particle animation for the background
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const particleChildVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  return (
    <MotionPage className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Animated background particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={particleVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            variants={particleChildVariants}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.5 + 0.8],
              transition: {
                repeat: Infinity,
                repeatType: 'reverse',
                duration: Math.random() * 5 + 5
              }
            }}
          />
        ))}
      </motion.div>
      
      <Container>
        <div className="mx-auto max-w-4xl text-center md:text-left">
          <MotionSection>
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              {/* Left Column - 3D Avatar and Contact Info */}
              <div className="w-full md:w-2/5 mb-10 md:mb-0">
                <MotionItem delay={0}>
                  <div className="mb-6 w-full flex justify-center md:justify-start">
                    {/* Replace with your actual 3D avatar component */}
                    <div className="h-64 w-64 relative">
                      <ContactAvatar />
                    </div>
                  </div>
                </MotionItem>
                
                <MotionItem delay={0.1}>
                  <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Let's Connect
                  </h1>
                </MotionItem>
                
                <MotionItem delay={0.2}>
                  <p className="mb-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Have a project in mind or just want to say hello? I'm always open to new opportunities and collaborations.
                  </p>
                </MotionItem>
                
                <MotionItem delay={0.3}>
                  <motion.div 
                    className="flex flex-col gap-4 text-gray-700 dark:text-gray-300"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    {/* Email */}
                    <motion.a 
                      href="mailto:dpsmad999@gmail.com" 
                      className="flex items-center gap-3 group"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <FaEnvelope className="text-primary w-5 h-5" />
                      </div>
                      <span className="group-hover:text-primary transition-colors">dpsmad999@gmail.com</span>
                    </motion.a>
                    
                    {/* Location */}
                    <motion.div 
                      className="flex items-center gap-3"
                      variants={fadeInUp}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <FaMapMarkerAlt className="text-primary w-5 h-5" />
                      </div>
                      <span>Raipur, Chhattisgarh, India</span>
                    </motion.div>
                    
                    {/* Phone */}
                    <motion.div 
                      className="flex items-center gap-3"
                      variants={fadeInUp}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <FaPhoneAlt className="text-primary w-5 h-5" />
                      </div>
                      <span className="select-all">(+91) 9131706915</span>
                    </motion.div>
                    
                    {/* Social Links Group */}
                    <motion.div 
                      className="flex items-center gap-4 mt-2"
                      variants={fadeInUp}
                    >
                      <a 
                        href="https://linkedin.com/in/durgendra" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200"
                        aria-label="LinkedIn Profile"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                      <a 
                        href="https://github.com/ImDPS" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200"
                        aria-label="GitHub Profile"
                      >
                        <FaGithub className="w-5 h-5" />
                      </a>
                    </motion.div>
                  </motion.div>
                </MotionItem>
              </div>
              
              {/* Right Column - Contact Form */}
              <div className="w-full md:w-3/5">
                <GradientSection className="p-6 md:p-8 rounded-xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
                  {submitSuccess ? (
                    <motion.div 
                      className="text-center py-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-green-500 mb-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Thank You!</h2>
                      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">Your message has been sent successfully.</p>
                      <MotionButton 
                        variant="outline"
                        size="lg"
                        onClick={() => setSubmitSuccess(false)}
                      >
                        Send Another Message
                      </MotionButton>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Name Field */}
                        <motion.div 
                          className="space-y-1"
                          custom={0}
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                        >
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className={`w-full rounded-lg border ${
                              errors.name ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors duration-200`}
                            placeholder="e.g., Jane Doe"
                            value={formData.name}
                            onChange={handleChange}
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                          />
                          {errors.name && (
                            <p id="name-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                              {errors.name}
                            </p>
                          )}
                        </motion.div>
                        
                        {/* Email Field */}
                        <motion.div 
                          className="space-y-1"
                          custom={1}
                          initial={{ opacity: 0, y: 20 }}
                          animate={controls}
                        >
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className={`w-full rounded-lg border ${
                              errors.email ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors duration-200`}
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                          />
                          {errors.email && (
                            <p id="email-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                              {errors.email}
                            </p>
                          )}
                        </motion.div>
                      </div>
                      
                      {/* Subject Field */}
                      <motion.div 
                        className="space-y-1"
                        custom={2}
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                      >
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          className={`w-full rounded-lg border ${
                            errors.subject ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors duration-200`}
                          placeholder="Regarding your project..."
                          value={formData.subject}
                          onChange={handleChange}
                          aria-invalid={errors.subject ? 'true' : 'false'}
                          aria-describedby={errors.subject ? 'subject-error' : undefined}
                        />
                        {errors.subject && (
                          <p id="subject-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                            {errors.subject}
                          </p>
                        )}
                      </motion.div>
                      
                      {/* Message Field */}
                      <motion.div 
                        className="space-y-1"
                        custom={3}
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                      >
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className={`w-full rounded-lg border ${
                            errors.message ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60 transition-colors duration-200`}
                          placeholder="Tell me about your project or query..."
                          value={formData.message}
                          onChange={handleChange}
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-1 text-xs text-red-500 dark:text-red-400">
                            {errors.message}
                          </p>
                        )}
                      </motion.div>
                      
                      {submitError && (
                        <motion.div 
                          className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700 dark:text-red-300">{submitError}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      <motion.div 
                        className="flex justify-end pt-2"
                        custom={4}
                        initial={{ opacity: 0, y: 20 }}
                        animate={controls}
                      >
                        <MotionButton
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                          className="w-full md:w-auto"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : 'Send Message'}
                        </MotionButton>
                      </motion.div>
                    </form>
                  )}
                </GradientSection>
              </div>
            </div>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
}