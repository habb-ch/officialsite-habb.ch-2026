export type Locale = 'en' | 'de'

export const locales: Locale[] = ['en', 'de']
export const defaultLocale: Locale = 'de'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
