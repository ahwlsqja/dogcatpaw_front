import { NextRequest, NextResponse } from 'next/server';

type Breed = 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
type Gender = 'MALE' | 'FEMALE';

interface PetInfo {
  did: string;
  petProfile: string;
  petName: string;
  old: number;
  weight: number;
  gender: Gender;
  breed: Breed;
  color: string;
  specifics: string;
  neutral: boolean;
}

interface MyPetListResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: PetInfo[] | null;
}

export async function GET(request: NextRequest): Promise<NextResponse<MyPetListResponse>> {
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
    const response = await fetch(`${process.env.API_SERVER_URL}/api/pet`, {
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
        message: errorData.message || '반려동물 목록 조회 중 오류가 발생했습니다.',
        result: null
      }, { status: response.status });
    }

    const result: MyPetListResponse = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('My pet list fetch error:', error);

    return NextResponse.json({
      isSuccess: false,
      status: "500",
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      result: null
    }, { status: 500 });
  }
}