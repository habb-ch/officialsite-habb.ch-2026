import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { FaqForm } from '../FaqForm'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getFaq(id: string) {
  try {
    const faq = await prisma.faq.findUnique({
      where: { id },
    })
    return faq
  } catch {
    return null
  }
}

export default async function EditFaqPage({ params }: PageProps) {
  const { id } = await params
  const faq = await getFaq(id)

  if (!faq) {
    notFound()
  }

  return <FaqForm faq={faq} />
}
