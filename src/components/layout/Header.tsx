'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn } from '@/lib/utils'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(locale)

  const navItems = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/services`, label: t('nav.services') },
    { href: `/${locale}/blog`, label: t('nav.blog') },
    { href: `/${locale}/faq`, label: t('nav.faq') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ]

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-habb-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'text-swiss-red bg-swiss-red/5'
                    : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            
            <button
              className="lg:hidden p-2 text-habb-gray-700 hover:bg-habb-gray-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-habb-gray-100 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    isActive(item.href)
                      ? 'text-swiss-red bg-swiss-red/5'
                      : 'text-habb-gray-700 hover:text-swiss-red hover:bg-habb-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
