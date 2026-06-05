# TradeImpact Dashboard - Project Structure

## Root Structure
```
TradeImpact-Dashboard/
├── backend/              # NestJS API server
├── frontend/             # Angular web application
├── package.json          # Root workspace with unified dev scripts
├── .gitignore            # Excludes .env.atlas, node_modules, build outputs
├── .nvmrc                # Node version 18.0.0
├── README.md             # Main documentation
├── docs/
│   ├── DEVELOPMENT.md    # Comprehensive development guide
│   ├── STRUCTURE.md      # This file - detailed project structure
│   ├── RBAC_IMPLEMENTATION.md  # Security documentation
│   ├── GITHUB_RELEASE.md       # GitHub release template
│   ├── screenshots/      # Application screenshots
│   └── videos/           # Video demo hosting instructions
└── package.json          # Root workspace configuration
```

## Backend Structure (NestJS + MongoDB)
```
backend/
├── src/
│   ├── main.ts                          # Application entry point with Swagger setup, CORS, global prefix
│   ├── app.module.ts                    # Root module with all feature imports
│   ├── app.controller.ts                # Health check endpoints (/, /health)
│   ├── auth/                            # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts           # Login, register, profile endpoints
│   │   ├── auth.service.ts              # JWT generation, password hashing
│   │   ├── dto/                         # Data transfer objects
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── auth-response.dto.ts
│   │   ├── guards/                      # Route protection
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   ├── users/                           # User management module
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── schemas/
│   │   │   └── user.schema.ts           # Mongoose schema with roles
│   │   └── dto/
│   │       └── create-user.dto.ts
│   ├── standards/                       # Sustainability standards module
│   │   ├── standards.module.ts
│   │   ├── standards.controller.ts      # CRUD + search/filter endpoints
│   │   ├── standards.service.ts         # Business logic for VSS operations
│   │   ├── schemas/
│   │   │   └── standard.schema.ts       # VSS document schema
│   │   └── dto/
│   │       ├── create-standard.dto.ts
│   │       ├── update-standard.dto.ts
│   │       └── filter-standard.dto.ts
│   ├── country-trade/                   # Trade performance module
│   │   ├── country-trade.module.ts
│   │   ├── country-trade.controller.ts  # Trade metrics endpoints
│   │   ├── country-trade.service.ts     # Trade analytics logic
│   │   ├── schemas/
│   │   │   └── country-trade.schema.ts  # Trade data schema
│   │   └── dto/
│   │       ├── create-trade-data.dto.ts
│   │       └── trade-query.dto.ts
│   ├── assessments/                     # MSME self-assessment module
│   │   ├── assessments.module.ts
│   │   ├── assessments.controller.ts    # Assessment CRUD + scoring
│   │   ├── assessments.service.ts       # Gap analysis & roadmap generation
│   │   ├── schemas/
│   │   │   └── assessment.schema.ts     # Assessment document schema
│   │   └── dto/
│   │       ├── create-assessment.dto.ts
│   │       ├── assessment-response.dto.ts
│   │       └── roadmap.dto.ts
│   ├── value-chains/                    # Green value chain module
│   │   ├── value-chains.module.ts
│   │   ├── value-chains.controller.ts   # Value chain visualization endpoints
│   │   ├── value-chains.service.ts      # Risk hotspot analysis
│   │   ├── schemas/
│   │   │   └── value-chain.schema.ts    # Value chain stages schema
│   │   └── dto/
│   │       ├── create-value-chain.dto.ts
│   │       └── stage.dto.ts
│   ├── stakeholders/                    # Collaboration board module
│   │   ├── stakeholders.module.ts
│   │   ├── stakeholders.controller.ts   # Projects, tasks, comments endpoints
│   │   ├── stakeholders.service.ts      # Multi-stakeholder coordination logic
│   │   ├── schemas/
│   │   │   ├── project.schema.ts        # Stakeholder project schema
│   │   │   └── task.schema.ts           # Action item schema
│   │   └── dto/
│   │       ├── create-project.dto.ts
│   │       ├── create-task.dto.ts
│   │       └── update-task.dto.ts
│   ├── common/                          # Shared utilities
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts # Global error handler
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts   # Request/response logging
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts       # DTO validation pipe
│   │   └── utils/
│   │       ├── pagination.helper.ts     # Reusable pagination logic
│   │       └── response.formatter.ts    # Consistent API responses
│   └── config/
│       └── database.config.ts           # MongoDB connection config
├── scripts/
│   └── seed.ts                          # Database seeding script
├── test/                                # E2E tests
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example
```

## Frontend Structure (Angular + Material)
```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts             # Root component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.module.ts                # Root module
│   │   ├── app-routing.module.ts        # Main routing config
│   │   ├── core/                        # Singleton services
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts      # Authentication service
│   │   │   │   ├── api.service.ts       # Base HTTP service
│   │   │   │   ├── trade-data.service.ts # Trade data API calls
│   │   │   │   ├── currency.service.ts  # Currency conversion & PPP calculations
│   │   │   │   └── notification.service.ts # User notifications
│   │   │   ├── interceptors/
│   │   │   │   ├── jwt.interceptor.ts   # Attach JWT to requests
│   │   │   │   └── error.interceptor.ts # Global error handling
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts        # Route authentication
│   │   │   │   └── role.guard.ts        # Role-based access
│   │   │   └── core.module.ts
│   │   ├── shared/                      # Reusable components/modules
│   │   │   ├── components/
│   │   │   │   ├── data-table/          # Reusable table component
│   │   │   │   ├── status-badge/        # Status indicator component
│   │   │   │   ├── confirm-dialog/      # Confirmation dialog
│   │   │   │   └── chart-wrapper/       # Chart.js wrapper
│   │   │   ├── models/                  # TypeScript interfaces
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── standard.model.ts
│   │   │   │   ├── trade-data.model.ts
│   │   │   │   ├── currency.model.ts    # Currency config, exchange rates, PPP
│   │   │   │   ├── assessment.model.ts
│   │   │   │   ├── value-chain.model.ts
│   │   │   │   └── stakeholder.model.ts
│   │   │   ├── pipes/
│   │   │   │   ├── number-format.pipe.ts # K/M/B/T number formatting
│   │   │   │   └── truncate.pipe.ts
│   │   │   └── shared.module.ts
│   │   ├── features/
│   │   │   ├── auth/                    # Authentication feature
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.scss
│   │   │   │   ├── register/
│   │   │   │   │   ├── register.component.ts
│   │   │   │   │   ├── register.component.html
│   │   │   │   │   └── register.component.scss
│   │   │   │   ├── auth-routing.module.ts
│   │   │   │   └── auth.module.ts
│   │   │   ├── dashboard/               # Main dashboard
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   ├── dashboard-routing.module.ts
│   │   │   │   └── dashboard.module.ts
│   │   │   ├── standards/               # Sustainability standards feature
│   │   │   │   ├── standards-list/
│   │   │   │   │   ├── standards-list.component.ts
│   │   │   │   │   ├── standards-list.component.html
│   │   │   │   │   └── standards-list.component.scss
│   │   │   │   ├── standard-detail/
│   │   │   │   │   ├── standard-detail.component.ts
│   │   │   │   │   ├── standard-detail.component.html
│   │   │   │   │   └── standard-detail.component.scss
│   │   │   │   ├── standard-compare/
│   │   │   │   │   ├── standard-compare.component.ts
│   │   │   │   │   ├── standard-compare.component.html
│   │   │   │   │   └── standard-compare.component.scss
│   │   │   │   ├── services/
│   │   │   │   │   └── standards.service.ts
│   │   │   │   ├── standards-routing.module.ts
│   │   │   │   └── standards.module.ts
│   │   │   ├── trade-performance/       # Trade metrics with currency localization
│   │   │   │   ├── trade-performance.component.ts   # Main component with charts
│   │   │   │   ├── trade-performance.component.html # Country selector, currency modes, charts
│   │   │   │   ├── trade-performance.component.scss # Styling
│   │   │   │   ├── trade-performance-routing.module.ts
│   │   │   │   └── trade-performance.module.ts      # Chart.js integration
│   │   │   ├── assessments/             # MSME assessment feature
│   │   │   │   ├── assessment-form/
│   │   │   │   │   ├── assessment-form.component.ts
│   │   │   │   │   ├── assessment-form.component.html
│   │   │   │   │   └── assessment-form.component.scss
│   │   │   │   ├── assessment-result/
│   │   │   │   │   ├── assessment-result.component.ts
│   │   │   │   │   ├── assessment-result.component.html
│   │   │   │   │   └── assessment-result.component.scss
│   │   │   │   ├── services/
│   │   │   │   │   └── assessments.service.ts
│   │   │   │   ├── assessments-routing.module.ts
│   │   │   │   └── assessments.module.ts
│   │   │   ├── value-chains/            # Value chain tracker feature
│   │   │   │   ├── chain-visualizer/
│   │   │   │   │   ├── chain-visualizer.component.ts
│   │   │   │   │   ├── chain-visualizer.component.html
│   │   │   │   │   └── chain-visualizer.component.scss
│   │   │   │   ├── risk-analysis/
│   │   │   │   │   ├── risk-analysis.component.ts
│   │   │   │   │   ├── risk-analysis.component.html
│   │   │   │   │   └── risk-analysis.component.scss
│   │   │   │   ├── services/
│   │   │   │   │   └── value-chains.service.ts
│   │   │   │   ├── value-chains-routing.module.ts
│   │   │   │   └── value-chains.module.ts
│   │   │   └── stakeholder-board/       # Collaboration board feature
│   │   │       ├── project-list/
│   │   │       │   ├── project-list.component.ts
│   │   │       │   ├── project-list.component.html
│   │   │       │   └── project-list.component.scss
│   │   │       ├── task-board/
│   │   │       │   ├── task-board.component.ts
│   │   │       │   ├── task-board.component.html
│   │   │       │   └── task-board.component.scss
│   │   │       ├── services/
│   │   │       │   └── stakeholder.service.ts
│   │   │       ├── stakeholder-board-routing.module.ts
│   │   │       └── stakeholder-board.module.ts
│   │   └── layout/
│   │       ├── header/
│   │       │   ├── header.component.ts
│   │       │   ├── header.component.html
│   │       │   └── header.component.scss
│   │       ├── sidebar/
│   │       │   ├── sidebar.component.ts
│   │       │   ├── sidebar.component.html
│   │       │   └── sidebar.component.scss
│   │       └── layout.module.ts
│   ├── assets/                          # Static assets
│   │   ├── images/
│   │   └── styles/
│   ├── environments/
│   │   ├── environment.ts               # Development config
│   │   └── environment.prod.ts          # Production config
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                      # Global styles
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── .browserslistrc
```

## Key Architecture Decisions

### Backend (NestJS)
- **Module Organization**: Feature-based modules following single responsibility principle
- **Dependency Injection**: Leveraging NestJS DI container for loose coupling
- **Error Handling**: Global exception filter for consistent error responses
- **Validation**: class-validator + class-transformer on all DTOs
- **API Documentation**: Auto-generated Swagger/OpenAPI docs
- **Security**: JWT authentication with role-based guards

### Frontend (Angular)
- **Lazy Loading**: All feature modules lazy-loaded for performance
- **State Management**: RxJS observables with Angular services
- **Component Architecture**: Smart (container) vs Dumb (presentational) separation
- **Change Detection**: OnPush strategy where applicable
- **Material Design**: Angular Material for consistent, accessible UI
- **HTTP Interceptors**: Centralized JWT attachment and error handling

### Database (MongoDB)
- **Schema Design**: Denormalized documents for read performance
- **Indexing**: Strategic indexes on query-heavy fields
- **Timestamps**: Automatic createdAt/updatedAt on all schemas
- **Validation**: Schema-level validation using Mongoose validators

This structure satisfies:
- **Standards Alignment**: Follows NestJS, Angular, and MongoDB best practices
- **SOLID Principles**: Single responsibility per module, dependency inversion via DI
- **DRY**: Shared utilities, components, and models prevent duplication
- **KISS**: Clear folder hierarchy, predictable file locations
