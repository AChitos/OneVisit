'use client'

import { useState } from 'react'
import { 
  UserIcon,
  BuildingStorefrontIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  KeyIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface BusinessProfile {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  businessType: string
  timezone: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  campaignUpdates: boolean
  customerSignups: boolean
  qrCodeScans: boolean
  weeklyReports: boolean
  monthlyReports: boolean
}

interface IntegrationConfig {
  twilioAccountSid: string
  twilioAuthToken: string
  twilioPhoneNumber: string
  whatsappBusinessId: string
  emailProvider: string
  emailApiKey: string
  stripePublishableKey: string
  stripeSecretKey: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'pending' | 'suspended'
  lastActive: Date
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showInviteForm, setShowInviteForm] = useState(false)

  // Mock data
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: 'The Local Brewery',
    description: 'Craft beer and great food in the heart of downtown',
    address: '123 Main Street, Downtown, CA 90210',
    phone: '+1 (555) 123-4567',
    email: 'hello@localbrewery.com',
    website: 'https://localbrewery.com',
    businessType: 'Restaurant/Bar',
    timezone: 'America/Los_Angeles'
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    campaignUpdates: true,
    customerSignups: true,
    qrCodeScans: false,
    weeklyReports: true,
    monthlyReports: true
  })

  const [integrationConfig, setIntegrationConfig] = useState<IntegrationConfig>({
    twilioAccountSid: 'AC***************',
    twilioAuthToken: '***************',
    twilioPhoneNumber: '+1 (555) 987-6543',
    whatsappBusinessId: '***************',
    emailProvider: 'SendGrid',
    emailApiKey: 'SG.***************',
    stripePublishableKey: 'pk_test_***************',
    stripeSecretKey: 'sk_test_***************'
  })

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@localbrewery.com',
      role: 'Owner',
      status: 'active',
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@localbrewery.com',
      role: 'Manager',
      status: 'active',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@localbrewery.com',
      role: 'Staff',
      status: 'pending',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ])

  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Staff'
  })

  const tabs = [
    { id: 'profile', name: 'Business Profile', icon: BuildingStorefrontIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'integrations', name: 'Integrations', icon: CogIcon },
    { id: 'team', name: 'Team Management', icon: UserIcon },
    { id: 'billing', name: 'Billing & Plans', icon: CreditCardIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon }
  ]

  const handleProfileSave = () => {
    // TODO: Save business profile
    setIsEditing(false)
  }

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send team invitation
    console.log('Inviting:', inviteForm)
    setInviteForm({ email: '', role: 'Staff' })
    setShowInviteForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatLastActive = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Online now'
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Business Information</h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center"
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button onClick={handleProfileSave} className="btn-primary flex items-center">
              <CheckIcon className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="btn-secondary flex items-center"
            >
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            {isEditing ? (
              <input
                type="text"
                value={businessProfile.name}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            {isEditing ? (
              <select
                value={businessProfile.businessType}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, businessType: e.target.value }))}
                className="input-field"
              >
                <option value="Restaurant/Bar">Restaurant/Bar</option>
                <option value="Retail">Retail</option>
                <option value="Fitness">Fitness</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Beauty/Salon">Beauty/Salon</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.businessType}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={businessProfile.description}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, description: e.target.value }))}
                className="input-field"
                rows={3}
              />
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.description}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={businessProfile.address}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, address: e.target.value }))}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={businessProfile.phone}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, phone: e.target.value }))}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={businessProfile.email}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            {isEditing ? (
              <input
                type="url"
                value={businessProfile.website}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, website: e.target.value }))}
                className="input-field"
              />
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.website}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            {isEditing ? (
              <select
                value={businessProfile.timezone}
                onChange={(e) => setBusinessProfile(prev => ({ ...prev, timezone: e.target.value }))}
                className="input-field"
              >
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/New_York">Eastern Time</option>
              </select>
            ) : (
              <p className="text-sm text-gray-900">{businessProfile.timezone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
      
      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Communication Channels</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <button
              onClick={() => handleNotificationChange('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.emailNotifications ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts via SMS</p>
              </div>
            </div>
            <button
              onClick={() => handleNotificationChange('smsNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.smsNotifications ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BellIcon className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Browser push notifications</p>
              </div>
            </div>
            <button
              onClick={() => handleNotificationChange('pushNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.pushNotifications ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Activity Notifications</h4>
        <div className="space-y-4">
          {[
            { key: 'campaignUpdates' as keyof NotificationSettings, label: 'Campaign Updates', desc: 'When campaigns are sent or completed' },
            { key: 'customerSignups' as keyof NotificationSettings, label: 'New Customer Signups', desc: 'When new customers join via QR codes' },
            { key: 'qrCodeScans' as keyof NotificationSettings, label: 'QR Code Scans', desc: 'Real-time QR code scan notifications' },
            { key: 'weeklyReports' as keyof NotificationSettings, label: 'Weekly Reports', desc: 'Summary of weekly performance' },
            { key: 'monthlyReports' as keyof NotificationSettings, label: 'Monthly Reports', desc: 'Detailed monthly analytics' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => handleNotificationChange(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings[item.key] ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">API Integrations</h3>
      
      {/* Twilio SMS Integration */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <DevicePhoneMobileIcon className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h4 className="text-md font-medium text-gray-900">Twilio SMS</h4>
              <p className="text-sm text-gray-500">SMS and voice messaging service</p>
            </div>
          </div>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Connected
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account SID</label>
            <input
              type="text"
              value={integrationConfig.twilioAccountSid}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, twilioAccountSid: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auth Token</label>
            <input
              type="password"
              value={integrationConfig.twilioAuthToken}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, twilioAuthToken: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={integrationConfig.twilioPhoneNumber}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, twilioPhoneNumber: e.target.value }))}
              className="input-field"
            />
          </div>
        </div>
        <div className="flex space-x-3 mt-4">
          <button className="btn-secondary">Test Connection</button>
          <button className="btn-primary">Update Settings</button>
        </div>
      </div>

      {/* WhatsApp Business Integration */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h4 className="text-md font-medium text-gray-900">WhatsApp Business</h4>
              <p className="text-sm text-gray-500">WhatsApp messaging integration</p>
            </div>
          </div>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pending Setup
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Account ID</label>
          <input
            type="text"
            value={integrationConfig.whatsappBusinessId}
            onChange={(e) => setIntegrationConfig(prev => ({ ...prev, whatsappBusinessId: e.target.value }))}
            className="input-field"
            placeholder="Enter your WhatsApp Business Account ID"
          />
        </div>
        <div className="flex space-x-3 mt-4">
          <button className="btn-secondary">Setup Guide</button>
          <button className="btn-primary">Connect WhatsApp</button>
        </div>
      </div>

      {/* Email Integration */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <EnvelopeIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h4 className="text-md font-medium text-gray-900">Email Service</h4>
              <p className="text-sm text-gray-500">Email delivery provider</p>
            </div>
          </div>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Connected
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
            <select
              value={integrationConfig.emailProvider}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, emailProvider: e.target.value }))}
              className="input-field"
            >
              <option value="SendGrid">SendGrid</option>
              <option value="Mailgun">Mailgun</option>
              <option value="Amazon SES">Amazon SES</option>
              <option value="Postmark">Postmark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <input
              type="password"
              value={integrationConfig.emailApiKey}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, emailApiKey: e.target.value }))}
              className="input-field"
            />
          </div>
        </div>
        <div className="flex space-x-3 mt-4">
          <button className="btn-secondary">Send Test Email</button>
          <button className="btn-primary">Update Settings</button>
        </div>
      </div>

      {/* Stripe Integration */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CreditCardIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h4 className="text-md font-medium text-gray-900">Stripe Payments</h4>
              <p className="text-sm text-gray-500">Payment processing for subscriptions</p>
            </div>
          </div>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Connected
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publishable Key</label>
            <input
              type="text"
              value={integrationConfig.stripePublishableKey}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
            <input
              type="password"
              value={integrationConfig.stripeSecretKey}
              onChange={(e) => setIntegrationConfig(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
              className="input-field"
            />
          </div>
        </div>
        <div className="flex space-x-3 mt-4">
          <button className="btn-secondary">View Dashboard</button>
          <button className="btn-primary">Update Settings</button>
        </div>
      </div>
    </div>
  )

  const renderTeamTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Team Management</h3>
        <button 
          onClick={() => setShowInviteForm(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Invite Team Member
        </button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <div className="card">
          <h4 className="text-md font-medium text-gray-900 mb-4">Invite New Team Member</h4>
          <form onSubmit={handleInviteTeamMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                  placeholder="colleague@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm(prev => ({ ...prev, role: e.target.value }))}
                  className="input-field"
                >
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">Send Invitation</button>
              <button 
                type="button" 
                onClick={() => setShowInviteForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members List */}
      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Current Team Members</h4>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatLastActive(member.lastActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {member.role !== 'Owner' && (
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permissions */}
      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Role Permissions</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 text-sm font-medium text-gray-900">Feature</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-900">Staff</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-900">Manager</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-900">Admin</th>
                <th className="text-center py-2 px-4 text-sm font-medium text-gray-900">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { feature: 'View Analytics', staff: true, manager: true, admin: true, owner: true },
                { feature: 'Manage Customers', staff: false, manager: true, admin: true, owner: true },
                { feature: 'Create Campaigns', staff: false, manager: true, admin: true, owner: true },
                { feature: 'Manage QR Codes', staff: true, manager: true, admin: true, owner: true },
                { feature: 'Team Management', staff: false, manager: false, admin: true, owner: true },
                { feature: 'Billing & Settings', staff: false, manager: false, admin: false, owner: true }
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-900">{row.feature}</td>
                  <td className="py-2 px-4 text-center">
                    {row.staff ? <CheckIcon className="h-4 w-4 text-green-500 mx-auto" /> : <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.manager ? <CheckIcon className="h-4 w-4 text-green-500 mx-auto" /> : <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.admin ? <CheckIcon className="h-4 w-4 text-green-500 mx-auto" /> : <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.owner ? <CheckIcon className="h-4 w-4 text-green-500 mx-auto" /> : <XMarkIcon className="h-4 w-4 text-red-500 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderBillingTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Billing & Subscription</h3>
      
      {/* Current Plan */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-gray-900">Current Plan</h4>
            <p className="text-sm text-gray-500">Professional Plan</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">$49</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">✓ Up to 5,000 customers</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">✓ Unlimited campaigns</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">✓ Advanced analytics</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">✓ QR code management</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">✓ Team collaboration</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">✓ Priority support</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-4">
          <button className="btn-secondary">Change Plan</button>
          <button className="btn-primary">Upgrade to Enterprise</button>
        </div>
      </div>

      {/* Billing History */}
      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Billing History</h4>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: '2024-01-01', description: 'Professional Plan - January 2024', amount: '$49.00', status: 'Paid' },
                { date: '2023-12-01', description: 'Professional Plan - December 2023', amount: '$49.00', status: 'Paid' },
                { date: '2023-11-01', description: 'Professional Plan - November 2023', amount: '$49.00', status: 'Paid' },
                { date: '2023-10-01', description: 'Professional Plan - October 2023', amount: '$49.00', status: 'Paid' }
              ].map((invoice, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary-600 hover:text-primary-900">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Payment Method</h4>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <CreditCardIcon className="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-500">Expires 12/2025</p>
            </div>
          </div>
          <button className="btn-secondary">Update Card</button>
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
      
      {/* Password */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <KeyIcon className="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <h4 className="text-md font-medium text-gray-900">Password</h4>
              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
            </div>
          </div>
          <button className="btn-secondary">Change Password</button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h4 className="text-md font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
          </div>
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Not Enabled
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Secure your account with two-factor authentication using an authenticator app.
        </p>
        <button className="btn-primary">Enable 2FA</button>
      </div>

      {/* Active Sessions */}
      <div className="card">
        <h4 className="text-md font-medium text-gray-900 mb-4">Active Sessions</h4>
        <div className="space-y-4">
          {[
            { device: 'Current Session', location: 'San Francisco, CA', browser: 'Chrome on macOS', current: true },
            { device: 'Mobile Device', location: 'San Francisco, CA', browser: 'Safari on iOS', current: false },
            { device: 'Work Computer', location: 'San Francisco, CA', browser: 'Firefox on Windows', current: false }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {session.device} {session.current && <span className="text-green-600">(Current)</span>}
                </p>
                <p className="text-sm text-gray-500">{session.browser}</p>
                <p className="text-sm text-gray-500">{session.location}</p>
              </div>
              {!session.current && (
                <button className="btn-secondary text-sm">End Session</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Data Export */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-gray-900">Data Export</h4>
            <p className="text-sm text-gray-500">Download a copy of your account data</p>
          </div>
          <button className="btn-secondary">Request Export</button>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="card border-red-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-md font-medium text-red-900">Delete Account</h4>
            <p className="text-sm text-red-700">Permanently delete your account and all data</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
        <p className="text-sm text-red-600">
          This action cannot be undone. All your data, including customers, campaigns, and analytics will be permanently deleted.
        </p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your account and business preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'integrations' && renderIntegrationsTab()}
        {activeTab === 'team' && renderTeamTab()}
        {activeTab === 'billing' && renderBillingTab()}
        {activeTab === 'security' && renderSecurityTab()}
      </div>
    </div>
  )
}
