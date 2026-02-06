import { notFound } from 'next/navigation'
import { FaqForm } from '../FaqForm'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: { id: string }
}

const faqTable = process.env.SUPABASE_FAQ_TABLE || 'Faq'

async function getFaq(id: string) {
  try {
    const { data, error } = await supabase.from(faqTable).select('*').eq('id', id).single()
    if (error) {
      console.error('Supabase fetch FAQ error:', error)
      return null
    }
    return data
  } catch (error) {
    console.error('Fetch FAQ error:', error)
    return null
  }
}

export default async function EditFaqPage({ params }: PageProps) {
  const faq = await getFaq(params.id)

  if (!faq) {
    notFound()
  }

  return <FaqForm faq={faq} />
}
