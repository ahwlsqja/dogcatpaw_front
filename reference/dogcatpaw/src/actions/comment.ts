'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function createCommentAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const storyId = parseInt(formData.get("storyId")?.toString() ?? '0');
    const comment = formData.get("comment")?.toString() ?? '';
    const memberId = parseInt(formData.get("memberId")?.toString() ?? '0');

    // Validate required fields
    if (!storyId || !comment || !memberId) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "storyId, comment, memberId는 필수 항목입니다.",
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

    // Validate comment length
    if (comment.trim().length === 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "EMPTY_COMMENT",
        message: "댓글 내용을 입력해주세요.",
        result: null
      };
    }

    if (comment.length > 1000) {
      return {
        isSuccess: false,
        status: "400",
        code: "COMMENT_TOO_LONG",
        message: "댓글은 1000자 이하로 입력해주세요.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const commentData = {
      storyId,
      comment: comment.trim(),
      memberId
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '댓글 작성 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Comment creation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}