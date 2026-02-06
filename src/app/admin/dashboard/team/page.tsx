import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { TeamDeleteButton } from '@/components/admin/TeamDeleteButton'
import { TeamOrderForm } from '@/components/admin/TeamOrderForm'

export default async function TeamListPage() {
  let members: any[] = []
  try {
    const { data, error } = await supabase
      .from('TeamMember')
      .select('*')
      .order('order', { ascending: true })

    if (error) {
      console.error('Supabase fetch team members error:', error)
    } else if (Array.isArray(data)) {
      members = data
    }
  } catch (err) {
    console.error('Unexpected error fetching team members from Supabase:', err)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-habb-gray-900">Team Members</h1>
          <p className="text-sm text-habb-gray-600">Manage the people shown on the About page.</p>
        </div>
        <Link
          href="/admin/dashboard/team/new"
          className="px-4 py-2 rounded-lg bg-swiss-red text-white hover:bg-swiss-red-dark"
        >
          Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="p-8 bg-white rounded-xl border text-center text-habb-gray-500">
          No team members yet. Add one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {members.map((member) => (
            <div key={member.id} className="p-6 bg-white rounded-2xl border border-habb-gray-100 space-y-4">
              <div className="relative w-full h-56 overflow-hidden rounded-xl bg-habb-gray-50">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-habb-gray-900">{member.name}</p>
                <p className="text-sm text-habb-gray-600">{member.position}</p>
                <p className="text-xs text-habb-gray-500 mt-1">Visible: {member.visible ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-habb-gray-700 mb-2">Display Order</p>
                <TeamOrderForm memberId={member.id} initialOrder={member.order} />
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/dashboard/team/${member.id}`}
                  className="px-3 py-2 rounded-lg bg-habb-gray-100 text-sm font-medium text-habb-gray-800 hover:bg-habb-gray-200"
                >
                  Edit
                </Link>
                <TeamDeleteButton memberId={member.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
