import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, Button } from '@/components/ui'
import { Plus, Edit, Eye, EyeOff, Trash2, GripVertical } from 'lucide-react'
import { DeleteFaqButton } from './DeleteFaqButton'
import { ToggleVisibilityButton } from './ToggleVisibilityButton'

// Always fetch fresh data
export const revalidate = 0
export const dynamic = 'force-dynamic'

async function getFaqs() {
  try {
    const table = process.env.SUPABASE_FAQ_TABLE || 'Faq'
    const { data, error } = await supabase.from(table).select('*').order('order', { ascending: true })
    if (error) {
      console.error('Supabase fetch faqs error:', error)
      return []
    }
    return data || []
  } catch (err) {
    console.error('getFaqs error:', err)
    return []
  }
}

export default async function FaqsPage() {
  const faqs = await getFaqs()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-habb-gray-900">FAQs</h2>
          <p className="text-habb-gray-600">Manage frequently asked questions</p>
        </div>
        <Link href="/admin/dashboard/faqs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New FAQ
          </Button>
        </Link>
      </div>

      {/* FAQs List */}
      {faqs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-habb-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-habb-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-habb-gray-900 mb-2">No FAQs yet</h3>
            <p className="text-habb-gray-600 mb-4">Create your first FAQ to get started</p>
            <Link href="/admin/dashboard/faqs/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create FAQ
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="divide-y divide-habb-gray-200">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="p-6 hover:bg-habb-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="text-habb-gray-400 cursor-move">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-habb-gray-500">#{index + 1}</span>
                      <h3 className="font-semibold text-habb-gray-900 truncate">
                        {faq.questionEn}
                      </h3>
                      {faq.visible ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Visible
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-habb-gray-100 text-habb-gray-600 text-xs font-medium rounded-full flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-habb-gray-600 line-clamp-2">
                      {faq.answerEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ToggleVisibilityButton faqId={faq.id} visible={faq.visible} />
                    <Link href={`/admin/dashboard/faqs/${faq.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <DeleteFaqButton faqId={faq.id} question={faq.questionEn} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
