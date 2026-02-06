import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostForm } from '../PostForm'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    })
    return post
  } catch {
    return null
  }
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return <PostForm post={post} />
}
