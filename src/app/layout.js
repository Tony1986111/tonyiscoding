import { Inter, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import StructuredData from '@/components/StructuredData';
import './globals.css'

// Define fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Tony Ye | Frontend Developer & IT Enthusiast',
  description: 'Personal website of Tony Ye, showcasing frontend development projects, coding journey, and technical blog posts.',
  keywords: ['frontend developer', 'web development', 'React', 'Next.js', 'portfolio', 'blog'],
  authors: [{ name: 'Tony Ye', url: 'https://tonyiscoding.xyz' }],
  creator: 'Tony Ye',
  publisher: 'Tony Ye',
  openGraph: {
    title: 'Tony Ye | Frontend Developer & IT Enthusiast',
    description: 'Personal website of Tony Ye, showcasing frontend development projects, coding journey, and technical blog posts.',
    url: 'https://tonyiscoding.xyz',
    siteName: 'Tony Ye',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tony Ye | Frontend Developer & IT Enthusiast',
    description: 'Personal website of Tony Ye, showcasing frontend development projects, coding journey, and technical blog posts.',
    creator: '@alei198634',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
