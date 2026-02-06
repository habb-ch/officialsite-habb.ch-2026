import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

const postTable = process.env.SUPABASE_POST_TABLE || 'Post'

export async function POST(_request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const { data: post, error: fetchError } = await supabase
      .from(postTable)
      .select('published')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Supabase fetch post error:', fetchError)
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const { data: updatedPost, error: updateError } = await supabase
      .from(postTable)
      .update({ published: !post?.published })
      .eq('id', id)
      .select()
      .single()

    if (updateError || !updatedPost) {
      console.error('Supabase toggle publish error:', updateError)
      return NextResponse.json({ error: 'Failed to toggle publish status' }, { status: 500 })
    }

    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    console.error('Toggle publish error:', error)
    return NextResponse.json({ error: 'Failed to toggle publish status' }, { status: 500 })
  }
}
