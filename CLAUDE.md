# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
yarn install

# Run development server (port 3000)
yarn dev

# Build for production
yarn build

# Start production server (port 8000)
yarn start

# Lint code
yarn lint

# Format code
yarn format

# Generate Prisma client (required before building)
prisma generate

# Run database migrations
prisma migrate dev

# Deploy with PM2
pm2 start yarn --name "vision-web" --interpreter bash -- start
```

## Project Architecture

This is a Next.js 14 application for a real estate platform (Vision Inmobiliaria) with the following structure:

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **State Management**: Redux Toolkit
- **UI Components**: Custom components with Radix UI primitives
- **Styling**: Tailwind CSS
- **Storage**: Firebase Storage for images
- **Forms**: React Hook Form with Zod validation

### Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── (portal-clientes)/   # Public-facing website
│   ├── administracion/      # Admin panel (protected)
│   ├── api/                 # API routes
│   └── firma-digital/       # Digital signature feature
├── components/              # React components
│   ├── ui/                 # Base UI components
│   └── [feature]/          # Feature-specific components
├── actions/                 # Server actions
├── lib/                     # Utilities and configurations
│   ├── api/                # API client functions
│   ├── db/                 # Database client
│   └── hooks/              # Custom React hooks
└── utils/                   # Helper functions
```

### Key Architectural Patterns

1. **Route Protection**: Uses Clerk middleware in `src/middleware.ts` to protect `/administracion/*` routes
2. **Database Access**: Prisma client singleton in `src/lib/db/prisma.ts`
3. **API Structure**: RESTful routes in `src/app/api/` with consistent patterns for CRUD operations
4. **Component Organization**: Feature-based organization with shared UI components in `src/components/ui/`
5. **Form Handling**: Consistent use of React Hook Form with Zod schemas for validation
6. **Server Actions**: Located in `src/actions/` for server-side operations
7. **Type Safety**: Interfaces defined in `src/lib/interfaces/` and `src/interfaces/`

### Environment Variables

Required environment variables (check with team for values):
- `POSTGRES_PRISMA_URL` - PostgreSQL connection URL
- `POSTGRES_URL_NON_POOLING` - Direct PostgreSQL connection
- Clerk authentication variables
- Firebase configuration

### Code Style

- **Prettier**: Single quotes, trailing commas, 140 character line width
- **TypeScript**: Strict mode enabled with path aliases (`@/*` for `src/*`)
- **Import Order**: External deps → Internal deps → Types