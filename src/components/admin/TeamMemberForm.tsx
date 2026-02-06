'use client'
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'

interface TeamMemberFormProps {
  mode: 'create' | 'edit'
  member?: {
    id: string
    name: string
    position: string
    imageUrl: string
    order: number
    visible: boolean
  }
}

export function TeamMemberForm({ mode, member }: TeamMemberFormProps) {
  const router = useRouter()
  const [name, setName] = useState(member?.name ?? '')
  const [position, setPosition] = useState(member?.position ?? '')
  const [order, setOrder] = useState<number>(member?.order ?? 0)
  const [visible, setVisible] = useState<boolean>(member?.visible ?? true)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(member?.imageUrl ?? null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    setFile(selected ?? null)
    if (selected) {
      setPreview(URL.createObjectURL(selected))
    }
  }

  async function uploadImage(): Promise<string | null> {
    if (!file) return preview

    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch('/api/admin/team/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json().catch(() => null)

    if (!res.ok || !data) {
      throw new Error(data?.error || 'Image upload failed')
    }

    return data.url as string
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      let imageUrl = member?.imageUrl ?? null
      if (file || !imageUrl) {
        imageUrl = await uploadImage()
      }

      if (!imageUrl) {
        throw new Error('Please upload an image')
      }

      const payload = {
        name,
        position,
        imageUrl,
        order: Number(order) || 0,
        visible,
      }

      const endpoint = mode === 'create'
        ? '/api/admin/team'
        : `/api/admin/team/${member?.id}`

      const method = mode === 'create' ? 'POST' : 'PATCH'

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Failed to save team member')
      }

      router.push('/admin/dashboard/team')
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Position"
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <div>
          <label className="block text-sm font-medium text-habb-gray-700 mb-1">Display Order</label>
          <input
            type="number"
            className="w-full rounded-lg border border-habb-gray-200 px-3 py-2"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value) || 0)}
          />
          <p className="text-xs text-habb-gray-500 mt-1">Lower numbers appear first.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="visible"
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
          />
          <label htmlFor="visible" className="text-sm text-habb-gray-700">Visible on site</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-habb-gray-700 mb-1">Profile Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img src={preview} alt="Preview" className="mt-3 w-40 h-40 object-cover rounded-xl border" />
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-sm text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isSubmitting}>
        {mode === 'create' ? 'Add Member' : 'Save Changes'}
      </Button>
    </form>
  )
}
