# BATERMAL - Smart Thermal Battery System

## Overview

BATERMAL is a comprehensive web application for monitoring and managing smart thermal battery systems for industrial decarbonization. The platform provides real-time monitoring, analytics, ESG reporting, AI-powered optimization, and Heat-as-a-Service (HaaS) billing management.

## Features

### 🎯 Core Features
- **Real-time Monitoring** - Live IoT data from thermal battery units (temperature, pressure, flow rate, power)
- **Energy Analytics** - Comprehensive consumption tracking, cost comparison, efficiency trends
- **ESG Reporting** - Carbon emission tracking, environmental impact metrics, SDG alignment
- **Billing Management** - Per-kWh thermal energy billing, payment tracking, invoice history
- **AI Optimization** - Machine learning recommendations for cost savings and efficiency
- **Alert System** - Real-time notifications for critical events and system status
- **Multi-language Support** - Full support for Indonesian and English

### 💡 Technology Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3
- **Charts**: Recharts
- **Routing**: React Router v6
- **Icons**: Lucide React
- **i18n**: react-i18next

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd web
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── MonitoringPage.tsx
│   ├── AnalyticsPage.tsx
│   ├── ESGPage.tsx
│   ├── BillingPage.tsx
│   ├── AIPage.tsx
│   ├── AlertsPage.tsx
│   └── SettingsPage.tsx
├── utils/              # Utility functions
│   └── mockData.ts     # Mock data generators
├── i18n/               # Internationalization
│   └── config.ts       # i18n configuration
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Features in Detail

### 1. Landing Page
- Company overview and value proposition
- Feature highlights (Circular Economy, HaaS, IoT/AI, ESG)
- Statistics showcase
- CTA for demo requests

### 2. Dashboard
- System status overview
- Quick stats (Energy Stored, Efficiency, Cost Savings, CO₂ Reduced)
- Real-time metrics
- Recent alerts

### 3. Real-time Monitoring
- Live temperature, pressure, flow rate, power readings
- 24-hour historical trends
- System status indicators
- Auto-refresh every 3 seconds

### 4. Energy Analytics
- Energy consumption tracking
- Cost comparison (Traditional vs BATERMAL)
- Efficiency trends
- Peak usage hours analysis

### 5. ESG & Carbon Report
- Total CO₂ reduction metrics
- Environmental impact visualization
- Comparison with traditional fuel systems
- UN SDG alignment
- Export reports (PDF/Excel)

### 6. Billing Management
- Current period billing summary
- Usage tracking (kWh)
- Rate per kWh
- Payment history
- Invoice download

### 7. AI Optimization
- AI-powered recommendations
- Energy predictions (94%+ accuracy)
- Optimal charging schedules
- Cost optimization strategies
- Potential savings calculator

### 8. Alerts & Notifications
- Real-time system alerts
- Priority-based filtering
- Alert categories (Critical, Warning, Info, Success)
- Notification preferences

### 9. Settings
- Company profile management
- User account settings
- System preferences (language, timezone, currency)
- Notification settings
- Security options

## Mock Data

The application uses comprehensive mock data for demonstration:
- System status with real-time updates
- Historical energy consumption data
- Billing records
- ESG metrics
- AI recommendations
- System alerts

## Color Scheme

The application uses a professional brown theme:
- Primary: Brown (#8a6538 - #b8904f)
- Accent Colors:
  - Green: #52b788 (Success, ESG)
  - Orange: #ff6b35 (Alerts, Energy)
  - Blue: #457b9d (Info, Monitoring)
  - Red: #e63946 (Critical)

## Internationalization

Supported languages:
- 🇮🇩 Indonesian (Bahasa Indonesia)
- 🇬🇧 English

Switch language from:
- Landing page header
- Dashboard header
- Settings page

## Responsive Design

Fully responsive across devices:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Demo Credentials

For testing the login:
```
Email: demo@industry.com
Password: demo123
```

## Business Model

**Heat-as-a-Service (HaaS)**:
- No upfront investment required
- Pay per kWh of thermal energy used
- Average rate: Rp 850/kWh (vs Rp 1,650/kWh traditional)
- 48.5% cost savings
- Automated billing and invoicing

## Environmental Impact

BATERMAL contributes to:
- 85.2% reduction in CO₂ emissions
- 76.4% reduction in fossil fuel consumption
- 52.8% reduction in water usage
- Support for Net Zero 2060 target

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/Sidebar.tsx`
4. Add translations in `src/i18n/config.ts`

## License

© 2026 BATERMAL. All rights reserved.

## Contact

For inquiries about BATERMAL:
- Website: [Coming Soon]
- Email: info@batermal.com
- Phone: +62 21 XXXX XXXX
