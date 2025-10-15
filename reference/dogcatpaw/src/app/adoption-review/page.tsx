"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AdoptionReviewItem {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

const mockAdoptionReviews: AdoptionReviewItem[] = [
  {
    id: 1,
    title: "새 가족을 만난 골든이",
    content: "골든이가 저희 가족이 된지 2주가 지났습니다🧡 산책과 장난감을 너무너무 좋아하고 엄마 아빠에게 꼬리를 흔들며 애교를 부리는 멋진 강아지가 되었어요. 건강한 사료로 아이에게 유산균 오메가를 등등 꾸준히 챙겨주고 있습니다!! 행복하게 건강하게 잘 키우겠습니다🧡",
    authorName: "모진영",
    authorAvatar: "모",
    image: "https://placehold.co/389x192",
    likeCount: 89,
    commentCount: 23,
    createdAt: "2025-01-10"
  },
  {
    id: 2,
    title: "지푸라기 한줄기 희망에 럭키",
    content: "럭키와 함께한 지 한 달이 되었어요. 처음엔 낯가림이 심했는데 이제는 완전히 적응해서 매일 즐겁게 지내고 있어요!",
    authorName: "모진영",
    authorAvatar: "모",
    image: "https://placehold.co/389x192",
    likeCount: 89,
    commentCount: 23,
    createdAt: "2025-01-09"
  },
  {
    id: 3,
    title: "보호소 털복숭이를 바둑이",
    content: "바둑이는 정말 특별한 아이예요. 처음 만났을 때부터 저와 눈이 마주쳤고, 지금은 우리 가족의 소중한 일원이 되었습니다.",
    authorName: "모진영",
    authorAvatar: "모",
    image: "https://placehold.co/389x192",
    likeCount: 89,
    commentCount: 23,
    createdAt: "2025-01-08"
  },
  {
    id: 4,
    title: "새 가족을 만난 골든이",
    content: "골든이와의 새로운 시작! 매일이 행복한 나날들입니다.",
    authorName: "모진영",
    authorAvatar: "모",
    image: "https://placehold.co/389x192",
    likeCount: 89,
    commentCount: 23,
    createdAt: "2025-01-07"
  },
  {
    id: 5,
    title: "지푸라기 한줄기 희망에 럭키",
    content: "럭키는 정말 사랑스러운 강아지입니다. 매일 새로운 모습을 보여줘요.",
    authorName: "모진영",
    authorAvatar: "모",
    image: "https://placehold.co/389x192",
    likeCount: 89,
    commentCount: 23,
    createdAt: "2025-01-06"
  },
  {
    id: 6,
    title: "보호소 털복숭이를 바둑이",
    content: "바둑이와 함께하는 매일이 즐겁습니다. 같이 노는 시간이 가장 행복해요.",
    authorName: "모진영",
    authorAvatar: "모",
    image: "https://placehold.co/389x192",
    likeCount: 89,
    commentCount: 23,
    createdAt: "2025-01-05"
  }
];

const AdoptionReviewCard = ({ review }: { review: AdoptionReviewItem }) => {
  const isLongContent = review.content.length > 60;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[380px] flex flex-col">
      {/* Author Section */}
      <div className="h-18 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E5E7EB] rounded-full flex items-center justify-center">
            <span className="text-[#0A0A0A] text-sm font-inter font-normal leading-5">
              {review.authorAvatar}
            </span>
          </div>
          <div className="text-[#0A0A0A] text-base font-inter font-medium leading-6">
            {review.authorName}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={review.image}
          alt={review.title}
          className="w-full h-full object-cover"
        />
        {/* Like and Comment overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-white text-sm font-inter font-normal leading-5">
              {review.likeCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-white text-sm font-inter font-normal leading-5">
              {review.commentCount}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="text-[#0A0A0A] text-base font-inter font-normal leading-6 overflow-hidden">
          {review.title}
        </h3>

        {/* Content */}
        <div className={`text-[#4A5565] text-sm font-inter font-normal leading-5 overflow-hidden ${isLongContent ? 'h-10' : 'h-5'}`}>
          {review.content}
        </div>
      </div>
    </div>
  );
};

export default function AdoptionReviewPage() {
  const [reviews, setReviews] = useState<AdoptionReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setReviews(mockAdoptionReviews);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = () => {
    console.log('검색:', searchQuery);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FAD39] mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#7FAD39] text-[30px] font-inter font-normal leading-9 tracking-[0.40px]">
            입양 후기
          </h1>
        </div>

        {/* Search/Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-md">
                <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717182]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <input
                  type="text"
                  placeholder="입양 후기 제목 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-[#F3F3F5] rounded-lg border-0 outline-none text-[#717182] text-sm font-normal"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="px-6 py-2 bg-[#86B457] text-white text-sm font-medium leading-5 hover:bg-[#7A9F4D] rounded-lg"
              >
                검색
              </Button>
            </div>
            <Button className="px-4 py-2 bg-[#86B457] text-white text-sm font-medium leading-5 hover:bg-[#7A9F4D] rounded-lg">
              글 작성
            </Button>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {reviews.map((review) => (
            <AdoptionReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Floating DID Button */}
      <div className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer hover:opacity-90 transition-opacity bg-[#7FAD39]">
        <div className="text-white text-xs font-inter font-medium leading-[15px]">
          DID
        </div>
        <div className="text-white text-xs font-inter font-medium leading-[15px]">
          발급
        </div>
      </div>
    </div>
  );
}