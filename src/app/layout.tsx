import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Habb Switzerland | Leading AI & Tech Solutions in Switzerland',
    template: '%s | Habb Switzerland',
  },
  description: 'Habb Switzerland provides enterprise-grade technology and AI solutions built with Swiss precision, reliability, and innovation. Top class automation for Swiss companies.',
  keywords: ['Habb', 'Habb Switzerland', 'Habb Schweiz', 'habb.ch', 'Swiss technology', 'cloud services', 'enterprise AI solutions', 'cybersecurity', 'automation Switzerland', 'Zürich software company'],
  authors: [{ name: 'Habb Switzerland' }],
  creator: 'Habb Switzerland',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : new URL('https://www.habb.ch'),
  openGraph: {
    type: 'website',
    locale: 'en_CH',
    alternateLocale: 'de_CH',
    siteName: 'Habb Switzerland',
    title: 'Habb Switzerland | Tech & AI Solutions',
    description: 'Enterprise-grade technology solutions built with Swiss precision.',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habb Switzerland',
    description: 'Enterprise-grade technology solutions built with Swiss precision.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
