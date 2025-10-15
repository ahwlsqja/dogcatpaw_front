"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DIDPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="absolute left-0 top-8 z-10">
        <Button asChild variant="outline" className="text-[#0A0A0A] text-sm w-[146.45px] h-9">
          <Link href="/">
            <svg
              className="w-4 h-4 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pt-[92px]">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <h1
            className="text-center text-[#7FAD39] text-4xl font-normal leading-10 tracking-[0.37px]"
          >
            펫 DID란?
          </h1>
          <div className="text-center">
            <div
              className="text-[#4A5565] text-xl font-normal leading-7"
            >
              유기동물도 고유한 신원을 가질 수 있도록 블록체인 상에 안전하게 기록하고,
            </div>
            <div
              className="text-[#4A5565] text-xl font-normal leading-7"
            >
              입양-후원 과정에서도 동일 개체임을 투명하게 증명하는 디지털 신원 증명
            </div>
          </div>
        </div>

        {/* Animal Registration Info Section */}
        <Card className="mb-8 bg-[#EFF6FF] border-0">
          <CardContent className="p-8 space-y-6">
          <h2
            className="text-[#7FAD39] text-2xl font-normal leading-8 tracking-[0.07px]"
          >
            🐾 동물등록정보에 대해 알고 계신가요?
          </h2>

          <div className="space-y-6">
            <p
              className="text-[#364153] text-base font-normal leading-[26px]"
            >
              현재 반려견은 동물등록제를 통해 관리됩니다.
            </p>

            <div>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                보호자가 주민등록번호, 전화번호, 주소를 입력하면 동물등록번호가 발급되며,
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                등록 대상은 가정이나 반려 목적으로 기르는 2개월 이상 개에 한정됩니다.
              </p>
            </div>

            <p
              className="text-[#364153] text-base font-normal leading-[26px]"
            >
              또한, 최초 등록 시에는
            </p>

            <div className="ml-4 space-y-2">
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                1️⃣ 등록대상동물과 직접 동반 방문,
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                2️⃣ 무선식별장치(칩) 부착이 필수입니다.
              </p>
            </div>

            <div className="pt-4">
              <p
                className="text-[#E7000B] text-base font-medium leading-[26px]"
              >
                하지만 이 제도는 유기동물에게 적용되지 않습니다.
              </p>
            </div>

            <div>
              <p
                className="text-[#E7000B] text-base font-normal leading-[26px]"
              >
                등록번호가 없다는 이유로,
              </p>
              <p
                className="text-[#E7000B] text-base font-normal leading-[26px]"
              >
                많은 유기동물은 &apos;기록되지 않은 존재&apos;로 남게 됩니다.
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Philosophy Section */}
        <Card className="mb-8 bg-[#F0FDF4] border-0">
          <CardContent className="p-8 space-y-6">
          <h2
            className="text-[#7FAD39] text-2xl font-medium leading-8 tracking-[0.07px]"
          >
            🐶 멍냥포는 생각했습니다.
          </h2>

          <div className="space-y-6">
            <p
              className="text-center text-[#7FAD39] text-xl font-medium leading-7"
            >
              &quot;모든 반려동물은, 고유한 개체로 인정받아야 한다.&quot;
            </p>

            <div className="text-center">
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                따라서, 멍냥포는 유기동물도 고유한 신원을 가질 수 있도록
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                DID(Decentralized Identifier) 기술을 도입했습니다.
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* What is DID Section */}
        <Card className="mb-8 bg-[#FAF5FF] border-0">
          <CardContent className="p-8 space-y-6">
          <h2
            className="text-[#7FAD39] text-2xl font-normal leading-8 tracking-[0.07px]"
          >
            🔐 DID란 무엇인가요?
          </h2>

          <div className="space-y-4">
            <div>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                DID(분산 신원, Decentralized Identifier) 는
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                기존의 중앙기관이 관리하던 신원정보를
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                개인이 스스로 통제하고 관리할 수 있게 하는 기술입니다.
              </p>
            </div>

            <div>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                중앙 서버에 의존하지 않고,
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                내 단말기(혹은 지갑)에 개인정보를 보관하며,
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                필요한 순간에만 내가 직접 증명합니다.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg space-y-2">
              <p
                className="text-[#364153] text-base font-medium leading-[26px]"
              >
                즉,
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                👉 &quot;내 정보를 내가 소유하는 방식&quot;
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                👉 자기주권신원(SSI, Self-Sovereign Identity) 이라고도 부릅니다.
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* How DID Works Section */}
        <Card className="mb-8 bg-[#FFF7ED] border-0">
          <CardContent className="p-8 space-y-6">
          <h2
            className="text-[#7FAD39] text-2xl font-normal leading-8 tracking-[0.07px]"
          >
            🦴 멍냥포의 DID는 이렇게 작동합니다
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                1️⃣ 강아지의 코 사진(비문) 으로부터 생체 특징을 추출합니다.
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                2️⃣ 보호소 또는 소유자의 지갑 ID 와 연결하여
              </p>
              <p
                className="text-[#364153] text-base font-normal leading-[26px]"
              >
                3️⃣ 단 하나뿐인 강아지 DID 를 발급합니다.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <p
                className="text-[#364153] text-base font-medium leading-[26px]"
              >
                이렇게 생성된 DID는 동물의 신원을 블록체인 상에 안전하게 기록하고,
              </p>
              <p
                className="text-[#364153] text-base font-medium leading-[26px]"
              >
                입양·후원 과정에서도 동일 개체임을 투명하게 증명합니다.
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="space-y-0 mb-8">
          {/* 신원 증명 */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#DCFCE7]"
              >
                <svg className="w-6 h-6 text-[#7FAD39]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3
                className="text-[#7FAD39] text-xl font-medium leading-7"
              >
                신원 증명
              </h3>
            </div>
            <p
              className="text-[#4A5565] text-base font-normal leading-6"
            >
              DID(Decentralized Identifier)는 각 유기동물에게 고유한 디지털 신원을 부여합니다. 이를 통해 동물의 존재와 정보가 영구적으로 기록되어 관리됩니다.
            </p>
            </CardContent>
          </Card>

          {/* 영구 보관 */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#DCFCE7]"
              >
                <svg className="w-6 h-6 text-[#7FAD39]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3
                className="text-[#7FAD39] text-xl font-medium leading-7"
              >
                영구 보관
              </h3>
            </div>
            <p
              className="text-[#4A5565] text-base font-normal leading-6"
            >
              블록체인 기술을 활용하여 동물의 정보가 영구적으로 보관됩니다. 입양 후에도 동물의 이력과 건강 정보를 추적할 수 있습니다.
            </p>
            </CardContent>
          </Card>

          {/* 투명성 */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#DCFCE7]"
              >
                <svg className="w-6 h-6 text-[#7FAD39]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <h3
                className="text-[#7FAD39] text-xl font-medium leading-7"
              >
                투명성
              </h3>
            </div>
            <p
              className="text-[#4A5565] text-base font-normal leading-6"
            >
              모든 입양 과정과 동물의 상태 변화가 투명하게 기록됩니다. 누구나 동물의 현재 상황을 확인할 수 있어 신뢰성을 보장합니다.
            </p>
            </CardContent>
          </Card>

          {/* 보안 */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#DCFCE7]"
              >
                <svg className="w-6 h-6 text-[#7FAD39]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3
                className="text-[#7FAD39] text-xl font-medium leading-7"
              >
                보안
              </h3>
            </div>
            <p
              className="text-[#4A5565] text-base font-normal leading-6"
            >
              탈중앙화된 시스템으로 데이터의 위변조가 불가능하며, 개인정보는 안전하게 보호됩니다.
            </p>
            </CardContent>
          </Card>
        </div>

        {/* DID Example Section */}
        <Card
          className="mb-8 border-0"
          style={{background: 'linear-gradient(90deg, #F0FDF4 0%, #DCFCE7 100%)'}}
        >
          <CardContent className="p-8">
          <h2
            className="text-center mb-6 text-[#7FAD39] text-2xl font-normal leading-8 tracking-[0.07px]"
          >
            DID 예시
          </h2>

          <div className="bg-white p-6 rounded-lg">
            <div
              className="text-center mb-4 text-[#7FAD39] text-lg font-normal leading-7"
            >
              DID:PET:2025:KR:331
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div
                  className="text-[#4A5565] text-sm font-medium leading-5"
                >
                  DID
                </div>
                <div
                  className="text-[#4A5565] text-sm font-normal leading-5"
                >
                  식별자 유형
                </div>
              </div>
              <div>
                <div
                  className="text-[#4A5565] text-sm font-medium leading-5"
                >
                  PET
                </div>
                <div
                  className="text-[#4A5565] text-sm font-normal leading-5"
                >
                  동물 구분
                </div>
              </div>
              <div>
                <div
                  className="text-[#4A5565] text-sm font-medium leading-5"
                >
                  2025
                </div>
                <div
                  className="text-[#4A5565] text-sm font-normal leading-5"
                >
                  등록 연도
                </div>
              </div>
              <div>
                <div
                  className="text-[#4A5565] text-sm font-medium leading-5"
                >
                  KR:331
                </div>
                <div
                  className="text-[#4A5565] text-sm font-normal leading-5"
                >
                  지역:고유번호
                </div>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Participation Section */}
        <Card className="shadow-sm mb-8">
          <CardContent className="p-8">
          <h2
            className="text-center mb-6 text-[#7FAD39] text-2xl font-normal leading-8 tracking-[0.07px]"
          >
            어떻게 참여할 수 있나요?
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {/* 보호소 등록 */}
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-[#DCFCE7]"
              >
                🏠
              </div>
              <h3
                className="mb-4 text-[#7FAD39] text-lg font-medium leading-7"
              >
                보호소 등록
              </h3>
              <p
                className="text-[#4A5565] text-base font-normal leading-6"
              >
                보호소에서 유기동물 발견 시 DID를 생성하여 등록합니다.
              </p>
            </div>

            {/* 입양 신청 */}
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-[#DCFCE7]"
              >
                ❤️
              </div>
              <h3
                className="mb-4 text-[#7FAD39] text-lg font-medium leading-7"
              >
                입양 신청
              </h3>
              <p
                className="text-[#4A5565] text-base font-normal leading-6"
              >
                DID를 통해 동물의 정확한 정보를 확인 후 입양 신청할 수 있습니다.
              </p>
            </div>

            {/* 지속적 관리 */}
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl bg-[#DCFCE7]"
              >
                📱
              </div>
              <h3
                className="mb-4 text-[#7FAD39] text-lg font-medium leading-7"
              >
                지속적 관리
              </h3>
              <p
                className="text-[#4A5565] text-base font-normal leading-6"
              >
                입양 후에도 일지 작성을 통해 동물의 근황을 지속적으로 업데이트합니다.
              </p>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <Button asChild className="bg-[#7FAD39] hover:bg-[#7FAD39]/90 text-white px-12 py-3 text-lg font-medium">
            <Link href="/">
              DID 발급하러가기
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}