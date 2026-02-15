
import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { TrainingFocusProvider } from '@/hooks/use-training-focus';
import { TrainingOverrideProvider } from '@/hooks/use-training-override.tsx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Note: We are intentionally NOT using the main ThemeProvider here
// to keep this layout as minimal as possible for embedding.
// It will default to the standard theme defined in globals.css.

export const metadata: Metadata = {
  title: 'Polymath Lab - Embedded Game',
  robots: 'noindex, nofollow', // Prevent search engines from indexing embed pages
};

// This is a minimal layout for embeddable pages.
// It removes all global navigation, headers, and footers.
export default function EmbedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        {/* The component needs these providers to function */}
        <TrainingFocusProvider>
          <TrainingOverrideProvider>
            {children}
            <Toaster />
          </TrainingOverrideProvider>
        </TrainingFocusProvider>
      </body>
    </html>
  );
}
