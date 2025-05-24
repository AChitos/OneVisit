'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  QrCode,
  Eye,
  Copy,
  Edit,
  Trash2,
  ChevronLeft,
  Download,
  Printer,
  Share2,
  BarChart3,
  Calendar,
  Search,
  Filter,
  Settings,
  Users,
  MessageSquare,
  Target,
  XCircle
} from 'lucide-react'
import { QRCode } from '@/types'
import { formatDate, generateQRCodeId } from '@/utils/helpers'
import toast from 'react-hot-toast'

// Animation variants
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

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
}

interface QRCodeFormData {
  name: string
  description: string
  isActive: boolean
}

export default function QRCodeManager() {
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedQRCode, setSelectedQRCode] = useState<QRCode | null>(null)
  const [formData, setFormData] = useState<QRCodeFormData>({
    name: '',
    description: '',
    isActive: true
  })

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockQRCodes: QRCode[] = [
      {
        id: '1',
        code: 'qr_table_01_abc123',
        name: 'Table 1',
        description: 'Main dining area - Table 1',
        businessId: 'business1',
        isActive: true,
        scansCount: 127,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        code: 'qr_bar_entrance_def456',
        name: 'Bar Entrance',
        description: 'QR code at the main bar entrance',
        businessId: 'business1',
        isActive: true,
        scansCount: 89,
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '3',
        code: 'qr_table_05_ghi789',
        name: 'Table 5',
        description: 'VIP section - Table 5',
        businessId: 'business1',
        isActive: true,
        scansCount: 34,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '4',
        code: 'qr_patio_main_jkl012',
        name: 'Patio Main',
        description: 'Outdoor patio seating area',
        businessId: 'business1',
        isActive: false,
        scansCount: 0,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      }
    ]
    
    setTimeout(() => {
      setQrCodes(mockQRCodes)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateQRCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newQRCode: QRCode = {
      id: `qr_${Date.now()}`,
      code: generateQRCodeId(),
      name: formData.name,
      description: formData.description,
      businessId: 'business1', // Replace with actual business ID
      isActive: formData.isActive,
      scansCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setQrCodes(prev => [newQRCode, ...prev])
    setShowCreateForm(false)
    setFormData({ name: '', description: '', isActive: true })
  }

  const handleToggleActive = (qrCodeId: string) => {
    setQrCodes(prev => prev.map(qr => 
      qr.id === qrCodeId 
        ? { ...qr, isActive: !qr.isActive, updatedAt: new Date() }
        : qr
    ))
  }

  const handleDelete = (qrCodeId: string) => {
    if (confirm('Are you sure you want to delete this QR code?')) {
      setQrCodes(prev => prev.filter(qr => qr.id !== qrCodeId))
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // TODO: Show toast notification
    alert('Copied to clipboard!')
  }

  const getQRCodeURL = (code: string) => {
    return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/onboard?qr=${code}`
  }

  if (showCreateForm) {
    return <QRCodeForm 
      formData={formData} 
      setFormData={setFormData}
      onSubmit={handleCreateQRCode}
      onCancel={() => setShowCreateForm(false)}
    />
  }

  if (selectedQRCode) {
    return <QRCodeDetail 
      qrCode={selectedQRCode} 
      onBack={() => setSelectedQRCode(null)}
      onToggleActive={() => handleToggleActive(selectedQRCode.id)}
    />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent flex items-center">
            <QrCode className="h-6 w-6 mr-2 text-primary-600" />
            QR Code Management
          </h2>
          <p className="text-gray-600 mt-1">Generate and manage QR codes for customer onboarding</p>
        </div>
        <motion.button 
          onClick={() => setShowCreateForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center mt-4 sm:mt-0 bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 shadow-lg"
        >
          <div className="bg-white/20 rounded-full p-1 mr-2">
            <Plus className="h-4 w-4" />
          </div>
          Generate QR Code
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-xl p-5 shadow-md border border-primary-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 h-24 w-24 -mt-6 -mr-6 opacity-10">
            <QrCode className="h-full w-full text-primary-500" />
          </div>
          <div className="flex items-center relative z-10">
            <div className="rounded-full p-2.5 bg-gradient-to-br from-primary-100 to-primary-200 border border-primary-200">
              <QrCode className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total QR Codes</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-800 bg-clip-text text-transparent">{qrCodes.length}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-xl p-5 shadow-md border border-success-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 h-24 w-24 -mt-6 -mr-6 opacity-10">
            <Eye className="h-full w-full text-success" />
          </div>
          <div className="flex items-center relative z-10">
            <div className="rounded-full p-2.5 bg-gradient-to-br from-green-100 to-green-200 border border-green-200">
              <Eye className="h-6 w-6 text-success" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active QR Codes</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                {qrCodes.filter(qr => qr.isActive).length}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-xl p-5 shadow-md border border-secondary-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 h-24 w-24 -mt-6 -mr-6 opacity-10">
            <Copy className="h-full w-full text-secondary-500" />
          </div>
          <div className="flex items-center relative z-10">
            <div className="rounded-full p-2.5 bg-gradient-to-br from-secondary-100 to-secondary-200 border border-secondary-200">
              <Copy className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Scans</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-secondary-700 to-secondary-800 bg-clip-text text-transparent">
                {qrCodes.reduce((sum, qr) => sum + qr.scansCount, 0)}
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-xl p-5 shadow-md border border-warning-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 h-24 w-24 -mt-6 -mr-6 opacity-10">
            <BarChart3 className="h-full w-full text-warning" />
          </div>
          <div className="flex items-center relative z-10">
            <div className="rounded-full p-2.5 bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-200">
              <BarChart3 className="h-6 w-6 text-warning" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Avg. Scans</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                {qrCodes.length > 0 
                  ? Math.round(qrCodes.reduce((sum, qr) => sum + qr.scansCount, 0) / qrCodes.length)
                  : 0
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="card bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="input-field pl-10"
              placeholder="Search by name or code..."
            />
          </div>
          <div className="flex space-x-3">
            <div className="relative">
              <select className="input-field appearance-none pr-10 py-2.5">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="relative">
              <select className="input-field appearance-none pr-10 py-2.5">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-scans">Most Scans</option>
                <option value="least-scans">Least Scans</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Grid */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-16 px-6">
            <motion.div
              animate={{ 
                rotate: 360,
                borderColor: ['#0ea5e9', '#8b5cf6', '#10b981', '#0ea5e9'],
                borderTopColor: 'transparent'
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear",
              }}
              className="rounded-full h-16 w-16 border-4 border-primary-600 mx-auto"
            />
            <p className="text-gray-600 mt-6 text-lg font-medium">Loading QR codes...</p>
            <p className="text-gray-500 text-sm">This will just take a moment</p>
          </div>
        ) : (
          <>
            {qrCodes.length === 0 ? (
              <div className="text-center p-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary-100">
                  <QrCode className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">No QR codes yet</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Create your first QR code to start collecting customer data and enhancing your business connections</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateForm(true)}
                  className="btn btn-primary btn-lg px-8 py-3 shadow-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Generate First QR Code
                </motion.button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qrCodes.map((qrCode) => (
                  <QRCodeCard 
                    key={qrCode.id} 
                    qrCode={qrCode}
                    onView={() => setSelectedQRCode(qrCode)}
                    onToggleActive={() => handleToggleActive(qrCode.id)}
                    onDelete={() => handleDelete(qrCode.id)}
                    onCopy={() => copyToClipboard(getQRCodeURL(qrCode.code))}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// QR Code Card Component
function QRCodeCard({ 
  qrCode, 
  onView, 
  onToggleActive, 
  onDelete, 
  onCopy 
}: {
  qrCode: QRCode
  onView: () => void
  onToggleActive: () => void
  onDelete: () => void
  onCopy: () => void
}) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* Status Badge - Top Right */}
      <div className="absolute top-4 right-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
          qrCode.isActive 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          {qrCode.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="flex items-start mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{qrCode.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{qrCode.description || 'No description'}</p>
        </div>
      </div>

      {/* QR Code Visual */}
      <div className="flex justify-center mb-5 relative group">
        <div className="w-36 h-36 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
          <QrCode className="h-20 w-20 text-primary-600" />
          
          {/* Hover Overlay with Actions */}
          <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onView}
              className="p-2 bg-white/90 text-primary-600 rounded-full hover:bg-white shadow-md"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCopy}
              className="p-2 bg-white/90 text-success rounded-full hover:bg-white shadow-md"
              title="Copy URL"
            >
              <Copy className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDelete}
              className="p-2 bg-white/90 text-error rounded-full hover:bg-white shadow-md"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-3 border border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary-700">Total Scans</span>
            <Eye className="h-3 w-3 text-primary-600" />
          </div>
          <div className="text-lg font-bold text-primary-800 mt-1">{qrCode.scansCount}</div>
        </div>
        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-lg p-3 border border-secondary-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-secondary-700">Created</span>
            <Calendar className="h-3 w-3 text-secondary-600" />
          </div>
          <div className="text-sm font-medium text-secondary-800 mt-1">{formatDate(qrCode.createdAt)}</div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <button
            onClick={onToggleActive}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              qrCode.isActive ? 'bg-success' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                qrCode.isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-2 text-sm text-gray-600">
            Toggle Status
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onView}
          className="btn btn-sm btn-outline text-sm"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}

// QR Code Form Component
function QRCodeForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}: {
  formData: QRCodeFormData
  setFormData: (data: QRCodeFormData) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  
  const getColorClass = (isActive: boolean) => {
    return isActive 
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.button 
            onClick={onCancel} 
            whileHover={{ scale: 1.05, x: -3 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md hover:shadow-lg text-gray-700 mr-4 flex items-center rounded-lg px-4 py-2 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </motion.button>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
              Generate New QR Code
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Create a unique QR code for your business needs
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div 
          className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              QR Code Details
            </h3>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 h-4 w-1 rounded-full mr-2"></span>
                QR Code Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-all duration-200"
                  placeholder="e.g., Table 5, Main Entrance, VIP Section"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <span className="text-xs">{formData.name.length}/50</span>
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 h-4 w-1 rounded-full mr-2"></span>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base transition-all duration-200"
                rows={3}
                placeholder="Optional description for internal reference"
              />
            </div>
            
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    formData.isActive ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                >
                  <motion.div
                    layout
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: formData.isActive ? 6 : 0 }}
                  />
                </div>
                <label htmlFor="isActive" className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formData.isActive ? 
                      'QR code is ready to use' : 
                      'QR code will be created but disabled'
                    }
                  </div>
                </label>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getColorClass(formData.isActive)}`}>
                {formData.isActive ? 'Ready' : 'Draft'}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100 mt-5">
              <motion.button 
                type="button" 
                onClick={onCancel}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary flex items-center"
              >
                Cancel
              </motion.button>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.03, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Preview */}
        <motion.div 
          className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Preview
            </h3>
          </div>
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-52 h-52 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-100 rounded-lg flex items-center justify-center mx-auto mb-5 shadow-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    opacity: [0.7, 1, 0.7],
                    scale: [0.98, 1, 0.98]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <QrCode className={`h-28 w-28 ${formData.isActive ? 'text-primary-500' : 'text-gray-400'}`} />
                </motion.div>
              </div>
              {formData.isActive && (
                <div className="absolute bottom-2 right-2">
                  <div className="flex items-center justify-center h-5 w-5 rounded-full bg-green-500 text-white animate-pulse">
                    <span className="text-xs">✓</span>
                  </div>
                </div>
              )}
            </motion.div>
            <h4 className="font-semibold text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {formData.name || 'QR Code Name'}
            </h4>
            <p className="text-sm text-gray-600 mt-1 max-w-xs mx-auto">
              {formData.description || 'QR code description will appear here'}
            </p>
            <div className="mt-6 py-4 px-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Customers will scan this QR code to:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <div className="p-1 rounded-full bg-green-100 text-green-500 mt-0.5">
                    <Users className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-gray-600">Register information</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="p-1 rounded-full bg-blue-100 text-blue-500 mt-0.5">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-gray-600">Set preferences</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="p-1 rounded-full bg-purple-100 text-purple-500 mt-0.5">
                    <Target className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-gray-600">Receive offers</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="p-1 rounded-full bg-orange-100 text-orange-500 mt-0.5">
                    <Calendar className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-gray-600">Get notifications</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// QR Code Detail Component
function QRCodeDetail({ 
  qrCode, 
  onBack, 
  onToggleActive 
}: { 
  qrCode: QRCode
  onBack: () => void
  onToggleActive: () => void
}) {
  const qrCodeURL = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/onboard?qr=${qrCode.code}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const downloadQRCode = () => {
    // TODO: Implement QR code download functionality
    toast.success('QR code download will be implemented')
  }

  const printQRCode = () => {
    // TODO: Implement print functionality
    toast.success('Print functionality will be implemented')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <motion.button 
            onClick={onBack} 
            whileHover={{ scale: 1.05, x: -3 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md hover:shadow-lg text-gray-700 mr-4 flex items-center rounded-lg px-4 py-2 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </motion.button>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
              {qrCode.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{qrCode.description || 'No description provided'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <motion.button 
            onClick={downloadQRCode} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md hover:shadow-lg text-gray-700 flex items-center rounded-lg px-3 py-2 transition-all duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </motion.button>
          <motion.button 
            onClick={printQRCode} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md hover:shadow-lg text-gray-700 flex items-center rounded-lg px-3 py-2 transition-all duration-200"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </motion.button>
          <motion.button 
            onClick={onToggleActive} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`${
              qrCode.isActive 
                ? 'bg-gradient-to-r from-red-500 to-red-600' 
                : 'bg-gradient-to-r from-green-500 to-green-600'
            } text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center`}
          >
            <div className="bg-white/20 rounded-full p-1 mr-2">
              {qrCode.isActive ? (
                <XCircle className="h-3 w-3" />
              ) : (
                <QrCode className="h-3 w-3" />
              )}
            </div>
            {qrCode.isActive ? 'Deactivate' : 'Activate'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <motion.div 
          className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <QrCode className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              QR Code
            </h3>
          </div>
          <div className="text-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-64 h-64 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-100 rounded-lg flex items-center justify-center mx-auto mb-6 shadow-md"
            >
              <motion.div
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  scale: [0.98, 1, 0.98]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <QrCode className={`h-32 w-32 ${qrCode.isActive ? 'text-primary-500' : 'text-gray-400'}`} />
              </motion.div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-3 right-3">
                <div className={`flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                  qrCode.isActive 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                  <span className={`h-2 w-2 rounded-full mr-1.5 ${qrCode.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                  {qrCode.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3">
              <motion.button 
                onClick={downloadQRCode}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </motion.button>
              <motion.button 
                onClick={printQRCode}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </motion.button>
              <motion.button 
                onClick={() => copyToClipboard(qrCodeURL)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* QR Code Info */}
        <div className="space-y-6">
          <motion.div 
            className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
                <Settings className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                QR Code Information
              </h3>
            </div>
            
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mr-3 border border-primary-200">
                      <QrCode className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code ID</label>
                      <div className="flex items-center mt-0.5">
                        <code className="text-sm text-gray-900 font-medium">{qrCode.code}</code>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    onClick={() => copyToClipboard(qrCode.code)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg hover:shadow-md text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-1.5 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg mr-3 border border-secondary-200">
                      <Share2 className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Landing URL</label>
                      <div className="flex items-center mt-0.5">
                        <code className="text-sm text-gray-900 font-medium truncate max-w-[220px]">{qrCodeURL}</code>
                      </div>
                    </div>
                  </div>
                  <motion.button 
                    onClick={() => copyToClipboard(qrCodeURL)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg hover:shadow-md text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-green-700 uppercase tracking-wider">Scans</span>
                    <Eye className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-800">{qrCode.scansCount}</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-700 uppercase tracking-wider">Created</span>
                    <Calendar className="h-3 w-3 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-blue-800">{formatDate(qrCode.createdAt)}</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-purple-700 uppercase tracking-wider">Updated</span>
                    <Calendar className="h-3 w-3 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-purple-800">{formatDate(qrCode.updatedAt)}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <button 
                    onClick={onToggleActive}
                    className="text-xs font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200"
                  >
                    {qrCode.isActive ? 'Deactivate' : 'Activate'} QR Code
                  </button>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        qrCode.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      onClick={onToggleActive}
                    >
                      <motion.div
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-md"
                        animate={{ x: qrCode.isActive ? 6 : 0 }}
                      />
                    </div>
                    <label className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {qrCode.isActive ? 'Active' : 'Inactive'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {qrCode.isActive ? 
                          'QR code is ready for scanning' : 
                          'QR code is disabled'
                        }
                      </div>
                    </label>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    qrCode.isActive 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                  }`}>
                    {qrCode.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Analytics
              </h3>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <BarChart3 className="w-40 h-40 text-primary-500" />
              </div>
              <div className="relative z-10">
                <div className="bg-white/70 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200">
                  <BarChart3 className="w-8 h-8 text-primary-500" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">Analytics Dashboard Coming Soon</p>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Track scan performance, daily usage patterns, conversion rates, and customer engagement metrics
                </p>
                <motion.div 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 inline-block"
                >
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    Coming soon
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
