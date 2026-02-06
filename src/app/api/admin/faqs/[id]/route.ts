import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Update FAQ
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    const faq = await prisma.faq.update({
      where: { id },
      data: {
        questionEn: body.questionEn,
        questionDe: body.questionDe || null,
        answerEn: body.answerEn,
        answerDe: body.answerDe || null,
        order: body.order || 0,
        visible: body.visible ?? true,
      },
    })

    return NextResponse.json({ faq })
  } catch (error) {
    console.error('Update FAQ error:', error)
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    )
  }
}

// Delete FAQ
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    await prisma.faq.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete FAQ error:', error)
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    )
  }
}

// Get single FAQ
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    const faq = await prisma.faq.findUnique({
      where: { id },
    })

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    return NextResponse.json({ faq })
  } catch (error) {
    console.error('Get FAQ error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQ' },
      { status: 500 }
    )
  }
}
