'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Textarea, Card, CardContent, CardHeader } from '@/components/ui'
import { Save, ArrowLeft, Globe } from 'lucide-react'
import Link from 'next/link'

interface FaqFormProps {
  faq?: {
    id: string
    questionEn: string
    questionDe: string | null
    answerEn: string
    answerDe: string | null
    order: number
    visible: boolean
  }
}

export function FaqForm({ faq }: FaqFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'en' | 'de'>('en')
  const [formData, setFormData] = useState({
    questionEn: faq?.questionEn || '',
    questionDe: faq?.questionDe || '',
    answerEn: faq?.answerEn || '',
    answerDe: faq?.answerDe || '',
    order: faq?.order || 0,
    visible: faq?.visible ?? true,
  })

  function handleChange(field: string, value: string | number | boolean) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = faq 
        ? `/api/admin/faqs/${faq.id}` 
        : '/api/admin/faqs'
      
      const response = await fetch(url, {
        method: faq ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/dashboard/faqs')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving FAQ:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/faqs">
            <Button variant="ghost" type="button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h2 className="text-2xl font-semibold text-habb-gray-900">
            {faq ? 'Edit FAQ' : 'New FAQ'}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => handleChange('visible', e.target.checked)}
              className="w-4 h-4 rounded border-habb-gray-300 text-swiss-red focus:ring-swiss-red"
            />
            <span className="text-sm font-medium text-habb-gray-700">Visible</span>
          </label>
          <Button type="submit" isLoading={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {faq ? 'Update' : 'Create'}
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
                  id="questionEn"
                  label="Question"
                  value={formData.questionEn}
                  onChange={(e) => handleChange('questionEn', e.target.value)}
                  required
                />
                <Textarea
                  id="answerEn"
                  label="Answer"
                  value={formData.answerEn}
                  onChange={(e) => handleChange('answerEn', e.target.value)}
                  rows={6}
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
                  id="questionDe"
                  label="Frage"
                  value={formData.questionDe}
                  onChange={(e) => handleChange('questionDe', e.target.value)}
                />
                <Textarea
                  id="answerDe"
                  label="Antwort"
                  value={formData.answerDe}
                  onChange={(e) => handleChange('answerDe', e.target.value)}
                  rows={6}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-habb-gray-900">Settings</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                id="order"
                label="Display Order"
                type="number"
                value={formData.order}
                onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
              />
              <p className="text-sm text-habb-gray-500">
                Lower numbers appear first
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
