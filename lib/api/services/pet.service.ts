// lib/api/services/pet.service.ts
import apiClient, { createFormData } from '../client';
import { Pet, RegisterPetRequest, TransferRequest, PaginatedResponse } from '@/lib/types';

export const petService = {
  /**
   * Get my pets
   */
  async getMyPets(): Promise<Pet[]> {
    const response = await apiClient.get('/api/pet');
    return response.data;
  },

  /**
   * Get pet detail by DID
   */
  async getPetByDID(petDID: string): Promise<Pet> {
    const response = await apiClient.get(`/api/pet/${petDID}`);
    return response.data;
  },

  /**
   * Register a new pet (via API Gateway Guardian endpoint)
   */
  async registerPet(data: RegisterPetRequest): Promise<{ petDID: string; vcJwt: string }> {
    const formData = createFormData({
      ...data,
      noseImage: data.noseImage,
    });

    const response = await apiClient.post('/pet/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Prepare pet transfer
   */
  async prepareTransfer(petDID: string, newOwnerAddress: string): Promise<{ transferId: string }> {
    const response = await apiClient.post(`/pet/${petDID}/transfer/prepare`, {
      newOwnerAddress,
    });
    return response.data;
  },

  /**
   * Verify transfer with noseprint
   */
  async verifyTransfer(
    petDID: string,
    transferId: string,
    noseImage: File
  ): Promise<{ verified: boolean; similarity: number }> {
    const formData = createFormData({
      transferId,
      noseImage,
    });

    const response = await apiClient.post(`/pet/${petDID}/transfer/verify`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Accept transfer
   */
  async acceptTransfer(
    petDID: string,
    transferId: string
  ): Promise<{ success: boolean; txHash: string }> {
    const response = await apiClient.post(`/pet/${petDID}/transfer/accept`, {
      transferId,
    });
    return response.data;
  },

  /**
   * Get pet transfer history
   */
  async getTransferHistory(petDID: string): Promise<any[]> {
    const response = await apiClient.get(`/pet/${petDID}/transfers`);
    return response.data;
  },
};
