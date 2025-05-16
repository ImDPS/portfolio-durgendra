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
import PageLayout from '@/components/layout/PageLayout';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
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
  
  const onSubmit = async (data: any) => {
    console.log(data);
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form data:', data);
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
    <PageLayout fullWidth>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h1 className="mb-8 text-3xl font-bold md:text-4xl lg:text-5xl">
            Get in Touch
          </h1>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-primary text-xl" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:dpsmad999@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  dpsmad999@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-primary text-xl" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <a href="tel:+919131706915" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  (+91) 9131706915
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Raipur, Chhattisgarh, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaLinkedin className="text-primary text-xl" />
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <a 
                  href="https://linkedin.com/in/durgendra-pratap-singh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  durgendra-pratap-singh
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaGithub className="text-primary text-xl" />
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <a 
                  href="https://github.com/ImDPS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  ImDPS
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message', { required: 'Message is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message as string}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* 3D Avatar */}
      <div className="mt-12 h-[400px]">
        <ContactAvatar />
      </div>
    </PageLayout>
  );
}