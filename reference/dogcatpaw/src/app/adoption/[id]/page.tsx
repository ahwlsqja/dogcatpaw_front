"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchAdoptionDetail } from '@/lib/api/adoption';

interface PetDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PetDetailPage({ params }: PetDetailPageProps) {
  const [petData, setPetData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPetDetail = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const data = await fetchAdoptionDetail(id);
        setPetData(data);
      } catch (err) {
        setError('입양 공고를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading pet detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPetDetail();
  }, [params]);

  const getBreedName = (breed: string) => {
    const breedMap: { [key: string]: string } = {
      'MALTESE': '말티즈',
      'GOLDEN_RETRIEVER': '골든 리트리버',
      'LABRADOR': '래브라도 리트리버',
      'POODLE': '푸들',
      'BULLDOG': '불독',
      'BEAGLE': '비글',
      'CHIHUAHUA': '치와와',
      'SHIH_TZU': '시츄',
      'YORKSHIRE_TERRIER': '요크셔 테리어',
      'DACHSHUND': '닥스훈트',
      'OTHER': '믹스견'
    };
    return breedMap[breed] || breed;
  };

  const getGenderText = (gender: string, neutered: boolean) => {
    const genderText = gender === 'MALE' ? '수컷' : '암컷';
    return neutered ? `${genderText}(중성화 완료)` : genderText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7FAD39] mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error || !petData) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>다시 시도</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-inter font-medium leading-5 text-[#0A0A0A]"
          >
            <Link href="/adoption">
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
                src={petData.images?.[0] || "https://placehold.co/576x576"}
                alt={petData.petName}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-4 left-4 px-2 py-1 rounded-lg bg-[#7FAD39] text-white text-xs font-inter font-medium leading-4">
                {petData.adoptionStatus === 'AVAILABLE' ? '입양 가능' : '입양 완료'}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {petData.images?.slice(1, 4).map((image: string, index: number) => (
                <div key={index} className={`w-32 h-32 bg-white rounded-lg overflow-hidden ${index === 0 ? 'border-2 border-[#7FAD39]' : ''}`}>
                  <img
                    src={image}
                    alt={`${petData.petName} 사진 ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {/* 빈 슬롯 채우기 */}
              {Array.from({ length: Math.max(0, 3 - (petData.images?.length - 1 || 0)) }).map((_, index) => (
                <div key={`empty-${index}`} className="w-32 h-32 bg-white rounded-lg overflow-hidden">
                  <img
                    src="https://placehold.co/125x125"
                    alt={`빈 슬롯 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Pet Details */}
          <div className="space-y-4">
            {/* Pet Information Card */}
            <Card className="p-8">
              <CardContent className="p-0">
                {/* Title */}
                <h1 className="mb-6 text-[#0A0A0A] text-[30px] font-inter font-semibold leading-9 tracking-[0.40px]">
                  {petData.title}
                </h1>

                {/* Pet Details Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      이름
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {petData.petName}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      품종
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {getBreedName(petData.breed)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      성별
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {getGenderText(petData.gender, petData.neutered)}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      몸무게
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {petData.weight || '-'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      나이
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {petData.age}살
                    </div>
                  </div>

                  <div>
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      DID
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {petData.petDid}
                    </div>
                  </div>
                </div>

                {/* Characteristics */}
                {petData.personality && (
                  <div className="mb-6">
                    <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                      특징
                    </div>
                    <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                      {petData.personality}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div>
                  <div className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                    상세 내용
                  </div>
                  <div className="text-[#0A0A0A] text-xl font-inter font-normal leading-6">
                    {petData.content}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shelter Information Card */}
            <Card className="p-4">
              <CardContent className="p-0">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[#0A0A0A] text-[22px] font-inter font-medium leading-6">
                      {petData.shelterName}
                    </div>
                    <div className="text-[#6A7282] text-sm font-inter font-normal leading-5">
                      {petData.region} {petData.district}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-[#0A0A0A] text-sm font-inter font-medium leading-5"
                  >
                    보호소 보기
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Adoption Button */}
            <Button
              className="w-full py-3 rounded-lg flex items-center justify-center space-x-2 bg-[#7FAD39] text-white text-sm font-inter font-medium leading-5 hover:bg-[#6B9B32]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>입양 문의하기</span>
            </Button>
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