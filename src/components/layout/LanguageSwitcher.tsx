'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Locale, localeNames, locales } from '@/lib/i18n'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50 rounded-lg transition-colors"
      >
        <Globe size={18} />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-habb-gray-200 py-1 animate-slide-down">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                'w-full px-4 py-2 text-left text-sm font-medium transition-colors',
                loc === locale
                  ? 'text-swiss-red bg-swiss-red/5'
                  : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
              )}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
