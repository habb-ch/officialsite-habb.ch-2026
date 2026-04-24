import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://habb.ch'
  
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

  const sitemapEntries = routes.flatMap((route) => 
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          de: `${baseUrl}/de${route}`,
        },
      }
    }))
  )

  return sitemapEntries
}
