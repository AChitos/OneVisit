'use client'

import { useState, useEffect } from 'react'
import { 
  PlusIcon, 
  QrCodeIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  DownloadIcon,
  PrinterIcon
} from '@heroicons/react/24/outline'
import { QRCode } from '@/types'
import { formatDate, generateQRCodeId } from '@/utils/helpers'

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
          <h2 className="text-2xl font-bold text-gray-900">QR Code Management</h2>
          <p className="text-gray-600">Generate and manage QR codes for customer onboarding</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center mt-4 sm:mt-0"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Generate QR Code
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center">
            <QrCodeIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total QR Codes</p>
              <p className="text-2xl font-semibold text-gray-900">{qrCodes.length}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <EyeIcon className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Active QR Codes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {qrCodes.filter(qr => qr.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Scans</p>
              <p className="text-2xl font-semibold text-gray-900">
                {qrCodes.reduce((sum, qr) => sum + qr.scansCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <QrCodeIcon className="h-8 w-8 text-orange-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Avg. Scans</p>
              <p className="text-2xl font-semibold text-gray-900">
                {qrCodes.length > 0 
                  ? Math.round(qrCodes.reduce((sum, qr) => sum + qr.scansCount, 0) / qrCodes.length)
                  : 0
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Grid */}
      <div className="card">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading QR codes...</p>
          </div>
        ) : (
          <>
            {qrCodes.length === 0 ? (
              <div className="text-center py-12">
                <QrCodeIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No QR codes yet</h3>
                <p className="text-gray-500 mb-6">Create your first QR code to start collecting customer data</p>
                <button 
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  Generate First QR Code
                </button>
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
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{qrCode.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{qrCode.description || 'No description'}</p>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onView}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-md hover:bg-gray-100"
            title="View Details"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={onCopy}
            className="p-2 text-gray-400 hover:text-green-600 rounded-md hover:bg-gray-100"
            title="Copy URL"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
            title="Delete"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* QR Code Visual */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 bg-gray-100 border-2 border-gray-200 rounded-lg flex items-center justify-center">
          <QrCodeIcon className="h-16 w-16 text-gray-400" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div>
          <span className="text-gray-500">Scans:</span>
          <span className="font-medium text-gray-900 ml-1">{qrCode.scansCount}</span>
        </div>
        <div>
          <span className="text-gray-500">Created:</span>
          <span className="font-medium text-gray-900 ml-1">{formatDate(qrCode.createdAt)}</span>
        </div>
      </div>

      {/* Status & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onToggleActive}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              qrCode.isActive ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                qrCode.isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-2 text-sm ${qrCode.isActive ? 'text-green-600' : 'text-gray-500'}`}>
            {qrCode.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button
          onClick={onView}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
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
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
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
              <QrCodeIcon className="h-24 w-24 text-gray-400" />
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
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{qrCode.name}</h2>
            <p className="text-gray-600">{qrCode.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={downloadQRCode} className="btn-secondary flex items-center">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </button>
          <button onClick={printQRCode} className="btn-secondary flex items-center">
            <PrinterIcon className="h-4 w-4 mr-2" />
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
              <QrCodeIcon className="h-32 w-32 text-gray-400" />
            </div>
            <div className="space-y-2">
              <button 
                onClick={downloadQRCode}
                className="btn-primary mr-2"
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download PNG
              </button>
              <button 
                onClick={printQRCode}
                className="btn-secondary"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
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
                    <DocumentDuplicateIcon className="h-4 w-4" />
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
                    <DocumentDuplicateIcon className="h-4 w-4" />
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
                <QrCodeIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
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
