'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  QrCode, 
  Users, 
  MessageSquare,
  Calendar,
  Settings as SettingsIcon
} from 'lucide-react'
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
  { name: 'Dashboard', href: '#', icon: BarChart3, current: true },
  { name: 'Customers', href: '#', icon: Users, current: false },
  { name: 'Campaigns', href: '#', icon: MessageSquare, current: false },
  { name: 'QR Codes', href: '#', icon: QrCode, current: false },
  { name: 'Events', href: '#', icon: Calendar, current: false },
  { name: 'Analytics', href: '#', icon: BarChart3, current: false },
  { name: 'Settings', href: '#', icon: SettingsIcon, current: false },
]

const pageVariants = {
  initial: { opacity: 0, x: 20, scale: 0.95 },
  in: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  out: { opacity: 0, x: -20, scale: 0.95 }
}

// Child element variants for staggered animations
const childVariants = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15
    }
  },
  out: { opacity: 0, y: 20 }
}

const pageTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 15
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
        <motion.main 
          className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="p-6 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
