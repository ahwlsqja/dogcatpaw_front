'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GuardianRegistrationFlow } from '@/components/features/GuardianRegistrationFlow';

export default function GuardianRegistrationPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [verifiedEmail, setVerifiedEmail] = useState('');

  useEffect(() => {
    // Check if email is verified
    const email = sessionStorage.getItem('verifiedEmail');
    if (!email) {
      // No verified email, redirect back to email verification
      router.push('/onboarding');
      return;
    }
    setVerifiedEmail(email);
  }, [router]);

  const handleRegistrationComplete = (data: any) => {
    console.log('Guardian registration complete:', data);
    // Clear verified email from sessionStorage
    sessionStorage.removeItem('verifiedEmail');
    // Redirect to dashboard or pet registration
    setTimeout(() => {
      window.location.href = '/pet';
    }, 3000);
  };

  // Show loading while checking email verification
  if (!verifiedEmail) {
    return (
      <main
        className="flex justify-center items-center flex-shrink-0 self-stretch"
        style={{
          height: '705px',
          background: '#F9FAFB',
        }}
      >
        <div className="text-center">
          <p className="text-text-secondary">확인 중...</p>
        </div>
      </main>
    );
  }

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
            <h2 className="text-2xl font-bold mb-2">지갑을 다시 연결해주세요</h2>
            <p className="text-text-secondary mb-6 text-sm">
              보호자 등록을 완료하려면 지갑이 필요합니다
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <GuardianRegistrationFlow
            email={verifiedEmail}
            onRegistrationComplete={handleRegistrationComplete}
            onError={(error) => console.error('Guardian registration error:', error)}
          />
        )}

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>

        {/* Help Text */}
        {isConnected && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              보호자 등록 시 블록체인에 기록됩니다
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
