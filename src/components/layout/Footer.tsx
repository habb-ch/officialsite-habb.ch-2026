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
              <p>Habb.ch</p>
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

          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61588447195711" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-habb-gray-400 hover:text-swiss-red transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.2-3.3 3-3.3.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 2.9h-1.9v7A10 10 0 0022 12z" />
                </svg>
              </a>

              <a href="https://www.linkedin.com/company/habb-swiss/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-habb-gray-400 hover:text-swiss-red transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.7-.7-1.7-1.6 0-.9.7-1.6 1.8-1.6s1.7.7 1.7 1.6c0 .9-.7 1.6-1.8 1.6zm13.5 10.3h-3v-4.8c0-1.2-.4-2-1.4-2-0.8 0-1.3.5-1.6 1v5.8h-3v-9h3v1.3c.4-.6 1.1-1.3 2.6-1.3 1.8 0 3.4 1.2 3.4 4v5z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/habbswiss/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-habb-gray-400 hover:text-swiss-red transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.5.6.6.3 1 .7 1.4 1.4.3.5.5 1.3.6 2.5.1 1.3.1 1.8.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.6 2.5-.3.6-.7 1-1.4 1.4-.5.3-1.3.5-2.5.6-1.3.1-1.8.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.5-.6-.6-.3-1-.7-1.4-1.4-.3-.5-.5-1.3-.6-2.5C2.2 15.6 2.2 15.1 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .6-2.5.3-.6.7-1 1.4-1.4.5-.3 1.3-.5 2.5-.6C8.4 2.2 8.9 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.5-1.1 1-.2.4-.3 1-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.5.8 1.1 1 .4.2 1 .3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.5 1.1-1 .2-.4.3-1 .4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.5-.8-1.1-1-.4-.2-1-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zM12 7.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 1.8a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm5-2.4a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
                </svg>
              </a>
            </div>

            <Link
              href="/admin/login"
              className="text-sm text-habb-gray-500 hover:text-habb-gray-400 transition-colors"
            >
              {t('footer.adminLogin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
