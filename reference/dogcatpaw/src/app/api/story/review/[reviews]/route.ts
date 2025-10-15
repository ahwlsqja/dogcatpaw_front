import { NextRequest, NextResponse } from 'next/server';

type Breed = 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';

interface StoryReviewDetailResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    profileUrl: string;
    memberName: string;
    petId: number;
    title: string;
    images: string;
    content: string;
    breed: Breed;
    petName: string;
    likeCount: number;
    liked: boolean;
    commentCount: number;
    adoptionAgency: string;
    adoptionDate: string;
    createdAt: string;
    did: string;
  } | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reviews: string }> }
): Promise<NextResponse<StoryReviewDetailResponse>> {
  try {
    const { reviews } = await params;
    const reviewId = parseInt(reviews);

    // Validate review ID
    if (!reviewId || reviewId <= 0) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_REVIEW_ID",
        message: "유효한 후기 ID가 필요합니다.",
        result: null
      }, { status: 400 });
    }

    // Extract user ID from query parameters or headers for liked status
    const userId = request.nextUrl.searchParams.get('userId');
    const userIdNum = userId ? parseInt(userId) : null;

    // Prepare request URL with query parameters
    const apiUrl = new URL(`${process.env.API_SERVER_URL}/api/story/review/${reviewId}`);
    if (userIdNum) {
      apiUrl.searchParams.set('userId', userIdNum.toString());
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
      return NextResponse.json({
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '후기 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: StoryReviewDetailResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Story review detail fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}