"use client";

import { useState, useActionState } from 'react';
import { createAdoptionPostAction } from '@/actions/adoption';

interface AdoptionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdoptionForm({ isOpen, onClose }: AdoptionFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    petName: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    color: '',
    personality: '',
    neutered: false,
    specialNotes: '',
    region: '',
    district: '',
    shelterName: '',
    contact: '',
    deadline: ''
  });

  const [state, formAction, isPending] = useActionState(createAdoptionPostAction, null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (isPending) return;

    const formDataObj = new FormData();
    formDataObj.append('petId', '1'); // TODO: 실제 펫 ID 연결
    formDataObj.append('title', formData.title);
    formDataObj.append('content', formData.specialNotes);
    formDataObj.append('region', formData.region);
    formDataObj.append('district', formData.district);
    formDataObj.append('shelterName', formData.shelterName);
    formDataObj.append('contact', formData.contact);
    formDataObj.append('deadLine', formData.deadline);

    const result = await formAction(formDataObj);

    if (result?.isSuccess) {
      alert('입양 공고가 등록되었습니다!');
      setFormData({
        title: '', petName: '', breed: '', age: '', gender: '',
        weight: '', color: '', personality: '', neutered: false,
        specialNotes: '', region: '', district: '', shelterName: '',
        contact: '', deadline: ''
      });
      onClose();
    } else if (result) {
      alert(result.message || '입양 공고 등록에 실패했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg relative overflow-hidden w-[497px] max-h-[90vh] overflow-y-auto border border-black/10">
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-0">
          <h2 className="text-[#0A0A0A] text-2xl font-semibold leading-8 tracking-[0.07px]">
            입양 공고 작성
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-[#86B457] text-white text-sm font-medium leading-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? '등록 중...' : '등록 완료'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-[#0A0A0A] text-lg font-medium leading-7">
              기본 정보
            </h3>

            {/* 공고 제목 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                공고 제목 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="예: 사랑스러운 골든 리트리버 골든이 입양 대기중"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>

            {/* 동물 이름 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                동물 이름 *
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleInputChange}
                placeholder="예: 골든이"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>

            {/* 품종 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                품종 *
              </label>
              <div className="relative">
                <select
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border-0 outline-none appearance-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5"
                >
                  <option value="">품종 선택</option>
                  <option value="MALTESE">말티즈</option>
                  <option value="GOLDEN_RETRIEVER">골든 리트리버</option>
                  <option value="LABRADOR">래브라도 리트리버</option>
                  <option value="POODLE">푸들</option>
                  <option value="BULLDOG">불독</option>
                  <option value="BEAGLE">비글</option>
                  <option value="CHIHUAHUA">치와와</option>
                  <option value="SHIH_TZU">시츄</option>
                  <option value="YORKSHIRE_TERRIER">요크셔 테리어</option>
                  <option value="DACHSHUND">닥스훈트</option>
                  <option value="OTHER">믹스견</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 나이, 성별, 몸무게 */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                  나이 *
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="예: 2살"
                  className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                  성별 *
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border-0 outline-none appearance-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5"
                  >
                    <option value="">성별 선택</option>
                    <option value="MALE">수컷</option>
                    <option value="FEMALE">암컷</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                  몸무게
                </label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="예: 25kg"
                  className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
                />
              </div>
            </div>

            {/* 털색 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                털색
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="예: 황금색, 흰색 반점"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>

            {/* 성격/특성 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                성격/특성
              </label>
              <input
                type="text"
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                placeholder="예: 온순함, 활발함, 사람을 좋아함"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>
          </div>

          {/* 건강 정보 */}
          <div className="space-y-4">
            <h3 className="text-[#0A0A0A] text-lg font-medium leading-7">
              건강 정보
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="neutered"
                checked={formData.neutered}
                onChange={handleInputChange}
                className="w-3 h-3"
              />
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                중성화 완료
              </label>
            </div>
          </div>

          {/* 특별 사항 */}
          <div className="space-y-2">
            <label className="text-[#0A0A0A] text-sm font-medium leading-5">
              특별 사항
            </label>
            <textarea
              name="specialNotes"
              value={formData.specialNotes}
              onChange={handleInputChange}
              rows={3}
              placeholder="입양 조건, 특별한 관리가 필요한 사항 등을 작성해주세요."
              className="w-full px-3 py-2 rounded-lg border-0 outline-none resize-none bg-[#F3F3F5] text-sm font-normal leading-5"
            />
          </div>

          {/* 위치 및 보호소 정보 */}
          <div className="space-y-4">
            <h3 className="text-[#0A0A0A] text-lg font-medium leading-7">
              위치 및 보호소 정보
            </h3>

            {/* 지역 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                지역 *
              </label>
              <div className="relative">
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border-0 outline-none appearance-none pr-8 bg-[#F3F3F5] text-[#717182] text-sm font-normal leading-5"
                >
                  <option value="">지역 선택</option>
                  <option value="SEOUL">서울특별시</option>
                  <option value="BUSAN">부산광역시</option>
                  <option value="DAEGU">대구광역시</option>
                  <option value="INCHEON">인천광역시</option>
                  <option value="GWANGJU">광주광역시</option>
                  <option value="DAEJEON">대전광역시</option>
                  <option value="ULSAN">울산광역시</option>
                  <option value="SEJONG">세종특별자치시</option>
                  <option value="GYEONGGI">경기도</option>
                  <option value="GANGWON">강원도</option>
                  <option value="CHUNGBUK">충청북도</option>
                  <option value="CHUNGNAM">충청남도</option>
                  <option value="JEONBUK">전라북도</option>
                  <option value="JEONNAM">전라남도</option>
                  <option value="GYEONGBUK">경상북도</option>
                  <option value="GYEONGNAM">경상남도</option>
                  <option value="JEJU">제주특별자치도</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 opacity-50 text-[#717182]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 시/군/구 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                시/군/구 *
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="예: 서구"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>

            {/* 보호소명 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                보호소명 *
              </label>
              <input
                type="text"
                name="shelterName"
                value={formData.shelterName}
                onChange={handleInputChange}
                placeholder="예: 광주시 서구 동물보호센터"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>

            {/* 연락처 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                연락처 *
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="예: 062-350-4000"
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>

            {/* 마감일 */}
            <div className="space-y-2">
              <label className="text-[#0A0A0A] text-sm font-medium leading-5">
                마감일 *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border-0 outline-none bg-[#F3F3F5] text-sm font-normal"
              />
            </div>
          </div>

          {/* 사진 업로드 */}
          <div className="space-y-2">
            <label className="text-[#0A0A0A] text-sm font-medium leading-5">
              사진 (0/5)
            </label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center border-[#D1D5DC] min-h-[172px]">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#F3F4F6]">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-[#364153] text-base font-medium leading-6">
                    사진 추가
                  </div>
                  <div className="text-[#6A7282] text-sm font-normal leading-5">
                    최대 5장까지 업로드 가능
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}