# DogCatPaw Frontend

Decentralized Pet Identity Platform - Frontend Application built with Next.js 15, wagmi, and RainbowKit.

## 🏗️ Architecture

This frontend application follows a **Frontend-Driven Architecture** pattern, where:

- **Web3 Authentication**: Wallet-based authentication using wagmi and RainbowKit
- **JWT Session Management**: Access/refresh token pattern with automatic renewal
- **API Gateway Integration**: All backend communication goes through the API Gateway
- **Blockchain Interaction**: Direct smart contract calls for critical operations (pet registration, transfers)
- **Verifiable Credentials**: VP (Verifiable Presentation) based authentication

## 📁 Project Structure

```
dogcatpaw-frontend/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth route group (login, signup)
│   ├── (main)/                   # Main app route group
│   │   ├── adoption/             # Adoption listings and posts
│   │   ├── chat/                 # Chat rooms
│   │   ├── donation/             # Donation posts and payments
│   │   ├── pet/                  # Pet management
│   │   ├── profile/              # User profile
│   │   └── story/                # Daily stories and reviews
│   ├── api/                      # API routes (optional)
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   ├── providers.tsx             # Web3 providers (wagmi, RainbowKit, React Query)
│   └── globals.css               # Global styles with design tokens
│
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── features/                 # Feature-specific components
│   │   ├── auth/                 # Auth components
│   │   ├── pet/                  # Pet components
│   │   ├── adoption/             # Adoption components
│   │   ├── story/                # Story components
│   │   ├── donation/             # Donation components
│   │   └── chat/                 # Chat components
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── lib/                          # Utilities and libraries
│   ├── api/                      # API client and services
│   │   ├── client.ts             # Axios instance with interceptors
│   │   ├── services/             # Service layer
│   │   │   ├── auth.service.ts
│   │   │   ├── pet.service.ts
│   │   │   ├── adoption.service.ts
│   │   │   ├── story.service.ts
│   │   │   ├── donation.service.ts
│   │   │   └── chat.service.ts
│   │   └── index.ts              # API exports
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   ├── utils/                    # Utility functions
│   │   └── index.ts
│   └── wagmi.config.ts           # wagmi/RainbowKit configuration
│
├── contexts/                     # React contexts
│   ├── AuthContext.tsx           # Authentication context with wagmi
│   └── UserContext.tsx
│
├── styles/                       # Additional styles
└── public/                       # Static files
```

## 🎨 Design System

### Color Palette

- **Primary**: `#FF6B6B` (Coral Red) - Brand color for CTAs and highlights
- **Secondary**: `#4ECDC4` (Turquoise) - Secondary actions and accents
- **Accent**: `#FFE66D` (Warm Yellow) - Highlights and attention grabbers
- **Success**: `#51CF66`
- **Warning**: `#FFB84D`
- **Error**: `#FF6B6B`
- **Info**: `#4ECDC4`

### Typography

- **Font Family**: Inter (sans-serif)
- **Headings**: Bold weights (700)
- **Body**: Regular (400) and Medium (500)
- **Code**: Monospace font for addresses and DIDs

### Spacing & Sizing

- Uses Tailwind's spacing scale
- Custom spacing tokens: `--spacing-xs` to `--spacing-2xl`
- Border radius: `--radius-sm` to `--radius-full`

## 🔧 Tech Stack

### Core

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Turbopack

### Web3

- **Wallet Connection**: RainbowKit 2.2.9
- **Web3 React Hooks**: wagmi 2.18.1
- **Ethereum Library**: viem 2.21.0

### State & Data Fetching

- **Server State**: TanStack React Query 5.64.4
- **Client State**: React Context API
- **Forms**: React Hook Form (to be added)

### API Communication

- **HTTP Client**: Axios 1.7.2
- **API Architecture**: Service layer pattern

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.0 or higher
- npm or pnpm
- WalletConnect Project ID (get from https://cloud.walletconnect.com/)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your configuration
```

### Environment Variables

```env
# API Gateway URL
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:3000

# Besu Blockchain RPC
NEXT_PUBLIC_BESU_RPC_URL=http://localhost:8545
NEXT_PUBLIC_BESU_EXPLORER_URL=http://localhost:4000

# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Chain ID
NEXT_PUBLIC_CHAIN_ID=2024
```

### Development

```bash
# Run development server with Turbopack
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📡 API Integration

### Authentication Flow

1. **Connect Wallet**: User connects wallet via RainbowKit
2. **Sign Message**: User signs a message to prove ownership
3. **Create VP**: Generate Verifiable Presentation with signature
4. **Login**: Send VP to API Gateway for authentication
5. **Receive JWT**: Store access token and refresh token
6. **Auto-Refresh**: Axios interceptor handles token refresh

### API Service Layer

All API calls go through service modules:

```typescript
import { petService, authService, adoptionService } from '@/lib/api';

// Example: Get my pets
const pets = await petService.getMyPets();

// Example: Create adoption post
const result = await adoptionService.createAdoptionPost({
  petId: 123,
  content: 'Looking for a loving home...',
  region: 'Seoul',
  district: 'Gangnam',
});
```

### Error Handling

- Axios interceptors handle 401 errors and token refresh
- Service functions throw errors that components can catch
- Use `handleApiError()` utility for consistent error messages

## 🔐 Authentication

### AuthContext

Provides authentication state and methods:

```typescript
const { user, isAuthenticated, isLoading, login, logout, refreshUser } = useAuth();
```

### Protected Routes

```typescript
// Use in page components
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <div>Protected content</div>;
}
```

## 🧩 Component Usage

### Button

```typescript
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`, `danger`
**Sizes**: `sm`, `md`, `lg`

### Input

```typescript
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email?.message}
  helperText="We'll never share your email"
/>
```

### Card

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

## 🔗 Links

- **API Gateway Repo**: `dogcatpaw-api-gateway/`
- **Design Files**: `C:\Users\user\dogcatpaw_design/`
- **Backend Spec**: `docs/spring-api-spec.json`

## 📝 Notes

### Next Steps

1. Implement feature pages (pet, adoption, story, donation, chat)
2. Add form validation with React Hook Form + Zod
3. Integrate biometric noseprint upload flow
4. Add real-time chat with WebSocket or SSE
5. Implement file upload with presigned URLs
6. Add loading states and skeleton screens
7. Implement infinite scroll for lists
8. Add error boundaries
9. Set up analytics and monitoring
10. Write E2E tests with Playwright

### Development Guidelines

- Always use TypeScript for type safety
- Follow the component structure: UI → Feature → Page
- Keep API logic in service modules
- Use React Query for server state
- Use Context API sparingly (prefer composition)
- Optimize images with Next.js Image component
- Use dynamic imports for code splitting
- Follow accessibility best practices

## 📄 License

Private project for DogCatPaw platform.
