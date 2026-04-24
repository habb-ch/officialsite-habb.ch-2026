import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const now = new Date()

  const routes = [
    '',
    '/about',
    '/services',
    '/services/ai-solutions',
    '/services/smartmail',
    '/blog',
    '/faq',
    '/contact',
  ]

  const locales = ['en', 'de']

  const sitemapEntries: MetadataRoute.Sitemap = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return sitemapEntries
}
