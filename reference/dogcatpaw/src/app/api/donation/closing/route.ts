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

interface ClosingDonationResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: DonationItem[] | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<ClosingDonationResponse>> {
  try {
    // Forward request to backend API
    const response = await fetch(`${process.env.API_SERVER_URL}/api/donation/closing`, {
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
        message: errorData.message || '마감 임박 후원 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: ClosingDonationResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Closing donation fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}