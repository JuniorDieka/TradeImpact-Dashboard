# Development Guide

## Quick Start

### First Time Setup

1. **Configure environment:**
   - Create `backend/.env` from `backend/.env.example`
   - Add your MongoDB Atlas connection string

2. **Run complete setup (installs dependencies + seeds database):**
   ```bash
   npm run setup
   ```

3. **Start development:**
   ```bash
   npm start
   ```

## Development Workflow

### Daily Development

Run from the **root directory**:

```bash
npm start
```

This single command:
- ✅ Starts backend API server (NestJS) on port 3000
- ✅ Starts frontend dev server (Angular) on port 4200
- ✅ Shows all logs in one terminal with color coding

**Note:** No need to re-seed the database. Data persists in MongoDB Atlas.

### Working on Specific Parts

**Backend only:**
```bash
npm run dev:backend
```

**Frontend only:**
```bash
npm run dev:frontend
```

**Re-seed database (reset to initial state):**
```bash
npm run seed
```
**Warning:** Only run this if you want to reset your database. It will fail if data already exists.

## Scripts Reference

### Root Directory Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | **One-time:** Install all dependencies + seed database |
| `npm start` | **Daily:** Start backend + frontend |
| `npm run dev` | Same as `npm start` |
| `npm run seed` | Re-seed database (reset data) |
| `npm run build` | Build backend and frontend for production |
| `npm run test` | Run all tests (backend + frontend) |
| `npm run lint` | Lint all code (backend + frontend) |

### Backend Scripts (from root)

| Command | Description |
|---------|-------------|
| `npm run dev:backend` | Start backend in development mode |
| `npm run build:backend` | Build backend for production |
| `npm run test:backend` | Run backend tests |
| `npm run lint:backend` | Lint backend code |

### Frontend Scripts (from root)

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start frontend dev server |
| `npm run build:frontend` | Build frontend for production |
| `npm run test:frontend` | Run frontend tests |
| `npm run lint:frontend` | Lint frontend code |

## Log Output

When running `npm start` or `npm run dev`, you'll see color-coded logs:

```
[BACKEND] Server started on http://localhost:3000
[FRONTEND] Angular Live Development Server is listening on port 4200
```

- **BACKEND** (Blue) - All backend logs including API requests, database operations
- **FRONTEND** (Magenta) - All frontend build logs, compilation warnings, errors

## Error Handling

All errors from both backend and frontend appear in the same terminal:

- **Compilation errors** - Show immediately with file location
- **Runtime errors** - Display with stack trace
- **Database errors** - Show connection issues or query problems

Press `Ctrl+C` to stop all processes.

## Environment Variables

### Backend (.env)

```bash
# MongoDB
MONGODB_URI=mongodb+srv://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1d

# Server
PORT=3000
NODE_ENV=development
```

### Frontend (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Backend API | 3000 | http://localhost:3000/api |
| Frontend | 4200 | http://localhost:4200 |
| MongoDB | 27017 | (if using local MongoDB) |

## Best Practices

### Development

1. **Always run from root directory** - All scripts are designed to work from `D:\Projects\TradeImpact Dashboard`
2. **Use `npm start`** for full application - Most convenient for daily development
3. **Check logs in one place** - No need to switch between terminals
4. **Hot reload enabled** - Both backend and frontend auto-reload on changes

### Git Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test: `npm start`
3. Run linting: `npm run lint`
4. Run tests: `npm run test`
5. Commit with conventional commits: `git commit -m "feat: add feature"`
6. Push and create PR

### Code Quality

- **TypeScript strict mode** enabled
- **ESLint** configured for both backend and frontend
- **Prettier** for consistent formatting
- **Conventional Commits** for clear history

## Debugging

### Backend (NestJS)

Add breakpoints in VS Code:

```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "dev:backend"],
  "cwd": "${workspaceFolder}",
  "console": "integratedTerminal"
}
```

### Frontend (Angular)

Use browser DevTools or Angular DevTools extension.

## Database Management

### Seeding

```bash
# Seed with default data
npm run seed

# The seed script creates:
# - Admin user
# - Demo users for each country
# - Sample trade data
# - Standards and assessments
```

### Reset Database

If you need to reset and reseed:

1. Delete all collections in MongoDB Atlas
2. Run: `npm run seed`

## Production Build

```bash
# Build both backend and frontend
npm run build

# Output:
# - backend/dist/ (NestJS compiled)
# - frontend/dist/ (Angular production build)
```

## Tips

1. **Keep one terminal open** with `npm start` running
2. **Use VS Code integrated terminal** for best experience
3. **Install recommended extensions** (ESLint, Prettier, Angular Language Service)
4. **Clear console regularly** to spot new errors easily
5. **Check both server logs** if an API call fails

## Support

For issues or questions, check:
- README.md - General information
- STRUCTURE.md - Project structure details
- Backend/Frontend documentation in respective folders
