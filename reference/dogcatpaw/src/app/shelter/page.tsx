"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchShelterList, type ShelterItem } from '@/lib/api/shelter';

export default function ShelterPage() {
  const [shelters, setShelters] = useState<ShelterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const loadShelters = async () => {
    try {
      setLoading(true);
      const data = await fetchShelterList(
        undefined,
        10,
        selectedRegion || undefined,
        selectedDistrict || undefined,
        searchQuery || undefined
      );
      setShelters(data.shelters);
    } catch (err) {
      setError('보호소 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error loading shelters:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShelters();
  }, []);

  const handleSearch = () => {
    loadShelters();
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

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>다시 시도</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-[#7FAD39] text-[30px] font-inter font-normal leading-9 tracking-[0.40px]">
          보호소
        </h1>
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
              <option value="광산구">광산구</option>
              <option value="해운대구">해운대구</option>
              <option value="중구">중구</option>
              <option value="남동구">남동구</option>
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
              placeholder="보호소명 또는 지역 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-[#717182] text-sm font-normal"
            />
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="px-6 py-2 rounded-lg bg-[#86B457] text-white text-sm font-medium leading-5 hover:bg-[#7A9F4D]"
          >
            검색
          </Button>
        </div>
      </div>

      {/* Shelter List */}
      <div className="space-y-4">
        {shelters.map((shelter) => (
          <Card key={shelter.id} className="p-6">
            <CardContent className="p-0">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <div className="text-[#7FAD39] text-xl font-inter font-normal leading-7">
                    {shelter.name}
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#4A5565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                        {shelter.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-[#4A5565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span className="text-[#4A5565] text-sm font-inter font-normal leading-5">
                        {shelter.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#6A7282] text-sm font-inter font-normal leading-5">
                        보유 동물:
                      </span>
                      <span className="text-[#4A5565] text-sm font-inter font-medium leading-5">
                        {shelter.animalCount}마리
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-[#0A0A0A] text-sm font-inter font-medium leading-5"
                >
                  상세정보
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}