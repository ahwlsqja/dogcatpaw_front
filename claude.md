# DogCatPaw Frontend - Development Log

## Project Structure

### Current Implementation Status

#### Existing Features
- ✅ **Auth Actions** (`reference/dogcatpaw/src/actions/auth.ts`)
  - signupAction, loginAction, reissueToken, logout
- ✅ **Pet Actions** (`reference/dogcatpaw/src/actions/pet.ts`)
  - registerPetAction
- ✅ **Adoption Actions** (`reference/dogcatpaw/src/actions/adoption.ts`)
  - createAdoptionPostAction
- ✅ **Story Actions** - Daily stories and reviews
- ✅ **Donation Actions** - Donation posts and payments
- ✅ **Chat Actions** - Chat room management
- ✅ **Comment Actions** - Comments on stories
- ✅ **Like Actions** - Story likes

#### Frontend API Services (`lib/api/services/`)
- ✅ `auth.service.ts` - Authentication services
- ✅ `pet.service.ts` - Pet management services
- ✅ `adoption.service.ts` - Adoption services
- ✅ `story.service.ts` - Story services
- ✅ `donation.service.ts` - Donation and payment services
- ✅ `chat.service.ts` - Chat services

---

## Current Task: Email & Guardian Integration

### Backend API Endpoints Available

#### Email Verification
- `POST /email/send-code` - Send verification code (requires DIDAuthGuard)
- `POST /email/verify-code` - Verify code and register auth with VC service

#### Guardian Management
- `POST /api/guardian/register` - Register guardian after email verification

### Tasks to Complete

#### 1. Create Server Actions
- [x] `lib/actions/email.ts` - Email verification server actions
  - sendVerificationCodeAction(email, accessToken)
  - verifyEmailCodeAction(code, accessToken)
  - sendVerificationCode() - Client-side helper
  - verifyEmailCode() - Client-side helper

- [x] `lib/actions/guardian.ts` - Guardian registration server actions
  - registerGuardianAction(guardianData, accessToken)
  - registerGuardian() - Client-side helper
  - getGuardianProfile() - Client-side helper
  - isGuardianRegistered() - Client-side helper

#### 2. Add TypeScript Types
- [x] Add Email types to `lib/types/index.ts`
  - SendVerificationCodeRequest
  - SendVerificationCodeResponse
  - VerifyEmailCodeRequest
  - VerifyEmailCodeResponse

- [x] Add Guardian types to `lib/types/index.ts`
  - GuardianRegistrationRequest
  - GuardianRegistrationResponse
  - GuardianProfile
  - GuardianVerificationProof

#### 3. Update API Services (Optional)
- [ ] Create `lib/api/services/email.service.ts`
- [ ] Create `lib/api/services/guardian.service.ts`
- [ ] Update `lib/api/index.ts` exports

---

## Architecture Pattern

### Authentication: Web3Token (NOT JWT/Access Tokens!)

**IMPORTANT**: This backend uses **Web3Token** authentication, NOT traditional JWT access tokens.

#### How Web3Token Authentication Works
1. **Web3Token Library**: Uses the `web3-token` npm package
2. **Wallet Signature**: User signs a message with their wallet (MetaMask, etc.)
3. **Token Generation**: Creates a Web3Token from the signed message
4. **Verification**: Backend verifies the signature cryptographically

#### Required Headers
```typescript
{
  'walletaddress': '0x123...abc',  // User's wallet address (lowercase)
  'authorization': 'eyJ...',        // Web3Token (signed message) - OPTIONAL in dev mode
}
```

#### Development vs Production
- **Development (`NODE_ENV !== 'production'`)**:
  - Only `walletaddress` header required
  - Backend auto-injects dummy user data
  - No signature verification needed

- **Production**:
  - Both `walletaddress` and `authorization` (Web3Token) required
  - Full signature verification
  - Address must match token's signer

#### Backend Middleware Flow
1. `Web3AuthMiddleware` intercepts all requests
2. In dev: Injects `req.user` with wallet address from header
3. In prod: Verifies Web3Token and injects `req.user`
4. `DIDAuthGuard` checks `req.user` exists and addresses match

### Server Actions Pattern (`'use server'`)
All server actions follow this structure:

```typescript
'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function actionName(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // 1. Extract data from FormData (including walletAddress & web3Token)
    // 2. Validate required fields
    // 3. Validate data types and formats
    // 4. Prepare headers with walletaddress (required) and authorization (optional in dev)
    // 5. Send POST/GET request to API_SERVER_URL
    // 6. Handle response
  } catch (error) {
    // Error handling with standardized response
  }
}
```

### Environment Variables
- `API_SERVER_URL` - Backend API Gateway URL (server-side)
- `NEXT_PUBLIC_API_SERVER_URL` - Backend API Gateway URL (client-side)
- `NEXT_PUBLIC_API_GATEWAY_URL` - Alternative client-side API URL

---

## Completed Tasks

### 2025-01-15 Part 3 - Complete Wallet → Email → Guardian Flow

- ✅ Added `web3-token@^1.1.0` to package.json dependencies
- ✅ Created `lib/auth/web3-token.ts` utility
  - generateWeb3Token() - Generate Web3Token from wallet signature
  - verifyWeb3Token() - Client-side token verification
  - Web3TokenManager - Token caching class
  - getAuthHeaders() - Helper for creating auth headers
  - isDevelopmentMode() - Development mode detection
- ✅ Created `components/features/EmailVerificationFlow.tsx`
  - Two-step flow: email input → code verification
  - Auto-generates Web3Token (optional in dev)
  - 10-minute expiration, 3 attempts max
  - Resend code functionality
  - Full error handling with user feedback
- ✅ Created `components/features/GuardianRegistrationFlow.tsx`
  - Pre-filled verified email
  - Optional name and phone fields
  - Verification method selection
  - Blockchain transaction submission
  - Success state with transaction details
- ✅ Created `app/(auth)/onboarding/page.tsx`
  - Multi-step progress indicator
  - Complete onboarding flow
  - Auto-advances between steps
  - Help text and guidance
  - Auto-redirect on success

**Flow Complete:** Wallet → Email Verification → Guardian Registration → Blockchain → Spring API ✅

### 2025-01-15 Part 2 - Hero Section Component

- ✅ Created `components/layout/HeroSection.tsx` with three variants
  - HeroSection (base component)
  - HeroSectionCentered (centered content)
  - HeroSectionFlex (flexible layout)
- ✅ Implemented exact design specifications
  - Height: 713px
  - Aspect ratio: 1321/713
  - Background opacity: 0.75
  - Background positioning: -74.213px 0px
  - Background size: 105.618% 110.013%
- ✅ Added responsive design support
  - Mobile (< 768px): min-height 400px, centered background
  - Tablet (768-1023px): min-height 500px, adjusted positioning
  - Desktop (1024px+): full specifications
- ✅ Created example home page (`app/(main)/home/page.tsx`)
  - Hero section with authentication
  - Features grid
  - Stats section
  - CTA section
  - Footer
- ✅ Created `/public/images/README.md` with image setup instructions
- ✅ Updated claude.md with component documentation

### 2025-01-15 Part 1 (CORRECTED - Web3Token Authentication)
- ✅ Analyzed backend email and guardian modules
- ✅ Analyzed frontend reference actions structure
- ✅ Created claude.md documentation file
- ✅ **CORRECTED** - Updated authentication mechanism from access tokens to Web3Token
  - Backend uses `web3-token` library, NOT JWT
  - Requires `walletaddress` header (always)
  - Requires `authorization` header with Web3Token (production only)
  - Development mode bypasses signature verification
- ✅ Created `lib/actions/email.ts` with Web3Token authentication
  - sendVerificationCodeAction(email, walletAddress, web3Token)
  - verifyEmailCodeAction(code, walletAddress, web3Token)
  - sendVerificationCode() - Client helper
  - verifyEmailCode() - Client helper
- ✅ Created `lib/actions/guardian.ts` with Web3Token authentication
  - registerGuardianAction(guardianData, walletAddress, web3Token)
  - registerGuardian() - Client helper
  - getGuardianProfile() - Client helper
  - isGuardianRegistered() - Client helper
- ✅ Added Email verification types to `lib/types/index.ts`
  - SendVerificationCodeRequest/Response
  - VerifyEmailCodeRequest/Response
- ✅ Added Guardian types to `lib/types/index.ts`
  - GuardianRegistrationRequest/Response
  - GuardianProfile
  - GuardianVerificationProof
- ✅ Documented Web3Token authentication mechanism in claude.md
  - Web3AuthMiddleware flow
  - DIDAuthGuard behavior
  - Development vs Production modes
  - Required headers and validation

---

## UI Components

### Hero Section Component (`components/layout/HeroSection.tsx`)

A reusable hero section component with customizable background image and opacity.

#### Features
- **Fixed Layout**: Height 713px with aspect ratio 1321/713
- **Background Opacity**: 0.75 (customizable)
- **Responsive Design**: Adapts to mobile, tablet, and desktop
- **Flexible Content**: Supports centered, flex, and custom layouts
- **Tailwind CSS**: Full Tailwind styling support
- **shadcn/ui Compatible**: Works seamlessly with shadcn components

#### Component Variants

**1. HeroSection (Base)**
```tsx
<HeroSection
  backgroundImage="/images/hero-bg.jpg"
  height={713}
  backgroundOpacity={0.75}
  overlayColor="rgb(211, 211, 211)"
>
  {/* Your content */}
</HeroSection>
```

**2. HeroSectionCentered**
```tsx
<HeroSectionCentered backgroundImage="/images/hero-bg.jpg">
  <h1>Centered Content</h1>
</HeroSectionCentered>
```

**3. HeroSectionFlex**
```tsx
<HeroSectionFlex align="center" justify="between">
  <div>Left Content</div>
  <div>Right Content</div>
</HeroSectionFlex>
```

#### Responsive Breakpoints
- **Mobile (< 768px)**: min-height 400px, centered background
- **Tablet (768-1023px)**: min-height 500px, adjusted positioning
- **Desktop (1024px+)**: height 713px, full specifications

#### Design Specifications
```css
/* Desktop */
height: 713px;
aspect-ratio: 1321/713;
flex-shrink: 0;
align-self: stretch;

/* Background */
opacity: 0.75;
background-position: -74.213px 0px;
background-size: 105.618% 110.013%;
background-repeat: no-repeat;
```

#### Props Interface
```typescript
interface HeroSectionProps {
  backgroundImage?: string;        // Default: '/images/hero-bg.jpg'
  height?: number;                  // Default: 713
  backgroundOpacity?: number;       // Default: 0.75
  overlayColor?: string;            // Default: 'rgb(211, 211, 211)'
  children?: ReactNode;
  className?: string;
}
```

#### Image Requirements
- **Path**: `/public/images/hero-bg.jpg`
- **Size**: 1321 x 713 pixels
- **Format**: JPG, PNG, or WebP
- **File Size**: < 500KB (optimized)

See `/public/images/README.md` for detailed image setup instructions.

---

## Complete User Flow: Wallet → Email → Guardian

### Overview
Users can now complete the full onboarding process:
1. **Connect Wallet** (RainbowKit)
2. **Verify Email** (EmailVerificationFlow component)
3. **Register as Guardian** (GuardianRegistrationFlow component)

### Authentication Flow

```mermaid
graph TD
    A[Connect Wallet] --> B[Generate Web3Token]
    B --> C[Send Email Code]
    C --> D[Verify Email Code]
    D --> E[Register Guardian]
    E --> F[Blockchain Transaction]
    F --> G[Spring API Sync]
```

### Components Created

#### 1. Web3Token Utility (`lib/auth/web3-token.ts`)
```tsx
import { generateWeb3Token } from '@/lib/auth/web3-token';
import { useSignMessage } from 'wagmi';

const { signMessageAsync } = useSignMessage();
const token = await generateWeb3Token(signMessageAsync);
```

**Features:**
- Token generation with configurable expiration
- Token verification (client-side)
- Web3TokenManager class for token caching
- Development mode detection
- Helper function for auth headers

#### 2. Email Verification Flow (`components/features/EmailVerificationFlow.tsx`)
```tsx
<EmailVerificationFlow
  onVerificationComplete={(email) => console.log('Verified:', email)}
  onError={(error) => console.error(error)}
/>
```

**Features:**
- Two-step flow: email input → code verification
- Auto-generates Web3Token (optional in dev)
- 10-minute code expiration
- 3 attempt limit with remaining attempts counter
- Resend code functionality
- Full error handling

#### 3. Guardian Registration Flow (`components/features/GuardianRegistrationFlow.tsx`)
```tsx
<GuardianRegistrationFlow
  email="verified@email.com"
  onRegistrationComplete={(data) => console.log('Registered:', data)}
  onError={(error) => console.error(error)}
/>
```

**Features:**
- Pre-filled verified email
- Optional name and phone fields
- Verification method selection (SMS/Email/Both)
- Auto-generates Web3Token (optional in dev)
- Blockchain transaction submission
- Success state with transaction details

#### 4. Complete Onboarding Page (`app/(auth)/onboarding/page.tsx`)
```
URL: /onboarding
```

**Layout Specifications:**
```css
display: flex;
height: 705px;
justify-content: center;
align-items: center;
flex-shrink: 0;
align-self: stretch;
background: #F9FAFB;
```

**Features:**
- Centered single-card layout
- Clean minimal design (max-width: 28rem)
- Simple dot progress indicator
- Auto-advances when wallet connected
- Combines EmailVerificationFlow + GuardianRegistrationFlow
- Contextual help text per step
- Auto-redirect to pet registration on success
- Light gray background (#F9FAFB)
- White card with shadow
- Fixed height container (705px)

### Usage Example

```tsx
'use client';

import { useState } from 'react';
import { EmailVerificationFlow } from '@/components/features/EmailVerificationFlow';
import { GuardianRegistrationFlow } from '@/components/features/GuardianRegistrationFlow';

export default function OnboardingPage() {
  const [step, setStep] = useState<'email' | 'guardian'>('email');
  const [email, setEmail] = useState('');

  return (
    <div>
      {step === 'email' && (
        <EmailVerificationFlow
          onVerificationComplete={(verifiedEmail) => {
            setEmail(verifiedEmail);
            setStep('guardian');
          }}
        />
      )}

      {step === 'guardian' && email && (
        <GuardianRegistrationFlow
          email={email}
          onRegistrationComplete={(data) => {
            console.log('Guardian registered:', data);
            window.location.href = '/pet';
          }}
        />
      )}
    </div>
  );
}
```

### Backend Integration

All actions correctly integrate with the backend:
- ✅ Web3Token authentication (optional in dev mode)
- ✅ walletaddress header (required)
- ✅ authorization header (Web3Token, optional in dev)
- ✅ Email verification with Redis caching
- ✅ Guardian blockchain registration
- ✅ Spring API sync via Bull queue

### Development Mode

In development mode (`NODE_ENV !== 'production'`):
- ✅ Web3Token signature is **optional**
- ✅ Only `walletaddress` header required
- ✅ Backend auto-injects dummy user data
- ✅ No blockchain signature required for testing

### Production Mode

In production mode:
- ✅ Web3Token signature **required**
- ✅ Full wallet signature verification
- ✅ Blockchain transactions require user signing
- ✅ All security measures active

---

## Next Steps
1. ✅ Create email.ts server actions
2. ✅ Create guardian.ts server actions
3. ✅ Add corresponding TypeScript types
4. ✅ Create HeroSection UI component
5. ✅ Create Web3Token generation utility
6. ✅ Create email verification UI flow
7. ✅ Create guardian registration UI flow
8. ✅ Create complete onboarding page
9. Run `npm install` to install web3-token package
10. Test complete flow on development server
11. Add pet registration flow
12. Add noseprint biometric upload

---

## Notes
- Backend uses DIDAuthGuard for authentication
- Email verification required before guardian registration
- Guardian registration integrates with blockchain (ethers.js)
- Uses Bull queue for async email sending
- Redis for verification code storage (10min TTL, 3 attempts max)
