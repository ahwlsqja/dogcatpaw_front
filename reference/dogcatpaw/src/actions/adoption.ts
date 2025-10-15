'use server';

export type Region = 'SEOUL' | 'BUSAN' | 'DAEGU' | 'INCHEON' | 'GWANGJU' | 'DAEJEON' | 'ULSAN' | 'SEJONG' | 'GYEONGGI' | 'GANGWON' | 'CHUNGBUK' | 'CHUNGNAM' | 'JEONBUK' | 'JEONNAM' | 'GYEONGBUK' | 'GYEONGNAM' | 'JEJU';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function createAdoptionPostAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const petId = parseInt(formData.get("petId")?.toString() ?? '0');
    const title = formData.get("title")?.toString() ?? '';
    const content = formData.get("content")?.toString() ?? '';
    const region = formData.get("region")?.toString() as Region;
    const district = formData.get("district")?.toString() ?? '';
    const shelterName = formData.get("shelterName")?.toString() ?? '';
    const contact = formData.get("contact")?.toString() ?? '';
    const deadLine = formData.get("deadLine")?.toString() ?? '';

    // Validate required fields
    if (!petId || !title || !content || !region || !district || !shelterName || !contact || !deadLine) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "모든 필수 필드를 입력해주세요.",
        result: null
      };
    }

    // Validate data types and ranges
    if (petId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_PET_ID",
        message: "유효한 반려동물 ID가 필요합니다.",
        result: null
      };
    }

    // Validate title length
    if (title.trim().length === 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "EMPTY_TITLE",
        message: "제목을 입력해주세요.",
        result: null
      };
    }

    if (title.length > 100) {
      return {
        isSuccess: false,
        status: "400",
        code: "TITLE_TOO_LONG",
        message: "제목은 100자 이하로 입력해주세요.",
        result: null
      };
    }

    // Validate content length
    if (content.trim().length === 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "EMPTY_CONTENT",
        message: "내용을 입력해주세요.",
        result: null
      };
    }

    if (content.length > 2000) {
      return {
        isSuccess: false,
        status: "400",
        code: "CONTENT_TOO_LONG",
        message: "내용은 2000자 이하로 입력해주세요.",
        result: null
      };
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(deadLine)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_DATE_FORMAT",
        message: "날짜는 YYYY-MM-DD 형식이어야 합니다.",
        result: null
      };
    }

    // Validate deadline is in the future
    const deadlineDate = new Date(deadLine);
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

    // Validate region
    const validRegions: Region[] = ['SEOUL', 'BUSAN', 'DAEGU', 'INCHEON', 'GWANGJU', 'DAEJEON', 'ULSAN', 'SEJONG', 'GYEONGGI', 'GANGWON', 'CHUNGBUK', 'CHUNGNAM', 'JEONBUK', 'JEONNAM', 'GYEONGBUK', 'GYEONGNAM', 'JEJU'];

    if (!validRegions.includes(region)) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_REGION",
        message: "유효하지 않은 지역입니다.",
        result: null
      };
    }

    // Validate contact format (basic check)
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (!phoneRegex.test(contact) || contact.length < 10) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_CONTACT",
        message: "유효한 연락처를 입력해주세요.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const adoptionData = {
      petId,
      title: title.trim(),
      content: content.trim(),
      region,
      district: district.trim(),
      shelterName: shelterName.trim(),
      contact: contact.trim(),
      deadLine
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/adoption/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adoptionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '입양 공고 작성 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Adoption post creation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}