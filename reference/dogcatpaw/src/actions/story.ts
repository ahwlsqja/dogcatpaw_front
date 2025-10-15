'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function createStoryReviewAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const title = formData.get("title")?.toString() ?? '';
    const content = formData.get("content")?.toString() ?? '';
    const petId = parseInt(formData.get("petId")?.toString() ?? '0');
    const memberName = formData.get("memberName")?.toString() ?? '';
    const imageFile = formData.get('image') as File;

    // Validate required fields
    if (!title || !content || !petId || !memberName) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "제목, 내용, 반려동물 ID, 회원명은 필수 항목입니다.",
        result: null
      };
    }

    // Prepare multipart form data for API request
    const apiFormData = new FormData();

    // Add story object as JSON string
    const storyObject = {
      title,
      content,
      petId,
      memberName
    };
    apiFormData.append('story', JSON.stringify(storyObject));

    // Add image file if provided
    if (imageFile && imageFile.size > 0) {
      apiFormData.append('image', imageFile);
    }

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/story/review`, {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '서버 요청 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Story review creation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}

export async function createDailyStoryAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const title = formData.get("title")?.toString() ?? '';
    const content = formData.get("content")?.toString() ?? '';
    const petId = parseInt(formData.get("petId")?.toString() ?? '0');
    const memberName = formData.get("memberName")?.toString() ?? '';
    const imageFile = formData.get('image') as File;

    // Validate required fields
    if (!title || !content || !petId || !memberName) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "제목, 내용, 반려동물 ID, 회원명은 필수 항목입니다.",
        result: null
      };
    }

    // Prepare multipart form data for API request
    const apiFormData = new FormData();

    // Add story object as JSON string
    const storyObject = {
      title,
      content,
      petId,
      memberName
    };
    apiFormData.append('story', JSON.stringify(storyObject));

    // Add image file if provided
    if (imageFile && imageFile.size > 0) {
      apiFormData.append('image', imageFile);
    }

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/story/daily`, {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '서버 요청 처리 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Daily story creation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}