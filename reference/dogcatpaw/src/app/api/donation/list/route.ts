import { NextRequest, NextResponse } from 'next/server';

type DonationStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'PAUSED';

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

interface DonationListResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    donations: DonationItem[];
    nextCursor: number;
  } | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<DonationListResponse>> {
  try {
    const { searchParams } = request.nextUrl;

    // Extract query parameters
    const cursorId = searchParams.get('cursorId');
    const size = searchParams.get('size') || '9';

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
    const apiUrl = new URL(`${process.env.API_SERVER_URL}/api/donation/list`);
    apiUrl.searchParams.set('size', sizeNum.toString());

    if (cursorIdNum) {
      apiUrl.searchParams.set('cursorId', cursorIdNum.toString());
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
        message: errorData.message || '후원 목록 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: DonationListResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Donation list fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}