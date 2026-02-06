'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Textarea, Card, CardContent, CardHeader } from '@/components/ui'
import { Save, ArrowLeft, Globe } from 'lucide-react'
import Link from 'next/link'
import { slugify } from '@/lib/utils'

interface PostFormProps {
  post?: {
    id: string
    slug: string
    titleEn: string
    titleDe: string | null
    excerptEn: string | null
    excerptDe: string | null
    contentEn: string
    contentDe: string | null
    imageUrl: string | null
    imageAlt: string | null
    metaTitleEn: string | null
    metaTitleDe: string | null
    metaDescEn: string | null
    metaDescDe: string | null
    published: boolean
  }
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'en' | 'de'>('en')
  const [formData, setFormData] = useState({
    slug: post?.slug || '',
    titleEn: post?.titleEn || '',
    titleDe: post?.titleDe || '',
    excerptEn: post?.excerptEn || '',
    excerptDe: post?.excerptDe || '',
    contentEn: post?.contentEn || '',
    contentDe: post?.contentDe || '',
    imageUrl: post?.imageUrl || '',
    imageAlt: post?.imageAlt || '',
    metaTitleEn: post?.metaTitleEn || '',
    metaTitleDe: post?.metaTitleDe || '',
    metaDescEn: post?.metaDescEn || '',
    metaDescDe: post?.metaDescDe || '',
    published: post?.published || false,
  })

  // Sync form state when `post` prop changes (client navigation)
  useEffect(() => {
    setFormData({
      slug: post?.slug || '',
      titleEn: post?.titleEn || '',
      titleDe: post?.titleDe || '',
      excerptEn: post?.excerptEn || '',
      excerptDe: post?.excerptDe || '',
      contentEn: post?.contentEn || '',
      contentDe: post?.contentDe || '',
      imageUrl: post?.imageUrl || '',
      imageAlt: post?.imageAlt || '',
      metaTitleEn: post?.metaTitleEn || '',
      metaTitleDe: post?.metaTitleDe || '',
      metaDescEn: post?.metaDescEn || '',
      metaDescDe: post?.metaDescDe || '',
      published: post?.published || false,
    })
  }, [post])

  function handleChange(field: string, value: string | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Auto-generate slug from English title
    if (field === 'titleEn' && !post) {
      setFormData((prev) => ({ ...prev, slug: slugify(value as string) }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = post 
        ? `/api/admin/posts/${post.id}` 
        : '/api/admin/posts'
      
      const response = await fetch(url, {
        method: post ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/dashboard/posts')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/posts">
            <Button variant="ghost" type="button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h2 className="text-2xl font-semibold text-habb-gray-900">
            {post ? 'Edit Post' : 'New Post'}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange('published', e.target.checked)}
              className="w-4 h-4 rounded border-habb-gray-300 text-swiss-red focus:ring-swiss-red"
            />
            <span className="text-sm font-medium text-habb-gray-700">Published</span>
          </label>
          <Button type="submit" isLoading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {post ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Tabs */}
          <div className="flex gap-2 border-b border-habb-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'en'
                  ? 'border-swiss-red text-swiss-red'
                  : 'border-transparent text-habb-gray-600 hover:text-habb-gray-900'
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('de')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'de'
                  ? 'border-swiss-red text-swiss-red'
                  : 'border-transparent text-habb-gray-600 hover:text-habb-gray-900'
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Deutsch
            </button>
          </div>

          {/* English Content */}
          {activeTab === 'en' && (
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-habb-gray-900">English Content</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  id="titleEn"
                  label="Title"
                  value={formData.titleEn}
                  onChange={(e) => handleChange('titleEn', e.target.value)}
                  required
                />
                <Textarea
                  id="excerptEn"
                  label="Excerpt"
                  value={formData.excerptEn}
                  onChange={(e) => handleChange('excerptEn', e.target.value)}
                  rows={3}
                />
                <Textarea
                  id="contentEn"
                  label="Content (HTML)"
                  value={formData.contentEn}
                  onChange={(e) => handleChange('contentEn', e.target.value)}
                  rows={15}
                  required
                />
              </CardContent>
            </Card>
          )}

          {/* German Content */}
          {activeTab === 'de' && (
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-habb-gray-900">German Content</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  id="titleDe"
                  label="Titel"
                  value={formData.titleDe}
                  onChange={(e) => handleChange('titleDe', e.target.value)}
                />
                <Textarea
                  id="excerptDe"
                  label="Auszug"
                  value={formData.excerptDe}
                  onChange={(e) => handleChange('excerptDe', e.target.value)}
                  rows={3}
                />
                <Textarea
                  id="contentDe"
                  label="Inhalt (HTML)"
                  value={formData.contentDe}
                  onChange={(e) => handleChange('contentDe', e.target.value)}
                  rows={15}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-habb-gray-900">Post Settings</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                id="slug"
                label="URL Slug"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                required
              />
              <Input
                id="imageUrl"
                label="Featured Image URL"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://..."
              />
              <Input
                id="imageAlt"
                label="Image Alt Text"
                value={formData.imageAlt}
                onChange={(e) => handleChange('imageAlt', e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-habb-gray-900">SEO Settings</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === 'en' ? (
                <>
                  <Input
                    id="metaTitleEn"
                    label="Meta Title (EN)"
                    value={formData.metaTitleEn}
                    onChange={(e) => handleChange('metaTitleEn', e.target.value)}
                  />
                  <Textarea
                    id="metaDescEn"
                    label="Meta Description (EN)"
                    value={formData.metaDescEn}
                    onChange={(e) => handleChange('metaDescEn', e.target.value)}
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <Input
                    id="metaTitleDe"
                    label="Meta Title (DE)"
                    value={formData.metaTitleDe}
                    onChange={(e) => handleChange('metaTitleDe', e.target.value)}
                  />
                  <Textarea
                    id="metaDescDe"
                    label="Meta Description (DE)"
                    value={formData.metaDescDe}
                    onChange={(e) => handleChange('metaDescDe', e.target.value)}
                    rows={3}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
