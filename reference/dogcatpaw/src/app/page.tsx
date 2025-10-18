"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchHomeData } from "@/lib/api/home";
import { useEffect, useState } from "react";

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
  breed: string;
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
  breed: string;
  petName: string;
  likeCount: number;
  liked: boolean;
  commentCount: number;
}

interface AdoptionItem {
  id: number;
  petName: string;
  petDid: string;
  breed: string;
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

// Reusable Components
const AdoptionCard = ({ adoption }: { adoption: AdoptionItem }) => (
  <Card className="shadow-sm overflow-hidden">
    <div className="h-48 bg-gray-200 relative">
      <div className="absolute top-2 left-2 bg-[#00C950] text-white px-2 py-1 rounded text-xs">
        {adoption.adoptionStatus === 'AVAILABLE' ? '입양 가능' : '입양 완료'}
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="text-base font-normal mb-2 text-[#0A0A0A]">{adoption.petName}</h3>
      <div className="space-y-1 mb-4">
        <p className="text-sm text-[#4A5565]">{adoption.breed === 'GOLDEN_RETRIEVER' ? '골든 리트리버' : adoption.breed === 'LABRADOR' ? '래브라도 리트리버' : '믹스견'}</p>
        <p className="text-sm text-[#4A5565]">DID: {adoption.petDid}</p>
        <p className="text-sm text-[#4A5565]">{adoption.shelterName}</p>
      </div>
      <Button className="w-full bg-[#7FAD39] hover:bg-[#7FAD39]/90 text-white text-sm">
        입양 문의하기
      </Button>
    </CardContent>
  </Card>
);

const DonationCard = ({ donation }: { donation: DonationItem }) => (
  <Card className="shadow-sm overflow-hidden">
    <div className="h-48 bg-gray-200 relative flex items-center justify-center">
      <div className="absolute top-2 right-2 bg-[#FB2C36] text-white px-2 py-1 rounded text-xs">
        {donation.dday}
      </div>
      <Image src="/icon.svg" alt="Pet" width={88} height={88} className="opacity-30" />
    </div>
    <CardContent className="p-4">
      <h3 className="text-base font-normal mb-2 text-[#0A0A0A]">{donation.title}</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-[#4A5565]">{(donation.currentAmount / 10000).toFixed(0)}만원</span>
          <span className="text-sm text-[#4A5565]">{donation.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-[#DC2626] h-2 rounded-full" style={{width: `${donation.progress}%`}}></div>
        </div>
        <p className="text-sm text-[#4A5565]">목표: {(donation.targetAmount / 10000).toFixed(0)}만원</p>
      </div>
      <div className="flex justify-between text-sm text-[#6A7282]">
        <span>후원자 {donation.patronCount}명</span>
        <span>지역 정보</span>
      </div>
    </CardContent>
  </Card>
);

const StoryCard = ({ story }: { story: StoryItem }) => (
  <Card className="shadow-sm overflow-hidden">
    <CardHeader className="p-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center text-sm text-[#0A0A0A]">
          {story.memberName.charAt(0)}
        </div>
        <span className="font-medium text-base text-[#0A0A0A]">{story.memberName}</span>
      </div>
    </CardHeader>
    <div className="h-48 bg-gray-200"></div>
    <CardContent className="p-4">
      <h3 className="text-base font-normal mb-2 text-[#0A0A0A]">{story.title}</h3>
      <p className="text-sm text-[#4A5565] mb-4 line-clamp-2">
        {story.content}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6A7282]">{story.petName} • {story.breed === 'GOLDEN_RETRIEVER' ? '골든 리트리버' : story.breed === 'LABRADOR' ? '래브라도 리트리버' : '믹스견'}</span>
        <div className="flex space-x-4">
          <span className="text-sm text-[#6A7282]">♡ {story.likeCount}</span>
          <span className="text-sm text-[#6A7282]">💬 {story.commentCount}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ReviewCard = ({ review }: { review: ReviewItem }) => (
  <Card className="shadow-sm overflow-hidden">
    <CardHeader className="p-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center text-sm text-[#0A0A0A]">
          {review.memberName.charAt(0)}
        </div>
        <span className="font-medium text-base text-[#0A0A0A]">{review.memberName}</span>
      </div>
    </CardHeader>
    <div className="h-48 bg-gray-200"></div>
    <CardContent className="p-4">
      <h3 className="text-base font-normal mb-2 text-[#0A0A0A]">{review.title}</h3>
      <p className="text-sm text-[#4A5565] mb-4 line-clamp-2">
        {review.content}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6A7282]">{review.petName} • {review.breed === 'GOLDEN_RETRIEVER' ? '골든 리트리버' : review.breed === 'LABRADOR' ? '래브라도 리트리버' : '믹스견'}</span>
        <div className="flex space-x-4">
          <span className="text-sm text-[#6A7282]">♡ {review.likeCount}</span>
          <span className="text-sm text-[#6A7282]">💬 {review.commentCount}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const data = await fetchHomeData();
        setHomeData(data);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FAD39] mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !homeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '데이터를 불러올 수 없습니다.'}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-20 text-center overflow-hidden" style={{background: 'linear-gradient(90deg, #F0FDF4 0%, #DCFCE7 100%)'}}>
          <h1 className="text-4xl font-normal mb-4 text-green-600" style={{color: '#7FAD39', fontSize: '36px', lineHeight: '40px', letterSpacing: '0.37px'}}>
            한 마리의 유기동물도, 반려동물도 잊히지 않도록
          </h1>
          <p className="text-lg text-gray-600 mb-8" style={{color: '#717182', fontSize: '18px', lineHeight: '28px'}}>
            DID를 통해 유기동물의 존재를 기록하고 입양과 후원을 연결하는 플랫폼
          </p>
          <Button asChild className="bg-[#7FAD39] hover:bg-[#7FAD39]/90 text-white px-8 py-3 text-sm">
            <Link href="/did">
              DID 알아보기
            </Link>
          </Button>
        </section>

        {/* Real-time Statistics */}
        <section>
          <h2 className="text-2xl font-normal mb-6 text-green-600" style={{color: '#7FAD39', fontSize: '24px', lineHeight: '32px', letterSpacing: '0.07px'}}>실시간 현황</h2>
          <div className="grid grid-cols-4 gap-6">
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-normal mb-2 text-[#7FAD39] tracking-[0.40px]">1,234</div>
                <div className="text-[#4A5565] text-base">입양 대기 중</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-normal mb-2 text-[#FF6B35] tracking-[0.40px]">89</div>
                <div className="text-[#4A5565] text-base">이번 주 입양 완료</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-normal mb-2 text-[#4ECDC4] tracking-[0.40px]">45</div>
                <div className="text-[#4A5565] text-base">마감 임박 후원</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-normal mb-2 text-[#45B7D1] tracking-[0.40px]">156</div>
                <div className="text-[#4A5565] text-base">등록된 보호소</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Adoption Listings */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-normal text-[#7FAD39] tracking-[0.07px]">입양 공고</h2>
            <Button variant="outline" className="text-[#0A0A0A] text-sm">
              더 보기 →
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {homeData.adoptionPosts.map((adoption) => (
              <AdoptionCard key={adoption.id} adoption={adoption} />
            ))}
          </div>
        </section>

        {/* Urgent Donations */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-normal text-[#7FAD39] tracking-[0.07px]">마감 임박 후원 공고</h2>
            <Button variant="outline" className="text-[#0A0A0A] text-sm">
              더 보기 →
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {homeData.closingSoonDonations.map((donation, index) => (
              <DonationCard key={index} donation={donation} />
            ))}
          </div>
        </section>

        {/* Popular Stories */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-normal text-[#7FAD39] tracking-[0.07px]">인기 스토리</h2>
            <Button variant="outline" className="text-[#0A0A0A] text-sm">
              더 보기 →
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {homeData.popularStories.map((story, index) => (
              <StoryCard key={index} story={story} />
            ))}
          </div>
        </section>

        {/* Popular Adoption Reviews */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-normal text-[#7FAD39] tracking-[0.07px]">인기 입양 후기</h2>
            <Button variant="outline" className="text-[#0A0A0A] text-sm">
              더 보기 →
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {homeData.popularReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </section>
    </div>
  );
}