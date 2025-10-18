import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "멍냥Paw - DID 기반 반려동물 입양 플랫폼",
  description: "한 마리의 유기동물도, 반려동물도 잊히지 않도록. DID를 통해 유기동물의 존재를 기록하고 입양과 후원을 연결하는 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-20">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <Image
                    src="/icon.png"
                    alt="멍냥Paw Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <span className="text-2xl font-medium text-green-500" style={{color: '#7FAD39'}}>멍냥Paw</span>
                </div>

                {/* Auth buttons */}
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" className="text-[#4A5565] hover:text-[#7FAD39] transition-colors">
                    로그인
                  </Button>
                  <Button variant="secondary" className="bg-[#F3F4F6] text-[#4A5565] hover:bg-gray-200">
                    회원가입
                  </Button>
                  <Button variant="ghost" className="text-[#4A5565] hover:text-[#7FAD39] transition-colors">
                    마이페이지
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="border-t border-gray-100 flex justify-center">
                <nav className="flex space-x-8 h-14">
                  <Link href="/" className="flex items-center px-2 border-b-2 border-green-500 text-green-600 font-medium text-sm" style={{borderBottomColor: '#00C950', color: '#00A63E'}}>홈</Link>
                  <Link href="/adoption" className="flex items-center px-2 border-b-2 border-transparent text-gray-500 hover:text-green-600 transition-colors font-medium text-sm" style={{color: '#6A7282'}}>입양</Link>
                  <Link href="/donation" className="flex items-center px-2 border-b-2 border-transparent text-gray-500 hover:text-green-600 transition-colors font-medium text-sm" style={{color: '#6A7282'}}>후원</Link>
                  <Link href="/shelter" className="flex items-center px-2 border-b-2 border-transparent text-gray-500 hover:text-green-600 transition-colors font-medium text-sm" style={{color: '#6A7282'}}>보호소</Link>
                  <Link href="/story" className="flex items-center px-2 border-b-2 border-transparent text-gray-500 hover:text-green-600 transition-colors font-medium text-sm" style={{color: '#6A7282'}}>스토리</Link>
                  <Link href="/adoption-review" className="flex items-center px-2 border-b-2 border-transparent text-gray-500 hover:text-green-600 transition-colors font-medium text-sm" style={{color: '#6A7282'}}>입양후기</Link>
                  <Link href="/chat" className="flex items-center px-2 border-b-2 border-transparent text-gray-500 hover:text-green-600 transition-colors font-medium text-sm" style={{color: '#6A7282'}}>채팅</Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
