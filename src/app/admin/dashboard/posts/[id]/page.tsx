import { notFound } from 'next/navigation'
import { PostForm } from '../PostForm'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: { id: string }
}

const postTable = process.env.SUPABASE_POST_TABLE || 'Post'

async function getPost(id: string) {
  try {
    const { data, error } = await supabase.from(postTable).select('*').eq('id', id).single()
    if (error) {
      console.error('Supabase fetch post error:', error)
      return null
    }
    return data
  } catch (error) {
    console.error('Fetch post error:', error)
    return null
  }
}

export default async function EditPostPage({ params }: PageProps) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return <PostForm post={post} />
}
