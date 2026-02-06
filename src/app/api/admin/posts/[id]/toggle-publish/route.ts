import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { published: !post.published },
    })

    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    console.error('Toggle publish error:', error)
    return NextResponse.json(
      { error: 'Failed to toggle publish status' },
      { status: 500 }
    )
  }
}
