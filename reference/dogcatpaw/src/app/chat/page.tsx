"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ChatRoom {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isSelected: boolean;
  petInfo?: {
    name: string;
    breed: string;
    age: string;
    gender: string;
    did: string;
    status: string;
    image: string;
  };
}

interface Message {
  id: number;
  content: string;
  time: string;
  isOwnMessage: boolean;
}

const mockChatRooms: ChatRoom[] = [
  {
    id: 1,
    name: "서울시 동물보호센터",
    avatar: "S",
    lastMessage: "골든이에 대해 문의 주신 내용 확인했습니다.",
    time: "10분 전",
    unreadCount: 2,
    isSelected: true,
    petInfo: {
      name: "골든이",
      breed: "골든 리트리버",
      age: "2살",
      gender: "수컷",
      did: "KR-2025-001",
      status: "입양 가능",
      image: "https://placehold.co/64x64"
    }
  },
  {
    id: 2,
    name: "부산 동물사랑센터",
    avatar: "B",
    lastMessage: "럭키 입양 절차에 대해 안내드리겠습니다.",
    time: "1시간 전",
    unreadCount: 0,
    isSelected: false
  },
  {
    id: 3,
    name: "대구 유기동물보호센터",
    avatar: "D",
    lastMessage: "바둑이 입양 상담 예약이 완료되었습니다.",
    time: "2시간 전",
    unreadCount: 1,
    isSelected: false
  },
  {
    id: 4,
    name: "인천 동물보호센터",
    avatar: "I",
    lastMessage: "후원 관련해서 문의드립니다.",
    time: "어제",
    unreadCount: 0,
    isSelected: false
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    content: "안녕하세요! 골든이에 대해 문의해주셔서 감사합니다.",
    time: "오후 2:10",
    isOwnMessage: false
  },
  {
    id: 2,
    content: "네, 안녕하세요. 골든이 입양에 대해 자세히 알고 싶습니다.",
    time: "오후 2:15",
    isOwnMessage: true
  },
  {
    id: 3,
    content: "골든이는 2살 수컷 골든 리트리버입니다. 성격이 매우 온순하고 사람을 좋아해요.",
    time: "오후 2:16",
    isOwnMessage: false
  },
  {
    id: 4,
    content: "훈련은 어느 정도 되어있나요?",
    time: "오후 2:18",
    isOwnMessage: true
  },
  {
    id: 5,
    content: "기본적인 앉기, 기다리기, 손 등의 명령어는 잘 따릅니다. 산책도 줄을 당기지 않고 잘 해요.",
    time: "오후 2:20",
    isOwnMessage: false
  }
];

export default function ChatPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [messageText, setMessageText] = useState('');

  const selectedRoom = chatRooms.find(room => room.id === selectedRoomId);

  const handleRoomSelect = (roomId: number) => {
    setSelectedRoomId(roomId);
    setChatRooms(prev => prev.map(room => ({
      ...room,
      isSelected: room.id === roomId
    })));
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: messageText,
        time: new Date().toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        isOwnMessage: true
      };
      setMessages(prev => [...prev, newMessage]);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="max-w-[1216px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px] flex">
          {/* Left Sidebar - Chat List */}
          <div className="w-[405px] border-r border-[#E5E7EB] flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#0A0A0A] text-lg font-inter font-medium leading-7">
                메시지
              </h2>
            </div>

            {/* Chat Rooms List */}
            <div className="flex-1 overflow-auto">
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => handleRoomSelect(room.id)}
                  className={`px-4 py-4 border-b border-[#F3F4F6] cursor-pointer hover:bg-gray-50 ${
                    room.isSelected
                      ? 'bg-[#F0FDF4] border-l-4 border-l-[#00C950] border-b-[#00C950]'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#E5E7EB] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0A0A0A] text-sm font-inter font-normal leading-5">
                        {room.avatar}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-[#0A0A0A] text-base font-inter font-medium leading-6 truncate">
                          {room.name}
                        </h3>
                        <span className="text-[#6A7282] text-xs font-inter font-normal leading-4 flex-shrink-0">
                          {room.time}
                        </span>
                      </div>
                      <p className="text-[#4A5565] text-sm font-inter font-normal leading-5 truncate">
                        {room.lastMessage}
                      </p>
                    </div>
                    {room.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-[#FB2C36] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-inter font-normal leading-4">
                          {room.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Chat Content */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="px-3 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E5E7EB] rounded-full flex items-center justify-center">
                  <span className="text-[#0A0A0A] text-xs font-inter font-normal leading-4">
                    {selectedRoom?.avatar}
                  </span>
                </div>
                <span className="text-[#0A0A0A] text-sm font-inter font-medium leading-5">
                  {selectedRoom?.name}
                </span>
              </div>
            </div>

            {/* Pet Info Card */}
            {selectedRoom?.petInfo && (
              <div className="px-4 py-4 bg-[#F0FDF4] border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-[#E5E7EB] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedRoom.petInfo.image}
                      alt={selectedRoom.petInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#0A0A0A] text-sm font-inter font-medium leading-5 mb-1">
                      {selectedRoom.petInfo.name}
                    </h4>
                    <p className="text-[#4A5565] text-xs font-inter font-normal leading-4 mb-1">
                      {selectedRoom.petInfo.breed} • {selectedRoom.petInfo.age} • {selectedRoom.petInfo.gender}
                    </p>
                    <p className="text-[#4A5565] text-xs font-inter font-normal leading-4 mb-2">
                      DID: {selectedRoom.petInfo.did}
                    </p>
                    <span className="inline-block px-2 py-1 bg-[#DCFCE7] text-[#008236] text-xs font-inter font-normal leading-4 rounded">
                      {selectedRoom.petInfo.status}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-[#0A0A0A] text-xs font-inter font-medium leading-4"
                  >
                    공고 보기
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      message.isOwnMessage
                        ? 'bg-[#00C950] text-white'
                        : 'bg-[#F3F4F6] text-[#1E2939]'
                    }`}
                  >
                    <p className="text-sm font-inter font-normal leading-5 mb-1">
                      {message.content}
                    </p>
                    <p className={`text-xs font-inter font-normal leading-4 ${
                      message.isOwnMessage ? 'text-[#DCFCE7]' : 'text-[#6A7282]'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="px-4 py-4 border-t border-[#E5E7EB]">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 bg-[#F3F3F5] rounded-lg border-0 outline-none text-[#717182] text-sm font-inter font-normal"
                />
                <Button
                  onClick={handleSendMessage}
                  className="w-10 h-9 bg-[#7FAD39] rounded-lg flex items-center justify-center hover:bg-[#6B9B32]"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.33} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
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