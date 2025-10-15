import { NextRequest, NextResponse } from 'next/server';

type Breed = 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
type DonationStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'PAUSED';
type DonationCategory = 'SURGERY' | 'TREATMENT' | 'FOOD' | 'SHELTER' | 'EMERGENCY' | 'OTHER';

interface RecentDonation {
  nickname: string;
  profileUrl: string;
  donationAmount: number;
  donationTime: string;
}

interface DonationDetailResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    memberId: number;
    petName: string;
    petDid: string;
    breed: Breed;
    title: string;
    targetAmount: number;
    currentAmount: number;
    donationStatus: DonationStatus;
    deadline: string;
    category: DonationCategory;
    content: string;
    images: string;
    patronCount: number;
    progress: number;
    recentDonations: RecentDonation[];
    cursor: number;
    dday: string;
  } | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<DonationDetailResponse>> {
  try {
    const { searchParams } = request.nextUrl;

    // Extract query parameters
    const donationId = searchParams.get('donationId');
    const cursor = searchParams.get('cursor');
    const size = searchParams.get('size') || '5';

    // Validate required parameters
    if (!donationId) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "MISSING_DONATION_ID",
        message: "donationId는 필수 항목입니다.",
        result: null
      }, { status: 400 });
    }

    const donationIdNum = parseInt(donationId);
    if (isNaN(donationIdNum) || donationIdNum <= 0) {
      return NextResponse.json({
        isSuccess: false,
        status: "400",
        code: "INVALID_DONATION_ID",
        message: "유효한 donationId가 필요합니다.",
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
    const apiUrl = new URL(`${process.env.API_SERVER_URL}/api/donation/`);
    apiUrl.searchParams.set('donationId', donationIdNum.toString());
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
          code: "DONATION_NOT_FOUND",
          message: "존재하지 않는 후원 공고입니다.",
          result: null
        }, { status: 404 });
      }

      return NextResponse.json({
        isSuccess: false,
        status: response.status.toString(),
        code: errorData.code || 'API_ERROR',
        message: errorData.message || '후원 공고 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: DonationDetailResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Donation detail fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}