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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div 
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-primary-100 p-10 text-center"
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
            className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-16 w-16 text-success" />
          </motion.div>
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome aboard!
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for joining us! You'll receive special offers and event notifications via your preferred method.
          </motion.p>
          <motion.div 
            className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-base font-medium text-primary-800">
              🎉 As a welcome gift, enjoy 10% off your next visit!
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <motion.div 
        className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-white">Welcome to OneVisit</h1>
          <p className="text-white/80 text-lg mt-2">Join our community and get personalized offers!</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-800 mb-2">
                Full Name <span className="text-primary-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-base font-medium text-gray-800 mb-2">
                Phone Number <span className="text-primary-600">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-base font-medium text-gray-800 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-base font-medium text-gray-800 mb-2">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base appearance-none bg-white"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-5 rounded-xl border border-primary-200">
            <label className="block text-lg font-medium text-primary-800 mb-4">
              Drink Preferences (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {drinkOptions.map((drink) => (
                <label key={drink} className="flex items-center hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    name="drinkPreferences"
                    value={drink}
                    checked={formData.drinkPreferences.includes(drink)}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-base text-gray-800">{drink}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-5 rounded-xl border border-secondary-200">
            <label className="block text-lg font-medium text-secondary-800 mb-4">
              Event Interests (Select all that apply)
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {eventOptions.map((event) => (
                <label key={event} className="flex items-center hover:bg-white/50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    name="eventPreferences"
                    value={event}
                    checked={formData.eventPreferences.includes(event)}
                    onChange={handleInputChange}
                    className="h-5 w-5 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500"
                  />
                  <span className="ml-2 text-base text-gray-800">{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
            <label className="flex items-start">
              <input
                type="checkbox"
                name="consentGiven"
                checked={formData.consentGiven}
                onChange={handleInputChange}
                required
                className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-3 text-base text-gray-800">
                I consent to receiving promotional messages via SMS/WhatsApp and agree to the{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium underline decoration-2 underline-offset-2">Privacy Policy</a> and{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-700 font-medium underline decoration-2 underline-offset-2">Terms of Service</a>. <span className="text-primary-600">*</span>
              </span>
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.consentGiven}
            className="w-full py-4 px-6 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Join OneVisit Community'}
          </motion.button>
        </form>
      </div>
    </div>
  )
}
