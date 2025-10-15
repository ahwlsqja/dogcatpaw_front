import { NextRequest, NextResponse } from 'next/server';

interface ChatRoomCard {
  roomId: number;
  roomName: string;
  userName: string;
  message: string;
  unreadCount: number;
}

interface ChatRoomCardResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: ChatRoomCard | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<ChatRoomCardResponse>> {
  try {
    const { searchParams } = request.nextUrl;

    // Extract query parameters
    const roomId = searchParams.get('roomId');

    // Validate required parameters
    if (!roomId) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "MISSING_ROOM_ID",
        message: "roomId는 필수 항목입니다.",
        result: null
      }, { status: 400 });
    }

    const roomIdNum = parseInt(roomId);
    if (isNaN(roomIdNum) || roomIdNum <= 0) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_ROOM_ID",
        message: "유효한 roomId가 필요합니다.",
        result: null
      }, { status: 400 });
    }

    // Extract authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({
        isSuccess: false,
        status: "401",
        code: "MISSING_AUTHORIZATION",
        message: "로그인이 필요합니다.",
        result: null
      }, { status: 401 });
    }

    // Build API URL with query parameters
    const apiUrl = new URL(`${process.env.API_SERVER_URL}/api/chat/room/card`);
    apiUrl.searchParams.set('roomId', roomIdNum.toString());

    // Forward request to backend API
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error cases
      if (response.status === 401) {
        return NextResponse.json({
          isSuccess: false,
          status: "401",
          code: "UNAUTHORIZED",
          message: "인증이 만료되었습니다. 다시 로그인해주세요.",
          result: null
        }, { status: 401 });
      }

      if (response.status === 403) {
        return NextResponse.json({
          isSuccess: false,
          status: "403",
          code: "FORBIDDEN",
          message: "접근 권한이 없습니다.",
          result: null
        }, { status: 403 });
      }

      if (response.status === 404) {
        return NextResponse.json({
          isSuccess: false,
          status: "404",
          code: "ROOM_NOT_FOUND",
          message: "존재하지 않는 채팅방입니다.",
          result: null
        }, { status: 404 });
      }

      return NextResponse.json({
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '채팅방 정보 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: ChatRoomCardResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Chat room card fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}