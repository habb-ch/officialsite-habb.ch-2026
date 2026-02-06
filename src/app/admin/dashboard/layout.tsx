import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import '../../globals.css'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export const metadata = {
  title: 'Admin Dashboard | Habb.ch',
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-habb-gray-100">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64">
            <AdminHeader user={{ email: session.email }} />
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
