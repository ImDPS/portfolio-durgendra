import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Layout from '@/components/layout/Layout';

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-50`}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
