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
  Settings
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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onCancel} className="btn-secondary mr-4 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Generate New QR Code</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">QR Code Details</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                placeholder="e.g., Table 5, Main Entrance, VIP Section"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="Optional description for internal reference"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                QR Code is active and ready to use
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={onCancel} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Generate QR Code
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="text-center">
            <div className="w-48 h-48 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
            <h4 className="font-medium text-gray-900">{formData.name || 'QR Code Name'}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {formData.description || 'QR code description will appear here'}
            </p>
            <div className="mt-4 text-xs text-gray-500">
              <p>Customers will scan this QR code to:</p>
              <ul className="mt-2 space-y-1">
                <li>• Register their information</li>
                <li>• Set preferences</li>
                <li>• Receive personalized offers</li>
                <li>• Get event notifications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    alert('Copied to clipboard!')
  }

  const downloadQRCode = () => {
    // TODO: Implement QR code download functionality
    alert('QR code download will be implemented')
  }

  const printQRCode = () => {
    // TODO: Implement print functionality
    alert('Print functionality will be implemented')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="btn-secondary mr-4 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{qrCode.name}</h2>
            <p className="text-gray-600">{qrCode.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={downloadQRCode} className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
          <button onClick={printQRCode} className="btn-secondary flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button onClick={onToggleActive} className="btn-primary">
            {qrCode.isActive ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">QR Code</h3>
          <div className="text-center">
            <div className="w-64 h-64 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-32 w-32 text-gray-400" />
            </div>
            <div className="space-y-2">
              <button 
                onClick={downloadQRCode}
                className="btn-primary mr-2"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </button>
              <button 
                onClick={printQRCode}
                className="btn-secondary"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">QR Code Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    qrCode.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {qrCode.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">QR Code ID</label>
                <div className="flex items-center mt-1">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{qrCode.code}</code>
                  <button 
                    onClick={() => copyToClipboard(qrCode.code)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Landing URL</label>
                <div className="flex items-center mt-1">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                    {qrCodeURL}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(qrCodeURL)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Total Scans</label>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{qrCode.scansCount}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm text-gray-900 mt-1">{formatDate(qrCode.createdAt)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900 mt-1">{formatDate(qrCode.updatedAt)}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <QrCode className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm">Scan analytics will be displayed here</p>
                <p className="text-xs">Daily scans, popular times, conversion rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
