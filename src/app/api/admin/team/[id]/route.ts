import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface RouteParams {
  params: {
    id: string
  }
}

const teamTable = process.env.SUPABASE_TEAM_TABLE || 'TeamMember'

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { data, error } = await supabase
      .from(teamTable)
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Supabase fetch team member error:', error)
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    return NextResponse.json({ member: data })
  } catch (error) {
    console.error('Fetch team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { name, position, imageUrl, order, visible } = body

    const updates: Record<string, unknown> = {}
    if (name !== undefined) updates.name = name
    if (position !== undefined) updates.position = position
    if (imageUrl !== undefined) updates.imageUrl = imageUrl
    if (order !== undefined) updates.order = Number(order)
    if (visible !== undefined) updates.visible = Boolean(visible)

    const { data, error } = await supabase
      .from(teamTable)
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update team member error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ success: true, member: data })
  } catch (error) {
    console.error('Update team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await supabase.from(teamTable).delete().eq('id', params.id)
    if (error) {
      console.error('Supabase delete team member error:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
