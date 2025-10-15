'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function toggleLikeAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const storyId = parseInt(formData.get("storyId")?.toString() ?? '0');
    const memberId = parseInt(formData.get("memberId")?.toString() ?? '0');

    // Validate required fields
    if (!storyId || !memberId) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "storyId와 memberId는 필수 항목입니다.",
        result: null
      };
    }

    // Validate data types and ranges
    if (storyId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_STORY_ID",
        message: "유효한 스토리 ID가 필요합니다.",
        result: null
      };
    }

    if (memberId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_MEMBER_ID",
        message: "유효한 회원 ID가 필요합니다.",
        result: null
      };
    }

    // Send POST request to server API (with storyId as query parameter)
    const response = await fetch(`${process.env.API_SERVER_URL}/api/like/?storyId=${storyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memberId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '좋아요 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Like toggle error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}