import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, Button } from '@/components/ui'
import { Plus, Edit, Eye, EyeOff, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { DeletePostButton } from './DeletePostButton'
import { TogglePublishButton } from './TogglePublishButton'

async function getPosts() {
  try {
    const table = process.env.SUPABASE_POST_TABLE || 'Post'
    const { data, error } = await supabase.from(table).select('*').order('createdAt', { ascending: false })
    if (error) {
      console.error('Supabase fetch posts error:', error)
      return []
    }
    const posts = data || []

    // resolve authors
    const userTable = process.env.SUPABASE_USER_TABLE || 'User'
    const authorIds = Array.from(new Set(posts.filter((p: any) => p.authorId).map((p: any) => p.authorId)))
    let authorsMap: Record<string, any> = {}
    if (authorIds.length > 0) {
      const { data: users, error: usersErr } = await supabase.from(userTable).select('id,name').in('id', authorIds)
      if (usersErr) console.error('Supabase fetch authors error:', usersErr)
      if (Array.isArray(users)) {
        authorsMap = users.reduce((acc: any, u: any) => ({ ...acc, [u.id]: u }), {})
      }
    }

    return posts.map((p: any) => ({ ...p, author: authorsMap[p.authorId] || null }))
  } catch (err) {
    console.error('getPosts error:', err)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-habb-gray-900">Blog Posts</h2>
          <p className="text-habb-gray-600">Manage your blog articles</p>
        </div>
        <Link href="/admin/dashboard/posts/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-habb-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-8 h-8 text-habb-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-habb-gray-900 mb-2">No posts yet</h3>
            <p className="text-habb-gray-600 mb-4">Create your first blog post to get started</p>
            <Link href="/admin/dashboard/posts/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="divide-y divide-habb-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-habb-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-habb-gray-900 truncate">
                        {post.titleEn}
                      </h3>
                      {post.published ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-habb-gray-100 text-habb-gray-600 text-xs font-medium rounded-full flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-habb-gray-500">
                      {formatDate(post.createdAt, 'en')}
                      {post.author?.name && ` • ${post.author.name}`}
                    </p>
                    {post.excerptEn && (
                      <p className="text-sm text-habb-gray-600 mt-2 line-clamp-2">
                        {post.excerptEn}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <TogglePublishButton postId={post.id} published={post.published} />
                    <Link href={`/admin/dashboard/posts/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <DeletePostButton postId={post.id} title={post.titleEn} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
