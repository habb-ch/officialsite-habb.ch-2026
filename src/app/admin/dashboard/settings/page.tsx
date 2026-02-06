import { Card, CardContent, CardHeader } from '@/components/ui'
import { Settings, Globe, Palette, Database } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-habb-gray-900">Settings</h2>
        <p className="text-habb-gray-600">Configure your website settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-swiss-red/10 rounded-lg">
                <Settings className="w-5 h-5 text-swiss-red" />
              </div>
              <h3 className="font-semibold text-habb-gray-900">General Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-habb-gray-600 text-sm">
              Configure general website settings like site name, logo, and contact information.
            </p>
            <div className="p-4 bg-habb-gray-50 rounded-lg text-sm text-habb-gray-600">
              <p className="font-medium text-habb-gray-900 mb-2">Current Configuration</p>
              <ul className="space-y-1">
                <li>Site Name: <span className="text-habb-gray-900">Habb.ch</span></li>
                <li>Default Language: <span className="text-habb-gray-900">English</span></li>
                <li>Contact Email: <span className="text-habb-gray-900">info@habb.ch</span></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-habb-gray-900">Language Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-habb-gray-600 text-sm">
              Manage supported languages and translation settings.
            </p>
            <div className="p-4 bg-habb-gray-50 rounded-lg text-sm text-habb-gray-600">
              <p className="font-medium text-habb-gray-900 mb-2">Supported Languages</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  English (EN) - Default
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  German (DE)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-habb-gray-900">Theme Settings</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-habb-gray-600 text-sm">
              Customize the look and feel of your website.
            </p>
            <div className="p-4 bg-habb-gray-50 rounded-lg text-sm text-habb-gray-600">
              <p className="font-medium text-habb-gray-900 mb-2">Color Palette</p>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded bg-swiss-red" title="Swiss Red"></div>
                <div className="w-8 h-8 rounded bg-habb-gray-900" title="Dark"></div>
                <div className="w-8 h-8 rounded bg-white border border-habb-gray-200" title="White"></div>
                <div className="w-8 h-8 rounded bg-habb-gray-100" title="Light Gray"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-habb-gray-900">Database Info</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-habb-gray-600 text-sm">
              View database status and information.
            </p>
            <div className="p-4 bg-habb-gray-50 rounded-lg text-sm text-habb-gray-600">
              <p className="font-medium text-habb-gray-900 mb-2">Database Status</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Connected
                </li>
                <li>Type: <span className="text-habb-gray-900">SQLite</span></li>
                <li>Location: <span className="text-habb-gray-900">Local</span></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
