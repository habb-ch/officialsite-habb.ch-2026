import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const table = process.env.SUPABASE_USER_TABLE || 'User'
    const { data: user, error } = await supabase
      .from(table)
      .select('id,email,name,role')
      .eq('id', session.userId)
      .maybeSingle()

    if (error) {
      console.error('Supabase fetch user error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
