import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

const faqTable = process.env.SUPABASE_FAQ_TABLE || 'Faq'

// Update FAQ
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from(faqTable)
      .update({
        questionEn: body.questionEn,
        questionDe: body.questionDe || null,
        answerEn: body.answerEn,
        answerDe: body.answerDe || null,
        order: body.order || 0,
        visible: body.visible ?? true,
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      console.error('Supabase update FAQ error:', error)
      return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
    }

    return NextResponse.json({ faq: data })
  } catch (error) {
    console.error('Update FAQ error:', error)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

// Delete FAQ
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { error } = await supabase.from(faqTable).delete().eq('id', id)
    if (error) {
      console.error('Supabase delete FAQ error:', error)
      return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete FAQ error:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}

// Get single FAQ
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { data, error } = await supabase.from(faqTable).select('*').eq('id', id).single()

    if (error) {
      console.error('Supabase fetch FAQ error:', error)
      return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    return NextResponse.json({ faq: data })
  } catch (error) {
    console.error('Get FAQ error:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 })
  }
}
