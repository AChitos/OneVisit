'use client'

import { classNames } from '@/utils/helpers'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  current: boolean
}

interface SidebarProps {
  navigation: NavigationItem[]
  currentView: string
  setCurrentView: (view: string) => void
}

export default function Sidebar({ navigation, currentView, setCurrentView }: SidebarProps) {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">OneVisit</span>
        </div>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setCurrentView(item.name)}
            className={classNames(
              currentView === item.name
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left'
            )}
          >
            <item.icon
              className={classNames(
                currentView === item.name ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-3 h-6 w-6'
              )}
              aria-hidden="true"
            />
            {item.name}
          </button>
        ))}
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
