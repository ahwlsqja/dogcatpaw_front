import { NextRequest, NextResponse } from 'next/server';

interface CommentItem {
  nickName: string;
  storyId: number;
  commentId: number;
  savedComment: string;
  createdAt: string;
}

interface CommentListResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    commentList: CommentItem[];
    nextCursor: number;
  } | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<CommentListResponse>> {
  try {
    const { searchParams } = request.nextUrl;

    // Extract query parameters
    const storyId = searchParams.get('storyId');
    const cursor = searchParams.get('cursor');
    const size = searchParams.get('size') || '5';

    // Validate required parameters
    if (!storyId) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "MISSING_STORY_ID",
        message: "storyId는 필수 항목입니다.",
        result: null
      }, { status: 400 });
    }

    const storyIdNum = parseInt(storyId);
    if (isNaN(storyIdNum) || storyIdNum <= 0) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_STORY_ID",
        message: "유효한 storyId가 필요합니다.",
        result: null
      }, { status: 400 });
    }

    // Validate optional parameters
    const sizeNum = parseInt(size);
    if (isNaN(sizeNum) || sizeNum <= 0 || sizeNum > 50) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_SIZE",
        message: "size는 1-50 사이의 숫자여야 합니다.",
        result: null
      }, { status: 400 });
    }

    const cursorNum = cursor ? parseInt(cursor) : null;
    if (cursor && (isNaN(cursorNum!) || cursorNum! <= 0)) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_CURSOR",
        message: "cursor는 양수여야 합니다.",
        result: null
      }, { status: 400 });
    }

    // Build API URL with query parameters
    const apiUrl = new URL(`${process.env.API_SERVER_URL}/api/comment/`);
    apiUrl.searchParams.set('storyId', storyIdNum.toString());
    apiUrl.searchParams.set('size', sizeNum.toString());

    if (cursorNum) {
      apiUrl.searchParams.set('cursor', cursorNum.toString());
    }

    // Forward request to backend API
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        })
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error cases
      if (response.status === 404) {
        return NextResponse.json({
          isSuccess: false,
          status: "404",
          code: "STORY_NOT_FOUND",
          message: "존재하지 않는 스토리입니다.",
          result: null
        }, { status: 404 });
      }

      return NextResponse.json({
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '댓글 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: CommentListResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Comment list fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}