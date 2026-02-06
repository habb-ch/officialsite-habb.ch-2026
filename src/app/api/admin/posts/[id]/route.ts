import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    const post = await prisma.post.update({
      where: { id },
      data: {
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
      },
    })

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// Delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

// Get single post
export async function GET(request: NextRequest, { params }: RouteParams) {
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

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}
