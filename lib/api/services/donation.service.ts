// lib/api/services/donation.service.ts
import apiClient from '../client';
import {
  DonationPost,
  DonationHistory,
  CreateDonationPostRequest,
  MakeDonationRequest,
  BoneBalance,
  PreparePaymentRequest,
  ApprovePaymentRequest,
  PaginatedResponse,
} from '@/lib/types';

export const donationService = {
  /**
   * Create donation post
   */
  async createDonationPost(data: CreateDonationPostRequest): Promise<{ donationId: number }> {
    const response = await apiClient.post('/api/donation/posts', data);
    return response.data;
  },

  /**
   * Get all donation list with filters
   */
  async getDonationList(params?: {
    cursor?: number;
    size?: number;
    breed?: string;
    status?: string;
  }): Promise<PaginatedResponse<DonationPost>> {
    const response = await apiClient.get('/api/donation/list', { params });
    return response.data;
  },

  /**
   * Get closing soon donations (home screen)
   */
  async getClosingSoonDonations(): Promise<DonationPost[]> {
    const response = await apiClient.get('/api/donation/closing');
    return response.data;
  },

  /**
   * Get donation detail and history
   */
  async getDonation(params: {
    donationId: number;
    cursor?: number;
    size?: number;
  }): Promise<{
    donation: DonationPost;
    history: PaginatedResponse<DonationHistory>;
  }> {
    const response = await apiClient.get('/api/donation', { params });
    return response.data;
  },

  /**
   * Make donation
   */
  async makeDonation(data: MakeDonationRequest): Promise<{ success: boolean }> {
    const response = await apiClient.post('/api/donations', data);
    return response.data;
  },

  /**
   * Get my donation history
   */
  async getMyDonationHistory(params?: {
    cursor?: number;
    size?: number;
  }): Promise<PaginatedResponse<DonationHistory>> {
    const response = await apiClient.get('/api/donations/mine', { params });
    return response.data;
  },

  /**
   * Get my bone balance
   */
  async getMyBoneBalance(): Promise<BoneBalance> {
    const response = await apiClient.get('/api/donations/bone');
    return response.data;
  },
};

export const paymentService = {
  /**
   * Prepare payment (bone recharge)
   */
  async preparePayment(data: PreparePaymentRequest): Promise<{
    orderId: string;
    amount: number;
    orderName: string;
  }> {
    const response = await apiClient.post('/api/payment/prepare', data);
    return response.data;
  },

  /**
   * Approve payment
   */
  async approvePayment(data: ApprovePaymentRequest): Promise<{
    success: boolean;
    boneAmount: number;
  }> {
    const response = await apiClient.post('/api/payment/approve', data);
    return response.data;
  },
};
