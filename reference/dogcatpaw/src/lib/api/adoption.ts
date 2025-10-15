import { config } from '@/lib/config/env';

interface AdoptionItem {
  id: number;
  petName: string;
  petDid: string;
  breed: 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
  age: number;
  gender: 'MALE' | 'FEMALE';
  images: string;
  title: string;
  shelterName: string;
  region: string;
  district: string;
  adoptionStatus: 'AVAILABLE' | 'RESERVED' | 'ADOPTED' | 'EXPIRED';
  deadline: string;
}

interface AdoptionListResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    adoptions: AdoptionItem[];
    nextCursor: number;
  } | null;
}

// Mock data for development
const mockAdoptionList: AdoptionItem[] = [
  {
    id: 1,
    petName: '골든이',
    petDid: 'KR-2025-001',
    breed: 'GOLDEN_RETRIEVER',
    age: 2,
    gender: 'MALE',
    images: 'https://placehold.co/389x192',
    title: '사랑스러운 골든 리트리버 골든이 입양 대기중',
    shelterName: '서울동물보호소',
    region: '서울',
    district: '강남구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 2,
    petName: '럭키',
    petDid: 'KR-2025-002',
    breed: 'LABRADOR',
    age: 3,
    gender: 'FEMALE',
    images: 'https://placehold.co/389x192',
    title: '활발한 래브라도 리트리버 럭키와 함께 행복한 일상을',
    shelterName: '부산동물사랑센터',
    region: '부산',
    district: '해운대구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 3,
    petName: '바둑이',
    petDid: 'KR-2025-003',
    breed: 'OTHER',
    age: 1,
    gender: 'MALE',
    images: 'https://placehold.co/389x192',
    title: '귀여운 믹스견 바둑이의 새로운 가족을 찾습니다',
    shelterName: '대구유기동물보호센터',
    region: '대구',
    district: '중구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 4,
    petName: '초코',
    petDid: 'KR-2025-004',
    breed: 'BEAGLE',
    age: 2,
    gender: 'FEMALE',
    images: 'https://placehold.co/389x192',
    title: '친근한 비글 초코와 함께할 가족을 찾아요',
    shelterName: '인천동물보호센터',
    region: '인천',
    district: '남동구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 5,
    petName: '보리',
    petDid: 'KR-2025-005',
    breed: 'OTHER',
    age: 4,
    gender: 'MALE',
    images: 'https://placehold.co/389x192',
    title: '영리한 보더 콜리 보리의 새로운 시작을 도와주세요',
    shelterName: '경기도동물보호센터',
    region: '경기',
    district: '수원시',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 6,
    petName: '시바',
    petDid: 'KR-2025-006',
    breed: 'OTHER',
    age: 3,
    gender: 'MALE',
    images: 'https://placehold.co/389x192',
    title: '당당한 시바견 시바의 평생 가족을 찾습니다',
    shelterName: '울산동물보호센터',
    region: '울산',
    district: '남구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 7,
    petName: '하늘이',
    petDid: 'KR-2025-007',
    breed: 'MALTESE',
    age: 1,
    gender: 'FEMALE',
    images: 'https://placehold.co/389x192',
    title: '사랑스러운 말티즈 하늘이의 새 가족을 찾습니다',
    shelterName: '광주동물보호센터',
    region: '광주',
    district: '서구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 8,
    petName: '별이',
    petDid: 'KR-2025-008',
    breed: 'POODLE',
    age: 2,
    gender: 'MALE',
    images: 'https://placehold.co/389x192',
    title: '귀여운 푸들 별이와 함께할 따뜻한 가정을 찾아요',
    shelterName: '대전동물보호센터',
    region: '대전',
    district: '유성구',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  },
  {
    id: 9,
    petName: '구름이',
    petDid: 'KR-2025-009',
    breed: 'SHIH_TZU',
    age: 3,
    gender: 'FEMALE',
    images: 'https://placehold.co/389x192',
    title: '온순한 시츄 구름이의 평생 가족을 모집합니다',
    shelterName: '제주동물보호센터',
    region: '제주',
    district: '제주시',
    adoptionStatus: 'AVAILABLE',
    deadline: '2025-12-31'
  }
];

interface AdoptionDetailResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    id: number;
    petName: string;
    petDid: string;
    breed: 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
    age: number;
    gender: 'MALE' | 'FEMALE';
    weight?: string;
    color?: string;
    personality?: string;
    neutered: boolean;
    images: string[];
    title: string;
    content: string;
    shelterName: string;
    region: string;
    district: string;
    contact: string;
    adoptionStatus: 'AVAILABLE' | 'RESERVED' | 'ADOPTED' | 'EXPIRED';
    deadline: string;
    createdAt: string;
  } | null;
}

export async function fetchAdoptionDetail(id: number): Promise<AdoptionDetailResponse['result']> {
  // Dev 모드에서는 목 데이터 반환
  if (config.useMockData) {
    console.log('🔧 [DEV MODE] Using mock adoption detail data');
    const mockDetail = {
      id: id,
      petName: '골든이',
      petDid: 'KR-2025-001',
      breed: 'GOLDEN_RETRIEVER' as const,
      age: 2,
      gender: 'MALE' as const,
      weight: '25kg',
      color: '황금색',
      personality: '온순함, 사람을 좋아함',
      neutered: true,
      images: ['https://placehold.co/576x576', 'https://placehold.co/125x125', 'https://placehold.co/125x125', 'https://placehold.co/125x125'],
      title: '사랑스러운 골든 리트리버 골든이 입양 대기중',
      content: '골든이와 함께 행복한 가정을 꾸리실 분을 찾고 있습니다. 많은 관심과 사랑 부탁드립니다.',
      shelterName: '광주시 서구 동물보호센터',
      region: '광주',
      district: '서구',
      contact: '062-350-4000',
      adoptionStatus: 'AVAILABLE' as const,
      deadline: '2025-12-31',
      createdAt: '2025-01-01T00:00:00Z'
    };
    return mockDetail;
  }

  try {
    const response = await fetch(`/api/adoption/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AdoptionDetailResponse = await response.json();

    if (!data.isSuccess || !data.result) {
      throw new Error(data.message || 'Failed to fetch adoption detail');
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching adoption detail:', error);
    // Fallback to mock data on error
    console.log('📱 [FALLBACK] Using mock adoption detail due to API error');
    const mockDetail = {
      id: id,
      petName: '골든이',
      petDid: 'KR-2025-001',
      breed: 'GOLDEN_RETRIEVER' as const,
      age: 2,
      gender: 'MALE' as const,
      weight: '25kg',
      color: '황금색',
      personality: '온순함, 사람을 좋아함',
      neutered: true,
      images: ['https://placehold.co/576x576', 'https://placehold.co/125x125', 'https://placehold.co/125x125', 'https://placehold.co/125x125'],
      title: '사랑스러운 골든 리트리버 골든이 입양 대기중',
      content: '골든이와 함께 행복한 가정을 꾸리실 분을 찾고 있습니다. 많은 관심과 사랑 부탁드립니다.',
      shelterName: '광주시 서구 동물보호센터',
      region: '광주',
      district: '서구',
      contact: '062-350-4000',
      adoptionStatus: 'AVAILABLE' as const,
      deadline: '2025-12-31',
      createdAt: '2025-01-01T00:00:00Z'
    };
    return mockDetail;
  }
}

export async function fetchAdoptionList(cursorId?: number, size: number = 9): Promise<{ adoptions: AdoptionItem[]; nextCursor: number }> {
  // Dev 모드에서는 목 데이터 반환
  if (config.useMockData) {
    console.log('🔧 [DEV MODE] Using mock adoption list data');
    return {
      adoptions: mockAdoptionList,
      nextCursor: mockAdoptionList.length + 1
    };
  }

  try {
    const params = new URLSearchParams({
      size: size.toString()
    });

    if (cursorId) {
      params.set('cursorId', cursorId.toString());
    }

    const response = await fetch(`/api/adoption/list?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AdoptionListResponse = await response.json();

    if (!data.isSuccess || !data.result) {
      throw new Error(data.message || 'Failed to fetch adoption list');
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching adoption list:', error);
    // Fallback to mock data on error
    console.log('📱 [FALLBACK] Using mock adoption list due to API error');
    return {
      adoptions: mockAdoptionList,
      nextCursor: mockAdoptionList.length + 1
    };
  }
}