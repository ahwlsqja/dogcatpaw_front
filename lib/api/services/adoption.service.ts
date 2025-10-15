// lib/api/services/adoption.service.ts
import apiClient from '../client';
import { AdoptionPost, CreateAdoptionPostRequest, PaginatedResponse } from '@/lib/types';

export const adoptionService = {
  /**
   * Get adoption posts with filters (cursor-based pagination)
   */
  async getAdoptions(params?: {
    cursor?: number;
    size?: number;
    status?: string;
    breed?: string;
    region?: string;
    district?: string;
  }): Promise<PaginatedResponse<AdoptionPost>> {
    const response = await apiClient.get('/api/adoption', { params });
    return response.data;
  },

  /**
   * Get adoption post detail
   */
  async getAdoptionDetail(adoptId: number): Promise<AdoptionPost> {
    const response = await apiClient.get('/api/adoption/detail', {
      params: { adoptId },
    });
    return response.data;
  },

  /**
   * Get home screen adoption posts
   */
  async getAdoptionHome(): Promise<{
    featured: AdoptionPost[];
    recent: AdoptionPost[];
  }> {
    const response = await apiClient.get('/api/adoption/home');
    return response.data;
  },

  /**
   * Create adoption post
   */
  async createAdoptionPost(data: CreateAdoptionPostRequest): Promise<{ adoptId: number }> {
    const response = await apiClient.post('/api/adoption/post', data);
    return response.data;
  },
};
