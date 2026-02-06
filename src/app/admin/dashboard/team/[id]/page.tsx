import { notFound } from 'next/navigation'
import { TeamMemberForm } from '@/components/admin/TeamMemberForm'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: {
    id: string
  }
}

const teamTable = process.env.SUPABASE_TEAM_TABLE || 'TeamMember'

export default async function EditTeamMemberPage({ params }: PageProps) {
  const { data: member, error } = await supabase
    .from(teamTable)
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Supabase fetch team member error:', error)
  }

  if (!member) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-habb-gray-900">Edit Team Member</h1>
        <p className="text-sm text-habb-gray-600">Update profile details, change the order, or hide them.</p>
      </div>
      <TeamMemberForm mode="edit" member={member} />
    </div>
  )
}
