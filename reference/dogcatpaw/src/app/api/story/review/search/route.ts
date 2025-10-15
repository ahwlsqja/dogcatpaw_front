import { NextRequest, NextResponse } from 'next/server';

type Breed = 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';

interface ReviewItem {
  profileUrl: string;
  memberName: string;
  images: string;
  title: string;
  content: string;
  breed: Breed;
  petName: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
}

interface StoryReviewSearchResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    reviews: ReviewItem[];
    nextCursor: number;
  } | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<StoryReviewSearchResponse>> {
  try {
    const { searchParams } = request.nextUrl;

    // Extract query parameters
    const keyword = searchParams.get('keyword');
    const cursorId = searchParams.get('cursorId');
    const size = searchParams.get('size') || '9';

    // Validate required parameters
    if (!keyword) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "MISSING_KEYWORD",
        message: "검색 키워드를 입력해주세요.",
        result: null
      }, { status: 400 });
    }

    // Validate keyword length
    if (keyword.trim().length === 0) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "EMPTY_KEYWORD",
        message: "검색 키워드를 입력해주세요.",
        result: null
      }, { status: 400 });
    }

    if (keyword.length > 100) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "KEYWORD_TOO_LONG",
        message: "검색 키워드는 100자 이하로 입력해주세요.",
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

    const cursorIdNum = cursorId ? parseInt(cursorId) : null;
    if (cursorId && (isNaN(cursorIdNum!) || cursorIdNum! <= 0)) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_CURSOR",
        message: "cursorId는 양수여야 합니다.",
        result: null
      }, { status: 400 });
    }

    // Build API URL with query parameters
    const apiUrl = new URL(`${process.env.API_SERVER_URL}/api/story/review/search`);
    apiUrl.searchParams.set('keyword', keyword.trim());
    apiUrl.searchParams.set('size', sizeNum.toString());

    if (cursorIdNum) {
      apiUrl.searchParams.set('cursorId', cursorIdNum.toString());
    }

    // Forward request to backend API
    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization header if present (for liked status)
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        })
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '후기 검색 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: StoryReviewSearchResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Story review search error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}