"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface StoryItem {
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
}

const mockStories: StoryItem[] = [
  {
    id: 1,
    title: "골든이와 함께한 첫 산책",
    content: "오늘 골든이와 처음으로 공원에 산책을 갔어요. 처음에는 무서워했지만 금세 적응하고 즐겁게 뛰어다녔어요. 정말 행복한 하루였습니다.",
    authorName: "김민지",
    authorAvatar: "김",
    petName: "골든이",
    breed: "골든 리트리버",
    image: "https://placehold.co/389x192",
    likeCount: 24,
    commentCount: 8,
    createdAt: "2시간 전"
  },
  {
    id: 2,
    title: "럭키의 새로운 장난감",
    content: "럭키가 새로운 공을 정말 좋아해요! 하루 종일 물고 다니면서 놀고 있어요. 이렇게 행복한 모습을 보니 저도 기뻐요.",
    authorName: "이준호",
    authorAvatar: "이",
    petName: "럭키",
    breed: "래브라도",
    image: "https://placehold.co/389x192",
    likeCount: 18,
    commentCount: 5,
    createdAt: "4시간 전"
  },
  {
    id: 3,
    title: "바둑이의 첫 목욕",
    content: "바둑이를 처음 목욕시켰어요. 물을 무서워할 줄 알았는데 생각보다 순순히 잘 받아주었어요. 깨끗해진 모습이 너무 귀여워요.",
    authorName: "박서연",
    authorAvatar: "박",
    petName: "바둑이",
    breed: "믹스견",
    image: "https://placehold.co/389x192",
    likeCount: 32,
    commentCount: 12,
    createdAt: "6시간 전"
  },
  {
    id: 4,
    title: "초코의 건강검진 후기",
    content: "초코 건강검진을 받고 왔어요. 다행히 모든 수치가 정상이고 건강하다고 하네요. 앞으로도 건강하게 자라길 바라요.",
    authorName: "최영수",
    authorAvatar: "최",
    petName: "초코",
    breed: "푸들",
    image: "https://placehold.co/389x192",
    likeCount: 15,
    commentCount: 3,
    createdAt: "8시간 전"
  },
  {
    id: 5,
    title: "코코와의 즐거운 놀이시간",
    content: "코코와 함께 원반던지기 놀이를 했어요. 정말 빠르게 달려서 원반을 물어와주는 모습이 인상적이었어요.",
    authorName: "한소희",
    authorAvatar: "한",
    petName: "코코",
    breed: "보더콜리",
    image: "https://placehold.co/389x192",
    likeCount: 27,
    commentCount: 9,
    createdAt: "10시간 전"
  },
  {
    id: 6,
    title: "멍멍이의 생일파티",
    content: "멍멍이 2살 생일을 축하해주었어요. 강아지용 케이크도 준비하고 친구들도 초대해서 즐거운 시간을 보냈어요.",
    authorName: "정다은",
    authorAvatar: "정",
    petName: "멍멍이",
    breed: "말티즈",
    image: "https://placehold.co/389x192",
    likeCount: 45,
    commentCount: 16,
    createdAt: "12시간 전"
  }
];

const StoryCard = ({ story }: { story: StoryItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Author Section */}
      <div className="p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#D1D5DC] rounded-full flex items-center justify-center">
            <span className="text-[#0A0A0A] text-sm font-inter font-normal leading-5">
              {story.authorAvatar}
            </span>
          </div>
          <div>
            <div className="text-[#0A0A0A] text-base font-inter font-medium leading-6">
              {story.authorName}
            </div>
            <div className="text-[#6A7282] text-sm font-inter font-normal leading-5">
              {story.createdAt}
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="px-4 pb-3">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="px-4 pb-4">
        {/* Title */}
        <h3 className="text-[#0A0A0A] text-base font-inter font-medium leading-6 mb-2">
          {story.title}
        </h3>

        {/* Content */}
        <p className="text-[#4A5565] text-sm font-inter font-normal leading-5 mb-3 line-clamp-2">
          {story.content}
        </p>

        {/* Pet Info */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-[#7FAD39] text-sm font-inter font-medium leading-5">
            {story.petName}
          </span>
          <span className="text-[#6A7282] text-sm font-inter font-normal leading-5">
            {story.breed}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-[#6A7282]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-[#6A7282] text-sm font-inter font-normal leading-5">
              {story.likeCount}
            </span>
          </button>
          <button className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-[#6A7282]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-[#6A7282] text-sm font-inter font-normal leading-5">
              {story.commentCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function StoryPage() {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setStories(mockStories);
      setLoading(false);
    }, 500);
  }, []);

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#7FAD39] text-[30px] font-inter font-normal leading-9 tracking-[0.40px]">
            스토리
          </h1>
          <Button className="flex items-center px-3 py-2 rounded-lg bg-[#7FAD39] text-white text-sm font-inter font-medium leading-5 hover:bg-[#6B9B32]">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            글 작성
          </Button>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="스토리 제목 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-[#717182] text-sm font-normal"
              />
            </div>
            <Button className="px-6 py-2 rounded-lg bg-[#86B457] text-white text-sm font-medium leading-5 hover:bg-[#7A9F4D]">
              검색
            </Button>
          </div>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}