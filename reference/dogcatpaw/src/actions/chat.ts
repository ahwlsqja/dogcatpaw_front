'use server';

export interface serverActionMessage {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result?: any;
}

export async function createChatRoomAction(_: any, formData: FormData): Promise<serverActionMessage> {
  try {
    // Extract data from FormData
    const targetId = parseInt(formData.get("targetId")?.toString() ?? '0');
    const roomName = formData.get("roomName")?.toString() ?? '';
    const memberId = parseInt(formData.get("memberId")?.toString() ?? '0');

    // Validate required fields
    if (!targetId || !roomName || !memberId) {
      return {
        isSuccess: false,
        status: "400",
        code: "MISSING_REQUIRED_FIELDS",
        message: "targetId, roomName, memberId는 필수 항목입니다.",
        result: null
      };
    }

    // Validate data types and ranges
    if (targetId <= 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_TARGET_ID",
        message: "유효한 대상 ID가 필요합니다.",
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

    // Validate room name
    if (roomName.trim().length === 0) {
      return {
        isSuccess: false,
        status: "400",
        code: "EMPTY_ROOM_NAME",
        message: "채팅방 이름을 입력해주세요.",
        result: null
      };
    }

    if (roomName.length > 100) {
      return {
        isSuccess: false,
        status: "400",
        code: "ROOM_NAME_TOO_LONG",
        message: "채팅방 이름은 100자 이하로 입력해주세요.",
        result: null
      };
    }

    // Check if trying to create room with self
    if (targetId === memberId) {
      return {
        isSuccess: false,
        status: "400",
        code: "INVALID_TARGET",
        message: "자기 자신과는 채팅방을 생성할 수 없습니다.",
        result: null
      };
    }

    // Prepare JSON data for API request
    const chatRoomData = {
      targetId,
      roomName: roomName.trim(),
      memberId
    };

    // Send POST request to server API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/chat/room/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatRoomData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '채팅방 생성 중 오류가 발생했습니다.',
        result: null
      };
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Chat room creation error:', error);
    return {
      isSuccess: false,
      status: "500",
      code: "NETWORK_ERROR",
      message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    };
  }
}