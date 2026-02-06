'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'

interface TeamDeleteButtonProps {
  memberId: string
}

export function TeamDeleteButton({ memberId }: TeamDeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = confirm('Delete this team member?')
    if (!confirmed) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Delete failed')
      }
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error'
      alert(message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDelete}
      isLoading={isDeleting}
    >
      Delete
    </Button>
  )
}
