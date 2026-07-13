import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '../components/ThemeContext';
import { CommandPalette } from '../components/CommandPalette';
import { ScrollProgress } from '../components/ScrollProgress';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AIAssistant } from '../components/AIAssistant';
import { KonamiListener } from '../components/KonamiListener';
import { CustomCursor } from '../components/CustomCursor';
import { MeshBackground } from '../components/MeshBackground';
import { BackgroundMusic } from '../components/BackgroundMusic';

const inter = { variable: '--font-inter' };
const outfit = { variable: '--font-outfit' };

export const metadata: Metadata = {
  title: 'Abhay Kumar Bid — Frontend Developer & AI Enthusiast (ani.dev)',
  description: 'I don\'t just build websites. I build experiences that people remember. B.Tech CSE student at Roorkee Institute of Technology.',
  keywords: ['Abhay Kumar Bid', 'ani.dev', 'Frontend Developer', 'AI Enthusiast', 'RIT Roorkee', 'React Developer', 'Next.js Portfolio'],
  authors: [{ name: 'Abhay Kumar Bid' }],
  openGraph: {
    title: 'Abhay Kumar Bid — Portfolio Platform',
    description: 'I build interactive, premium digital experiences.',
    url: 'https://ani.dev',
    siteName: 'ani.dev',
    images: [
      {
        url: 'https://ani.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abhay Kumar Bid Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col pt-16 relative">
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <CommandPalette />
          <KonamiListener />
          <CustomCursor />
          <MeshBackground />
          <BackgroundMusic />
          
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            {children}
          </main>
          
          <Footer />
          <AIAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
