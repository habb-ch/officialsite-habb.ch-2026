import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { supabase } from '@/lib/supabase'
import { formatDate, getLocalizedContent, truncate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui'
import { ArrowRight, Calendar, User } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

// Always fetch fresh blog data
export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)
  
  return {
    title: t('blog.title'),
    description: t('blog.subtitle'),
  }
}

async function getPosts() {
  try {
    const table = process.env.SUPABASE_POST_TABLE || 'Post'
    const { data, error } = await supabase.from(table).select('*').eq('published', true).order('createdAt', { ascending: false })
    if (error) {
      console.error('Supabase fetch posts error:', error)
      return []
    }
    const posts = data || []

    // resolve authors
    const userTable = process.env.SUPABASE_USER_TABLE || 'User'
    const authorIds = Array.from(new Set(posts.filter((p: any) => p.authorId).map((p: any) => p.authorId)))
    let authorsMap: Record<string, any> = {}
    if (authorIds.length > 0) {
      const { data: users, error: usersErr } = await supabase.from(userTable).select('id,name').in('id', authorIds)
      if (usersErr) console.error('Supabase fetch authors error:', usersErr)
      if (Array.isArray(users)) {
        authorsMap = users.reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {})
      }
    }

    return posts.map((p: any) => ({ ...p, author: authorsMap[p.authorId] || null }))
  } catch (err) {
    console.error('getPosts error:', err)
    return []
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)
  const posts = await getPosts()

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-6">{t('blog.title')}</h1>
            <p className="text-xl text-habb-gray-600">{t('blog.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-habb-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-habb-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-habb-gray-900 mb-2">
                {t('blog.noPosts')}
              </h3>
              <p className="text-habb-gray-600">
                {locale === 'de' ? 'Schauen Sie bald wieder vorbei!' : 'Check back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const title = getLocalizedContent(post.titleEn, post.titleDe, locale)
                const excerpt = getLocalizedContent(post.excerptEn, post.excerptDe, locale)

                return (
                  <Link key={post.id} href={`/${locale}/blog/${post.slug}`}>
                    <Card hover className="h-full flex flex-col">
                      {post.imageUrl && (
                        <div className="aspect-video bg-habb-gray-100 rounded-t-xl overflow-hidden">
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-habb-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.createdAt, locale)}
                          </span>
                          {post.author?.name && (
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author.name}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-semibold text-habb-gray-900 mb-3 group-hover:text-swiss-red transition-colors">
                          {title}
                        </h2>
                        {excerpt && (
                          <p className="text-habb-gray-600 mb-4 flex-grow">
                            {truncate(excerpt, 150)}
                          </p>
                        )}
                        <span className="inline-flex items-center text-swiss-red font-medium text-sm">
                          {t('blog.readMore')}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
