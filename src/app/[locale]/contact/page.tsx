import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { ContactForm } from '@/components/ContactForm'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)
  
  return {
    title: t('contact.title'),
    description: t('contact.subtitle'),
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const formLabels = {
    name: t('contact.form.name'),
    Phone: t('contact.form.phone'),
    email: t('contact.form.email'),
    company: t('contact.form.company'),
    subject: t('contact.form.subject'),
    message: t('contact.form.message'),
    submit: t('contact.form.submit'),
    sending: t('contact.form.sending'),
    success: t('contact.form.success'),
    error: t('contact.form.error'),
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: 'Sonnheimstrasse 6, 3415 Rüegsauschachen',
      subValue: t('contact.office.country'),
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'info@habb.ch',
      href: 'mailto:info@habb.ch',
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+41 79 923 97 72',
      href: 'tel:+41440000000',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-habb-gray-600">{t('contact.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-habb-gray-50 rounded-2xl p-8 md:p-10">
                <ContactForm labels={formLabels} />
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-habb-gray-900 mb-6">
                  {t('contact.info.title')}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-swiss-red/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-swiss-red" />
                      </div>
                      <div>
                        <p className="text-sm text-habb-gray-500 mb-1">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-habb-gray-900 font-medium hover:text-swiss-red transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-habb-gray-900 font-medium">{item.value}</p>
                        )}
                        {item.subValue && (
                          <p className="text-habb-gray-600 text-sm">{item.subValue}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Swiss Quality Badge */}
              <div className="bg-habb-gray-900 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect x="2" y="2" width="36" height="36" rx="4" fill="#DA291C" />
                    <rect x="16" y="8" width="8" height="24" fill="white" />
                    <rect x="8" y="16" width="24" height="8" fill="white" />
                  </svg>
                </div>
                <p className="text-white font-medium">Swiss Quality</p>
                <p className="text-habb-gray-400 text-sm mt-1">Precision & Reliability</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
