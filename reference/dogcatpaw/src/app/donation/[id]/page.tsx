"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DonationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface DonationDetail {
  id: number;
  title: string;
  petDid: string;
  breed: string;
  purpose: string;
  deadline: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  patronCount: number;
  shelterName: string;
  region: string;
  district: string;
  images: string[];
  dday: string;
  donations: Donation[];
}

interface Donation {
  id: number;
  donorName: string;
  amount: number;
  timeAgo: string;
  avatar: string;
}

const mockDonationDetail: DonationDetail = {
  id: 1,
  title: "골든 리트리버 골든이의 긴급 수술비 후원",
  petDid: "광주-서구-2025-00302",
  breed: "골든 리트리버",
  purpose: "수술비",
  deadline: "2025-11-30",
  description: "다리 골절로 긴급 수술이 필요한 상황입니다. 수술비가 부족하여 여러분의 도움이 절실히 필요합니다. 건강하게 뛸 수 있도록 따뜻한 마음으로 도와주세요.",
  currentAmount: 450000,
  targetAmount: 800000,
  progress: 56,
  patronCount: 23,
  shelterName: "광주시 서구 동물보호센터",
  region: "광주시",
  district: "서구",
  images: [
    "https://placehold.co/576x576",
    "https://placehold.co/140x48",
    "https://placehold.co/215x48"
  ],
  dday: "D-1",
  donations: [
    { id: 1, donorName: "김민지", amount: 10000, timeAgo: "5분 전", avatar: "K" },
    { id: 2, donorName: "이준호", amount: 20000, timeAgo: "12분 전", avatar: "이" },
    { id: 3, donorName: "박서연", amount: 5000, timeAgo: "1시간 전", avatar: "박" },
    { id: 4, donorName: "최영수", amount: 30000, timeAgo: "2시간 전", avatar: "최" },
    { id: 5, donorName: "한소희", amount: 15000, timeAgo: "3시간 전", avatar: "한" }
  ]
};

export default function DonationDetailPage({ params }: DonationDetailPageProps) {
  const [donationData, setDonationData] = useState<DonationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDonationDetail = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setDonationData(mockDonationDetail);
      } catch (err) {
        setError('후원 상세 정보를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading donation detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDonationDetail();
  }, [params]);

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
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

  if (error || !donationData) {
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
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-inter font-medium leading-5 text-[#0A0A0A]"
          >
            <Link href="/donation">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로 돌아가기
            </Link>
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden">
              <img
                src={donationData.images[0]}
                alt={donationData.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 rounded-xl bg-[#FE7070] text-white text-lg font-inter font-normal leading-7 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                {donationData.dday}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {donationData.images.slice(1).map((image, index) => (
                <div key={index} className="flex-1 bg-white rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`${donationData.title} 사진 ${index + 2}`}
                    className="w-full h-12 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            {/* Detail Card */}
            <Card className="p-6">
              <CardContent className="p-0">
                {/* Title */}
                <h1 className="mb-6 text-[#0A0A0A] text-[30px] font-inter font-medium leading-9 tracking-[0.40px]">
                  {donationData.title}
                </h1>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5 mb-1">
                      DID
                    </div>
                    <div className="text-[#0A0A0A] text-base font-inter font-normal leading-6">
                      {donationData.petDid}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5 mb-1">
                      품종
                    </div>
                    <div className="text-[#0A0A0A] text-base font-inter font-normal leading-6">
                      {donationData.breed}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5 mb-1">
                      후원 목적
                    </div>
                    <span className="inline-block px-2 py-1 bg-[#86B457] text-white text-xs font-inter font-medium leading-4 rounded">
                      {donationData.purpose}
                    </span>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5 mb-1">
                      마감일
                    </div>
                    <div className="text-[#0A0A0A] text-base font-inter font-normal leading-6">
                      {donationData.deadline}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-[#7FAD39] text-xl font-inter font-normal leading-7 mb-3">
                    후원 상세 내용
                  </h3>
                  <p className="text-[#364153] text-base font-inter font-normal leading-6">
                    {donationData.description}
                  </p>
                </div>

                {/* Progress Section */}
                <div className="p-4 bg-[#F9FAFB] rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#7FAD39] text-2xl font-inter font-normal leading-8 tracking-[0.07px]">
                      {Math.floor(donationData.currentAmount / 10000)}만원
                    </span>
                    <span className="text-[#0A0A0A] text-lg font-inter font-normal leading-7">
                      {donationData.progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-[#7FAD39] rounded-full"
                      style={{ width: `${donationData.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      목표: {Math.floor(donationData.targetAmount / 10000)}만원
                    </span>
                    <span className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      후원자 {donationData.patronCount}명
                    </span>
                  </div>
                </div>

                {/* Shelter Info */}
                <div className="p-4 border border-gray-200 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[#0A0A0A] text-xl font-inter font-medium leading-6">
                        {donationData.shelterName}
                      </div>
                      <div className="text-[#6A7282] text-sm font-inter font-normal leading-5">
                        {donationData.region} {donationData.district}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-[#0A0A0A] text-sm font-inter font-medium leading-5"
                    >
                      보호소 보기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Button */}
            <Button className="w-full py-6 rounded-lg bg-[#7FAD39] text-white text-sm font-inter font-medium leading-5 hover:bg-[#6B9B32]">
              후원하기
            </Button>
          </div>
        </div>

        {/* Donors List */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[#7FAD39] text-xl font-inter font-normal leading-7 mb-6">
            후원해주신 분들
          </h3>
          <div className="space-y-4">
            {donationData.donations.map((donation) => (
              <div key={donation.id} className="flex justify-between items-center p-3 bg-[#F9FAFB] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D1D5DC] rounded-full flex items-center justify-center">
                    <span className="text-[#0A0A0A] text-sm font-inter font-normal leading-5">
                      {donation.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="text-[#0A0A0A] text-base font-inter font-medium leading-6">
                      {donation.donorName}
                    </div>
                    <div className="text-[#6A7282] text-sm font-inter font-normal leading-5">
                      {donation.timeAgo}
                    </div>
                  </div>
                </div>
                <div className="text-[#7FAD39] text-base font-inter font-medium leading-6">
                  {formatAmount(donation.amount)}원
                </div>
              </div>
            ))}
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