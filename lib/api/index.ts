// lib/api/index.ts
// Central export for all API services

export { default as apiClient, createFormData, handleApiError } from './client';

export { authService } from './services/auth.service';
export { petService } from './services/pet.service';
export { adoptionService } from './services/adoption.service';
export { storyService } from './services/story.service';
export { donationService, paymentService } from './services/donation.service';
export { chatService } from './services/chat.service';
