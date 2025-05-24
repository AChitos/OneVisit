'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  dateOfBirth: string
  gender: string
  drinkPreferences: string[]
  eventPreferences: string[]
  consentGiven: boolean
}

const drinkOptions = [
  'Beer', 'Wine', 'Cocktails', 'Whiskey', 'Vodka', 'Gin', 'Rum', 'Non-alcoholic'
]

const eventOptions = [
  'Live Music', 'DJ Sets', 'Comedy Shows', 'Sports Events', 'Happy Hour', 'Special Offers'
]

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

export default function OnboardingPage() {
  const searchParams = useSearchParams()
  const qrCode = searchParams.get('qr')
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    drinkPreferences: [],
    eventPreferences: [],
    consentGiven: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'consentGiven') {
        setFormData(prev => ({ ...prev, [name]: checked }))
      } else {
        // Handle checkbox arrays for preferences
        const currentArray = formData[name as keyof FormData] as string[]
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...currentArray, value]
            : currentArray.filter(item => item !== value)
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/customers/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          qrCode,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15 
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              delay: 0.2 
            }}
          >
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome aboard!
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for joining us! You'll receive special offers and event notifications via your preferred method.
          </motion.p>
          <motion.div 
            className="bg-primary-50 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-primary-700">
              🎉 As a welcome gift, enjoy 10% off your next visit!
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-primary-600 px-6 py-4"
          variants={itemVariants}
        >
          <h1 className="text-2xl font-bold text-white">Welcome to OneVisit</h1>
          <p className="text-primary-100">Join our community and get personalized offers!</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Drink Preferences (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {drinkOptions.map((drink) => (
                <label key={drink} className="flex items-center">
                  <input
                    type="checkbox"
                    name="drinkPreferences"
                    value={drink}
                    checked={formData.drinkPreferences.includes(drink)}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{drink}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Event Interests (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {eventOptions.map((event) => (
                <label key={event} className="flex items-center">
                  <input
                    type="checkbox"
                    name="eventPreferences"
                    value={event}
                    checked={formData.eventPreferences.includes(event)}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="consentGiven"
                checked={formData.consentGiven}
                onChange={handleInputChange}
                required
                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                I consent to receiving promotional messages via SMS/WhatsApp and agree to the{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a> and{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-700">Terms of Service</a>. *
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.consentGiven}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Join OneVisit Community'}
          </button>
        </form>
      </div>
    </div>
  )
}
