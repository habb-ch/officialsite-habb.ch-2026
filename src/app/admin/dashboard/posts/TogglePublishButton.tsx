'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { Eye, EyeOff } from 'lucide-react'

interface TogglePublishButtonProps {
  postId: string
  published: boolean
}

export function TogglePublishButton({ postId, published }: TogglePublishButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    setIsLoading(true)
    try {
      await fetch(`/api/admin/posts/${postId}/toggle-publish`, {
        method: 'POST',
      })
      router.refresh()
    } catch (error) {
      console.error('Error toggling publish:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      title={published ? 'Unpublish' : 'Publish'}
    >
      {published ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </Button>
  )
}
