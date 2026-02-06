import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

interface FooterProps {
  locale: Locale
}

export function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale)
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/services`, label: t('nav.services') },
    { href: `/${locale}/blog`, label: t('nav.blog') },
    { href: `/${locale}/faq`, label: t('nav.faq') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
  ]

  const legalLinks = [
    { href: `/${locale}/privacy`, label: t('footer.privacy') },
    { href: `/${locale}/terms`, label: t('footer.terms') },
  ]

  return (
    <footer className="bg-habb-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <Link href={`/${locale}`} className="inline-block flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Habb.ch Logo"
                  width={80}
                  height={24}
                  className="h-8 w-auto"
                />
                <span className="text-lg font-semibold text-white">Habb<span className="text-swiss-red">.ch</span></span>
              </Link>
            </div>
            <p className="text-habb-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-habb-gray-400">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              {t('footer.swiss')}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-habb-gray-400 hover:text-swiss-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-habb-gray-400 hover:text-swiss-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.info.title')}</h3>
            <div className="space-y-3 text-sm text-habb-gray-400">
              <p>Habb.ch AG</p>
              <p>Sonnheimstrasse 6</p>
              <p>3415 Ruegsauschachen, {t('contact.office.country')}</p>
              <p className="pt-2">
                <a href="tel:+41799239772" className="hover:text-swiss-red transition-colors">
                  +41 79 923 97 72
                </a>
              </p>
              <p>
                <a href="mailto:info@habb.ch" className="hover:text-swiss-red transition-colors">
                  info@habb.ch
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-habb-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-habb-gray-400">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <Link
            href="/admin/login"
            className="text-sm text-habb-gray-500 hover:text-habb-gray-400 transition-colors"
          >
            {t('footer.adminLogin')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
