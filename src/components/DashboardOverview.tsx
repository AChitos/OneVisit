'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  QrCode,
  TrendingUp,
  ArrowUp,
  ArrowDown,
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
      blue: 'from-blue-500 to-blue-600 text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
      green: 'from-green-500 to-green-600 text-green-600 bg-gradient-to-br from-green-50 to-green-100 border-green-200',
      purple: 'from-purple-500 to-purple-600 text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
      orange: 'from-orange-500 to-orange-600 text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
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
      {/* Dashboard Header */}
      <motion.div 
        variants={itemVariants}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </motion.div>
      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const colorClasses = getColorClasses(item.color)
          return (
            <motion.div
              key={item.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 h-24 w-24 -mt-8 -mr-8 opacity-20">
                <item.icon className="h-full w-full" style={{ color: `var(--${item.color}-500)` }} />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className={`inline-flex rounded-xl p-3 bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')}`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-500">{item.name}</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {item.stat}
                      </span>
                    </p>
                    <div className="flex items-center mt-2">
                      <div className={`flex items-center text-sm font-semibold ${
                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.changeType === 'increase' ? (
                          <ArrowUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 mr-1" />
                        )}
                        {item.change}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">{item.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div 
          variants={itemVariants} 
          className="col-span-2"
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">Performance Overview</h3>
              <div className="flex space-x-2">
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 border border-primary-200"
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                  Customers
                </motion.span>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center rounded-full bg-success-100 px-3 py-1 text-xs font-medium text-success-800 border border-success-200"
                >
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Messages
                </motion.span>
              </div>
            </div>
            <div className="h-80 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-gray-600" tickLine={false} axisLine={false} />
                  <YAxis className="text-gray-600" tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      padding: '12px'
                    }}
                    labelStyle={{
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      borderBottom: '1px solid #f1f5f9',
                      paddingBottom: '4px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="var(--primary-500)" 
                    fillOpacity={1} 
                    fill="url(#colorCustomers)" 
                    strokeWidth={3}
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="var(--success)" 
                    fillOpacity={1} 
                    fill="url(#colorMessages)" 
                    strokeWidth={3}
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary-600" />
                Recent Activity
              </h3>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm btn-outline py-1 px-3"
              >
                View all
              </motion.button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const colorClasses = getColorClasses(activity.color)
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      x: 6, 
                      backgroundColor: 'rgba(249, 250, 251, 0.8)' 
                    }}
                    className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
                  >
                    <div className={`flex-shrink-0 rounded-lg p-2 bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')} shadow-sm`}>
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.content}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-secondary-600" />
              Quick Actions
            </h3>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const colorClasses = getColorClasses(action.color)
                return (
                  <motion.button
                    key={action.name}
                    whileHover={{ scale: 1.03, x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full text-left p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className={`rounded-full p-3 bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')} shadow-md group-hover:scale-110 transition-transform duration-200`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <span className="text-sm font-semibold text-gray-900">{action.name}</span>
                        <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
