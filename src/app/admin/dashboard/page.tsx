import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader } from '@/components/ui'
import { FileText, HelpCircle, Users, Eye, Mail } from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  try {
    const [
      postsCount,
      publishedPostsCount,
      faqsCount,
      visibleFaqsCount,
      contactsCount,
      recentContacts,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.faq.count(),
      prisma.faq.count({ where: { visible: true } }),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

    return {
      posts: { total: postsCount, published: publishedPostsCount },
      faqs: { total: faqsCount, visible: visibleFaqsCount },
      contacts: { total: contactsCount, recent: recentContacts },
    }
  } catch {
    return {
      posts: { total: 0, published: 0 },
      faqs: { total: 0, visible: 0 },
      contacts: { total: 0, recent: [] },
    }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.posts.total,
      subtitle: `${stats.posts.published} published`,
      icon: FileText,
      href: '/admin/dashboard/posts',
      color: 'bg-blue-500',
    },
    {
      title: 'FAQs',
      value: stats.faqs.total,
      subtitle: `${stats.faqs.visible} visible`,
      icon: HelpCircle,
      href: '/admin/dashboard/faqs',
      color: 'bg-green-500',
    },
    {
      title: 'Contact Leads',
      value: stats.contacts.total,
      subtitle: 'Stored submissions',
      icon: Mail,
      href: '/admin/dashboard/contacts',
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-semibold text-habb-gray-900 mb-2">
          Welcome to Habb.ch Admin
        </h2>
        <p className="text-habb-gray-600">
          Manage your website content, blog posts, and FAQs from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card hover className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-habb-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-habb-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-habb-gray-500 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Contacts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-habb-gray-900">Recent Contacts</h3>
          <Link href="/admin/dashboard/contacts" className="text-sm text-swiss-red hover:underline">
            View all
          </Link>
        </div>
        {stats.contacts.recent.length === 0 ? (
          <p className="text-sm text-habb-gray-600">No contact submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {stats.contacts.recent.map((submission) => {
              const preview = submission.message.length > 160
                ? `${submission.message.slice(0, 157)}…`
                : submission.message

              return (
                <div key={submission.id} className="p-4 bg-white rounded-xl border border-habb-gray-100">
                  <div className="flex items-center justify-between text-sm text-habb-gray-500">
                    <span>{submission.name} · {submission.email}</span>
                    <span>{new Date(submission.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="font-medium text-habb-gray-900 mt-2">{submission.subject}</p>
                  <p className="text-sm text-habb-gray-600">{preview}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-habb-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/dashboard/posts/new">
            <Card hover>
              <CardContent className="py-4 flex items-center gap-4">
                <div className="p-2 bg-swiss-red/10 rounded-lg">
                  <FileText className="w-5 h-5 text-swiss-red" />
                </div>
                <div>
                  <p className="font-medium text-habb-gray-900">Create Blog Post</p>
                  <p className="text-sm text-habb-gray-500">Write a new article</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/dashboard/faqs/new">
            <Card hover>
              <CardContent className="py-4 flex items-center gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-habb-gray-900">Add FAQ</p>
                  <p className="text-sm text-habb-gray-500">Create a new question</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/en" target="_blank">
            <Card hover>
              <CardContent className="py-4 flex items-center gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-habb-gray-900">View Website</p>
                  <p className="text-sm text-habb-gray-500">See live site</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
