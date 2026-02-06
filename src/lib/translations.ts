import en from '@/locales/en.json'
import de from '@/locales/de.json'
import { Locale } from './i18n'

const translations = { en, de }

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type TranslationKey = NestedKeyOf<typeof en>

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  
  // If the resolved value is a string, return it directly.
  // If it's an array or object, return a JSON string so callers
  // that expect structured data can parse it (e.g. JSON.parse).
  if (typeof current === 'string') return current

  try {
    return JSON.stringify(current)
  } catch (e) {
    return path
  }
}

export function getTranslations(locale: Locale) {
  const dict = translations[locale] || translations.en
  
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = getNestedValue(dict as Record<string, unknown>, key)
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue))
      })
    }
    
    return value
  }
}

export function useTranslations(locale: Locale) {
  return getTranslations(locale)
}
