# TradeImpact Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?logo=nestjs)
![Angular](https://img.shields.io/badge/Angular-17.x-DD0031?logo=angular)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

> **⚠️ Educational Portfolio Project** — Not affiliated with any organization. Built for technical demonstration purposes using publicly available sustainable trade frameworks.

A full-stack **sustainability trade intelligence platform** for MSMEs and policy analysts, featuring standards comparison, trade analytics, stakeholder collaboration, and sustainability assessments.

[![Demo Video](docs/screenshots/02-dashboard-overview.png)](https://github.com/JuniorDieka/TradeImpact-Dashboard/releases/tag/v1.0)

## ✨ Key Features

- 🔐 **JWT Authentication** with role-based access (Admin, Policy Analyst, MSME, Stakeholder)
- 📊 **Trade Performance Analytics** with interactive Chart.js visualizations
- ✅ **Standards Browser** — Compare 150+ sustainability standards side-by-side
- 👥 **Kanban Collaboration Board** — Multi-stakeholder project management
- 📋 **Self-Assessment Tools** — MSME sustainability gap analysis (backend ready)
- 🌱 **Value Chain Tracker** — Risk hotspot identification (backend ready)

## 📸 Screenshots

<details>
<summary><b>View Application Screenshots</b></summary>

| Login | Dashboard | Trade Analytics |
|-------|-----------|-----------------|
| ![Login](docs/screenshots/01-login-page.png) | ![Dashboard](docs/screenshots/02-dashboard-overview.png) | ![Trade](docs/screenshots/03-trade-performance.png) |

| Standards Browser | Comparison | Collaboration Board |
|-------------------|------------|---------------------|
| ![Standards](docs/screenshots/04-standards-list.png) | ![Compare](docs/screenshots/05-standards-compare.png) | ![Board](docs/screenshots/06-stakeholder-board.png) |

</details>

## � Tech Stack

**Backend:** NestJS 10 • MongoDB 7 • JWT Auth • Swagger API  
**Frontend:** Angular 17 • Material Design • Chart.js • RxJS  
**DevOps:** TypeScript 5 • npm • ESLint • Git

## 🏗 Architecture

```mermaid
graph LR
    A[Angular 17 Frontend] -->|REST API + JWT| B[NestJS Backend]
    B -->|Mongoose ODM| C[(MongoDB)]
    
    A --> D[Material UI<br/>Chart.js<br/>RxJS]
    B --> E[Auth Module<br/>Standards<br/>Trade Analytics<br/>Assessments<br/>Value Chains<br/>Stakeholders]
    
    style A fill:#DD0031,color:#fff
    style B fill:#E0234E,color:#fff
    style C fill:#47A248,color:#fff
```

## 🚀 Quick Start

### Prerequisites
Node.js 18+ • MongoDB 7+ • npm 9+

### Installation

```bash
# Clone and setup
git clone https://github.com/JuniorDieka/TradeImpact-Dashboard.git
cd TradeImpact-Dashboard
npm run setup  # Installs dependencies + seeds database

# Configure backend/.env
MONGODB_URI=mongodb://localhost:27017/tradeimpact-dashboard
JWT_SECRET=your-secret-key
PORT=3000

# Start application
npm start  # Runs backend + frontend concurrently
```

### Access
- **Frontend:** http://localhost:4200
- **API:** http://localhost:3000/api
- **Swagger Docs:** http://localhost:3000/api/docs

### Demo Credentials
- **Admin:** sarah.ochieng@tradeimpact.org / Admin@2024
- **Policy Analyst:** jp.mukasa@gov.rw / Policy@2024
- **MSME User:** amina.hassan@kiganicoffee.rw / Coffee@2024

## 📁 Project Structure

```
TradeImpact-Dashboard/
├── backend/src/               # NestJS modules
│   ├── auth/                  # JWT authentication & RBAC
│   ├── standards/             # VSS browser & comparison
│   ├── country-trade/         # Trade analytics
│   ├── assessments/           # MSME self-assessments
│   ├── value-chains/          # Value chain tracker
│   └── stakeholders/          # Collaboration board
├── frontend/src/app/          # Angular modules
│   ├── core/                  # Services, guards, interceptors
│   ├── features/              # Feature modules (auth, dashboard, etc.)
│   ├── shared/                # Models, pipes, utilities
│   └── layout/                # Header, sidebar
└── docs/                      # Documentation & screenshots
```

## 📚 API Documentation

**Swagger UI:** http://localhost:3000/api/docs

Key endpoints: `/api/auth/*`, `/api/standards/*`, `/api/country-trade/*`, `/api/assessments/*`, `/api/value-chains/*`, `/api/stakeholders/*`

All protected routes require: `Authorization: Bearer <JWT_TOKEN>`

## 🚢 Deployment

**Backend:** Heroku/Railway/Render → Set env vars → `npm run build && npm run start:prod`  
**Frontend:** Netlify/Vercel → Update `environment.prod.ts` → `npm run build` → Deploy `dist/`  
**Database:** MongoDB Atlas (free tier available)

## 📄 License

MIT License — See [LICENSE](LICENSE) file

---

## 📖 Acknowledgments

Conceptual inspiration from publicly available sustainable trade frameworks (T4SD, GIVC), development economics metrics, and multi-stakeholder collaboration methodologies.

**⚖️ Disclaimer:** Educational portfolio project. Not affiliated with any organization. No proprietary data used. Not for production use in policy/business decisions.

---

**Built with ❤️ by [Junior Dieka](https://github.com/JuniorDieka) as a full-stack technical demonstration**
