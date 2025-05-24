'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Calendar,
  Users,
  Clock,
  MapPin,
  Edit,
  Trash2,
  ChevronLeft,
  Eye,
  Filter,
  MessageCircle,
  Play,
  Pause,
  BarChart3,
  Settings,
  Search,
  Star,
  Ticket
} from 'lucide-react'
import { Event } from '@/types'
import { formatDate, formatDateTime } from '@/utils/helpers'
import toast from 'react-hot-toast'

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

interface EventFormData {
  name: string
  description: string
  eventType: string
  startDate: string
  endDate: string
  isActive: boolean
}

const eventTypes = [
  'Live Music',
  'DJ Sets', 
  'Comedy Shows',
  'Sports Events',
  'Happy Hour',
  'Special Offers',
  'Trivia Night',
  'Karaoke',
  'Wine Tasting',
  'Private Party',
  'Other'
]

export default function EventManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    eventType: '',
    status: '',
    dateRange: ''
  })
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    eventType: '',
    startDate: '',
    endDate: '',
    isActive: true
  })

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        name: 'Live Jazz Night',
        description: 'Join us for an amazing evening of live jazz music with the John Smith Quartet',
        eventType: 'Live Music',
        startDate: new Date('2024-01-26T20:00:00'),
        endDate: new Date('2024-01-26T23:00:00'),
        businessId: 'business1',
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        name: 'Friday Night Comedy Show',
        description: 'Laugh out loud with our weekly comedy showcase featuring local comedians',
        eventType: 'Comedy Shows',
        startDate: new Date('2024-01-27T21:00:00'),
        endDate: new Date('2024-01-27T23:30:00'),
        businessId: 'business1',
        isActive: true,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '3',
        name: 'Happy Hour Special',
        description: '50% off all cocktails and appetizers',
        eventType: 'Happy Hour',
        startDate: new Date('2024-01-24T17:00:00'),
        endDate: new Date('2024-01-24T19:00:00'),
        businessId: 'business1',
        isActive: false,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-24')
      },
      {
        id: '4',
        name: 'Trivia Tuesday',
        description: 'Test your knowledge and win great prizes at our weekly trivia night',
        eventType: 'Trivia Night',
        startDate: new Date('2024-01-30T19:30:00'),
        endDate: new Date('2024-01-30T22:00:00'),
        businessId: 'business1',
        isActive: true,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-01-22')
      },
      {
        id: '5',
        name: 'Wine Tasting Event',
        description: 'Discover new wines from local vineyards with our sommelier',
        eventType: 'Wine Tasting',
        startDate: new Date('2024-02-03T18:00:00'),
        endDate: new Date('2024-02-03T21:00:00'),
        businessId: 'business1',
        isActive: true,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      }
    ]
    
    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesType = !filters.eventType || event.eventType === filters.eventType
    const matchesStatus = !filters.status || 
      (filters.status === 'active' && event.isActive) ||
      (filters.status === 'inactive' && !event.isActive) ||
      (filters.status === 'upcoming' && new Date(event.startDate) > new Date()) ||
      (filters.status === 'past' && new Date(event.endDate || event.startDate) < new Date())
    
    return matchesType && matchesStatus
  })

  const upcomingEvents = events.filter(event => 
    event.isActive && new Date(event.startDate) > new Date()
  )

  const pastEvents = events.filter(event => 
    new Date(event.endDate || event.startDate) < new Date()
  )

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newEvent: Event = {
      id: `event_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      eventType: formData.eventType,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      businessId: 'business1', // Replace with actual business ID
      isActive: formData.isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setEvents(prev => [newEvent, ...prev])
    setShowCreateForm(false)
    setFormData({
      name: '',
      description: '',
      eventType: '',
      startDate: '',
      endDate: '',
      isActive: true
    })
  }

  const handleToggleActive = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isActive: !event.isActive, updatedAt: new Date() }
        : event
    ))
  }

  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId))
    }
  }

  const getEventStatus = (event: Event) => {
    const now = new Date()
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate || event.startDate)
    
    if (!event.isActive) return { status: 'Inactive', color: 'bg-gray-100 text-gray-800' }
    if (now < startDate) return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800' }
    if (now >= startDate && now <= endDate) return { status: 'Live', color: 'bg-green-100 text-green-800' }
    if (now > endDate) return { status: 'Ended', color: 'bg-red-100 text-red-800' }
    
    return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'Live Music': return '🎵'
      case 'DJ Sets': return '🎧'
      case 'Comedy Shows': return '😂'
      case 'Sports Events': return '⚽'
      case 'Happy Hour': return '🍸'
      case 'Special Offers': return '🎁'
      case 'Trivia Night': return '🧠'
      case 'Karaoke': return '🎤'
      case 'Wine Tasting': return '🍷'
      case 'Private Party': return '🎉'
      default: return '📅'
    }
  }

  if (showCreateForm) {
    return <EventForm 
      formData={formData} 
      setFormData={setFormData}
      onSubmit={handleCreateEvent}
      onCancel={() => setShowCreateForm(false)}
    />
  }

  if (selectedEvent) {
    return <EventDetail 
      event={selectedEvent} 
      onBack={() => setSelectedEvent(null)}
      onToggleActive={() => handleToggleActive(selectedEvent.id)}
    />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
          <p className="text-gray-600">Create and manage events to engage your customers</p>
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
            Create Event
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-semibold text-gray-900">{upcomingEvents.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Past Events</p>
              <p className="text-2xl font-semibold text-gray-900">{pastEvents.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Invites Sent</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={filters.eventType}
                onChange={(e) => setFilters(prev => ({ ...prev, eventType: e.target.value }))}
                className="input-field"
              >
                <option value="">All Types</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="input-field"
              >
                <option value="">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="past">Past</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="input-field"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Event List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading events...</p>
          </div>
        ) : (
          <>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500 mb-6">Create your first event to engage with customers</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  Create Event
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => {
                  const { status, color } = getEventStatus(event)
                  return (
                    <div 
                      key={event.id} 
                      className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl">{getEventTypeIcon(event.eventType)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
                                {status}
                              </span>
                              <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded">
                                {event.eventType}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{event.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <div className="flex items-center">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                {formatDate(event.startDate)}
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-4 w-4 mr-1" />
                                {new Date(event.startDate).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                                {event.endDate && (
                                  <> - {new Date(event.endDate).toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}</>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              // TODO: Send invites
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 rounded-md hover:bg-gray-100"
                            title="Send Invites"
                          >
                            <ChatBubbleLeftRightIcon className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              // TODO: Edit event
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                            title="Edit Event"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(event.id)
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
                            title="Delete Event"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Event Form Component
function EventForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}: {
  formData: EventFormData
  setFormData: (data: EventFormData) => void
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
          <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Event Details */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter event name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Describe your event..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Event is active and visible to customers
                </label>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Date & Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time *</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">Optional - leave empty for open-ended events</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Events will automatically be used to target customers with relevant preferences for invitation campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </div>
  )
}

// Event Detail Component
function EventDetail({ 
  event, 
  onBack, 
  onToggleActive 
}: { 
  event: Event
  onBack: () => void
  onToggleActive: () => void
}) {
  const { status, color } = getEventStatus(event)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="btn-secondary mr-4 flex items-center">
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
            <p className="text-gray-600">{event.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center">
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
            Send Invites
          </button>
          <button className="btn-secondary">Edit Event</button>
          <button onClick={onToggleActive} className="btn-primary">
            {event.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Event Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">234</p>
                <p className="text-sm text-gray-500">Invites Sent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">187</p>
                <p className="text-sm text-gray-500">Opened</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">89</p>
                <p className="text-sm text-gray-500">Interested</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">45</p>
                <p className="text-sm text-gray-500">Attended</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                This event automatically targets customers with preferences for: <strong>{event.eventType}</strong>
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">Estimated audience: <strong>234 customers</strong></p>
                <p className="text-xs text-gray-500 mt-1">
                  Based on customer preferences and visit history
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${color}`}>
                  {status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Event Type</label>
                <p className="text-sm text-gray-900">{event.eventType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Start Date</label>
                <p className="text-sm text-gray-900">{formatDateTime(event.startDate)}</p>
              </div>
              {event.endDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">End Date</label>
                  <p className="text-sm text-gray-900">{formatDateTime(event.endDate)}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm text-gray-900">{formatDateTime(event.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary text-sm">
                Create Invitation Campaign
              </button>
              <button className="w-full btn-secondary text-sm">
                Create QR Code for Event
              </button>
              <button className="w-full btn-secondary text-sm">
                View Customer Responses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getEventStatus(event: Event) {
  const now = new Date()
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate || event.startDate)
  
  if (!event.isActive) return { status: 'Inactive', color: 'bg-gray-100 text-gray-800' }
  if (now < startDate) return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800' }
  if (now >= startDate && now <= endDate) return { status: 'Live', color: 'bg-green-100 text-green-800' }
  if (now > endDate) return { status: 'Ended', color: 'bg-red-100 text-red-800' }
  
  return { status: 'Unknown', color: 'bg-gray-100 text-gray-800' }
}
