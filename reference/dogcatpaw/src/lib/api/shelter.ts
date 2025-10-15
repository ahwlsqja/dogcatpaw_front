import { config } from '@/lib/config/env';

export interface ShelterItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  animalCount: number;
  region: string;
  district: string;
}

interface ShelterListResponse {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: {
    shelters: ShelterItem[];
    nextCursor: number;
  } | null;
}

// Mock data for development
const mockShelters: ShelterItem[] = [
  {
    id: 1,
    name: "광주시 서구 동물보호센터",
    address: "광주시 서구 치평동 1234-56",
    phone: "062-123-4567",
    animalCount: 89,
    region: "광주",
    district: "서구"
  },
  {
    id: 2,
    name: "광주시 광산구 동물보호센터",
    address: "광주시 광산구 월계동 5678-90",
    phone: "062-987-6543",
    animalCount: 67,
    region: "광주",
    district: "광산구"
  },
  {
    id: 3,
    name: "서울시 강남구 동물보호센터",
    address: "서울시 강남구 논현동 123-45",
    phone: "02-123-4567",
    animalCount: 145,
    region: "서울",
    district: "강남구"
  },
  {
    id: 4,
    name: "부산시 해운대구 동물보호센터",
    address: "부산시 해운대구 우동 789-12",
    phone: "051-456-7890",
    animalCount: 92,
    region: "부산",
    district: "해운대구"
  },
  {
    id: 5,
    name: "대구시 중구 동물보호센터",
    address: "대구시 중구 동인동 345-67",
    phone: "053-789-0123",
    animalCount: 78,
    region: "대구",
    district: "중구"
  },
  {
    id: 6,
    name: "인천시 남동구 동물보호센터",
    address: "인천시 남동구 구월동 456-78",
    phone: "032-234-5678",
    animalCount: 45,
    region: "인천",
    district: "남동구"
  }
];

export async function fetchShelterList(
  cursorId?: number,
  size: number = 10,
  region?: string,
  district?: string,
  search?: string
): Promise<{ shelters: ShelterItem[]; nextCursor: number }> {
  // Dev 모드에서는 목 데이터 반환
  if (config.useMockData) {
    console.log('🔧 [DEV MODE] Using mock shelter list data');

    let filteredShelters = [...mockShelters];

    // 필터링 적용
    if (region) {
      filteredShelters = filteredShelters.filter(shelter => shelter.region === region);
    }

    if (district) {
      filteredShelters = filteredShelters.filter(shelter => shelter.district === district);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredShelters = filteredShelters.filter(shelter =>
        shelter.name.toLowerCase().includes(searchLower) ||
        shelter.address.toLowerCase().includes(searchLower)
      );
    }

    return {
      shelters: filteredShelters,
      nextCursor: filteredShelters.length + 1
    };
  }

  try {
    const params = new URLSearchParams({
      size: size.toString()
    });

    if (cursorId) {
      params.set('cursorId', cursorId.toString());
    }

    if (region) {
      params.set('region', region);
    }

    if (district) {
      params.set('district', district);
    }

    if (search) {
      params.set('search', search);
    }

    const response = await fetch(`/api/shelter/list?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ShelterListResponse = await response.json();

    if (!data.isSuccess || !data.result) {
      throw new Error(data.message || 'Failed to fetch shelter list');
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching shelter list:', error);
    // Fallback to mock data on error
    console.log('📱 [FALLBACK] Using mock shelter list due to API error');

    let filteredShelters = [...mockShelters];

    // 필터링 적용
    if (region) {
      filteredShelters = filteredShelters.filter(shelter => shelter.region === region);
    }

    if (district) {
      filteredShelters = filteredShelters.filter(shelter => shelter.district === district);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredShelters = filteredShelters.filter(shelter =>
        shelter.name.toLowerCase().includes(searchLower) ||
        shelter.address.toLowerCase().includes(searchLower)
      );
    }

    return {
      shelters: filteredShelters,
      nextCursor: filteredShelters.length + 1
    };
  }
}