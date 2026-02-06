import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyPassword, createToken, setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Fetch user from Supabase
    const table = process.env.SUPABASE_USER_TABLE || 'User'
    const { data: user, error: userError } = await supabase
      .from(table)
      .select('id,email,password,name,role')
      .eq('email', email.toLowerCase())
      .maybeSingle()

    if (userError) {
      console.error('Supabase fetch user error:', userError)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Set cookie
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
