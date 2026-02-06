import '../../globals.css'

export const metadata = {
  title: 'Admin Login | Habb.ch',
}

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-habb-gray-100">
        {children}
      </body>
    </html>
  )
}
