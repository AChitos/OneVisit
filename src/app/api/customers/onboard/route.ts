import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validatePhone, validateEmail } from '@/utils/helpers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      phone,
      email,
      dateOfBirth,
      gender,
      drinkPreferences,
      eventPreferences,
      consentGiven,
      qrCode
    } = body

    // Validation
    if (!name || !phone || !consentGiven) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { phone }
    })

    if (existingCustomer) {
      return NextResponse.json(
        { success: false, error: 'Phone number already registered' },
        { status: 409 }
      )
    }

    // Find the QR code and associated business
    let businessId = 'default-business-id' // Fallback
    if (qrCode) {
      const qrCodeRecord = await prisma.qRCode.findUnique({
        where: { code: qrCode },
        include: { business: true }
      })
      
      if (qrCodeRecord) {
        businessId = qrCodeRecord.businessId
        // Increment scan count
        await prisma.qRCode.update({
          where: { id: qrCodeRecord.id },
          data: { scansCount: { increment: 1 } }
        })
      }
    }

    // Create customer preferences object
    const preferences = {
      drinkTypes: drinkPreferences || [],
      eventTypes: eventPreferences || [],
      communicationPreference: 'SMS' as const
    }

    // Create new customer
    const customer = await prisma.customer.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender: gender || null,
        preferences,
        consentGiven,
        consentDate: new Date(),
        businessId,
        visitCount: 1, // First visit
        lastVisit: new Date()
      }
    })

    // Create visit record if QR code was used
    if (qrCode) {
      const qrCodeRecord = await prisma.qRCode.findUnique({
        where: { code: qrCode }
      })
      
      if (qrCodeRecord) {
        await prisma.visit.create({
          data: {
            customerId: customer.id,
            qrCodeId: qrCodeRecord.id,
            visitDate: new Date(),
            notes: 'Initial QR code onboarding'
          }
        })
      }
    }

    // Log analytics event
    await prisma.analytics.create({
      data: {
        businessId,
        metric: 'new_customer',
        value: 1,
        metadata: {
          source: qrCode ? 'qr_code' : 'direct',
          qr_code: qrCode,
          preferences: preferences
        }
      }
    })

    // TODO: Send welcome message
    // This will be implemented when messaging service is set up

    return NextResponse.json({
      success: true,
      data: {
        customerId: customer.id,
        message: 'Welcome to OneVisit! You will receive special offers and event notifications.'
      }
    })

  } catch (error) {
    console.error('Customer onboarding error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
