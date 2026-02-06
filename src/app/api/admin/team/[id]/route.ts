import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id: params.id } })

    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    return NextResponse.json({ member })
  } catch (error) {
    console.error('Fetch team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { name, position, imageUrl, order, visible } = body

    const data: Record<string, unknown> = {}
    if (name !== undefined) data.name = name
    if (position !== undefined) data.position = position
    if (imageUrl !== undefined) data.imageUrl = imageUrl
    if (order !== undefined) data.order = Number(order)
    if (visible !== undefined) data.visible = Boolean(visible)

    const member = await prisma.teamMember.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({ success: true, member })
  } catch (error) {
    console.error('Update team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await prisma.teamMember.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete team member error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
