'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserGroupIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { Campaign, CampaignType, CampaignStatus, MessageType } from '@/types'
import { formatDate, formatDateTime } from '@/utils/helpers'

interface CampaignFormData {
  name: string
  description: string
  type: CampaignType
  messageTemplate: string
  messageType: MessageType
  scheduledAt: string
  targetSegment: {
    ageRange?: { min: number; max: number }
    gender?: string[]
    visitFrequency?: string[]
    spendingRange?: string[]
    lastVisitDays?: number
    preferences?: string[]
  }
}

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    messageType: ''
  })
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    description: '',
    type: CampaignType.GENERAL,
    messageTemplate: '',
    messageType: MessageType.SMS,
    scheduledAt: '',
    targetSegment: {}
  })

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Welcome Series',
        description: 'Welcome new customers with special offers',
        type: CampaignType.WELCOME,
        status: CampaignStatus.SENT,
        businessId: 'business1',
        createdById: 'user1',
        messageTemplate: 'Welcome to our venue! Enjoy 10% off your next visit with code WELCOME10',
        messageType: MessageType.SMS,
        sentAt: new Date('2024-01-15T10:00:00'),
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-15'),
        targetSegment: {
          lastVisitDays: 7
        },
        targets: [],
        messages: [],
        analytics: []
      },
      {
        id: '2',
        name: 'Happy Hour Promotion',
        description: 'Promote our daily happy hour specials',
        type: CampaignType.SPECIAL_OFFER,
        status: CampaignStatus.SCHEDULED,
        businessId: 'business1',
        createdById: 'user1',
        messageTemplate: '🍸 Happy Hour is LIVE! 50% off all cocktails until 7 PM. See you soon!',
        messageType: MessageType.WHATSAPP,
        scheduledAt: new Date('2024-01-25T15:00:00'),
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        targetSegment: {
          preferences: ['Cocktails'],
          visitFrequency: ['Regular', 'Frequent']
        },
        targets: [],
        messages: [],
        analytics: []
      },
      {
        id: '3',
        name: 'Live Jazz Night',
        description: 'Invite customers to our special jazz performance',
        type: CampaignType.EVENT_INVITE,
        status: CampaignStatus.DRAFT,
        businessId: 'business1',
        createdById: 'user1',
        messageTemplate: '🎷 Join us this Friday for an amazing Live Jazz Night! Doors open at 8 PM.',
        messageType: MessageType.SMS,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22'),
        targetSegment: {
          preferences: ['Live Music'],
          ageRange: { min: 25, max: 55 }
        },
        targets: [],
        messages: [],
        analytics: []
      }
    ]
    
    setTimeout(() => {
      setCampaigns(mockCampaigns)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = !filters.status || campaign.status === filters.status
    const matchesType = !filters.type || campaign.type === filters.type
    const matchesMessageType = !filters.messageType || campaign.messageType === filters.messageType
    
    return matchesStatus && matchesType && matchesMessageType
  })

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.DRAFT:
        return 'bg-gray-100 text-gray-800'
      case CampaignStatus.SCHEDULED:
        return 'bg-blue-100 text-blue-800'
      case CampaignStatus.SENT:
        return 'bg-green-100 text-green-800'
      case CampaignStatus.CANCELLED:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: CampaignType) => {
    switch (type) {
      case CampaignType.WELCOME:
        return '👋'
      case CampaignType.EVENT_INVITE:
        return '🎉'
      case CampaignType.SPECIAL_OFFER:
        return '🎁'
      case CampaignType.BIRTHDAY:
        return '🎂'
      case CampaignType.WIN_BACK:
        return '💰'
      default:
        return '📢'
    }
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement campaign creation API call
    console.log('Creating campaign:', formData)
    setShowCreateForm(false)
    // Reset form
    setFormData({
      name: '',
      description: '',
      type: CampaignType.GENERAL,
      messageTemplate: '',
      messageType: MessageType.SMS,
      scheduledAt: '',
      targetSegment: {}
    })
  }

  if (showCreateForm) {
    return <CampaignForm 
      formData={formData} 
      setFormData={setFormData}
      onSubmit={handleCreateCampaign}
      onCancel={() => setShowCreateForm(false)}
    />
  }

  if (selectedCampaign) {
    return <CampaignDetail 
      campaign={selectedCampaign} 
      onBack={() => setSelectedCampaign(null)} 
    />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
          <p className="text-gray-600">Create and manage your marketing campaigns</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Campaigns</p>
              <p className="text-2xl font-semibold text-gray-900">{campaigns.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <PlayIcon className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.filter(c => c.status === CampaignStatus.SCHEDULED).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Messages Sent</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <EyeIcon className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Open Rate</p>
              <p className="text-2xl font-semibold text-gray-900">23.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="input-field"
              >
                <option value="">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="SENT">Sent</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="input-field"
              >
                <option value="">All Types</option>
                <option value="WELCOME">Welcome</option>
                <option value="EVENT_INVITE">Event Invite</option>
                <option value="SPECIAL_OFFER">Special Offer</option>
                <option value="BIRTHDAY">Birthday</option>
                <option value="WIN_BACK">Win Back</option>
                <option value="GENERAL">General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <select
                value={filters.messageType}
                onChange={(e) => setFilters(prev => ({ ...prev, messageType: e.target.value }))}
                className="input-field"
              >
                <option value="">All Types</option>
                <option value="SMS">SMS</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="EMAIL">Email</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Campaign List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading campaigns...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedCampaign(campaign)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getTypeIcon(campaign.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded">
                          {campaign.messageType}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{campaign.description}</p>
                      <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          Created: {formatDate(campaign.createdAt)}
                        </div>
                        {campaign.scheduledAt && (
                          <div className="flex items-center">
                            <PlayIcon className="h-4 w-4 mr-1" />
                            Scheduled: {formatDateTime(campaign.scheduledAt)}
                          </div>
                        )}
                        {campaign.sentAt && (
                          <div className="flex items-center">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                            Sent: {formatDateTime(campaign.sentAt)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Edit campaign
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        // TODO: Delete campaign
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700 font-medium">Message Preview:</p>
                  <p className="text-sm text-gray-600 mt-1">{campaign.messageTemplate}</p>
                </div>
              </div>
            ))}
            
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first campaign</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  Create Campaign
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Campaign Form Component
function CampaignForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}: {
  formData: CampaignFormData
  setFormData: (data: CampaignFormData) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onCancel} className="btn-secondary mr-4 flex items-center">
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Details */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter campaign name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Describe your campaign..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as CampaignType })}
                    className="input-field"
                  >
                    <option value={CampaignType.GENERAL}>General</option>
                    <option value={CampaignType.WELCOME}>Welcome</option>
                    <option value={CampaignType.EVENT_INVITE}>Event Invite</option>
                    <option value={CampaignType.SPECIAL_OFFER}>Special Offer</option>
                    <option value={CampaignType.BIRTHDAY}>Birthday</option>
                    <option value={CampaignType.WIN_BACK}>Win Back</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message Type *</label>
                  <select
                    required
                    value={formData.messageType}
                    onChange={(e) => setFormData({ ...formData, messageType: e.target.value as MessageType })}
                    className="input-field"
                  >
                    <option value={MessageType.SMS}>SMS</option>
                    <option value={MessageType.WHATSAPP}>WhatsApp</option>
                    <option value={MessageType.EMAIL}>Email</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule (Optional)</label>
                <input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to send immediately</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Message Content</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Template *</label>
              <textarea
                required
                value={formData.messageTemplate}
                onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
                className="input-field"
                rows={8}
                placeholder="Write your message here... You can use variables like {name}, {firstName}, etc."
              />
              <div className="mt-2 text-xs text-gray-500">
                <p>Character count: {formData.messageTemplate.length} / {formData.messageType === MessageType.SMS ? '160' : '1000'}</p>
                <p className="mt-1">Available variables: {'{name}'}, {'{firstName}'}, {'{phone}'}, {'{email}'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Targeting */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={formData.targetSegment.ageRange?.min || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetSegment: {
                      ...formData.targetSegment,
                      ageRange: {
                        ...formData.targetSegment.ageRange,
                        min: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="input-field"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={formData.targetSegment.ageRange?.max || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetSegment: {
                      ...formData.targetSegment,
                      ageRange: {
                        ...formData.targetSegment.ageRange,
                        max: parseInt(e.target.value) || 0
                      }
                    }
                  })}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visit Frequency</label>
              <select className="input-field">
                <option value="">All customers</option>
                <option value="frequent">Frequent visitors</option>
                <option value="regular">Regular visitors</option>
                <option value="occasional">Occasional visitors</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Visit</label>
              <select className="input-field">
                <option value="">Any time</option>
                <option value="7">Within 7 days</option>
                <option value="30">Within 30 days</option>
                <option value="90">Within 90 days</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Estimated audience: <span className="font-medium">247 customers</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  )
}

// Campaign Detail Component
function CampaignDetail({ campaign, onBack }: { campaign: Campaign; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="btn-secondary mr-4 flex items-center">
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{campaign.name}</h2>
            <p className="text-gray-600">{campaign.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">Edit Campaign</button>
          <button className="btn-primary">Send Now</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">234</p>
                <p className="text-sm text-gray-500">Messages Sent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">221</p>
                <p className="text-sm text-gray-500">Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">187</p>
                <p className="text-sm text-gray-500">Opened</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">23</p>
                <p className="text-sm text-gray-500">Clicked</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Message Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">{campaign.messageTemplate}</p>
            </div>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Type</label>
                <p className="text-sm text-gray-900">{campaign.type.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Message Type</label>
                <p className="text-sm text-gray-900">{campaign.messageType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm text-gray-900">{formatDateTime(campaign.createdAt)}</p>
              </div>
              {campaign.scheduledAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Scheduled</label>
                  <p className="text-sm text-gray-900">{formatDateTime(campaign.scheduledAt)}</p>
                </div>
              )}
              {campaign.sentAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Sent</label>
                  <p className="text-sm text-gray-900">{formatDateTime(campaign.sentAt)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">234 customers targeted</p>
              {campaign.targetSegment && (
                <div className="space-y-1">
                  {(campaign.targetSegment as any).preferences && (
                    <p className="text-gray-600">
                      Preferences: {(campaign.targetSegment as any).preferences.join(', ')}
                    </p>
                  )}
                  {(campaign.targetSegment as any).ageRange && (
                    <p className="text-gray-600">
                      Age: {(campaign.targetSegment as any).ageRange.min}-{(campaign.targetSegment as any).ageRange.max}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
