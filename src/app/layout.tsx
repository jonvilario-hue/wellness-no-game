
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/hooks/use-theme';
import { TrainingFocusProvider } from '@/hooks/use-training-focus';

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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TrainingFocusProvider>
            {children}
            <Toaster />
          </TrainingFocusProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
