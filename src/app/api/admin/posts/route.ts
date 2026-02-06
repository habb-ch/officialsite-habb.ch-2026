import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

// Create post
export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    const table = process.env.SUPABASE_POST_TABLE || 'Post'
    // Resolve authorId: prefer finding a local User by email, create if missing
    const userTable = process.env.SUPABASE_USER_TABLE || 'User'
    let authorId: string | null = null
    try {
      if (session.email) {
        const { data: existingUsers, error: existingErr } = await supabase
          .from(userTable)
          .select('id')
          .eq('email', session.email)
          .limit(1)
        if (existingErr) console.error('Supabase fetch user error:', existingErr)
        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
          authorId = existingUsers[0].id
        } else {
          // Insert a local user record (password left blank for external users)
          const { data: newUsers, error: insertErr } = await supabase
            .from(userTable)
            .insert([
              {
                email: session.email,
                name: (session as any).name || null,
                password: '',
              },
            ])
            .select('id')
          if (insertErr) console.error('Supabase create user error:', insertErr)
          if (Array.isArray(newUsers) && newUsers.length > 0) authorId = newUsers[0].id
        }
      }
    } catch (e) {
      console.error('Author resolution error:', e)
    }

    // ensure authorId is a valid UUID (Supabase Postgres expects uuid)
    const isUuid = (s: any) => typeof s === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s)
    if ((session as any).userId && !isUuid((session as any).userId)) {
      console.warn('Session userId is not a UUID, ignoring for Post.authorId:', (session as any).userId)
    }

    const finalAuthorId = isUuid(authorId) ? authorId : null

    const { data, error } = await supabase.from(table).insert([
      {
        slug: body.slug,
        titleEn: body.titleEn,
        titleDe: body.titleDe || null,
        excerptEn: body.excerptEn || null,
        excerptDe: body.excerptDe || null,
        contentEn: body.contentEn,
        contentDe: body.contentDe || null,
        imageUrl: body.imageUrl || null,
        imageAlt: body.imageAlt || null,
        metaTitleEn: body.metaTitleEn || null,
        metaTitleDe: body.metaTitleDe || null,
        metaDescEn: body.metaDescEn || null,
        metaDescDe: body.metaDescDe || null,
        published: body.published || false,
        authorId: finalAuthorId,
      },
    ]).select()

    if (error) {
      console.error('Supabase insert post error:', error)
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }

    const post = Array.isArray(data) ? data[0] : data
    return NextResponse.json({ post })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// Get all posts
export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const table = process.env.SUPABASE_POST_TABLE || 'Post'
    const { data, error } = await supabase.from(table).select('*').order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase fetch posts error:', error)
      return NextResponse.json({ posts: [] })
    }

    const posts = data || []

    // Fetch author names for posts that have authorId
    const userTable = process.env.SUPABASE_USER_TABLE || 'User'
    const authorIds = Array.from(new Set(posts.filter((p: any) => p.authorId).map((p: any) => p.authorId)))
    let authorsMap: Record<string, any> = {}
    if (authorIds.length > 0) {
      const { data: users, error: usersErr } = await supabase.from(userTable).select('id,name').in('id', authorIds)
      if (usersErr) console.error('Supabase fetch authors error:', usersErr)
      if (Array.isArray(users)) {
        authorsMap = users.reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {})
      }
    }

    const postsWithAuthors = posts.map((p: any) => ({ ...p, author: authorsMap[p.authorId] || null }))

    return NextResponse.json({ posts: postsWithAuthors })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
