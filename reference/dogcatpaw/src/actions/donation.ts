'use server';

export type DonationCategory = 'SURGERY' | 'TREATMENT' | 'FOOD' | 'SHELTER' | 'EMERGENCY' | 'OTHER';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function createDonationPostAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const memberId = parseInt(formData.get("memberId")?.toString() ?? '0');
    const petId = parseInt(formData.get("petId")?.toString() ?? '0');
    const title = formData.get("title")?.toString() ?? '';
    const targetAmount = parseInt(formData.get("targetAmount")?.toString() ?? '0');
    const deadline = formData.get("deadline")?.toString() ?? '';
    const category = formData.get("category")?.toString() as DonationCategory;
    const content = formData.get("content")?.toString() ?? '';
    const images = formData.get("images")?.toString() ?? '';
    const bankName = formData.get("bankName")?.toString() ?? '';
    const accountNumber = formData.get("accountNumber")?.toString() ?? '';
    const accountHolder = formData.get("accountHolder")?.toString() ?? '';

    // Validate required fields
    if (!memberId || !petId || !title || !targetAmount || !deadline || !category || !content || !bankName || !accountNumber || !accountHolder) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "모든 필수 필드를 입력해주세요.",
        result: null
      };
    }

    // Validate data types and ranges
    if (memberId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_MEMBER_ID",
        message: "유효한 회원 ID가 필요합니다.",
        result: null
      };
    }

    if (petId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_PET_ID",
        message: "유효한 반려동물 ID가 필요합니다.",
        result: null
      };
    }

    if (targetAmount <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_TARGET_AMOUNT",
        message: "목표 금액은 0보다 커야 합니다.",
        result: null
      };
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(deadline)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_DATE_FORMAT",
        message: "날짜는 YYYY-MM-DD 형식이어야 합니다.",
        result: null
      };
    }

    // Validate deadline is in the future
    const deadlineDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate <= today) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_DEADLINE",
        message: "마감일은 오늘 이후여야 합니다.",
        result: null
      };
    }

    // Validate category
    const validCategories: DonationCategory[] = ['SURGERY', 'TREATMENT', 'FOOD', 'SHELTER', 'EMERGENCY', 'OTHER'];
    if (!validCategories.includes(category)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_CATEGORY",
        message: "유효하지 않은 카테고리입니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const donationData = {
      memberId,
      petId,
      title,
      targetAmount,
      deadline,
      category,
      content,
      images,
      bankName,
      accountNumber,
      accountHolder
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/donation/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '후원 공고 작성 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Donation post creation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}

export async function makeDonationAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const memberId = parseInt(formData.get("memberId")?.toString() ?? '0');
    const itemId = parseInt(formData.get("itemId")?.toString() ?? '0');
    const donationId = parseInt(formData.get("donationId")?.toString() ?? '0');

    // Validate required fields
    if (!memberId || !itemId || !donationId) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "memberId, itemId, donationId는 필수 항목입니다.",
        result: null
      };
    }

    // Validate data types and ranges
    if (memberId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_MEMBER_ID",
        message: "유효한 회원 ID가 필요합니다.",
        result: null
      };
    }

    if (itemId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_ITEM_ID",
        message: "유효한 아이템 ID가 필요합니다.",
        result: null
      };
    }

    if (donationId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_DONATION_ID",
        message: "유효한 후원 ID가 필요합니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const donationData = {
      memberId,
      itemId,
      donationId
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/donation-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '후원 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Donation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}