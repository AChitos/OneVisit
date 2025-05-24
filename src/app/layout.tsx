import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OneVisit - Customer Onboarding & Messaging Platform',
  description: 'QR-based customer onboarding with personalized SMS/WhatsApp messaging and analytics',
  keywords: ['QR code', 'customer onboarding', 'SMS marketing', 'WhatsApp business', 'analytics'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
