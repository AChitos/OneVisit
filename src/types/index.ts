// Database types based on Prisma schema
export interface User {
  id: string
  email: string
  name: string
  role: Role
  businessId?: string
  business?: Business
  subscriptionTier: SubscriptionTier
  trialEndsAt?: Date
  subscriptionEndsAt?: Date
  stripeCustomerId?: string
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

export interface Business {
  id: string
  name: string
  industry?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  createdAt: Date
  updatedAt: Date
  users?: User[]
  customers?: Customer[]
  campaigns?: Campaign[]
  events?: Event[]
  qrCodes?: QRCode[]
  analytics?: Analytics[]
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  dateOfBirth?: Date
  gender?: Gender
  preferences?: CustomerPreferences
  consentGiven: boolean
  consentDate?: Date
  businessId: string
  business?: Business
  createdAt: Date
  updatedAt: Date
  lastVisit?: Date
  visitCount: number
  totalSpent: number
  visits?: Visit[]
  messages?: Message[]
}

export interface CustomerPreferences {
  drinkTypes?: string[]
  eventTypes?: string[]
  communicationPreference?: 'SMS' | 'WHATSAPP' | 'EMAIL'
  visitFrequency?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'OCCASIONAL'
  spendingRange?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface QRCode {
  id: string
  code: string
  name: string
  description?: string
  businessId: string
  business?: Business
  isActive: boolean
  scansCount: number
  createdAt: Date
  updatedAt: Date
  visits?: Visit[]
}

export interface Visit {
  id: string
  customerId: string
  customer?: Customer
  qrCodeId?: string
  qrCode?: QRCode
  visitDate: Date
  duration?: number
  amountSpent?: number
  notes?: string
}

export interface Campaign {
  id: string
  name: string
  description?: string
  type: CampaignType
  status: CampaignStatus
  businessId: string
  business?: Business
  createdById: string
  createdBy?: User
  scheduledAt?: Date
  sentAt?: Date
  messageTemplate: string
  messageType: MessageType
  targetSegment?: CampaignTargetSegment
  createdAt: Date
  updatedAt: Date
  targets?: CampaignTarget[]
  messages?: Message[]
  analytics?: CampaignAnalytics[]
}

export interface CampaignTargetSegment {
  ageRange?: { min: number; max: number }
  gender?: Gender[]
  visitFrequency?: string[]
  spendingRange?: string[]
  lastVisitDays?: number
  preferences?: string[]
}

export interface CampaignTarget {
  id: string
  campaignId: string
  campaign?: Campaign
  customerId: string
  customer?: Customer
}

export interface Message {
  id: string
  customerId: string
  customer?: Customer
  campaignId?: string
  campaign?: Campaign
  type: MessageType
  content: string
  status: MessageStatus
  sentAt?: Date
  deliveredAt?: Date
  readAt?: Date
  errorMessage?: string
  externalId?: string
  createdAt: Date
}

export interface Event {
  id: string
  name: string
  description?: string
  eventType: string
  startDate: Date
  endDate?: Date
  businessId: string
  business?: Business
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  id: string
  businessId: string
  business?: Business
  date: Date
  metric: string
  value: number
  metadata?: AnalyticsMetadata
}

export interface AnalyticsMetadata {
  source?: string
  campaign_id?: string
  customer_segment?: string
  [key: string]: any
}

export interface CampaignAnalytics {
  id: string
  campaignId: string
  campaign?: Campaign
  date: Date
  messagesSent: number
  messagesDelivered: number
  messagesRead: number
  clickCount: number
  conversionCount: number
}

// Enums
export enum Role {
  ADMIN = 'ADMIN',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  STAFF = 'STAFF'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

export enum SubscriptionTier {
  FREE_TRIAL = 'FREE_TRIAL',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export enum CampaignType {
  WELCOME = 'WELCOME',
  EVENT_INVITE = 'EVENT_INVITE',
  SPECIAL_OFFER = 'SPECIAL_OFFER',
  BIRTHDAY = 'BIRTHDAY',
  WIN_BACK = 'WIN_BACK',
  GENERAL = 'GENERAL'
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  SENT = 'SENT',
  CANCELLED = 'CANCELLED'
}

export enum MessageType {
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL'
}

export enum MessageStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED'
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Component prop types
export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: any, item: T) => React.ReactNode
}

export interface FilterOption {
  label: string
  value: string
  count?: number
}

export interface DashboardStats {
  totalCustomers: number
  messagesSent: number
  qrCodeScans: number
  conversionRate: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'customer' | 'campaign' | 'event' | 'qr'
  content: string
  time: string
  metadata?: any
}
