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
      className="flex flex-col w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200/50 shadow-lg"
    >
      {/* Logo Section */}
      <div className="flex items-center h-20 px-6 border-b border-gray-200/50">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div className="ml-3">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              OneVisit
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Pro Plan</span>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 5
                }}
              >
                <Sparkles className="w-3 h-3 text-yellow-500" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3 flex items-center">
          <span className="w-8 h-px bg-gradient-to-r from-gray-200 to-transparent mr-2"></span>
          Main Menu
          <span className="w-8 h-px bg-gradient-to-l from-gray-200 to-transparent ml-2"></span>
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
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentView(item.name)}
              className={classNames(
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg border-transparent'
                  : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900 border-gray-100',
                'group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all duration-200 border'
              )}
            >
              <div className="flex items-center">
                <div className={classNames(
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 group-hover:bg-primary-50',
                  'rounded-lg p-2 transition-colors duration-200'
                )}>
                  <IconComponent
                    className={classNames(
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600',
                      'h-5 w-5 transition-colors duration-200'
                    )}
                  />
                </div>
                <span className="font-medium ml-3">{item.name}</span>
              </div>
              
              {/* Badge for notifications */}
              {item.name === 'Customers' && (
                <span className={`
                  ${isActive ? 'bg-white/20 text-white' : 'bg-success-100 text-success-800'}
                  text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200
                `}>
                  23
                </span>
              )}
              {item.name === 'Campaigns' && (
                <span className={`
                  ${isActive ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-800'}
                  text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200
                `}>
                  5
                </span>
              )}
              {item.name === 'Analytics' && (
                <span className={`
                  ${isActive ? 'bg-white/20 text-white' : 'bg-secondary-100 text-secondary-800'}
                  text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200
                `}>
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
          className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-5 border border-primary-200 shadow-inner overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 opacity-10">
            <Sparkles className="w-full h-full text-secondary-500" />
          </div>
          
          <div className="flex items-center space-x-3 mb-4 relative z-10">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full p-2 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">Upgrade to Premium</div>
              <div className="text-xs text-gray-600">Get 5x more features</div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
          >
            <span>Upgrade Now</span>
            <svg className="w-4 h-4 ml-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
