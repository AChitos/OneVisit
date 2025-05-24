'use client'

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { Customer, Gender } from '@/types'
import { formatDate, formatPhone, getInitials } from '@/utils/helpers'

interface CustomerFilters {
  search: string
  gender: string
  visitFrequency: string
  spendingRange: string
  dateRange: string
}

export default function CustomerManager() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<CustomerFilters>({
    search: '',
    gender: '',
    visitFrequency: '',
    spendingRange: '',
    dateRange: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockCustomers: Customer[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        phone: '+1 555-0123',
        email: 'sarah.j@email.com',
        dateOfBirth: new Date('1992-05-15'),
        gender: Gender.FEMALE,
        preferences: {
          drinkTypes: ['Wine', 'Cocktails'],
          eventTypes: ['Live Music', 'Happy Hour'],
          communicationPreference: 'SMS'
        },
        consentGiven: true,
        consentDate: new Date(),
        businessId: 'business1',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date(),
        lastVisit: new Date('2024-01-20'),
        visitCount: 5,
        totalSpent: 247.50
      },
      {
        id: '2',
        name: 'Michael Chen',
        phone: '+1 555-0124',
        email: 'mchen@email.com',
        gender: Gender.MALE,
        preferences: {
          drinkTypes: ['Beer', 'Whiskey'],
          eventTypes: ['Sports Events', 'DJ Sets'],
          communicationPreference: 'WHATSAPP'
        },
        consentGiven: true,
        consentDate: new Date(),
        businessId: 'business1',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date(),
        lastVisit: new Date('2024-01-18'),
        visitCount: 8,
        totalSpent: 412.75
      },
      {
        id: '3',
        name: 'Emma Wilson',
        phone: '+1 555-0125',
        email: 'emma.wilson@email.com',
        dateOfBirth: new Date('1988-11-22'),
        gender: Gender.FEMALE,
        preferences: {
          drinkTypes: ['Cocktails', 'Wine'],
          eventTypes: ['Comedy Shows', 'Live Music'],
          communicationPreference: 'EMAIL'
        },
        consentGiven: true,
        consentDate: new Date(),
        businessId: 'business1',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date(),
        lastVisit: new Date('2024-01-19'),
        visitCount: 3,
        totalSpent: 189.25
      }
    ]
    
    setTimeout(() => {
      setCustomers(mockCustomers)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         customer.phone.includes(filters.search) ||
                         customer.email?.toLowerCase().includes(filters.search.toLowerCase())
    
    const matchesGender = !filters.gender || customer.gender === filters.gender
    
    return matchesSearch && matchesGender
  })

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getSpendingCategory = (amount: number) => {
    if (amount >= 500) return 'High'
    if (amount >= 200) return 'Medium'
    return 'Low'
  }

  const getVisitFrequency = (count: number) => {
    if (count >= 10) return 'Frequent'
    if (count >= 5) return 'Regular'
    return 'Occasional'
  }

  if (selectedCustomer) {
    return <CustomerDetail customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Manage and analyze your customer base</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="btn-primary flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">New This Month</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <PhoneIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">SMS Consent</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round((customers.filter(c => c.consentGiven).length / customers.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <EnvelopeIcon className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Email Provided</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round((customers.filter(c => c.email).length / customers.length) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, phone, or email..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10 input-field"
            />
          </div>
        </div>

        {showFilters && (
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                  className="input-field"
                >
                  <option value="">All Genders</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visit Frequency</label>
                <select
                  value={filters.visitFrequency}
                  onChange={(e) => setFilters(prev => ({ ...prev, visitFrequency: e.target.value }))}
                  className="input-field"
                >
                  <option value="">All Frequencies</option>
                  <option value="frequent">Frequent (10+)</option>
                  <option value="regular">Regular (5-9)</option>
                  <option value="occasional">Occasional (1-4)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spending Range</label>
                <select
                  value={filters.spendingRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, spendingRange: e.target.value }))}
                  className="input-field"
                >
                  <option value="">All Ranges</option>
                  <option value="high">High ($500+)</option>
                  <option value="medium">Medium ($200-499)</option>
                  <option value="low">Low ($0-199)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="input-field"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading customers...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Visit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedCustomers.map((customer) => (
                    <tr 
                      key={customer.id} 
                      className="table-row cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {getInitials(customer.name)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.gender ? customer.gender.replace('_', ' ').toLowerCase() : 'Not specified'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatPhone(customer.phone)}</div>
                        <div className="text-sm text-gray-500">{customer.email || 'No email'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.visitCount}</div>
                        <div className="text-sm text-gray-500">{getVisitFrequency(customer.visitCount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{getSpendingCategory(customer.totalSpent)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.lastVisit ? formatDate(customer.lastVisit) : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.consentGiven 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {customer.consentGiven ? 'Consented' : 'No Consent'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredCustomers.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredCustomers.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === i + 1
                              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Customer Detail Component
function CustomerDetail({ customer, onBack }: { customer: Customer; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="btn-secondary mr-4 flex items-center"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">Send Message</button>
          <button className="btn-primary">Edit Customer</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="text-sm text-gray-900">{formatPhone(customer.phone)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm text-gray-900">{customer.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-sm text-gray-900">
                  {customer.dateOfBirth ? formatDate(customer.dateOfBirth) : 'Not provided'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <p className="text-sm text-gray-900">
                  {customer.gender ? customer.gender.replace('_', ' ') : 'Not specified'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Member Since</label>
                <p className="text-sm text-gray-900">{formatDate(customer.createdAt)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Consent Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  customer.consentGiven 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {customer.consentGiven ? 'Consented' : 'No Consent'}
                </span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Drink Preferences</label>
                <div className="flex flex-wrap gap-2">
                  {customer.preferences?.drinkTypes?.map((drink, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {drink}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Event Interests</label>
                <div className="flex flex-wrap gap-2">
                  {customer.preferences?.eventTypes?.map((event, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Communication Preference</label>
                <p className="text-sm text-gray-900">
                  {customer.preferences?.communicationPreference || 'SMS'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Activity */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Visits</span>
                <span className="text-lg font-semibold text-gray-900">{customer.visitCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Spent</span>
                <span className="text-lg font-semibold text-gray-900">${customer.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Avg. per Visit</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${customer.visitCount > 0 ? (customer.totalSpent / customer.visitCount).toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last Visit</span>
                <span className="text-sm text-gray-900">
                  {customer.lastVisit ? formatDate(customer.lastVisit) : 'Never'}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <p className="text-gray-500">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
