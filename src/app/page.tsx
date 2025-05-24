'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChartBarIcon, 
  QrCodeIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import DashboardOverview from '@/components/DashboardOverview'
import CustomerManager from '@/components/CustomerManager'
import CampaignManager from '@/components/CampaignManager'
import QRCodeManager from '@/components/QRCodeManager'
import EventManager from '@/components/EventManager'
import Analytics from '@/components/Analytics'
import Settings from '@/components/Settings'

const navigation = [
  { name: 'Dashboard', href: '#', icon: ChartBarIcon, current: true },
  { name: 'Customers', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Campaigns', href: '#', icon: ChatBubbleLeftRightIcon, current: false },
  { name: 'QR Codes', href: '#', icon: QrCodeIcon, current: false },
  { name: 'Events', href: '#', icon: CalendarIcon, current: false },
  { name: 'Analytics', href: '#', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
]

const pageVariants = {
  initial: { opacity: 0, x: 20, scale: 0.95 },
  in: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: -20, scale: 0.95 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
}

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState('Dashboard')

  const renderContent = () => {
    const components = {
      'Dashboard': DashboardOverview,
      'Customers': CustomerManager,
      'Campaigns': CampaignManager,
      'QR Codes': QRCodeManager,
      'Events': EventManager,
      'Analytics': Analytics,
      'Settings': Settings
    }
    
    const Component = components[currentView as keyof typeof components] || DashboardOverview
    
    return (
      <motion.div
        key={currentView}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="h-full"
      >
        <Component />
      </motion.div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <Sidebar 
        navigation={navigation} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header currentView={currentView} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        navigation={navigation} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-900">{currentView}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Live</span>
                </div>
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
