import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { TeamMemberForm } from '@/components/admin/TeamMemberForm'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditTeamMemberPage({ params }: PageProps) {
  const member = await prisma.teamMember.findUnique({ where: { id: params.id } })

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
