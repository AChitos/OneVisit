'use client'

import { useState, useEffect } from 'react'
import { 
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  QrCodeIcon,
  CalendarIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface AnalyticsFilter {
  dateRange: string
  metric: string
  segment: string
}

interface MetricCard {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: React.ComponentType<any>
  color: string
}

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    color: string
  }[]
}

export default function Analytics() {
  const [filters, setFilters] = useState<AnalyticsFilter>({
    dateRange: '30d',
    metric: 'all',
    segment: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock analytics data
  const metrics: MetricCard[] = [
    {
      title: 'Total Customers',
      value: '1,247',
      change: '+12.3%',
      changeType: 'increase',
      icon: UserGroupIcon,
      color: 'text-blue-600'
    },
    {
      title: 'Messages Sent',
      value: '3,426',
      change: '+8.7%',
      changeType: 'increase',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-green-600'
    },
    {
      title: 'QR Code Scans',
      value: '892',
      change: '-2.1%',
      changeType: 'decrease',
      icon: QrCodeIcon,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '24.3%',
      change: '+1.8%',
      changeType: 'increase',
      icon: ChartBarIcon,
      color: 'text-orange-600'
    },
    {
      title: 'Active Events',
      value: '8',
      change: '+3',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'text-indigo-600'
    },
    {
      title: 'Email Open Rate',
      value: '31.2%',
      change: '+4.5%',
      changeType: 'increase',
      icon: EyeIcon,
      color: 'text-pink-600'
    }
  ]

  // Mock chart data for customer growth
  const customerGrowthData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [45, 67, 89, 123, 156, 198],
        color: 'rgb(59, 130, 246)'
      },
      {
        label: 'Returning Customers',
        data: [23, 34, 45, 67, 89, 112],
        color: 'rgb(16, 185, 129)'
      }
    ]
  }

  // Mock chart data for message performance
  const messagePerformanceData: ChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'SMS',
        data: [234, 267, 289, 312],
        color: 'rgb(99, 102, 241)'
      },
      {
        label: 'WhatsApp',
        data: [156, 178, 201, 234],
        color: 'rgb(34, 197, 94)'
      },
      {
        label: 'Email',
        data: [89, 92, 98, 105],
        color: 'rgb(168, 85, 247)'
      }
    ]
  }

  // Mock top performing campaigns
  const topCampaigns = [
    {
      name: 'Welcome Series',
      sent: 234,
      opened: 187,
      clicked: 89,
      conversion: '38.0%'
    },
    {
      name: 'Happy Hour Promo',
      sent: 456,
      opened: 342,
      clicked: 156,
      conversion: '34.2%'
    },
    {
      name: 'Weekend Special',
      sent: 189,
      opened: 134,
      clicked: 67,
      conversion: '35.4%'
    },
    {
      name: 'Birthday Rewards',
      sent: 78,
      opened: 72,
      clicked: 45,
      conversion: '57.7%'
    }
  ]

  // Mock QR code performance
  const qrCodeStats = [
    {
      name: 'Table 1-5',
      scans: 234,
      conversions: 89,
      rate: '38.0%'
    },
    {
      name: 'Bar Area',
      scans: 189,
      conversions: 67,
      rate: '35.4%'
    },
    {
      name: 'Entrance',
      scans: 156,
      conversions: 45,
      rate: '28.8%'
    },
    {
      name: 'Outdoor Seating',
      scans: 123,
      conversions: 34,
      rate: '27.6%'
    }
  ]

  const getDateRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Last 7 days'
      case '30d': return 'Last 30 days'
      case '90d': return 'Last 90 days'
      case '1y': return 'Last year'
      default: return 'Last 30 days'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your business performance and customer engagement</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="input-field min-w-0"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metric Focus</label>
              <select
                value={filters.metric}
                onChange={(e) => setFilters(prev => ({ ...prev, metric: e.target.value }))}
                className="input-field"
              >
                <option value="all">All Metrics</option>
                <option value="customers">Customer Metrics</option>
                <option value="campaigns">Campaign Metrics</option>
                <option value="qr">QR Code Metrics</option>
                <option value="events">Event Metrics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Segment</label>
              <select
                value={filters.segment}
                onChange={(e) => setFilters(prev => ({ ...prev, segment: e.target.value }))}
                className="input-field"
              >
                <option value="all">All Customers</option>
                <option value="new">New Customers</option>
                <option value="returning">Returning Customers</option>
                <option value="frequent">Frequent Visitors</option>
                <option value="inactive">Inactive Customers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Compare To</label>
              <select className="input-field">
                <option value="previous">Previous Period</option>
                <option value="year">Same Period Last Year</option>
                <option value="benchmark">Industry Benchmark</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Customer growth chart</p>
              <p className="text-xs text-gray-400">Line chart showing new vs returning customers</p>
              <div className="mt-4 text-xs text-gray-600">
                <p>New Customers: {customerGrowthData.datasets[0].data.slice(-1)[0]}</p>
                <p>Returning: {customerGrowthData.datasets[1].data.slice(-1)[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Performance Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Performance</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Message delivery chart</p>
              <p className="text-xs text-gray-400">Bar chart showing SMS, WhatsApp, Email performance</p>
              <div className="mt-4 text-xs text-gray-600">
                <p>SMS: {messagePerformanceData.datasets[0].data.slice(-1)[0]} sent</p>
                <p>WhatsApp: {messagePerformanceData.datasets[1].data.slice(-1)[0]} sent</p>
                <p>Email: {messagePerformanceData.datasets[2].data.slice(-1)[0]} sent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Campaigns */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top Performing Campaigns</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCampaigns.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.opened} opened, {campaign.clicked} clicked</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.sent}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {campaign.conversion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Code Performance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">QR Code Performance</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scans
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {qrCodeStats.map((qr, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{qr.name}</div>
                      <div className="text-sm text-gray-500">{qr.conversions} conversions</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {qr.scans}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {qr.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Real-time Insights */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Real-time Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <div className="text-sm text-blue-700">Active customers online</div>
            <div className="text-xs text-blue-500 mt-1">In the last 30 minutes</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-green-700">QR codes scanned</div>
            <div className="text-xs text-green-500 mt-1">In the last hour</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-sm text-purple-700">Messages delivered</div>
            <div className="text-xs text-purple-500 mt-1">In the last 10 minutes</div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Export Analytics</h3>
            <p className="text-sm text-gray-500">Download your analytics data for external analysis</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-secondary">Export PDF Report</button>
            <button className="btn-primary">Schedule Report</button>
          </div>
        </div>
      </div>
    </div>
  )
}
