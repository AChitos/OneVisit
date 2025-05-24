'use client'

import { motion } from 'framer-motion'
import { Bell, Search, Settings, User, LogOut, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface HeaderProps {
  currentView: string
  userName?: string
  userRole?: string
}

export default function Header({ currentView, userName = "John Doe", userRole = "Admin" }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const getPageTitle = (view: string) => {
    const titles = {
      'Dashboard': 'Welcome back! 👋',
      'Customers': 'Customer Management',
      'Campaigns': 'Marketing Campaigns',
      'QR Codes': 'QR Code Manager',
      'Events': 'Event Management',
      'Analytics': 'Business Analytics',
      'Settings': 'Platform Settings'
    }
    return titles[view as keyof typeof titles] || 'OneVisit Platform'
  }

  const getPageDescription = (view: string) => {
    const descriptions = {
      'Dashboard': 'Overview of your business performance and recent activity',
      'Customers': 'Manage your customer database and engagement',
      'Campaigns': 'Create and manage multi-channel messaging campaigns',
      'QR Codes': 'Generate and track QR codes for customer onboarding',
      'Events': 'Organize events and track attendee engagement',
      'Analytics': 'Detailed insights into your business metrics',
      'Settings': 'Configure your platform and account preferences'
    }
    return descriptions[view as keyof typeof descriptions] || 'Manage your business efficiently'
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Page Title Section */}
          <div className="flex-1">
            <motion.h1 
              key={currentView}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gray-900 mb-1"
            >
              {getPageTitle(currentView)}
            </motion.h1>
            <motion.p 
              key={`${currentView}-desc`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-600"
            >
              {getPageDescription(currentView)}
            </motion.p>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </motion.button>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Help Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Help & Support"
            >
              <HelpCircle className="w-5 h-5" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span>
            </motion.button>

            {/* User Profile Dropdown */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-semibold text-gray-900">{userName}</div>
                    <div className="text-xs text-gray-500">{userRole}</div>
                  </div>
                </motion.button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[200px] bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-50"
                  sideOffset={8}
                  align="end"
                >
                  <DropdownMenu.Item className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </DropdownMenu.Item>
                  
                  <DropdownMenu.Item className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
                  
                  <DropdownMenu.Item className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
