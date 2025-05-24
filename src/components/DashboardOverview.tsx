'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  QrCode,
  TrendingUp,
  ArrowUpIcon,
  ArrowDownIcon,
  Activity,
  Clock,
  Star,
  Zap,
  Target,
  Calendar,
  Eye,
  UserPlus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const stats = [
  {
    name: 'Total Customers',
    stat: '1,247',
    change: '12%',
    changeType: 'increase',
    icon: Users,
    color: 'blue',
    description: 'New customers this month'
  },
  {
    name: 'Messages Sent',
    stat: '3,426',
    change: '5.4%',
    changeType: 'increase',
    icon: MessageSquare,
    color: 'green',
    description: 'Total messages delivered'
  },
  {
    name: 'QR Code Scans',
    stat: '892',
    change: '3.2%',
    changeType: 'decrease',
    icon: QrCode,
    color: 'purple',
    description: 'Scans in the last 7 days'
  },
  {
    name: 'Conversion Rate',
    stat: '24.3%',
    change: '1.2%',
    changeType: 'increase',
    icon: Target,
    color: 'orange',
    description: 'QR to customer conversion'
  },
]

const chartData = [
  { name: 'Jan', customers: 400, messages: 800 },
  { name: 'Feb', customers: 580, messages: 1200 },
  { name: 'Mar', customers: 720, messages: 1400 },
  { name: 'Apr', customers: 890, messages: 1800 },
  { name: 'May', customers: 1247, messages: 2200 },
]

const recentActivity = [
  {
    id: 1,
    type: 'customer',
    icon: UserPlus,
    content: 'New customer Sarah Johnson signed up via QR code',
    time: '2 minutes ago',
    color: 'green'
  },
  {
    id: 2,
    type: 'campaign',
    icon: MessageSquare,
    content: 'Campaign "Summer Sale" sent to 156 customers',
    time: '15 minutes ago',
    color: 'blue'
  },
  {
    id: 3,
    type: 'qr',
    icon: QrCode,
    content: 'QR code for "Restaurant Menu" scanned 23 times',
    time: '1 hour ago',
    color: 'purple'
  },
  {
    id: 4,
    type: 'analytics',
    icon: TrendingUp,
    content: 'Monthly report generated successfully',
    time: '2 hours ago',
    color: 'orange'
  },
]

const quickActions = [
  {
    name: 'Create Campaign',
    description: 'Send messages to customers',
    icon: MessageSquare,
    color: 'blue',
    action: () => {}
  },
  {
    name: 'Generate QR Code',
    description: 'Create new QR code',
    icon: QrCode,
    color: 'purple',
    action: () => {}
  },
  {
    name: 'Add Customer',
    description: 'Manually add customer',
    icon: UserPlus,
    color: 'green',
    action: () => {}
  },
  {
    name: 'View Analytics',
    description: 'Check performance',
    icon: TrendingUp,
    color: 'orange',
    action: () => {}
  },
]

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

export default function DashboardOverview() {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50 border-blue-200',
      green: 'bg-green-500 text-green-600 bg-green-50 border-green-200',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50 border-purple-200',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50 border-orange-200',
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
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
