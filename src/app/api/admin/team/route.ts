import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, position, imageUrl, order = 0, visible = true } = body

    if (!name || !position || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert into Supabase
    const table = process.env.SUPABASE_TEAM_TABLE || 'TeamMember'
    const { data, error } = await supabase.from(table).insert([
      { name, position, imageUrl, order, visible },
    ]).select()

    if (error) {
      console.error('Supabase insert team member error:', error)
      return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
    }

    const member = Array.isArray(data) ? data[0] : data
    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Create team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const table = process.env.SUPABASE_TEAM_TABLE || 'TeamMember'
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Supabase fetch team members error:', error)
      return NextResponse.json({ members: [] })
    }

    return NextResponse.json({ members: data || [] })
  } catch (error) {
    console.error('List team members error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
