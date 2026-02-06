'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { Eye, EyeOff } from 'lucide-react'

interface ToggleVisibilityButtonProps {
  faqId: string
  visible: boolean
}

export function ToggleVisibilityButton({ faqId, visible }: ToggleVisibilityButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    setIsLoading(true)
    try {
      await fetch(`/api/admin/faqs/${faqId}/toggle-visibility`, {
        method: 'POST',
      })
      router.refresh()
    } catch (error) {
      console.error('Error toggling visibility:', error)
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
      title={visible ? 'Hide' : 'Show'}
    >
      {visible ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </Button>
  )
}
