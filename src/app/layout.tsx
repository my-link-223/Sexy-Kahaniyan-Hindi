import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AgeGateModal } from '@/components/age-gate-modal';

export const metadata: Metadata = {
  title: 'Erotic Tales',
  description: 'Daily-updated adult content platform with sensual Hindi stories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
          <AgeGateModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
