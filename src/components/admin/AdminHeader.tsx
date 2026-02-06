'use client'

import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui'

interface AdminHeaderProps {
  user: {
    email: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-habb-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-habb-gray-900">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-habb-gray-600">
            <User className="w-4 h-4" />
            {user.email}
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
