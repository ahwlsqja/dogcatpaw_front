import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  messageId: number;
  senderId: number;
  senderName: string;
  message: string;
  read: boolean;
}

interface ChatHistoryResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: ChatMessage[] | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
): Promise<NextResponse<ChatHistoryResponse>> {
  try {
    const { roomId } = params;

    // Validate path parameter
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

    // Forward request to backend API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/chat/history/${roomIdNum}`, {
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
        message: errorData.message || '채팅 기록 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: ChatHistoryResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Chat history fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}