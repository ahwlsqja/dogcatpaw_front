'use client';

import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { sendVerificationCode, verifyEmailCode } from '@/lib/actions/email';
import { generateWeb3Token } from '@/lib/auth/web3-token';

interface EmailVerificationFlowProps {
  onVerificationComplete?: (email: string) => void;
  onError?: (error: string) => void;
}

export function EmailVerificationFlow({
  onVerificationComplete,
  onError,
}: EmailVerificationFlowProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState<number | undefined>();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Generate Web3Token (optional in dev mode)
      let web3Token: string | undefined;
      try {
        web3Token = await generateWeb3Token(signMessageAsync);
      } catch (err) {
        console.log('Web3Token generation skipped (dev mode or user cancelled)');
      }

      // Send verification code
      const result = await sendVerificationCode(email, address, web3Token);

      if (result.success) {
        setSuccess('인증 코드가 이메일로 발송되었습니다!');
        setStep('code');
      } else {
        setError(result.error || result.message || '코드 발송에 실패했습니다');
        onError?.(result.error || '코드 발송 실패');
      }
    } catch (err: any) {
      const errorMsg = err.message || '네트워크 오류가 발생했습니다';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Generate Web3Token (optional in dev mode)
      let web3Token: string | undefined;
      try {
        web3Token = await generateWeb3Token(signMessageAsync);
      } catch (err) {
        console.log('Web3Token generation skipped (dev mode or user cancelled)');
      }

      // Verify code
      const result = await verifyEmailCode(code, address, web3Token);

      if (result.success) {
        setSuccess('이메일 인증이 완료되었습니다!');
        onVerificationComplete?.(email);
      } else {
        setError(result.error || result.message || '코드 검증에 실패했습니다');
        setRemainingAttempts(result.remainingAttempts);
        onError?.(result.error || '코드 검증 실패');
      }
    } catch (err: any) {
      const errorMsg = err.message || '네트워크 오류가 발생했습니다';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setStep('email');
    setCode('');
    setError('');
    setSuccess('');
    setRemainingAttempts(undefined);
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>이메일 인증</CardTitle>
        <CardDescription>
          {step === 'email'
            ? '이메일 주소를 입력하면 인증 코드를 보내드립니다'
            : '이메일로 받은 6자리 인증 코드를 입력하세요'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!address ? (
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">먼저 지갑을 연결해주세요</p>
          </div>
        ) : (
          <>
            {step === 'email' ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">이메일 주소</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full"
                  size="lg"
                >
                  인증 코드 받기
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    인증 코드 (6자리)
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    required
                    disabled={loading}
                    className="text-center text-2xl tracking-widest"
                  />
                  {remainingAttempts !== undefined && (
                    <p className="text-sm text-orange-600 mt-2">
                      남은 시도 횟수: {remainingAttempts}/3
                    </p>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    type="submit"
                    isLoading={loading}
                    className="w-full"
                    size="lg"
                  >
                    인증 코드 확인
                  </Button>

                  <Button
                    type="button"
                    onClick={handleResendCode}
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    다시 받기
                  </Button>
                </div>

                <p className="text-sm text-text-secondary text-center">
                  코드는 10분 후 만료됩니다
                </p>
              </form>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
