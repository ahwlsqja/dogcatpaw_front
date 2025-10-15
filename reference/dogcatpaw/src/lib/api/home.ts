import { config } from '@/lib/config/env';
import {
  mockAdoptionPosts,
  mockClosingSoonDonations,
  mockPopularReviews,
  mockPopularStories
} from '@/lib/mock/data';

interface DonationItem {
  thumbnail: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  donationStatus: 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'PAUSED';
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
  breed: 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
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
  breed: 'MALTESE' | 'GOLDEN_RETRIEVER' | 'LABRADOR' | 'POODLE' | 'BULLDOG' | 'BEAGLE' | 'CHIHUAHUA' | 'SHIH_TZU' | 'YORKSHIRE_TERRIER' | 'DACHSHUND' | 'OTHER';
  petName: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
}

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

interface HomeData {
  adoptionPosts: AdoptionItem[];
  closingSoonDonations: DonationItem[];
  popularReviews: ReviewItem[];
  popularStories: StoryItem[];
}

interface ApiResponse<T> {
  isSuccess: boolean;
  status: string;
  code: string;
  message: string;
  result: T | null;
}

async function fetchAdoptionList(): Promise<AdoptionItem[]> {
  // Dev 모드에서는 목 데이터 반환
  if (config.useMockData) {
    console.log('🔧 [DEV MODE] Using mock adoption data');
    return mockAdoptionPosts;
  }

  try {
    const response = await fetch('/api/adoption/list?size=3', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<{ adoptions: AdoptionItem[]; nextCursor: number }> = await response.json();

    if (!data.isSuccess || !data.result) {
      throw new Error(data.message || 'Failed to fetch adoption data');
    }

    return data.result.adoptions;
  } catch (error) {
    console.error('Error fetching adoption data:', error);
    // Fallback to mock data on error
    console.log('📱 [FALLBACK] Using mock adoption data due to API error');
    return mockAdoptionPosts;
  }
}

export async function fetchHomeData(): Promise<HomeData> {
  // Dev 모드에서는 목 데이터 반환
  if (config.useMockData) {
    console.log('🔧 [DEV MODE] Using all mock data for home page');
    return {
      adoptionPosts: mockAdoptionPosts,
      closingSoonDonations: mockClosingSoonDonations,
      popularReviews: mockPopularReviews,
      popularStories: mockPopularStories
    };
  }

  try {
    // Fetch multiple APIs in parallel
    const [adoptionResponse, homeResponse] = await Promise.all([
      fetchAdoptionList(),
      fetch('/api/adoption/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ]);

    if (!homeResponse.ok) {
      throw new Error(`HTTP error! status: ${homeResponse.status}`);
    }

    const homeData: ApiResponse<Omit<HomeData, 'adoptionPosts'>> = await homeResponse.json();

    if (!homeData.isSuccess || !homeData.result) {
      throw new Error(homeData.message || 'Failed to fetch home data');
    }

    return {
      adoptionPosts: adoptionResponse,
      ...homeData.result
    };
  } catch (error) {
    console.error('Error fetching home data:', error);

    // Fallback to mock data on error
    console.log('📱 [FALLBACK] Using all mock data due to API error');
    return {
      adoptionPosts: mockAdoptionPosts,
      closingSoonDonations: mockClosingSoonDonations,
      popularReviews: mockPopularReviews,
      popularStories: mockPopularStories
    };
  }
}