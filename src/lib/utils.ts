import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string, locale: string = 'en'): string {
  const d = new Date(date)
  return d.toLocaleDateString(locale === 'de' ? 'de-CH' : 'en-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getLocalizedContent<T>(
  contentEn: T,
  contentDe: T | null | undefined,
  locale: string
): T {
  if (locale === 'de' && contentDe) return contentDe
  return contentEn
}
