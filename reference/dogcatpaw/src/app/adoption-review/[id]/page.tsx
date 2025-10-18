"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface AdoptionReviewDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface AdoptionReviewDetail {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  images: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  petInfo: {
    title: string;
    breed: string;
    did: string;
    shelter: string;
    registrationDate: string;
  };
  comments: Comment[];
}

interface Comment {
  id: number;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  isAuthor: boolean;
}

const mockReviewDetail: AdoptionReviewDetail = {
  id: 1,
  title: "새 가족을 만난 골든이",
  content: "골든이가 저희 가족이 된지 2주가 지났습니다🧡 산책과 장난감을 너무너무 좋아하고 엄마 아빠에게 꼬리를 흔들며 애교를 부리는 멋진 강아지가 되었어요. 건강한 사료로 아이에게 유산균 오메가를 등등 꾸준히 챙겨주고 있습니다!! 행복하게 건강하게 잘 키우겠습니다🧡",
  authorName: "모진영",
  authorAvatar: "모",
  images: [
    "https://placehold.co/405x316",
    "https://placehold.co/405x316",
    "https://placehold.co/405x316",
    "https://placehold.co/405x316",
    "https://placehold.co/405x316"
  ],
  likeCount: 89,
  commentCount: 2,
  createdAt: "2025-10-01",
  petInfo: {
    title: "새 가족을 찾아주세요 - 골든이",
    breed: "골든 리트리버",
    did: "DID:PET:2025:KR:331",
    shelter: "경기도 안양군 서울신촌 보호소",
    registrationDate: "2025.08.20"
  },
  comments: [
    {
      id: 1,
      authorName: "나이링",
      authorAvatar: "나",
      content: "1년이나 응원 책임감나니 나가지 행복해보서 저도 기뻐요💕",
      createdAt: "2024-01-14",
      isAuthor: false
    },
    {
      id: 2,
      authorName: "이지인",
      authorAvatar: "이",
      content: "네, 정말 감사해요! 골든이가 덕분에 행복해졌어요 좋겠어요😊",
      createdAt: "2024-01-14",
      isAuthor: true
    }
  ]
};

export default function AdoptionReviewDetailPage({ params }: AdoptionReviewDetailPageProps) {
  const [reviewData, setReviewData] = useState<AdoptionReviewDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadReviewDetail = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setReviewData(mockReviewDetail);
      } catch (err) {
        setError('입양후기를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading review detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReviewDetail();
  }, [params]);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log('댓글 작성:', commentText);
      setCommentText('');
    }
  };

  const nextImage = () => {
    if (reviewData) {
      setCurrentImageIndex((prev) => (prev + 1) % reviewData.images.length);
    }
  };

  const prevImage = () => {
    if (reviewData) {
      setCurrentImageIndex((prev) => (prev - 1 + reviewData.images.length) % reviewData.images.length);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FAD39] mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !reviewData) {
    return (
      <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="max-w-[1216px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#7FAD39] text-[30px] font-inter font-normal leading-9 tracking-[0.40px]">
            입양 후기
          </h1>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-inter font-medium leading-5 text-[#0A0A0A]"
          >
            <Link href="/adoption-review">
              ← 목록으로 돌아가기
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="flex">
            {/* Left Image Section */}
            <div className="w-[405px] h-[384px] flex flex-col">
              <div className="flex-1 relative">
                <img
                  src={reviewData.images[currentImageIndex]}
                  alt={`${reviewData.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Navigation arrows */}
                {reviewData.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Image Counter */}
              <div className="h-7 bg-[#F9FAFB] flex items-center justify-center">
                <span className="text-[#717182] text-sm font-inter font-normal leading-5">
                  {currentImageIndex + 1} / {reviewData.images.length}
                </span>
              </div>

              {/* Like and Comment Section */}
              <div className="h-10 px-4 flex items-center justify-end gap-4">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#717182]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-[#717182] text-base font-inter font-normal leading-6">
                    {reviewData.likeCount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#717182]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[#717182] text-base font-inter font-normal leading-6">
                    {reviewData.commentCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="flex-1 p-6 flex flex-col gap-4">
              {/* Date */}
              <div className="text-[#717182] text-sm font-inter font-normal leading-5">
                {reviewData.createdAt}
              </div>

              {/* Title */}
              <h1 className="text-[#0A0A0A] text-xl font-inter font-normal leading-7">
                {reviewData.title}
              </h1>

              {/* Content */}
              <div className="flex-1">
                <p className="text-[#717182] text-base font-inter font-normal leading-6">
                  {reviewData.content}
                </p>
              </div>

              {/* Pet Info Card */}
              <div className="p-4 bg-[#ECECF0] rounded-lg">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E5E7EB] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0A0A0A] text-xs font-inter font-normal leading-4">
                      개
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-black text-base font-inter font-medium leading-6">
                      {reviewData.petInfo.title}
                    </div>
                    <div className="text-[#717182] text-base font-inter font-normal leading-6">
                      품종: {reviewData.petInfo.breed}
                    </div>
                    <div className="text-[#717182] text-base font-inter font-normal leading-6">
                      DID: {reviewData.petInfo.did}
                    </div>
                    <div className="text-[#717182] text-base font-inter font-normal leading-6">
                      보호소: {reviewData.petInfo.shelter}
                    </div>
                    <div className="text-[#717182] text-base font-inter font-normal leading-6">
                      등록일자: {reviewData.petInfo.registrationDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <span className="text-[#0A0A0A] text-base font-inter font-normal leading-6">
              댓글 {reviewData.commentCount}
            </span>
          </div>

          {/* Comments List */}
          <div className="space-y-4 mb-4">
            {reviewData.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0A0A0A] text-xs font-inter font-normal leading-4">
                    {comment.authorAvatar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#0A0A0A] text-sm font-inter font-normal leading-5">
                      {comment.authorName}
                    </span>
                    {comment.isAuthor && (
                      <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#016630] text-xs font-inter font-normal leading-4 rounded">
                        작성자
                      </span>
                    )}
                    <span className="text-[#717182] text-xs font-inter font-normal leading-4">
                      {comment.createdAt}
                    </span>
                  </div>
                  <div className="text-[#0A0A0A] text-sm font-inter font-normal leading-5">
                    {comment.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A0A0A] text-xs font-inter font-normal leading-4">
                  나
                </span>
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#F3F3F5] rounded-lg border-0 outline-none text-[#717182] text-sm font-inter font-normal"
                />
                <Button
                  onClick={handleCommentSubmit}
                  className="px-3 py-2 bg-[#7FAD39] text-white text-sm font-inter font-medium leading-5 hover:bg-[#6B9B32] rounded-lg"
                >
                  댓글 작성
                </Button>
              </div>
            </div>
          </div>
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