import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'

interface RouteDef {
  path: string
  priority: number
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

// Canonical routes only — duplicate aliases (e.g. /services/smartmail,
// /services/ai-Solutions) are intentionally excluded and point here via
// rel=canonical to consolidate ranking signals.
const ROUTES: RouteDef[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/habb-one', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/ai-solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const now = new Date()

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}/de${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        'de-CH': `${baseUrl}/de${path}`,
        'en-CH': `${baseUrl}/en${path}`,
        'x-default': `${baseUrl}/de${path}`,
      },
    },
  }))
}
