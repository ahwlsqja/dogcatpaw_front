"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface StoryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface StoryDetail {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  petName: string;
  breed: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
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

const mockStoryDetail: StoryDetail = {
  id: 1,
  title: "지푸라기 한줄기 희망에 럭키",
  content: `럭키를 입양한 지 벌써 한 달이 되었어요. 처음에는 새로운 환경에 적응하느라 조금 힘들어했지만, 이제는 완전히 우리 가족이 되었답니다.

첫 주에는 정말 조심스러웠어요. 골든이가 스트레스받지 않도록 조용한 환경을 만들어주려고 노력했습니다. 처음 며칠은 밥도 잘 안 먹고 구석에만 있어서 정말 걱정이 많았어요.

하지만 시간이 지나면서 점점 활발해지기 시작했습니다. 이제는 매일 아침 저를 깨우러 와서 산책을 재촉하고, 밥 시간만 되면 꼬리를 흔들며 기다린답니다.

가장 감동적이었던 건 어느 날 제가 슬퍼하고 있을 때 골든이가 다가와서 제 곁에 가만히 앉아있어 준 거예요. 정말 제 마음을 알아주는 것 같았어요.

지금은 매일이 너무 행복합니다. 골든이가 있어서 집이 더욱 따뜻해진 느낌이에요. 입양을 고민하고 계신 분들께 꼭 추천하고 싶어요!`,
  authorName: "모진영",
  authorAvatar: "모",
  petName: "럭키",
  breed: "골든 리트리버",
  image: "https://placehold.co/486x780",
  likeCount: 89,
  commentCount: 2,
  createdAt: "2025-09-28",
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

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const [storyData, setStoryData] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const loadStoryDetail = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setStoryData(mockStoryDetail);
      } catch (err) {
        setError('스토리를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading story detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStoryDetail();
  }, [params]);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log('댓글 작성:', commentText);
      setCommentText('');
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

  if (error || !storyData) {
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
        {/* Back Button */}
        <div className="mb-6">
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-inter font-medium leading-5 text-[#0A0A0A]"
          >
            <Link href="/story">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로 돌아가기
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="flex">
            {/* Left Image Section */}
            <div className="relative w-[486px] h-[780px]">
              <img
                src={storyData.image}
                alt={storyData.title}
                className="w-full h-full object-cover"
              />
              {/* Like and Comment overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.67} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-white text-base font-inter font-normal leading-6">
                    {storyData.likeCount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.67} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-white text-base font-inter font-normal leading-6">
                    {storyData.commentCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="flex-1 p-8 flex flex-col">
              {/* Author Info */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                    <span className="text-[#0A0A0A] text-lg font-inter font-normal leading-7">
                      {storyData.authorAvatar}
                    </span>
                  </div>
                  <div className="text-[#0A0A0A] text-base font-inter font-medium leading-6">
                    {storyData.authorName}
                  </div>
                </div>
                <div className="text-[#6A7282] text-sm font-inter font-normal leading-5">
                  {storyData.createdAt}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[#0A0A0A] text-2xl font-inter font-normal leading-8 tracking-[0.07px] mb-6">
                {storyData.title}
              </h1>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="text-[#364153] text-base font-inter font-normal leading-[26px] whitespace-pre-line">
                  {storyData.content}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <span className="text-[#0A0A0A] text-base font-inter font-normal leading-6">
              댓글 {storyData.commentCount}
            </span>
          </div>

          {/* Comments List */}
          <div className="space-y-4 mb-4">
            {storyData.comments.map((comment) => (
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
                    <span className="text-[#6A7282] text-xs font-inter font-normal leading-4">
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