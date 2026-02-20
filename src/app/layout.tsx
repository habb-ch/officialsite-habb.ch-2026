import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Habb.ch | Swiss Excellence in Technology',
    template: '%s | Habb.ch',
  },
  description: 'Enterprise-grade technology solutions built with Swiss precision, reliability, and innovation.',
  keywords: ['Swiss technology', 'cloud services', 'enterprise solutions', 'cybersecurity', 'consulting'],
  authors: [{ name: 'Habb.ch' }],
  creator: 'Habb.ch',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_CH',
    alternateLocale: 'de_CH',
    siteName: 'Habb.ch',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  twitter: {
    card: 'summary_large_image',
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
