// lib/api/services/story.service.ts
import apiClient from '../client';
import {
  DailyStory,
  ReviewStory,
  CreateStoryRequest,
  Comment,
  WriteCommentRequest,
  PaginatedResponse,
} from '@/lib/types';

export const storyService = {
  /**
   * Create daily story
   */
  async createDailyStory(data: CreateStoryRequest): Promise<{ storyId: number }> {
    const response = await apiClient.post('/api/story/daily', data);
    return response.data;
  },

  /**
   * Get all daily stories
   */
  async getDailyStories(params?: {
    cursorId?: number;
    size?: number;
  }): Promise<PaginatedResponse<DailyStory>> {
    const response = await apiClient.get('/api/story/daily/stories', { params });
    return response.data;
  },

  /**
   * Get single daily story
   */
  async getDailyStory(storyId: number): Promise<DailyStory> {
    const response = await apiClient.get(`/api/story/daily/${storyId}`);
    return response.data;
  },

  /**
   * Search daily stories
   */
  async searchDailyStories(params: {
    keyword: string;
    cursorId?: number;
    size?: number;
  }): Promise<PaginatedResponse<DailyStory>> {
    const response = await apiClient.get('/api/story/daily/search', { params });
    return response.data;
  },

  /**
   * Create review story
   */
  async createReviewStory(
    data: CreateStoryRequest & { adoptId: number }
  ): Promise<{ storyId: number }> {
    const response = await apiClient.post('/api/story/review', data);
    return response.data;
  },

  /**
   * Get all review stories
   */
  async getReviewStories(params?: {
    cursorId?: number;
    size?: number;
  }): Promise<PaginatedResponse<ReviewStory>> {
    const response = await apiClient.get('/api/story/review/reviews', { params });
    return response.data;
  },

  /**
   * Get single review story
   */
  async getReviewStory(reviewId: number): Promise<ReviewStory> {
    const response = await apiClient.get(`/api/story/review/${reviewId}`);
    return response.data;
  },

  /**
   * Search review stories
   */
  async searchReviewStories(params: {
    keyword: string;
    cursorId?: number;
    size?: number;
  }): Promise<PaginatedResponse<ReviewStory>> {
    const response = await apiClient.get('/api/story/review/search', { params });
    return response.data;
  },

  /**
   * Toggle like on story
   */
  async toggleLike(storyId: number): Promise<{ isLiked: boolean; likeCount: number }> {
    const response = await apiClient.post('/api/like', null, {
      params: { storyId },
    });
    return response.data;
  },

  /**
   * Get comments for story
   */
  async getComments(params: {
    storyId: number;
    cursor?: number;
    size?: number;
  }): Promise<PaginatedResponse<Comment>> {
    const response = await apiClient.get('/api/comment', { params });
    return response.data;
  },

  /**
   * Write comment
   */
  async writeComment(data: WriteCommentRequest): Promise<{ commentId: number }> {
    const response = await apiClient.post('/api/comment', data);
    return response.data;
  },
};
