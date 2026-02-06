'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@/components/ui'
import { LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <rect x="2" y="2" width="36" height="36" rx="4" fill="#DA291C" />
                <rect x="16" y="8" width="8" height="24" fill="white" />
                <rect x="8" y="16" width="24" height="8" fill="white" />
              </svg>
            </div>
            <span className="text-3xl font-bold text-habb-gray-900">
              Habb<span className="text-swiss-red">.ch</span>
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-habb-gray-900">Admin Login</h1>
          <p className="text-habb-gray-600 mt-2">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="admin@habb.ch"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a href="/en" className="text-sm text-habb-gray-600 hover:text-swiss-red transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
