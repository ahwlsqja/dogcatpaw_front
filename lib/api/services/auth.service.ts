// lib/api/services/auth.service.ts
import apiClient from '../client';
import { AuthResponse, User } from '@/lib/types';

export const authService = {
  /**
   * Get current user info from wallet address
   */
  async getCurrentUser(walletAddress: string): Promise<User> {
    const response = await apiClient.get(`/api/users/${walletAddress}`);
    return response.data;
  },

  /**
   * Login with VP (Verifiable Presentation)
   */
  async loginWithVP(walletAddress: string, vpJwt: string): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/login', {
      walletAddress,
      vpJwt,
    });
    return response.data;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    const response = await apiClient.post('/api/auth/logout');
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return response.data;
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post('/api/auth/reissue', {
      refreshToken,
    });
    return response.data;
  },
};
