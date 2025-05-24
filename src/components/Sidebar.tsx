'use client'

import { motion } from 'framer-motion'
import { classNames } from '@/utils/helpers'
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  QrCode, 
  Calendar, 
  PieChart, 
  Settings,
  Sparkles,
  Zap
} from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  current: boolean
  badge?: number
  color?: string
}

interface SidebarProps {
  navigation: NavigationItem[]
  currentView: string
  setCurrentView: (view: string) => void
}

const iconMap = {
  'Dashboard': BarChart3,
  'Customers': Users,
  'Campaigns': MessageSquare,
  'QR Codes': QrCode,
  'Events': Calendar,
  'Analytics': PieChart,
  'Settings': Settings,
}

export default function Sidebar({ navigation, currentView, setCurrentView }: SidebarProps) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-lg"
    >
      {/* Logo Section */}
      <div className="flex items-center h-20 px-6 border-b border-gray-200/50">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OneVisit
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Pro Plan</span>
              <Sparkles className="w-3 h-3 text-yellow-500" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
          Main Menu
        </div>
        
        {navigation.map((item, index) => {
          const IconComponent = iconMap[item.name as keyof typeof iconMap] || item.icon
          const isActive = currentView === item.name
          
          return (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView(item.name)}
              className={classNames(
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200'
              )}
            >
              <div className="flex items-center">
                <IconComponent
                  className={classNames(
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600',
                    'mr-3 h-5 w-5 transition-colors duration-200'
                  )}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              
              {/* Badge for notifications */}
              {item.name === 'Customers' && (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {isActive ? '23' : '23'}
                </span>
              )}
              {item.name === 'Campaigns' && (
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {isActive ? '5' : '5'}
                </span>
              )}
              {item.name === 'Analytics' && (
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom Section - Upgrade Card */}
      <div className="p-4 border-t border-gray-200/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Upgrade Plan</div>
              <div className="text-xs text-gray-600">Unlock more features</div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Upgrade Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
      </nav>
      
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">John Doe</p>
            <p className="text-xs text-gray-500">Business Owner</p>
          </div>
        </div>
      </div>
    </div>
  )
}
