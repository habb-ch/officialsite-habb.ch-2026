'use client'

import { useState, useRef } from 'react'
import { Button, Input, Textarea } from '@/components/ui'
import { Send } from 'lucide-react'

interface ContactFormProps {
  labels: {
    name: string
    email: string
    company: string
    subject: string
    message: string
    submit: string
    sending: string
    success: string
    error: string
  }
}

export function ContactForm({ labels }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      const payload = {
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        company: String(formData.get('company') ?? ''),
        subject: String(formData.get('subject') ?? ''),
        message: String(formData.get('message') ?? ''),
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let json: any = null
      try {
        json = await response.json()
      } catch (err) {
        console.error('Failed to parse response JSON', err)
      }

      if (response.ok) {
        setStatus('success')
        setErrorMessage(null)
        try {
          form.reset()
        } catch (err) {
          console.warn('Form reset failed', err)
        }
      } else {
        setStatus('error')
        setErrorMessage(json?.error || `Server error (${response.status})`)
        console.error('Contact submit failed', response.status, json)
      }
    } catch (err: any) {
      console.error('Contact submit network error', err)
      setStatus('error')
      setErrorMessage(err?.message || 'Network error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="name"
          name="name"
          label={labels.name}
          placeholder="John Doe"
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label={labels.email}
          placeholder="john@example.com"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="company"
          name="company"
          label={labels.company}
          placeholder="Company AG"
        />
        <Input
          id="subject"
          name="subject"
          label={labels.subject}
          placeholder="General Inquiry"
          required
        />
      </div>
      <Textarea
        id="message"
        name="message"
        label={labels.message}
        placeholder="Your message..."
        rows={6}
        required
      />

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {labels.success}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <div>{labels.error}</div>
          {errorMessage && <div className="mt-2 text-sm">{errorMessage}</div>}
        </div>
      )}

      <Button type="submit" size="lg" isLoading={isSubmitting}>
        {isSubmitting ? labels.sending : labels.submit}
        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
      </Button>
    </form>
  )
}
