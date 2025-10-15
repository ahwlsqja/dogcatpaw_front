import { NextRequest, NextResponse } from 'next/server';

type DonationStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'PAUSED';
type Breed = 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';

interface DonationItem {
  thumbnail: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  donationStatus: DonationStatus;
  patronCount: number;
  progress: number;
  dday: string;
}

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

interface StoryItem {
  profileUrl: string;
  memberName: string;
  title: string;
  images: string;
  content: string;
  breed: Breed;
  petName: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
}

interface AdoptionHomeResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    closingSoonDonations: DonationItem[];
    popularReviews: ReviewItem[];
    popularStories: StoryItem[];
  } | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<AdoptionHomeResponse>> {
  try {
    // Forward request to backend API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/adoption/home`, {
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
        message: errorData.message || '홈 화면 데이터 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: AdoptionHomeResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Adoption home fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}