# TradeImpact Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)
![Angular](https://img.shields.io/badge/Angular-17.x-DD0031?logo=angular)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

**Last Updated:** May 20, 2026

A **multi-stakeholder sustainability trade intelligence platform** for MSMEs and policymakers, inspired by ITC's T4SD (Trade for Sustainable Development) and GIVC (Green & Inclusive Value Chains) programmes.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌍 Overview

TradeImpact Dashboard empowers **Micro, Small, and Medium Enterprises (MSMEs)** and **policy analysts** in developing countries to:

- **Compare Voluntary Sustainability Standards (VSS)** across sectors and countries
- **Monitor national trade performance** with competitiveness metrics and recovery indicators
- **Conduct sustainability self-assessments** against international standards
- **Track green value chains** with risk hotspot analysis
- **Collaborate on multi-stakeholder projects** for sustainable trade transformation

This platform mirrors the work done by the **International Trade Centre (ITC)** in their Trade for Sustainable Development (T4SD) and Green & Inclusive Value Chains (GIVC) programmes, supporting the Sustainable Development Goals (SDGs) and climate-resilient trade in Africa and beyond.

---

## ✨ Features

### 1. **Sustainability Standards Browser**
- Search and filter 150+ voluntary sustainability standards (VSS) by sector, country, and hotspot category
- Compare standards side-by-side with detailed criteria breakdowns
- Mirror functionality of ITC's **Standards Map**

### 2. **National Trade Performance Monitor**
- Real-time trade competitiveness dashboards per country
- Export/import trend analysis with interactive charts
- Trade recovery indicators and sustainability scores
- Sector-level breakdown and top trading partners

### 3. **MSME Sustainability Self-Assessment**
- Multi-step assessment form across 5 dimensions (environmental, social, economic, quality, ethics)
- Automated gap analysis and sustainability scoring
- **Downloadable roadmap** with prioritized recommendations and cost estimates
- Inspired by T4SD diagnostic tools

### 4. **Green Value Chain Tracker**
- Visualize end-to-end value chains from production to market
- Identify sustainability risk hotspots at each stage
- Compliance status tracking and mitigation action planning
- Aligned with GIVC **Alliances for Action (A4A)** methodology

### 5. **Stakeholder Collaboration Board**
- Multi-stakeholder project management (Ministries, BSOs, Private Sector)
- Task assignment, commenting, and progress tracking
- Budget monitoring and deliverable management
- Reflects UNECA-style client coordination workflows

---

## 🛠 Tech Stack

### **Backend**
- **Framework**: NestJS 10.x (Node.js)
- **Database**: MongoDB 7.x with Mongoose ODM
- **Authentication**: JWT with role-based access control (RBAC)
- **API Documentation**: Swagger/OpenAPI auto-generated
- **Validation**: class-validator + class-transformer
- **Security**: bcrypt password hashing, CORS, environment variables

### **Frontend**
- **Framework**: Angular 17.x
- **UI Library**: Angular Material (Material Design)
- **Charts**: Chart.js with ng2-charts wrapper
- **State Management**: RxJS Observables
- **Routing**: Angular Router with lazy-loaded modules
- **HTTP**: HttpClient with interceptors for JWT and error handling

### **Development Tools**
- **Language**: TypeScript 5.x (strict mode)
- **Package Managers**: npm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

---

## 🏗 Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Angular 17)                     │
│  ┌────────────┬────────────┬────────────┬────────────────────┐  │
│  │  Auth      │ Standards  │   Trade    │   Assessments      │  │
│  │  Module    │  Module    │   Module   │   Module           │  │
│  ├────────────┼────────────┼────────────┼────────────────────┤  │
│  │ Value Chain│ Stakeholder│  Shared    │   Core Services    │  │
│  │  Module    │   Module   │  Module    │   (Auth, API)      │  │
│  └────────────┴────────────┴────────────┴────────────────────┘  │
│                              ▲                                   │
│                              │ HTTP/REST + JWT                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (NestJS 10 + Express)               │
│  ┌────────────┬────────────┬────────────┬────────────────────┐  │
│  │  Auth      │ Standards  │  Country   │  Assessments       │  │
│  │  Module    │  Module    │   Trade    │  Module            │  │
│  │            │            │  Module    │                    │  │
│  ├────────────┼────────────┼────────────┼────────────────────┤  │
│  │ ValueChains│Stakeholders│  Common    │   Config           │  │
│  │  Module    │  Module    │  Utils     │   (JWT, DB)        │  │
│  └────────────┴────────────┴────────────┴────────────────────┘  │
│  Controllers → Services → Mongoose Models → MongoDB             │
│                              ▲                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │  MongoDB Atlas   │
                     │  (Cloud/Local)   │
                     └──────────────────┘
```

### Data Flow

1. **User Authentication**: Login → JWT generation → Token stored in localStorage
2. **API Requests**: Angular services → HTTP Interceptor (attach JWT) → NestJS controllers
3. **Data Processing**: Controllers → Services → Mongoose models → MongoDB
4. **Error Handling**: Global exception filter → HTTP error interceptor → User notification
5. **Authorization**: JWT Strategy → Guards (Auth + Role) → Protected routes

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: v7.x (local installation or MongoDB Atlas account)
- **Git**: Latest version

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/JuniorDieka/TradeImpact-Dashboard.git
cd TradeImpact-Dashboard
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:4200

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tradeimpact-dashboard
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tradeimpact-dashboard

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=24h

# CORS
CORS_ORIGIN=http://localhost:4200
```

#### 3. Seed the Database

```bash
npm run seed
```

This creates sample data:
- 3 test users (admin, policy analyst, MSME user)
- 4 sustainability standards (Fairtrade, Rainforest Alliance, USDA Organic, UTZ)
- Trade data for Rwanda, Kenya, and Ethiopia

**Test Credentials:**
- Admin: `sarah.ochieng@tradeimpact.org` / `Admin@2024`
- Policy Analyst: `jp.mukasa@gov.rw` / `Policy@2024`
- MSME User: `amina.hassan@kiganicoffee.rw` / `Coffee@2024`

#### 4. Start the Backend

```bash
npm run start:dev
```

Backend runs at: `http://localhost:3000`  
API Documentation: `http://localhost:3000/api/docs`

#### 5. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

#### 6. Start the Frontend

```bash
npm start
```

Frontend runs at: `http://localhost:4200`

---

## 📁 Project Structure

```
TradeImpact-Dashboard/
├── backend/                    # NestJS backend application
│   ├── src/
│   │   ├── auth/              # Authentication module (JWT, guards)
│   │   ├── users/             # User management
│   │   ├── standards/         # Sustainability standards CRUD
│   │   ├── country-trade/     # Trade performance data
│   │   ├── assessments/       # MSME self-assessments
│   │   ├── value-chains/      # Value chain tracking
│   │   ├── stakeholders/      # Collaboration board
│   │   ├── common/            # Shared utilities, filters, pipes
│   │   ├── app.module.ts
│   │   └── main.ts            # Entry point with Swagger
│   ├── scripts/
│   │   └── seed.ts            # Database seeding script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                   # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/          # Singleton services, guards, interceptors
│   │   │   ├── shared/        # Shared modules, components, models
│   │   │   ├── features/      # Lazy-loaded feature modules
│   │   │   ├── layout/        # Header, sidebar components
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/      # Environment configs
│   │   ├── assets/            # Static assets
│   │   └── styles.scss        # Global styles
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── STRUCTURE.md               # Detailed folder structure
```

---

## 📚 API Documentation

Once the backend is running, visit:

**Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login and get JWT |
| `GET` | `/api/auth/profile` | Get current user profile |
| `GET` | `/api/standards` | Get all standards (with filters) |
| `GET` | `/api/standards/compare?ids=...` | Compare standards |
| `GET` | `/api/country-trade` | Get trade data |
| `GET` | `/api/country-trade/trends/:memberState` | Get trade trends |
| `POST` | `/api/assessments` | Create MSME assessment |
| `GET` | `/api/assessments/:id/roadmap` | Get improvement roadmap |
| `POST` | `/api/value-chains` | Create value chain tracker |
| `GET` | `/api/value-chains/:id/hotspots` | Get hotspot analysis |
| `GET` | `/api/stakeholders/projects` | Get all projects |
| `POST` | `/api/stakeholders/tasks` | Create task |

All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📸 Screenshots

_[Screenshots will be added here after deployment]_

- Dashboard Overview
- Standards Comparison
- Trade Performance Charts
- Assessment Results
- Value Chain Visualization
- Stakeholder Board

---

## 🚢 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables in deployment platform
2. Ensure MongoDB Atlas connection string is configured
3. Deploy backend:
   ```bash
   npm run build
   npm run start:prod
   ```

### Frontend Deployment (Netlify/Vercel)

1. Update `environment.prod.ts` with production API URL
2. Build for production:
   ```bash
   npm run build
   ```
3. Deploy `dist/` folder

### MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Add database user and whitelist IP addresses
3. Copy connection string to `.env`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- **ITC T4SD Programme** - Inspiration for sustainability standards and MSME tools
- **ITC GIVC** - Methodology for green value chain tracking
- **UNECA** - Trade competitiveness and recovery metrics frameworks
- **Standards Map** - Reference for VSS database structure
- **Alliances for Action (A4A)** - Multi-stakeholder collaboration approach

---

**Built with ❤️ for sustainable and inclusive trade transformation in developing countries**
