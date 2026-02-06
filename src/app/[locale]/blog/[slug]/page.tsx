import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { supabase } from '@/lib/supabase'
import { formatDate, getLocalizedContent } from '@/lib/utils'
import { Button } from '@/components/ui'
import { ArrowLeft, Calendar, User } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

// Always fetch fresh content and metadata
export const revalidate = 0
export const dynamic = 'force-dynamic'

async function getPost(slug: string) {
  try {
    const table = process.env.SUPABASE_POST_TABLE || 'Post'
    const { data, error } = await supabase.from(table).select('*').eq('slug', slug).eq('published', true).limit(1)
    if (error) {
      console.error('Supabase fetch post error:', error)
      return null
    }
    const post = Array.isArray(data) && data.length > 0 ? data[0] : null
    if (!post) return null

    // resolve author
    if (post.authorId) {
      const userTable = process.env.SUPABASE_USER_TABLE || 'User'
      const { data: users } = await supabase.from(userTable).select('id,name').eq('id', post.authorId).limit(1)
      if (Array.isArray(users) && users.length > 0) post.author = users[0]
    }

    return post
  } catch (err) {
    console.error('getPost error:', err)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  const title = getLocalizedContent(post.metaTitleEn || post.titleEn, post.metaTitleDe || post.titleDe, locale)
  const description = getLocalizedContent(post.metaDescEn || post.excerptEn, post.metaDescDe || post.excerptDe, locale)

  return {
    title,
    description: description || undefined,
    openGraph: {
      title,
      description: description || undefined,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const title = getLocalizedContent(post.titleEn, post.titleDe, locale)
  const content = getLocalizedContent(post.contentEn, post.contentDe, locale)

  return (
    <>
      {/* Back Link */}
      <div className="bg-habb-gray-50 border-b border-habb-gray-100">
        <div className="container-wide py-4">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center text-habb-gray-600 hover:text-swiss-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('blog.backToList')}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-habb-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {t('blog.publishedOn')} {formatDate(post.createdAt, locale)}
              </span>
              {post.author?.name && (
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {t('blog.by')} {post.author.name}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-habb-gray-900 mb-8">{title}</h1>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="aspect-video bg-habb-gray-100 rounded-2xl overflow-hidden mb-12">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt || title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-habb-gray-900 prose-p:text-habb-gray-600 prose-a:text-swiss-red prose-strong:text-habb-gray-900"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Share & Navigation */}
            <div className="mt-16 pt-8 border-t border-habb-gray-200">
              <Link href={`/${locale}/blog`}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('blog.backToList')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
