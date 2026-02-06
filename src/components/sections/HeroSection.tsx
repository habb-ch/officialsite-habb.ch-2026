import Link from 'next/link'
import { Button } from '@/components/ui'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  locale: Locale
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = getTranslations(locale)

  return (
    <section className="relative bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #DA291C 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Swiss cross watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[600px] h-[600px]">
          <rect x="160" y="40" width="80" height="320" fill="#DA291C" />
          <rect x="40" y="160" width="320" height="80" fill="#DA291C" />
        </svg>
      </div>

      <div className="container-wide section-padding relative">
        <div className="max-w-4xl">
          <h1 className="text-habb-gray-900 mb-6 animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-habb-gray-600 mb-10 max-w-2xl animate-slide-up">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href={`/${locale}/services`}>
              <Button size="lg">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button variant="outline" size="lg">
                {t('home.hero.secondary')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
