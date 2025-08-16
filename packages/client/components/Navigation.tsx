"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  HomeIcon, 
  FolderIcon, 
  ClipboardDocumentListIcon, 
  ChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  description: string
}

const navigation: NavItem[] = [
  {
    name: 'แดชบอร์ด',
    href: '/dashboard',
    icon: HomeIcon,
    description: 'ภาพรวมและสถิติการทำงาน'
  },
  {
    name: 'โปรเจกต์',
    href: '/projects',
    icon: FolderIcon,
    description: 'จัดการโปรเจกต์และพอร์ตโฟลิโอ'
  },
  {
    name: 'งาน',
    href: '/tasks',
    icon: ClipboardDocumentListIcon,
    description: 'รายการงานและระบบ Catalyst'
  },
  {
    name: 'Mind-Biome',
    href: '/mind-biome',
    icon: SparklesIcon,
    description: 'ภาพจิตใจและพลังงานสร้างสรรค์'
  },
  {
    name: 'วิเคราะห์',
    href: '/analytics',
    icon: ChartBarIcon,
    description: 'รายงานและข้อมูลเชิงลึก'
  },
  {
    name: 'ห้องทดลอง',
    href: '/lab',
    icon: BeakerIcon,
    description: 'ฟีเจอร์ทดลองและเครื่องมือใหม่'
  }
]

const userNavigation = [
  { name: 'โปรไฟล์', href: '/profile' },
  { name: 'การตั้งค่า', href: '/settings' },
  { name: 'ออกจากระบบ', href: '#' }
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-sm
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:inset-0
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">UnicornX</span>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white"
              aria-label="ปิดเมนู"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }
                  `}
                  onClick={() => onClose()}
                >
                  <item.icon className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                  `} />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`
                      text-xs mt-0.5
                      ${isActive ? 'text-purple-100' : 'text-slate-500 group-hover:text-slate-300'}
                    `}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-slate-700 px-4 py-4">
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  ผู้ใช้งาน
                </p>
                <p className="text-xs text-slate-400 truncate">
                  user@unicornx.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface NavigationProps {
  children: React.ReactNode
}

export default function Navigation({ children }: NavigationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
          <div className="flex h-16 items-center justify-between px-6">
            <button
              type="button"
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
              aria-label="เปิดเมนู"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Search bar */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหางาน, โปรเจกต์..."
                    className="w-64 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* User menu */}
              <div className="flex items-center space-x-4">
                <button 
                  className="text-slate-400 hover:text-white"
                  aria-label="การตั้งค่า"
                >
                  <Cog6ToothIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
