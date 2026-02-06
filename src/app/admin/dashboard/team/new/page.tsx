import { TeamMemberForm } from '@/components/admin/TeamMemberForm'

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-habb-gray-900">Add Team Member</h1>
        <p className="text-sm text-habb-gray-600">Upload a photo, set their role, and control the display order.</p>
      </div>
      <TeamMemberForm mode="create" />
    </div>
  )
}
