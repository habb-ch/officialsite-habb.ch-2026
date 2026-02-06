'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-habb-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left hover:text-swiss-red transition-colors"
      >
        <span className="text-lg font-semibold text-habb-gray-900 pr-4">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-habb-gray-500 flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180 text-swiss-red'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        )}
      >
        <p className="text-habb-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

interface FAQListProps {
  faqs: Array<{
    id: string
    question: string
    answer: string
  }>
}

export function FAQList({ faqs }: FAQListProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null)

  return (
    <div className="bg-white rounded-2xl border border-habb-gray-200 divide-y divide-habb-gray-200">
      {faqs.map((faq) => (
        <div key={faq.id} className="px-8">
          <FAQItem
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.id}
            onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
          />
        </div>
      ))}
    </div>
  )
}
