import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Ensure Supabase is configured
    if (!process.env.SUPABASE_URL || !(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY)) {
      console.error('Supabase not configured: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing')
      return NextResponse.json({ error: 'Supabase not configured on server' }, { status: 500 })
    }
    const body = await request.json()
    console.log('API /api/contact received body:', body)
    const { name, email, company, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in Supabase
    const table = process.env.SUPABASE_CONTACT_TABLE || 'ContactSubmission'
    const { data, error } = await supabase.from(table).insert([
      { name, email, company, subject, message },
    ]).select()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    const created = Array.isArray(data) ? data[0] : data
    console.log('Saved contact submission id=', created?.id)

    return NextResponse.json({ success: true, id: created?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
