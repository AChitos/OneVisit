'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus,
  MessageSquare,
  Calendar,
  Users,
  Eye,
  Play,
  Pause,
  Edit,
  Trash2,
  ChevronLeft,
  Filter,
  Send,
  Target,
  Clock,
  BarChart3,
  Settings,
  X,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Campaign, CampaignType, CampaignStatus, MessageType } from '@/types'
import { formatDate, formatDateTime } from '@/utils/helpers'
import toast from 'react-hot-toast'

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
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
        scheduledAt: new Date('2024-01-25T16:00:00'),
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        targetSegment: {
          preferences: ['Cocktails', 'Happy Hour']
        },
        targets: [],
        messages: [],
        analytics: []
      },
      {
        id: '3',
        name: 'Birthday Special',
        description: 'Birthday offers for customers',
        type: CampaignType.BIRTHDAY,
        status: CampaignStatus.DRAFT,
        businessId: 'business1',
        createdById: 'user1',
        messageTemplate: 'Happy Birthday! 🎂 Celebrate with us and get a free dessert on your special day!',
        messageType: MessageType.EMAIL,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22'),
        targetSegment: {},
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

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case CampaignStatus.DRAFT:
        return 'bg-gray-100 text-gray-800'
      case CampaignStatus.SCHEDULED:
        return 'bg-blue-100 text-blue-800'
      case CampaignStatus.SENT:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement campaign creation API call
    console.log('Creating campaign:', formData)
    setShowCreateForm(false)
    toast.success('Campaign created successfully!')
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

  const deleteCampaign = async (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id))
      toast.success('Campaign deleted successfully')
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    return (
      (filters.status === '' || campaign.status === filters.status) &&
      (filters.type === '' || campaign.type === filters.type) &&
      (filters.messageType === '' || campaign.messageType === filters.messageType)
    )
  })

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
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        variants={itemVariants}
      >
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Campaign Management
          </h2>
          <p className="text-gray-600">Create and manage your marketing campaigns</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div className="card" variants={cardVariants}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="card" variants={cardVariants}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
              <Play className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === CampaignStatus.SCHEDULED).length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div className="card" variants={cardVariants}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Recipients</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="card" variants={cardVariants}>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">78%</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="input"
                >
                  <option value="">All Statuses</option>
                  <option value={CampaignStatus.DRAFT}>Draft</option>
                  <option value={CampaignStatus.SCHEDULED}>Scheduled</option>
                  <option value={CampaignStatus.SENT}>Sent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="input"
                >
                  <option value="">All Types</option>
                  <option value={CampaignType.WELCOME}>Welcome</option>
                  <option value={CampaignType.SPECIAL_OFFER}>Special Offer</option>
                  <option value={CampaignType.EVENT_INVITE}>Event Invite</option>
                  <option value={CampaignType.BIRTHDAY}>Birthday</option>
                  <option value={CampaignType.WIN_BACK}>Win Back</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                <select
                  value={filters.messageType}
                  onChange={(e) => setFilters({ ...filters, messageType: e.target.value })}
                  className="input"
                >
                  <option value="">All Types</option>
                  <option value={MessageType.SMS}>SMS</option>
                  <option value={MessageType.EMAIL}>Email</option>
                  <option value={MessageType.WHATSAPP}>WhatsApp</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaigns List */}
      <motion.div className="card" variants={itemVariants}>
        <div className="overflow-hidden">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center p-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCampaigns.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-2xl">{getTypeIcon(campaign.type)}</div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-500">{campaign.description}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(campaign.createdAt)}
                          </div>
                          {campaign.scheduledAt && (
                            <div className="flex items-center">
                              <Play className="h-4 w-4 mr-1" />
                              {formatDateTime(campaign.scheduledAt)}
                            </div>
                          )}
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {campaign.messageType}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // TODO: Edit campaign
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteCampaign(campaign.id)
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
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
      </motion.div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <div className="flex items-center">
          <button onClick={onCancel} className="btn-secondary mr-4 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create New Campaign
          </h2>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Describe your campaign"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as CampaignType })}
                  className="input"
                >
                  <option value={CampaignType.GENERAL}>General</option>
                  <option value={CampaignType.WELCOME}>Welcome</option>
                  <option value={CampaignType.SPECIAL_OFFER}>Special Offer</option>
                  <option value={CampaignType.EVENT_INVITE}>Event Invite</option>
                  <option value={CampaignType.BIRTHDAY}>Birthday</option>
                  <option value={CampaignType.WIN_BACK}>Win Back</option>
                </select>
              </div>
            </div>
          </div>

          {/* Message Settings */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Message Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <select
                  value={formData.messageType}
                  onChange={(e) => setFormData({ ...formData, messageType: e.target.value as MessageType })}
                  className="input"
                >
                  <option value={MessageType.SMS}>SMS</option>
                  <option value={MessageType.EMAIL}>Email</option>
                  <option value={MessageType.WHATSAPP}>WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Template
                </label>
                <textarea
                  required
                  value={formData.messageTemplate}
                  onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
                  className="input"
                  rows={4}
                  placeholder="Enter your message template"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={formData.targetSegment.ageRange?.min || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetSegment: {
                      ...formData.targetSegment,
                      ageRange: {
                        min: parseInt(e.target.value) || 0,
                        max: formData.targetSegment.ageRange?.max || 100
                      }
                    }
                  })}
                  className="input"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={formData.targetSegment.ageRange?.max || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    targetSegment: {
                      ...formData.targetSegment,
                      ageRange: {
                        min: formData.targetSegment.ageRange?.min || 0,
                        max: parseInt(e.target.value) || 100
                      }
                    }
                  })}
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Visit (Days)
              </label>
              <input
                type="number"
                placeholder="Days since last visit"
                value={formData.targetSegment.lastVisitDays || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  targetSegment: {
                    ...formData.targetSegment,
                    lastVisitDays: parseInt(e.target.value) || undefined
                  }
                })}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// Campaign Detail Component  
function CampaignDetail({
  campaign,
  onBack
}: {
  campaign: Campaign
  onBack: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={onBack} className="btn-secondary mr-4 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {campaign.name}
              </h2>
              <p className="text-gray-600">{campaign.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
              campaign.status === CampaignStatus.DRAFT ? 'bg-gray-100 text-gray-800' :
              campaign.status === CampaignStatus.SCHEDULED ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {campaign.status}
            </span>
            <span className="text-sm text-gray-500">{campaign.messageType}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-500">Type</label>
              <p className="text-sm text-gray-900">{campaign.type}</p>
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

      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Message Template</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-900">{campaign.messageTemplate}</p>
        </div>
      </div>
    </motion.div>
  )
}
