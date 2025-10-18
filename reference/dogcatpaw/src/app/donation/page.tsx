"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';

interface DonationItem {
  id: number;
  title: string;
  thumbnail: string;
  currentAmount: number;
  targetAmount: number;
  donationStatus: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
  patronCount: number;
  progress: number;
  dday: string;
  region: string;
  district: string;
}

const mockDonations: DonationItem[] = [
  {
    id: 1,
    title: "골든이의 수술비 후원",
    thumbnail: "https://placehold.co/389x192",
    currentAmount: 450000,
    targetAmount: 800000,
    donationStatus: 'ACTIVE',
    patronCount: 23,
    progress: 56,
    dday: 'D-1',
    region: '서울시',
    district: '강남구'
  },
  {
    id: 2,
    title: "럭키의 치료비 지원",
    thumbnail: "https://placehold.co/389x192",
    currentAmount: 320000,
    targetAmount: 600000,
    donationStatus: 'ACTIVE',
    patronCount: 18,
    progress: 53,
    dday: 'D-1',
    region: '부산시',
    district: '해운대구'
  },
  {
    id: 3,
    title: "믹스견 바둑이 응급치료",
    thumbnail: "https://placehold.co/389x192",
    currentAmount: 180000,
    targetAmount: 400000,
    donationStatus: 'ACTIVE',
    patronCount: 12,
    progress: 45,
    dday: 'D-1',
    region: '대구시',
    district: '중구'
  },
  {
    id: 4,
    title: "골든이의 재활치료비",
    thumbnail: "https://placehold.co/389x192",
    currentAmount: 220000,
    targetAmount: 500000,
    donationStatus: 'ACTIVE',
    patronCount: 15,
    progress: 44,
    dday: 'D-10',
    region: '광주시',
    district: '서구'
  },
  {
    id: 5,
    title: "보호소 운영비 후원",
    thumbnail: "https://placehold.co/389x192",
    currentAmount: 890000,
    targetAmount: 1200000,
    donationStatus: 'ACTIVE',
    patronCount: 45,
    progress: 74,
    dday: 'D-12',
    region: '인천시',
    district: '남동구'
  },
  {
    id: 6,
    title: "구조견들의 예방접종비",
    thumbnail: "https://placehold.co/389x192",
    currentAmount: 150000,
    targetAmount: 350000,
    donationStatus: 'ACTIVE',
    patronCount: 9,
    progress: 43,
    dday: 'D-8',
    region: '울산시',
    district: '남구'
  }
];

const DonationCard = ({ donation }: { donation: DonationItem }) => {
  const getDdayStyle = (dday: string) => {
    const dayNumber = parseInt(dday.replace('D-', ''));
    return dayNumber <= 3 ? 'bg-[#FB2C36]' : 'bg-[#FB2C36]';
  };

  const getProgressBarColor = (progress: number) => {
    return progress >= 70 ? 'bg-[#7FAD39]' : 'bg-[#DC2626]';
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={donation.thumbnail}
          alt={donation.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs text-white font-inter font-normal leading-4 ${getDdayStyle(donation.dday)}`}>
          {donation.dday}
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-4 px-4 pb-4">
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-[#0A0A0A] text-base font-inter font-normal leading-6 overflow-hidden">
            {donation.title}
          </h3>
        </div>

        {/* Progress Section */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[#4A5565] text-sm font-inter font-normal leading-5">
              {formatAmount(donation.currentAmount)}원
            </span>
            <span className="text-[#4A5565] text-sm font-inter font-normal leading-5">
              {donation.progress}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden mb-1">
            <div
              className={`h-full rounded-full ${getProgressBarColor(donation.progress)}`}
              style={{ width: `${donation.progress}%` }}
            />
          </div>

          <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
            목표: {formatAmount(donation.targetAmount)}원
          </div>
        </div>

        {/* Bottom Info */}
        <div className="flex justify-between items-center">
          <span className="text-[#6A7282] text-sm font-inter font-normal leading-5">
            후원자 {donation.patronCount}명
          </span>
          <span className="text-[#6A7282] text-sm font-inter font-normal leading-5">
            {donation.region} {donation.district}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function DonationPage() {
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDonations(mockDonations);
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
            곧 마감되는 후원 공고
          </h1>
          <Button className="flex items-center px-3 py-2 rounded-lg bg-[#7FAD39] text-white text-sm font-inter font-medium leading-5 hover:bg-[#6B9B32]">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            글 작성
          </Button>
        </div>

        {/* Search/Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center space-x-4">
            {/* Region Select */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none px-3 py-2 rounded-lg border-0 outline-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5 w-32"
              >
                <option value="">광역시/도</option>
                <option value="서울">서울특별시</option>
                <option value="부산">부산광역시</option>
                <option value="대구">대구광역시</option>
                <option value="인천">인천광역시</option>
                <option value="광주">광주광역시</option>
                <option value="대전">대전광역시</option>
                <option value="울산">울산광역시</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>

            {/* District Select */}
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="appearance-none px-3 py-2 rounded-lg border-0 outline-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5 w-32"
              >
                <option value="">시/군/구</option>
                <option value="강남구">강남구</option>
                <option value="서구">서구</option>
                <option value="해운대구">해운대구</option>
                <option value="중구">중구</option>
                <option value="남동구">남동구</option>
                <option value="남구">남구</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>

            {/* Breed Select */}
            <div className="relative">
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="appearance-none px-3 py-2 rounded-lg border-0 outline-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5 w-32"
              >
                <option value="">품종 선택</option>
                <option value="골든리트리버">골든리트리버</option>
                <option value="래브라도">래브라도</option>
                <option value="믹스견">믹스견</option>
                <option value="말티즈">말티즈</option>
                <option value="푸들">푸들</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="검색어 입력"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-[#717182] text-sm font-normal"
              />
            </div>

            {/* Search Button */}
            <Button className="px-6 py-2 rounded-lg bg-[#86B457] text-white text-sm font-medium leading-5 hover:bg-[#7A9F4D]">
              검색
            </Button>
          </div>
        </div>

        {/* Donation Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      </div>
    </div>
  );
}