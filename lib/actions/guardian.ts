'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: {
    guardianId?: string;
    authId?: string;
    txHash?: string;
    springJobId?: string;
  } | null;
}

export type VerificationMethod = 1 | 2 | 3; // 1: SMS, 2: Email, 3: Both

/**
 * Register guardian
 * Requires email verification first and Web3Token authentication (DIDAuthGuard on backend)
 *
 * Authentication:
 * - Development: Only walletAddress header required
 * - Production: web3Token (signed message) + walletAddress header required
 */
export async function registerGuardianAction(
  _: unknown,
  formData: FormData
): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const email = formData.get('email')?.toString() ?? '';
    const phone = formData.get('phone')?.toString() ?? '';
    const name = formData.get('name')?.toString() ?? '';
    const gender = formData.get('gender')?.toString() ?? '';
    const oldStr = formData.get('old')?.toString() ?? '';
    const old = oldStr ? parseInt(oldStr) : undefined;
    const userAddress = formData.get('address')?.toString() ?? '';
    const verificationMethod = parseInt(
      formData.get('verificationMethod')?.toString() ?? '2'
    );
    const walletAddress = formData.get('walletAddress')?.toString() ?? '';
    const web3Token = formData.get('web3Token')?.toString() ?? '';

    // Validate required fields
    if (!email) {
      return {
        isSuccess: false,
        status: '400',
        code: 'MISSING_EMAIL',
        message: '이메일은 필수 항목입니다.',
        result: null,
      };
    }

    if (!walletAddress) {
      return {
        isSuccess: false,
        status: '401',
        code: 'MISSING_WALLET_ADDRESS',
        message: '지갑 주소가 필요합니다.',
        result: null,
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_EMAIL',
        message: '유효한 이메일 주소를 입력해주세요.',
        result: null,
      };
    }

    // Validate wallet address format
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_WALLET_ADDRESS',
        message: '유효한 지갑 주소를 입력해주세요.',
        result: null,
      };
    }

    // Validate name length (if provided)
    if (name && (name.length < 2 || name.length > 50)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_NAME',
        message: '이름은 2-50자 사이여야 합니다.',
        result: null,
      };
    }

    // Validate phone format (if provided)
    if (phone) {
      const phoneRegex = /^[0-9-+\s()]+$/;
      if (!phoneRegex.test(phone) || phone.length < 10) {
        return {
          isSuccess: false,
          status: '400',
          code: 'INVALID_PHONE',
          message: '유효한 전화번호를 입력해주세요.',
          result: null,
        };
      }
    }

    // Validate gender (if provided)
    if (gender && !['M', 'F'].includes(gender)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_GENDER',
        message: '성별은 M 또는 F만 가능합니다.',
        result: null,
      };
    }

    // Validate age (if provided)
    if (old !== undefined && (old < 1 || old > 150)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_AGE',
        message: '나이는 1-150 사이여야 합니다.',
        result: null,
      };
    }

    // Validate address length (if provided)
    if (userAddress && (userAddress.length < 2 || userAddress.length > 200)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_ADDRESS',
        message: '주소는 2-200자 사이여야 합니다.',
        result: null,
      };
    }

    // Validate verification method
    const validMethods: VerificationMethod[] = [1, 2, 3];
    if (!validMethods.includes(verificationMethod as VerificationMethod)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_VERIFICATION_METHOD',
        message: '인증 방법이 유효하지 않습니다. (1: SMS, 2: Email, 3: Both)',
        result: null,
      };
    }

    // Prepare JSON data for API request
    const guardianData: {
      email: string;
      verificationMethod: number;
      phone?: string;
      name?: string;
      gender?: string;
      old?: number;
      address?: string;
    } = {
      email: email.trim(),
      verificationMethod,
    };

    if (phone) {
      guardianData.phone = phone.trim();
    }

    if (name) {
      guardianData.name = name.trim();
    }

    if (gender) {
      guardianData.gender = gender.trim();
    }

    if (old !== undefined) {
      guardianData.old = old;
    }

    if (userAddress) {
      guardianData.address = userAddress.trim();
    }

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'walletaddress': walletAddress.toLowerCase(),
    };

    // Add Web3Token in production (optional in dev mode)
    if (web3Token) {
      headers['authorization'] = web3Token;
    }

    // Send POST request to backend API
    const response = await fetch(
      `${process.env.API_SERVER_URL}/api/guardian/register`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(guardianData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message:
          errorData.error ||
          errorData.message ||
          '보호자 등록 중 오류가 발생했습니다.',
        result: null,
      };
    }

    const result = await response.json();

    return {
      isSuccess: result.success || true,
      status: '200',
      code: 'SUCCESS',
      message: result.message || '보호자 등록이 완료되었습니다!',
      result: {
        guardianId: result.guardianId,
        authId: result.authId,
        txHash: result.txHash,
        springJobId: result.springJobId,
      },
    };
  } catch (error) {
    console.error('Guardian registration error:', error);
    return {
      isSuccess: false,
      status: '500',
      code: 'NETWORK_ERROR',
      message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      result: null,
    };
  }
}

/**
 * Client-side helper to register guardian
 * For use in client components
 *
 * @param email - Guardian's email address (required)
 * @param walletAddress - User's wallet address (required)
 * @param web3Token - (Optional) Web3Token signed by wallet
 * @param options - Additional guardian information
 * @returns Response object with either success data or transaction data requiring signature
 */
export async function registerGuardian(
  email: string,
  walletAddress: string,
  web3Token?: string,
  options?: {
    phone?: string;
    name?: string;
    gender?: string;
    old?: number;
    address?: string;
    verificationMethod?: VerificationMethod;
    signedTx?: string; // For submitting signed transaction (production mode, step 2)
  }
) {
  try {
    if (!email || !walletAddress) {
      throw new Error('이메일과 지갑 주소가 필요합니다.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('유효한 이메일 주소를 입력해주세요.');
    }

    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      throw new Error('유효한 지갑 주소를 입력해주세요.');
    }

    const requestData: {
      email: string;
      verificationMethod: number;
      phone?: string;
      name?: string;
      gender?: string;
      old?: number;
      address?: string;
      signedTx?: string;
    } = {
      email: email.trim(),
      verificationMethod: options?.verificationMethod ?? 2,
    };

    if (options?.phone) {
      requestData.phone = options.phone.trim();
    }

    if (options?.name) {
      requestData.name = options.name.trim();
    }

    if (options?.gender) {
      requestData.gender = options.gender.trim();
    }

    if (options?.old !== undefined) {
      requestData.old = options.old;
    }

    if (options?.address) {
      requestData.address = options.address.trim();
    }

    // Include signed transaction if provided (production mode, step 2)
    if (options?.signedTx) {
      requestData.signedTx = options.signedTx;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'walletaddress': walletAddress.toLowerCase(),
    };

    if (web3Token) {
      headers['authorization'] = web3Token;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/guardian/register`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || '보호자 등록에 실패했습니다.'
      );
    }

    const result = await response.json();

    // Production mode: Backend returns transaction data for signing
    if (result.requiresSignature && result.transactionData) {
      return {
        requiresSignature: true,
        transactionData: result.transactionData,
        message: result.message || 'Please sign this transaction with your wallet',
      };
    }

    // Development mode or production mode after signing: Direct success
    return result;
  } catch (error) {
    console.error('Guardian registration error:', error);
    throw error;
  }
}

/**
 * Get guardian profile
 * For use in client components
 *
 * @param guardianAddress - Guardian's wallet address
 * @param walletAddress - Current user's wallet address
 * @param web3Token - (Optional) Web3Token signed by wallet
 */
export async function getGuardianProfile(
  guardianAddress: string,
  walletAddress: string,
  web3Token?: string
) {
  try {
    if (!guardianAddress || !walletAddress) {
      throw new Error('보호자 주소와 지갑 주소가 필요합니다.');
    }

    if (!guardianAddress.startsWith('0x') || guardianAddress.length !== 42) {
      throw new Error('유효한 보호자 주소를 입력해주세요.');
    }

    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      throw new Error('유효한 지갑 주소를 입력해주세요.');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'walletaddress': walletAddress.toLowerCase(),
    };

    if (web3Token) {
      headers['authorization'] = web3Token;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/guardian/profile?address=${guardianAddress}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || errorData.message || '보호자 프로필 조회에 실패했습니다.'
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Get guardian profile error:', error);
    throw error;
  }
}

/**
 * Check if guardian is registered
 * For use in client components
 *
 * @param guardianAddress - Guardian's wallet address
 * @param walletAddress - Current user's wallet address
 * @param web3Token - (Optional) Web3Token signed by wallet
 */
export async function isGuardianRegistered(
  guardianAddress: string,
  walletAddress: string,
  web3Token?: string
): Promise<boolean> {
  try {
    if (!guardianAddress || !walletAddress) {
      return false;
    }

    if (!guardianAddress.startsWith('0x') || guardianAddress.length !== 42) {
      return false;
    }

    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      return false;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'walletaddress': walletAddress.toLowerCase(),
    };

    if (web3Token) {
      headers['authorization'] = web3Token;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/guardian/check?address=${guardianAddress}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.isRegistered || false;
  } catch (error) {
    console.error('Check guardian registration error:', error);
    return false;
  }
}
