'use client';

import { ReactNode } from 'react';
import Container from '@/components/ui/Container';
import MotionPage from '@/components/motion/MotionPage';
import MotionSection from '@/components/motion/MotionSection';
import MotionItem from '@/components/motion/MotionItem';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showHero?: boolean;
  heroComponent?: ReactNode;
  fullWidth?: boolean;
}

export default function PageLayout({ 
  children, 
  className = '', 
  showHero = false,
  heroComponent,
  fullWidth = false
}: PageLayoutProps) {
  return (
    <MotionPage className="py-12 md:py-20">
      {/* Hero Section if needed */}
      {showHero && (
        <div className="relative overflow-hidden mb-24">
          <div className="absolute inset-0 w-full h-[700px] md:h-[750px] lg:h-[800px]">
            {heroComponent}
          </div>
        </div>
      )}

      {/* Main Content */}
      <Container>
        <div className={`mx-auto ${fullWidth ? 'max-w-7xl' : 'max-w-5xl'}`}>
          <MotionSection>
            <MotionItem>
              {children}
            </MotionItem>
          </MotionSection>
        </div>
      </Container>
    </MotionPage>
  );
} 