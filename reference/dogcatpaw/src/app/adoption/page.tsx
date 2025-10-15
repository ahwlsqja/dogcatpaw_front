"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { fetchAdoptionList } from '@/lib/api/adoption';
import AdoptionForm from '@/components/AdoptionForm';

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

// Reusable Pet Card Component
const PetCard = ({ pet }: { pet: AdoptionItem }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={pet.images}
          alt={pet.petName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs bg-[#00C950] text-white font-normal leading-4">
          {pet.adoptionStatus === 'AVAILABLE' ? '입양 가능' : '입양 완료'}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-[#0A0A0A] text-base font-normal leading-6">
          {pet.petName}
        </h3>
        <div className="space-y-1">
          <p className="text-[#4A5565] text-sm font-normal leading-5">
            {getBreedName(pet.breed)}
          </p>
          <p className="text-[#4A5565] text-sm font-normal leading-5">
            DID: {pet.petDid}
          </p>
          <p className="text-[#4A5565] text-sm font-normal leading-5">
            {pet.shelterName}
          </p>
        </div>
        <Link
          href={`/adoption/${pet.id}`}
          className="block w-full py-2 rounded-lg text-center bg-[#7FAD39] text-white text-sm font-medium leading-5"
        >
          입양 문의하기
        </Link>
      </div>
    </div>
  );
};

export default function AdoptionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adoptionList, setAdoptionList] = useState<AdoptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdoptionList = async () => {
      try {
        setLoading(true);
        const data = await fetchAdoptionList();
        setAdoptionList(data.adoptions);
      } catch (err) {
        setError('입양 공고를 불러오는 중 오류가 발생했습니다.');
        console.error('Error loading adoption list:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAdoptionList();
  }, []);

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

  if (error) {
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
    <div className="bg-[#F9FAFB] min-h-screen">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-[#7FAD39] text-[30px] font-normal leading-9 tracking-[0.40px]">
            입양 공고
          </h1>
        </div>

        {/* Write Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-3 py-2 rounded-lg bg-[#7FAD39] text-white text-sm font-medium leading-5"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            글 작성
          </button>
        </div>

        {/* Search/Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center space-x-4">
            {/* Region Select */}
            <div className="relative">
              <select
                className="appearance-none px-3 py-2 rounded-lg border-0 outline-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5 w-32"
              >
                <option>광역시/도</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>

            {/* City Select */}
            <div className="relative">
              <select
                className="appearance-none px-3 py-2 rounded-lg border-0 outline-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5 w-32"
              >
                <option>시/군/구</option>
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
                className="appearance-none px-3 py-2 rounded-lg border-0 outline-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5 w-32"
              >
                <option>품종 선택</option>
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
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-[#717182] text-sm font-normal"
              />
            </div>

            {/* Search Button */}
            <button
              className="px-6 py-2 rounded-lg bg-[#86B457] text-white text-sm font-medium leading-5"
            >
              검색
            </button>
          </div>
        </div>

        {/* Pet Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {adoptionList.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>

      {/* Adoption Form Modal */}
      <AdoptionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}