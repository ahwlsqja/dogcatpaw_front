// lib/api/services/chat.service.ts
import apiClient from '../client';
import { ChatRoom, ChatMessage, CreateChatRoomRequest, AdoptionPost } from '@/lib/types';

export const chatService = {
  /**
   * Create chat room
   */
  async createChatRoom(data: CreateChatRoomRequest): Promise<{ roomId: number }> {
    const response = await apiClient.post('/api/chat/room/create', data);
    return response.data;
  },

  /**
   * Get chat room list
   */
  async getChatRoomList(): Promise<ChatRoom[]> {
    const response = await apiClient.get('/api/chat/room/list');
    return response.data;
  },

  /**
   * Get chat room card info
   */
  async getChatRoomCard(roomId: number): Promise<ChatRoom> {
    const response = await apiClient.get('/api/chat/room/card', {
      params: { roomId },
    });
    return response.data;
  },

  /**
   * Enter chat room and get messages
   */
  async enterChatRoom(roomId: number): Promise<{
    room: ChatRoom;
    messages: ChatMessage[];
  }> {
    const response = await apiClient.post(`/api/chat/${roomId}/enter`);
    return response.data;
  },

  /**
   * Get adoption info for chat
   */
  async getChatAdoptionInfo(roomId: number): Promise<AdoptionPost> {
    const response = await apiClient.get(`/api/chat/room/${roomId}/adoption`);
    return response.data;
  },
};
