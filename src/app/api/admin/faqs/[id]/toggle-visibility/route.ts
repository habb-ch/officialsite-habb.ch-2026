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
    
    const faq = await prisma.faq.findUnique({
      where: { id },
    })

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }

    const updatedFaq = await prisma.faq.update({
      where: { id },
      data: { visible: !faq.visible },
    })

    return NextResponse.json({ faq: updatedFaq })
  } catch (error) {
    console.error('Toggle visibility error:', error)
    return NextResponse.json(
      { error: 'Failed to toggle visibility' },
      { status: 500 }
    )
  }
}
