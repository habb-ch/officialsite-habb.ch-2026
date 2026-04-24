const PRODUCTION_SITE_URL = 'https://www.habb.ch'

export function getSiteUrl(): string {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!rawUrl) {
    return PRODUCTION_SITE_URL
  }

  try {
    const parsedUrl = new URL(rawUrl)
    const isLocalHost =
      parsedUrl.hostname === 'localhost' ||
      parsedUrl.hostname === '127.0.0.1' ||
      parsedUrl.hostname === '0.0.0.0'

    if (process.env.NODE_ENV === 'production' && isLocalHost) {
      return PRODUCTION_SITE_URL
    }

    return parsedUrl.origin
  } catch {
    return PRODUCTION_SITE_URL
  }
}