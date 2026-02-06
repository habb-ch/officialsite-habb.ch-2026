'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'

interface TeamOrderFormProps {
  memberId: string
  initialOrder: number
}

export function TeamOrderForm({ memberId, initialOrder }: TeamOrderFormProps) {
  const router = useRouter()
  const [order, setOrder] = useState(initialOrder)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/team/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Failed to update order')
      }

      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error'
      alert(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="flex items-center gap-2">
      <input
        type="number"
        className="w-20 rounded-lg border border-habb-gray-200 px-3 py-1 text-sm"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value) || 0)}
      />
      <Button type="submit" size="sm" variant="secondary" isLoading={isSaving}>
        Save
      </Button>
    </form>
  )
}
