import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

const postTable = process.env.SUPABASE_POST_TABLE || 'Post'

// Update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from(postTable)
      .update({
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
      })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      console.error('Supabase update post error:', error)
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }

    return NextResponse.json({ post: data })
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// Delete post
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { error } = await supabase.from(postTable).delete().eq('id', id)
    if (error) {
      console.error('Supabase delete post error:', error)
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}

// Get single post
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { data, error } = await supabase.from(postTable).select('*').eq('id', id).single()
    if (error) {
      console.error('Supabase fetch post error:', error)
      return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ post: data })
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}
