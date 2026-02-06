import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function ContactsPage() {
  // Fetch contact submissions from Supabase
  let submissions = [] as any[]
  try {
    const { data, error } = await supabase
      .from('ContactSubmission')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase fetch contact submissions error:', error)
    } else if (Array.isArray(data)) {
      submissions = data
    }
  } catch (err) {
    console.error('Unexpected error fetching submissions from Supabase:', err)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Contact Submissions</h1>
        <Link
          href="/admin/dashboard"
          className="text-sm text-swiss-red hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
      <div className="space-y-4">
        {submissions.length === 0 && <p className="text-sm text-habb-gray-600">No submissions yet.</p>}
        {submissions.map((s) => (
          <div key={s.id} className="p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{s.name} — <span className="text-sm text-habb-gray-500">{s.email}</span></div>
                <div className="text-sm text-habb-gray-600">{s.company}</div>
              </div>
              <div className="text-sm text-habb-gray-500">{new Date(s.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-3 text-habb-gray-700">
              <strong className="block">{s.subject}</strong>
              <p className="mt-2 whitespace-pre-wrap">{s.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
