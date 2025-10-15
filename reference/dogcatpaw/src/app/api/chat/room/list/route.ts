import { NextRequest, NextResponse } from 'next/server';

interface ChatRoom {
  roomId: number;
  roomName: string;
  userName: string;
  message: string;
  unreadCount: number;
}

interface ChatRoomListResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: ChatRoom[] | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<ChatRoomListResponse>> {
  try {
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

    // Forward request to backend API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/chat/room/list`, {
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

      return NextResponse.json({
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '채팅방 목록 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: ChatRoomListResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Chat room list fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}