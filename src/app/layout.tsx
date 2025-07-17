
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/hooks/use-theme';
import { TrainingFocusProvider } from '@/hooks/use-training-focus';
import { Header } from '@/components/header';
import { PageNav } from '@/components/page-nav';
import { MotivationalMessage } from '@/components/motivational-message';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Polymath Lab',
  description: 'AI-powered training to develop the mind of a polymath across 8 core domains.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <TrainingFocusProvider>
            <div className="sticky top-0 z-20">
              <Header />
              <PageNav />
            </div>
            <MotivationalMessage />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
                {children}
            </main>
            <Toaster />
          </TrainingFocusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
