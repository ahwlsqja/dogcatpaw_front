'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EmailVerificationFlow } from '@/components/features/EmailVerificationFlow';

export default function OnboardingPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  const handleEmailVerified = (email: string) => {
    // Store verified email in sessionStorage and redirect to registration page
    sessionStorage.setItem('verifiedEmail', email);
    setTimeout(() => {
      router.push('/onboarding/register');
    }, 1500); // Short delay to show success message
  };

  return (
    <main
      className="flex justify-center items-center flex-shrink-0 self-stretch"
      style={{
        height: '705px',
        background: '#F9FAFB',
      }}
    >
      {/* Content Container */}
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-3xl">🐾</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DogCatPaw
          </h1>
        </div>

        {/* Main Content */}
        {!isConnected ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">환영합니다!</h2>
            <p className="text-text-secondary mb-6 text-sm">
              시작하려면 지갑을 연결해주세요
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <EmailVerificationFlow
            onVerificationComplete={handleEmailVerified}
            onError={(error) => console.error('Email verification error:', error)}
          />
        )}

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>

        {/* Help Text */}
        {isConnected && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              이메일 인증 코드는 10분 후 만료됩니다
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
