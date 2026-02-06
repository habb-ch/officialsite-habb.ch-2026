import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

const faqTable = process.env.SUPABASE_FAQ_TABLE || 'Faq'

export async function POST(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { data: faq, error: fetchError } = await supabase
      .from(faqTable)
      .select('visible')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Supabase fetch FAQ error:', fetchError)
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    const { data: updatedFaq, error: updateError } = await supabase
      .from(faqTable)
      .update({ visible: !faq?.visible })
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedFaq) {
      console.error('Supabase toggle visibility error:', updateError)
      return NextResponse.json({ error: 'Failed to toggle visibility' }, { status: 500 })
    }

    return NextResponse.json({ faq: updatedFaq })
  } catch (error) {
    console.error('Toggle visibility error:', error)
    return NextResponse.json({ error: 'Failed to toggle visibility' }, { status: 500 })
  }
}
