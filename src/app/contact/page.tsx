'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';
import MotionButton from '@/components/motion/MotionButton';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionPage className="min-h-screen bg-gradient-to-b from-[#0E1824] to-[#1A2837] py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-6xl">
          <MotionSection className="mb-16">
            <MotionItem>
              <div className="mb-12 text-center">
                <motion.h1 
                  className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#1A2837] to-[#FF6B6B]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Get in Touch
                </motion.h1>
                <motion.p 
                  className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Have a project in mind or just want to say hello? I'd love to hear from you.
                </motion.p>
              </div>
            </MotionItem>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <MotionItem>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <h2 className="mb-6 text-2xl font-bold text-white">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-[#FF6B6B]/10 p-3">
                        <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Location</h3>
                        <p className="text-gray-400">Raipur, Chhattisgarh, India</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-[#FF6B6B]/10 p-3">
                        <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Email</h3>
                        <a href="mailto:dpsmad999@gmail.com" className="text-[#FF6B6B] hover:underline">dpsmad999@gmail.com</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="rounded-lg bg-[#FF6B6B]/10 p-3">
                        <svg className="h-6 w-6 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Phone</h3>
                        <a href="tel:+919131706915" className="text-gray-400 transition-colors hover:text-[#FF6B6B]">+91 91317 06915</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="mb-4 font-medium text-white">Follow Me</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://linkedin.com/in/durgendra" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="rounded-lg bg-white/5 p-3 transition-colors hover:bg-[#FF6B6B]/20"
                        aria-label="LinkedIn"
                      >
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.77s.78-1.77 1.75-1.77 1.75.79 1.75 1.77-.78 1.77-1.75 1.77zm13.5 12.27h-3v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3v-11h2.87v1.57h.04c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.23z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://github.com/durgendra" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="rounded-lg bg-white/5 p-3 transition-colors hover:bg-[#FF6B6B]/20"
                        aria-label="GitHub"
                      >
                        <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </MotionItem>

              {/* Contact Form */}
              <MotionItem delay={0.1}>
                {submitSuccess ? (
                  <motion.div 
                    className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6 rounded-full bg-[#4CAF50]/10 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-white">Message Sent!</h2>
                    <p className="mb-8 max-w-md text-gray-300">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    <MotionButton 
                      variant="primary" 
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-[#FF6B6B] text-white hover:bg-[#FF6B6B]/90"
                    >
                      Send Another Message
                    </MotionButton>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-sm text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] ${
                            errors.message ? 'border-red-500' : ''
                          }`}
                          placeholder="How can I help you?"
                          value={formData.message}
                          onChange={handleChange}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                        />
                        {errors.message && (
                          <p id="message-error" className="mt-1 text-sm text-red-400">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="md:col-span-2">
                        <motion.button
                          type="submit"
                          className="w-full bg-[#FF6B6B] py-3 px-6 text-white rounded-md font-medium transition-colors duration-200 hover:bg-[#FF6B6B]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] focus:ring-offset-[#0E1824] disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg className="-ml-1 mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            'Send Message'
                          )}
                        </motion.button>
                      </div>

                      {submitError && (
                        <div className="md:col-span-2 mt-4 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700 dark:text-red-200">{submitError}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </MotionItem>
            </div>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
};

export default ContactPage;
