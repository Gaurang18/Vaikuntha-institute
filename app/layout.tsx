import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster as SonnerToaster } from 'sonner';
import { AnimatedLayout } from '@/components/layout/animated-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Vaikuntha Institute - Excellence in Education',
    template: '%s | Vaikuntha Institute'
  },
  description: 'A premier online learning platform offering high-quality courses in various disciplines. Join our community of learners and transform your career.',
  keywords: ['online learning', 'education', 'courses', 'e-learning', 'professional development'],
  authors: [{ name: 'Vaikuntha Institute' }],
  creator: 'Vaikuntha Institute',
  publisher: 'Vaikuntha Institute',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vaikuntha.institute'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaikuntha.institute',
    title: 'Vaikuntha Institute - Excellence in Education',
    description: 'A premier online learning platform offering high-quality courses in various disciplines.',
    siteName: 'Vaikuntha Institute',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaikuntha Institute - Excellence in Education',
    description: 'A premier online learning platform offering high-quality courses in various disciplines.',
    creator: '@vaikunthainst',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <AnimatedLayout>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </AnimatedLayout>
            <Toaster />
            <SonnerToaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}