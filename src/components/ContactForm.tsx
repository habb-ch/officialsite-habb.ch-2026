'use client'

import { useState, useRef } from 'react'
import { Button, Input, Textarea } from '@/components/ui'
import { Send } from 'lucide-react'

interface ContactFormProps {
  labels: {
    name: string
    email: string
    phone: string
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
        phone: String(formData.get('phone') ?? ''),
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
          id="phone"
          name="phone"
          type="tel"
          label={labels.phone}
          placeholder="+41 76 123 45 67"
          onKeyDown={(e) => {
            // Allow: backspace, delete, tab, escape, enter, home, end, left, right
            if ([8, 9, 27, 13, 46, 36, 35, 37, 39].indexOf(e.keyCode) !== -1 ||
                // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true)) {
              return;
            }
            // Allow + symbol (key code 187 with shift, or 107 on numpad)
            if ((e.keyCode === 187 && e.shiftKey) || e.keyCode === 107) {
              return;
            }
            // Allow numbers (key codes 48-57 for top row, 96-105 for numpad)
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
              return;
            }
            // Prevent all other keys
            e.preventDefault();
          }}
          onInput={(e) => {
            // Remove any characters that are not numbers or +
            const target = e.target as HTMLInputElement;
            const value = target.value;
            const sanitized = value.replace(/[^0-9+]/g, '');
            if (value !== sanitized) {
              target.value = sanitized;
            }
          }}
        />
        <Input
          id="company"
          name="company"
          label={labels.company}
          placeholder="Company AG"
        />
      </div>
      <Input
        id="subject"
        name="subject"
        label={labels.subject}
        placeholder="General Inquiry"
        required
      />
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
