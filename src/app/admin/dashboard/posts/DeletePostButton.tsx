'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { Trash2 } from 'lucide-react'

interface DeletePostButtonProps {
  postId: string
  title: string
}

export function DeletePostButton({ postId, title }: DeletePostButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    setIsLoading(true)
    try {
      await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      })
      router.refresh()
    } catch (error) {
      console.error('Error deleting post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}
