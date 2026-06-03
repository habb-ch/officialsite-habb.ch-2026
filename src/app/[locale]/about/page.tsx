import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { buildPageMetadata } from '@/lib/seo'
import { organizationLd, aboutPageLd, breadcrumbLd, personLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/JsonLd'
import { CTASection } from '@/components/sections'
import { Target, Heart, Lightbulb, Shield, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: Promise<{ locale: string }>
}

// Always fetch live team data
export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  const meta = buildPageMetadata({
    locale: locale as Locale,
    path: '/about',
    title: t('about.metaTitle'),
    description: t('about.metaDescription'),
  })

  meta.title = { absolute: t('about.metaTitle') }
  meta.keywords =
    locale === 'de'
      ? [
          'Habb Switzerland',
          'IT-Unternehmen Schweiz',
          'Softwareentwicklung Schweiz',
          'KI-Automatisierung Schweiz',
          'ERP für KMU',
          'IT-Partner KMU Schweiz',
        ]
      : [
          'Habb Switzerland',
          'IT company Switzerland',
          'software development Switzerland',
          'AI automation Switzerland',
          'ERP for SMEs',
        ]

  return meta
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)
  // Fetch team members from Supabase
  const { data: teamMembersData, error: teamError } = await supabase
    .from('TeamMember')
    .select('*')
    .eq('visible', true)
    .order('order', { ascending: true })

  if (teamError) {
    console.error('Supabase fetch team members error:', teamError)
  }

  const teamMembers = Array.isArray(teamMembersData) ? teamMembersData : []

  const offerings = [
    {
      title: t('nav.habbOne'),
      description: t('services.habbOne.teaserText'),
      href: `/${locale}/services/habb-one`,
    },
    {
      title: t('nav.smartmail'),
      description: t('services.smartmail.tagline'),
      href: `/${locale}/services/ai-solutions`,
    },
    {
      title: t('nav.services'),
      description: t('services.hero.subtitle'),
      href: `/${locale}/services`,
    },
  ]

  const values = [
    {
      icon: Target,
      title: t('about.values.precision.title'),
      description: t('about.values.precision.description'),
    },
    {
      icon: Shield,
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description'),
    },
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
    },
    {
      icon: Heart,
      title: t('about.values.integrity.title'),
      description: t('about.values.integrity.description'),
    },
  ]

  return (
    <>
      <JsonLd
        data={[
          organizationLd(locale),
          aboutPageLd(locale),
          breadcrumbLd(locale, [
            { name: t('nav.home'), path: '' },
            { name: t('nav.about'), path: '/about' },
          ]),
          ...teamMembers.map((m) =>
            personLd({ name: m.name, jobTitle: m.position, image: m.imageUrl })
          ),
        ]}
      />
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-6">{t('about.hero.title')}</h1>
            <p className="text-xl text-habb-gray-600">{t('about.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-habb-gray-900 mb-8">{t('about.story.title')}</h2>
              <div className="space-y-6 text-lg text-habb-gray-600 leading-relaxed">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
                <p>{t('about.story.p4')}</p>
              </div>
            </div>
            <div className="relative">
              {/* Decorative Swiss element */}
              <div className="aspect-square bg-habb-gray-100 rounded-3xl flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-48 h-48">
                  <rect x="10" y="10" width="180" height="180" rx="20" fill="#DA291C" />
                  <rect x="80" y="30" width="40" height="140" fill="white" />
                  <rect x="30" y="80" width="140" height="40" fill="white" />
                </svg>
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-habb-gray-100">
                <div className="text-4xl font-bold text-swiss-red mb-1">4+</div>
                <div className="text-habb-gray-600 font-medium">{t('home.about.stat1')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-habb-gray-900 mb-4">{t('about.values.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-habb-gray-200 hover:border-swiss-red/30 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-swiss-red/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-swiss-red" />
                </div>
                <h3 className="text-xl font-semibold text-habb-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-habb-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-swiss-red mb-4">{t('about.team.title')}</p>
              <h2 className="text-4xl font-semibold text-habb-gray-900 mb-4">
                {t('about.team.subtitle')}
              </h2>
              <p className="text-habb-gray-600 max-w-2xl mx-auto">
                {t('about.team.intro')}
              </p>
            </div>
            {teamMembers.length === 2 ? (
              <div className="flex flex-col md:flex-row justify-center gap-10">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-habb-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow w-full md:w-96">
                    <div className="relative w-full h-72">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-lg font-semibold text-habb-gray-900">{member.name}</p>
                      <p className="text-sm text-swiss-red font-medium">{member.position}</p>
                      {member.degree && (
                        <p className="text-sm text-habb-gray-700 mt-1">{member.degree}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-habb-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                    <div className="relative w-full h-72">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-lg font-semibold text-habb-gray-900">{member.name}</p>
                      <p className="text-sm text-swiss-red font-medium">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Offerings / internal links */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <h2 className="text-habb-gray-900 mb-4">{t('about.offerings.title')}</h2>
            <p className="text-lg text-habb-gray-600 leading-relaxed">
              {t('about.offerings.intro')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <Link
                key={index}
                href={offering.href}
                className="group bg-white rounded-2xl p-8 border border-habb-gray-200 hover:border-swiss-red/30 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-habb-gray-900 mb-3 group-hover:text-swiss-red transition-colors">
                  {offering.title}
                </h3>
                <p className="text-habb-gray-600 leading-relaxed mb-4">
                  {offering.description}
                </p>
                <span className="inline-flex items-center text-swiss-red font-medium text-sm">
                  {t('about.offerings.linkLabel')}
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  )
}
