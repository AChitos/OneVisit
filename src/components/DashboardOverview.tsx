'use client'

import { 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon, 
  QrCodeIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Customers',
    stat: '1,247',
    change: '12%',
    changeType: 'increase',
    icon: UserGroupIcon,
  },
  {
    name: 'Messages Sent',
    stat: '3,426',
    change: '5.4%',
    changeType: 'increase',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'QR Code Scans',
    stat: '892',
    change: '3.2%',
    changeType: 'decrease',
    icon: QrCodeIcon,
  },
  {
    name: 'Conversion Rate',
    stat: '24.3%',
    change: '1.2%',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'customer',
    content: 'New customer Sarah Johnson signed up via QR code',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'campaign',
    content: 'Happy Hour campaign sent to 234 customers',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'event',
    content: 'Live Jazz Night event created for this Friday',
    time: '3 hours ago',
  },
  {
    id: 4,
    type: 'qr',
    content: 'QR code "Table 7" scanned 15 times today',
    time: '5 hours ago',
  },
]

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-8 w-8 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{item.stat}</div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.changeType === 'increase' ? (
                        <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                      )}
                      <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <QrCodeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">Generate New QR Code</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">Create Campaign</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <UserGroupIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">View Customers</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">Chart component will be implemented here</p>
            <p className="text-sm text-gray-400">Customer acquisition, message delivery rates, engagement metrics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
