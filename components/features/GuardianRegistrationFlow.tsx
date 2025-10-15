'use client';

import { useState } from 'react';
import { useAccount, useSignMessage, useWalletClient } from 'wagmi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { registerGuardian } from '@/lib/actions/guardian';
import { generateWeb3Token } from '@/lib/auth/web3-token';

interface GuardianRegistrationResult {
  guardianId?: string;
  authId?: string;
  txHash?: string;
  springJobId?: string;
  success?: boolean;
  message?: string;
}

interface GuardianRegistrationFlowProps {
  /**
   * Pre-filled email from email verification
   */
  email: string;
  /**
   * Callback when registration is complete
   */
  onRegistrationComplete?: (data: GuardianRegistrationResult) => void;
  /**
   * Callback on error
   */
  onError?: (error: string) => void;
}

export function GuardianRegistrationFlow({
  email,
  onRegistrationComplete,
  onError,
}: GuardianRegistrationFlowProps) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: walletClient } = useWalletClient();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    old: '',
    address: '',
    verificationMethod: 2, // 2: Email
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<GuardianRegistrationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      setError('지갑을 연결해주세요');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Generate Web3Token (optional in dev mode)
      let web3Token: string | undefined;
      try {
        web3Token = await generateWeb3Token(signMessageAsync);
      } catch {
        console.log('Web3Token generation skipped (dev mode or user cancelled)');
      }

      // Step 1: Register guardian (get transaction data if in production mode)
      const result = await registerGuardian(
        email,
        address,
        web3Token,
        {
          name: formData.name || undefined,
          phone: formData.phone || undefined,
          gender: formData.gender || undefined,
          old: formData.old ? parseInt(formData.old) : undefined,
          address: formData.address || undefined,
          verificationMethod: formData.verificationMethod as 1 | 2 | 3,
        }
      );

      // Check if backend requires transaction signing (production mode)
      if (result.requiresSignature && result.transactionData) {
        if (!walletClient) {
          throw new Error('Wallet client not available');
        }

        console.log('Production mode: Signing transaction...', result.transactionData);

        // MetaMask doesn't support signTransaction(), so we use sendTransaction instead
        // This means the transaction is broadcast by MetaMask, not the backend
        let signedTxOrHash: string;

        try {
          // Try to sign without broadcasting (only works with some wallets like WalletConnect)
          signedTxOrHash = await walletClient.signTransaction({
            to: result.transactionData.to as `0x${string}`,
            data: result.transactionData.data as `0x${string}`,
            from: address,
            gas: BigInt(result.transactionData.gasLimit || 500000),
            gasPrice: BigInt(result.transactionData.gasPrice || 0),
            value: BigInt(result.transactionData.value || 0),
            nonce: result.transactionData.nonce ? Number(result.transactionData.nonce) : undefined,
            chainId: result.transactionData.chainId ? Number(result.transactionData.chainId) : 1337,
          });
          console.log('Transaction signed (raw tx length):', signedTxOrHash.length);
        } catch (signError) {
          // Fallback for MetaMask and other wallets that don't support signTransaction
          console.log('signTransaction not supported, using sendTransaction instead');
          signedTxOrHash = await walletClient.sendTransaction({
            to: result.transactionData.to as `0x${string}`,
            data: result.transactionData.data as `0x${string}`,
            from: address,
            gas: BigInt(result.transactionData.gasLimit || 500000),
            gasPrice: BigInt(result.transactionData.gasPrice || 0),
            value: BigInt(result.transactionData.value || 0),
          });
          console.log('Transaction sent (hash):', signedTxOrHash);
        }

        // Step 3: Submit signed transaction or hash to backend
        const finalResult = await registerGuardian(
          email,
          address,
          web3Token,
          {
            name: formData.name || undefined,
            phone: formData.phone || undefined,
            gender: formData.gender || undefined,
            old: formData.old ? parseInt(formData.old) : undefined,
            address: formData.address || undefined,
            verificationMethod: formData.verificationMethod as 1 | 2 | 3,
            signedTx: signedTxOrHash,
          }
        );

        if (finalResult.success) {
          setSuccess(true);
          setRegistrationResult(finalResult);
          onRegistrationComplete?.(finalResult);
        } else {
          const errorMsg = finalResult.error || finalResult.message || '보호자 등록에 실패했습니다';
          setError(errorMsg);
          onError?.(errorMsg);
        }
      } else if (result.success) {
        // Development mode: Direct success
        setSuccess(true);
        setRegistrationResult(result);
        onRegistrationComplete?.(result);
      } else {
        const errorMsg = result.error || result.message || '보호자 등록에 실패했습니다';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '네트워크 오류가 발생했습니다';
      setError(errorMsg);
      onError?.(errorMsg);
      console.error('Guardian registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success && registrationResult) {
    return (
      <Card variant="elevated" className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-700">🎉 보호자 등록 완료!</CardTitle>
          <CardDescription>
            DogCatPaw 플랫폼에 성공적으로 등록되었습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Guardian ID:</span>
              <span className="font-mono">{registrationResult.guardianId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Auth ID:</span>
              <span className="font-mono">{registrationResult.authId}</span>
            </div>
            {registrationResult.txHash && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Tx Hash:</span>
                <span className="font-mono text-xs">{registrationResult.txHash.slice(0, 10)}...</span>
              </div>
            )}
            {registrationResult.springJobId && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Job ID:</span>
                <span className="font-mono text-xs">{registrationResult.springJobId}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-text-secondary text-center">
              이제 반려동물을 등록하고 다양한 서비스를 이용할 수 있습니다!
            </p>
            <Button
              onClick={() => window.location.href = '/pet'}
              className="w-full"
              size="lg"
            >
              내 반려동물 등록하기
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>보호자 정보 등록</CardTitle>
        <CardDescription>
          이메일 인증이 완료되었습니다. 추가 정보를 입력해주세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!address ? (
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">먼저 지갑을 연결해주세요</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email (readonly) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                이메일 주소 ✅
              </label>
              <Input
                type="email"
                value={email}
                disabled
                className="bg-green-50 border-green-200"
              />
              <p className="text-xs text-green-600 mt-1">인증 완료</p>
            </div>

            {/* Wallet Address (readonly) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                지갑 주소
              </label>
              <Input
                type="text"
                value={address}
                disabled
                className="font-mono text-sm"
              />
            </div>

            {/* Name (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                이름 (선택)
              </label>
              <Input
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Phone (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                전화번호 (선택)
              </label>
              <Input
                type="tel"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Gender (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                성별 (선택)
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                disabled={loading}
              >
                <option value="">선택하세요</option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
              </select>
            </div>

            {/* Age (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                나이 (선택)
              </label>
              <Input
                type="number"
                placeholder="30"
                min="1"
                max="150"
                value={formData.old}
                onChange={(e) => setFormData({ ...formData, old: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Address (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                주소 (선택)
              </label>
              <Input
                type="text"
                placeholder="서울시 강남구"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={loading}
              />
            </div>

            {/* Verification Method */}
            <div>
              <label className="block text-sm font-medium mb-2">
                인증 방법
              </label>
              <select
                className="w-full px-4 py-2 border border-border rounded-lg"
                value={formData.verificationMethod}
                onChange={(e) => setFormData({ ...formData, verificationMethod: parseInt(e.target.value) })}
                disabled={loading}
              >
                <option value={1}>SMS</option>
                <option value={2}>이메일</option>
                <option value={3}>SMS + 이메일</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              isLoading={loading}
              className="w-full"
              size="lg"
            >
              보호자 등록하기
            </Button>

            <p className="text-xs text-text-secondary text-center">
              등록 시 블록체인에 트랜잭션이 기록됩니다
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
