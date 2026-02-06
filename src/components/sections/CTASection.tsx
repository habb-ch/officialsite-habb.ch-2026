import Link from 'next/link'
import { Button } from '@/components/ui'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  locale: Locale
}

export function CTASection({ locale }: CTASectionProps) {
  const t = getTranslations(locale)

  return (
    <section className="section-padding bg-gradient-to-br from-swiss-red to-swiss-red-dark text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Swiss cross watermark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-[500px] h-[500px]">
          <rect x="160" y="40" width="80" height="320" fill="white" />
          <rect x="40" y="160" width="320" height="80" fill="white" />
        </svg>
      </div>

      <div className="container-wide relative text-center">
        <h2 className="text-white mb-6 max-w-3xl mx-auto">
          {t('home.cta.title')}
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {t('home.cta.description')}
        </p>
        <Link href={`/${locale}/contact`}>
          <Button
            variant="primary"
            size="lg"
            className="shadow-lg hover:shadow-xl transform-gpu hover:-translate-y-0.5 focus:ring-4 focus:ring-swiss-red/20"
          >
            {t('home.cta.button')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
