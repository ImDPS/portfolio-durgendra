import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Layout from '@/components/layout/Layout';
import dynamic from 'next/dynamic';

// Dynamically import ParticleBackground with no SSR
const ParticleBackground = dynamic(
  () => import('@/components/3d/ParticleBackground'),
  { ssr: false }
);

// Manrope configuration (commented out for future reference)
// const manrope = Manrope({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-manrope"
// });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Durgendra Portfolio",
  description: "Professional portfolio showcasing projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} min-h-screen antialiased bg-transparent`}>
        <ThemeProvider>
          {/* Particle Background */}
          <div className="fixed inset-0 -z-10">
            <ParticleBackground />
          </div>
          
          {/* Semi-transparent overlay to ensure text readability */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0E1824]/70 to-[#1A2837]/70" />
          
          {/* Main content */}
          <div className="relative z-10 min-h-screen">
            <div className="bg-gradient-to-b from-transparent via-[#0E1824]/30 to-transparent">
              <Layout>{children}</Layout>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
