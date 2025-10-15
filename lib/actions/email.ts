'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

/**
 * Send email verification code
 * Requires Web3Token authentication (DIDAuthGuard on backend)
 *
 * Authentication:
 * - Development: Only walletAddress header required
 * - Production: web3Token (signed message) + walletAddress header required
 */
export async function sendVerificationCodeAction(
  _: any,
  formData: FormData
): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const email = formData.get('email')?.toString() ?? '';
    const walletAddress = formData.get('walletAddress')?.toString() ?? '';
    const web3Token = formData.get('web3Token')?.toString() ?? '';

    // Validate required fields
    if (!email) {
      return {
        isSuccess: false,
        status: '400',
        code: 'MISSING_EMAIL',
        message: '이메일 주소를 입력해주세요.',
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

    // Prepare JSON data for API request
    const requestData = {
      email: email.trim(),
    };

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
      `${process.env.API_SERVER_URL}/email/send-code`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.error || errorData.message || '인증 코드 발송 중 오류가 발생했습니다.',
        result: null,
      };
    }

    const result = await response.json();

    return {
      isSuccess: result.success || true,
      status: '200',
      code: 'SUCCESS',
      message: result.message || '인증 코드가 발송되었습니다!',
      result: result,
    };
  } catch (error) {
    console.error('Send verification code error:', error);
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
 * Verify email code
 * Requires Web3Token authentication (DIDAuthGuard on backend)
 *
 * Authentication:
 * - Development: Only walletAddress header required
 * - Production: web3Token (signed message) + walletAddress header required
 */
export async function verifyEmailCodeAction(
  _: any,
  formData: FormData
): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const code = formData.get('code')?.toString() ?? '';
    const walletAddress = formData.get('walletAddress')?.toString() ?? '';
    const web3Token = formData.get('web3Token')?.toString() ?? '';

    // Validate required fields
    if (!code) {
      return {
        isSuccess: false,
        status: '400',
        code: 'MISSING_CODE',
        message: '인증 코드를 입력해주세요.',
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

    // Validate code format (6 digits)
    if (code.length !== 6) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_CODE_LENGTH',
        message: '인증 코드는 6자리여야 합니다.',
        result: null,
      };
    }

    if (!/^\d{6}$/.test(code)) {
      return {
        isSuccess: false,
        status: '400',
        code: 'INVALID_CODE_FORMAT',
        message: '인증 코드는 숫자만 입력 가능합니다.',
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

    // Prepare JSON data for API request
    const requestData = {
      code: code.trim(),
    };

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
      `${process.env.API_SERVER_URL}/email/verify-code`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.error || errorData.message || '인증 코드 검증 중 오류가 발생했습니다.',
        result: {
          remainingAttempts: errorData.remainingAttempts,
        },
      };
    }

    const result = await response.json();

    // Check if verification succeeded but has a warning
    if (result.warning) {
      return {
        isSuccess: true,
        status: '200',
        code: 'SUCCESS_WITH_WARNING',
        message: result.warning,
        result: {
          email: result.email,
          warning: result.warning,
        },
      };
    }

    return {
      isSuccess: result.success || true,
      status: '200',
      code: 'SUCCESS',
      message: result.message || '이메일 인증이 완료되었습니다!',
      result: {
        email: result.email,
      },
    };
  } catch (error) {
    console.error('Verify email code error:', error);
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
 * Client-side helper to send verification code
 * For use in client components
 *
 * @param email - Email address to send verification code
 * @param walletAddress - User's wallet address
 * @param web3Token - (Optional) Web3Token signed by wallet. Required in production, optional in dev mode
 */
export async function sendVerificationCode(
  email: string,
  walletAddress: string,
  web3Token?: string
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

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'walletaddress': walletAddress.toLowerCase(),
    };

    if (web3Token) {
      headers['authorization'] = web3Token;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/email/send-code`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: email.trim() }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || '인증 코드 발송에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Send verification code error:', error);
    throw error;
  }
}

/**
 * Client-side helper to verify email code
 * For use in client components
 *
 * @param code - 6-digit verification code
 * @param walletAddress - User's wallet address
 * @param web3Token - (Optional) Web3Token signed by wallet. Required in production, optional in dev mode
 */
export async function verifyEmailCode(
  code: string,
  walletAddress: string,
  web3Token?: string
) {
  try {
    if (!code || !walletAddress) {
      throw new Error('인증 코드와 지갑 주소가 필요합니다.');
    }

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      throw new Error('인증 코드는 6자리 숫자여야 합니다.');
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
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/email/verify-code`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ code: code.trim() }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || '인증 코드 검증에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Verify email code error:', error);
    throw error;
  }
}
