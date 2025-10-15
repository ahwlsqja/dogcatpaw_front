'use server';

export type Gender = 'MALE' | 'FEMALE';
export type UserType = 'SHELTER' | 'INDIVIDUAL' | 'ORGANIZATION';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function signupAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const walletAddress = formData.get("walletAddress")?.toString() ?? '';
    const username = formData.get("username")?.toString() ?? '';
    const nickname = formData.get("nickname")?.toString() ?? '';
    const gender = formData.get("gender")?.toString() as Gender;
    const old = parseInt(formData.get("old")?.toString() ?? '0');
    const address = formData.get("address")?.toString() ?? '';
    const phoneNumber = formData.get("phoneNumber")?.toString() ?? '';
    const type = formData.get("type")?.toString() as UserType;
    const email = formData.get("email")?.toString() ?? '';

    // Validate required fields
    if (!walletAddress || !username || !nickname || !gender || !old || !address || !phoneNumber || !type || !email) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "모든 필수 필드를 입력해주세요.",
        result: null
      };
    }

    // Validate wallet address format (basic check)
    if (walletAddress.length < 10) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_WALLET_ADDRESS",
        message: "유효한 지갑 주소를 입력해주세요.",
        result: null
      };
    }

    // Validate username
    if (username.length < 3 || username.length > 20) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_USERNAME",
        message: "사용자명은 3-20자 사이여야 합니다.",
        result: null
      };
    }

    // Validate nickname
    if (nickname.length < 2 || nickname.length > 15) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_NICKNAME",
        message: "닉네임은 2-15자 사이여야 합니다.",
        result: null
      };
    }

    // Validate age
    if (old < 0 || old > 150) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_AGE",
        message: "나이는 0-150 사이여야 합니다.",
        result: null
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_EMAIL",
        message: "유효한 이메일 주소를 입력해주세요.",
        result: null
      };
    }

    // Validate phone number format (basic check)
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(phoneNumber) || phoneNumber.length < 10) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_PHONE_NUMBER",
        message: "유효한 전화번호를 입력해주세요.",
        result: null
      };
    }

    // Validate enum values
    const validGenders: Gender[] = ['MALE', 'FEMALE'];
    const validTypes: UserType[] = ['SHELTER', 'INDIVIDUAL', 'ORGANIZATION'];

    if (!validGenders.includes(gender)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_GENDER",
        message: "성별은 MALE 또는 FEMALE이어야 합니다.",
        result: null
      };
    }

    if (!validTypes.includes(type)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_TYPE",
        message: "유형은 SHELTER, INDIVIDUAL, ORGANIZATION 중 하나여야 합니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const signupData = {
      walletAddress,
      username,
      nickname,
      gender,
      old,
      address,
      phoneNumber,
      type,
      email
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '회원가입 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Signup error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}

// Regular API functions (not server actions)

export async function reissueToken(id: number, refreshToken: string) {
  try {
    if (!id || id <= 0) {
      throw new Error('유효한 사용자 ID가 필요합니다.');
    }

    if (!refreshToken || refreshToken.trim().length < 10) {
      throw new Error('유효한 리프레시 토큰이 필요합니다.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        refreshToken: refreshToken.trim()
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '토큰 재발행 처리 중 오류가 발생했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Token reissue error:', error);
    throw error;
  }
}

export async function logout(accessToken?: string, userId?: number) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/logout`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userId ? { userId } : {}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '로그아웃 처리 중 오류가 발생했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function loginAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const walletAddress = formData.get("walletAddress")?.toString() ?? '';

    // Validate required fields
    if (!walletAddress) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_WALLET_ADDRESS",
        message: "지갑 주소를 입력해주세요.",
        result: null
      };
    }

    // Validate wallet address format (basic check)
    if (walletAddress.trim().length < 10) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_WALLET_ADDRESS",
        message: "유효한 지갑 주소를 입력해주세요.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const loginData = {
      walletAddress: walletAddress.trim()
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '로그인 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Login error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}