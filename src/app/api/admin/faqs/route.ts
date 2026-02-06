import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

// Create FAQ
export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    const table = process.env.SUPABASE_FAQ_TABLE || 'Faq'
    const { data, error } = await supabase.from(table).insert([
      {
        questionEn: body.questionEn,
        questionDe: body.questionDe || null,
        answerEn: body.answerEn,
        answerDe: body.answerDe || null,
        order: body.order || 0,
        visible: body.visible ?? true,
      },
    ]).select()

    if (error) {
      console.error('Supabase insert FAQ error:', error)
      return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
    }

    const faq = Array.isArray(data) ? data[0] : data
    return NextResponse.json({ faq })
  } catch (error) {
    console.error('Create FAQ error:', error)
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    )
  }
}

// Get all FAQs
export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const table = process.env.SUPABASE_FAQ_TABLE || 'Faq'
    const { data, error } = await supabase.from(table).select('*').order('order', { ascending: true })

    if (error) {
      console.error('Supabase fetch faqs error:', error)
      return NextResponse.json({ faqs: [] })
    }

    return NextResponse.json({ faqs: data || [] })
  } catch (error) {
    console.error('Get FAQs error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    )
  }
}
