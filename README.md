# OneVisit Platform

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.8-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8.2-2D3748)](https://www.prisma.io/)

> A comprehensive QR-based customer onboarding and personalized messaging platform that enables businesses to streamline customer interactions through smart QR codes, automated messaging campaigns, and powerful analytics.

## 🚀 Features

### 📊 **Dashboard Overview**
- Real-time business metrics and KPIs
- Quick stats on customers, campaigns, and QR codes
- Recent activity feed
- Performance insights at a glance

### 👥 **Customer Management**
- Complete customer database with detailed profiles
- Advanced filtering and search capabilities
- Customer segmentation and tagging
- Import/export functionality
- Customer journey tracking
- Engagement history and analytics

### 📢 **Campaign Management**
- Multi-channel messaging campaigns (SMS, WhatsApp, Email)
- Automated campaign scheduling and triggers
- Template library with customizable messages
- A/B testing capabilities
- Campaign performance tracking
- Personalization with dynamic variables

### 🏷️ **QR Code Manager**
- Dynamic QR code generation and management
- Multiple QR code types (URL, WiFi, Contact, etc.)
- Real-time scan tracking and analytics
- Bulk QR code generation
- Custom styling and branding
- Download in multiple formats (PNG, SVG, PDF)

### 📅 **Event Management**
- Event creation and management
- QR code-based event check-ins
- Attendee tracking and management
- Event analytics and reporting
- Integration with calendar systems
- Automated event reminders

### 📈 **Analytics Dashboard**
- Comprehensive business intelligence
- Real-time metrics and KPIs
- Customer growth and engagement trends
- Campaign performance analysis
- QR code scan analytics
- Revenue and conversion tracking
- Export reports (CSV, PDF)
- Scheduled reporting

### ⚙️ **Settings & Configuration**
- **Business Profile**: Complete business information management
- **Notifications**: Granular notification preferences
- **Integrations**: Third-party service configurations (Twilio, WhatsApp, Stripe)
- **Team Management**: Role-based access control and user management
- **Billing & Plans**: Subscription management and billing history
- **Security**: 2FA, password management, and session control

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.1.8** - React framework with server-side rendering
- **React 19.1.0** - Modern UI library with hooks
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Tailwind CSS 4.1.7** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible, unstyled UI components

### Backend & Database
- **Prisma 6.8.2** - Modern database toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Express.js** - Web application framework
- **JWT** - Secure authentication tokens

### Integrations
- **Twilio 5.6.1** - SMS messaging service
- **WhatsApp Business API** - WhatsApp messaging
- **Stripe 18.1.1** - Payment processing
- **QRCode 1.5.4** - QR code generation
- **Node Cron 4.0.7** - Automated task scheduling

### Security & Performance
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Express Rate Limit** - API rate limiting
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
OneVisit/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main dashboard page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Analytics.tsx      # Analytics dashboard
│   │   ├── CampaignManager.tsx # Campaign management
│   │   ├── CustomerManager.tsx # Customer management
│   │   ├── DashboardOverview.tsx # Main dashboard
│   │   ├── EventManager.tsx   # Event management
│   │   ├── QRCodeManager.tsx  # QR code management
│   │   ├── Settings.tsx       # Settings interface
│   │   └── Sidebar.tsx        # Navigation sidebar
│   └── types/
│       └── index.ts           # TypeScript type definitions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── docker/                    # Docker configuration
└── .github/                   # GitHub workflows
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd OneVisit
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
```bash
# Copy environment variables template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Database Configuration
Set up your PostgreSQL database and update the `DATABASE_URL` in your `.env` file:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/onevisit?schema=public"
```

### Authentication Setup
Configure JWT secrets for secure authentication:
```bash
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### Third-Party Integrations

#### Twilio SMS
```bash
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"
```

#### WhatsApp Business API
```bash
WHATSAPP_ACCESS_TOKEN="your-whatsapp-access-token"
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
WHATSAPP_WEBHOOK_VERIFY_TOKEN="your-webhook-verify-token"
```

#### Stripe Payments
```bash
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
```

#### Email Service
```bash
EMAIL_SERVICE_API_KEY="your-email-service-api-key"
EMAIL_FROM_ADDRESS="noreply@yourdomain.com"
```

## 📝 API Documentation

### Core Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

#### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `POST /api/campaigns/:id/send` - Send campaign

#### QR Codes
- `GET /api/qrcodes` - List QR codes
- `POST /api/qrcodes` - Generate QR code
- `GET /api/qrcodes/:id/analytics` - QR code analytics

#### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/customers` - Customer analytics
- `GET /api/analytics/campaigns` - Campaign analytics

## 🏗️ Database Schema

### Core Models

#### User
- Authentication and profile information
- Role-based access control
- Subscription management
- Business association

#### Business
- Business profile and settings
- Multi-tenant architecture support
- Integration configurations

#### Customer
- Customer profiles and contact information
- Segmentation and tagging
- Engagement tracking

#### Campaign
- Multi-channel messaging campaigns
- Scheduling and automation
- Performance tracking

#### QRCode
- Dynamic QR code management
- Scan tracking and analytics
- Custom styling options

#### Event
- Event management and check-ins
- Attendee tracking
- Analytics and reporting

## 🔐 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Session management
- Password hashing with bcrypt

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### API Security
- Rate limiting
- CORS configuration
- Helmet security headers
- Request validation

### User Security
- Two-factor authentication (2FA)
- Password complexity requirements
- Account lockout policies
- Secure password reset

## 📊 Subscription Tiers

### Free Trial (14 days)
- Up to 50 customers
- 5 QR codes
- Basic analytics
- Email support

### Starter ($19/month)
- Up to 500 customers
- 25 QR codes
- 1,000 SMS/month
- Basic integrations

### Professional ($49/month)
- Up to 2,500 customers
- 100 QR codes
- 5,000 SMS/month
- Advanced analytics
- WhatsApp integration

### Enterprise ($99/month)
- Unlimited customers
- Unlimited QR codes
- 15,000 SMS/month
- Custom integrations
- Priority support

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up -d
```

### Environment Variables
Ensure all production environment variables are properly configured:
- Database connection strings
- API keys for third-party services
- Security tokens and secrets
- Domain and URL configurations

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## 📖 Documentation

### Component Documentation
Each component includes comprehensive TypeScript interfaces and JSDoc comments for better developer experience.

### API Documentation
Detailed API documentation is available at `/api/docs` when running in development mode.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Write comprehensive tests
- Update documentation for new features
- Follow semantic versioning

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Getting Started Guide](docs/getting-started.md)
- [API Reference](docs/api-reference.md)
- [Deployment Guide](docs/deployment.md)

### Community
- [Issues](https://github.com/your-repo/OneVisit/issues)
- [Discussions](https://github.com/your-repo/OneVisit/discussions)
- Email: support@onevisit.com

### Enterprise Support
For enterprise customers, we offer:
- Priority technical support
- Custom integration assistance
- Dedicated account management
- SLA guarantees

---

**Built with ❤️ by the OneVisit Team**
