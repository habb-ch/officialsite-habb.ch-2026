'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  HelpCircle, 
  Settings,
  Globe,
  ExternalLink,
  Mail,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Blog Posts',
    href: '/admin/dashboard/posts',
    icon: FileText,
  },
  {
    label: 'FAQs',
    href: '/admin/dashboard/faqs',
    icon: HelpCircle,
  },
  {
    label: 'Contacts',
    href: '/admin/dashboard/contacts',
    icon: Mail,
  },
  {
    label: 'Team',
    href: '/admin/dashboard/team',
    icon: Users,
  },
  {
    label: 'Settings',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-habb-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-habb-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              <rect x="2" y="2" width="36" height="36" rx="4" fill="#DA291C" />
              <rect x="16" y="8" width="8" height="24" fill="white" />
              <rect x="8" y="16" width="24" height="8" fill="white" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold">Habb.ch</span>
            <span className="block text-xs text-habb-gray-400">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-swiss-red text-white'
                  : 'text-habb-gray-300 hover:bg-habb-gray-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-habb-gray-800 space-y-2">
        <Link
          href="/en"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-habb-gray-300 hover:bg-habb-gray-800 hover:text-white transition-colors"
        >
          <Globe className="w-5 h-5" />
          View Website
          <ExternalLink className="w-4 h-4 ml-auto" />
        </Link>
      </div>
    </aside>
  )
}
