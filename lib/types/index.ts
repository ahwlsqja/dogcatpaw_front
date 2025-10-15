// lib/types/index.ts

// ==================== Authentication Types ====================
export interface User {
  walletAddress: string;
  did: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
  createdAt?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface SignupRequest {
  walletAddress: string;
  nickname: string;
  email: string;
  profileImage?: string;
}

// ==================== Email Verification Types ====================
export interface SendVerificationCodeRequest {
  email: string;
}

export interface SendVerificationCodeResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface VerifyEmailCodeRequest {
  code: string;
}

export interface VerifyEmailCodeResponse {
  success: boolean;
  message?: string;
  error?: string;
  warning?: string;
  email?: string;
  remainingAttempts?: number;
}

// ==================== Guardian Types ====================
export interface Guardian {
  walletAddress: string;
  did: string;
  nickname: string;
  email: string;
  profileImage?: string;
  registeredAt: string;
}

export interface GuardianRegistrationRequest {
  email: string;
  phone?: string;
  name?: string;
  verificationMethod?: 1 | 2 | 3; // 1: SMS, 2: Email, 3: Both
  personalDataHash?: string;
  ncpStorageURI?: string;
  signedTx?: string;
}

export interface GuardianRegistrationResponse {
  success: boolean;
  guardianId?: number;
  authId?: number;
  txHash?: string;
  springJobId?: string;
  message?: string;
  error?: string;
}

export interface GuardianProfile {
  guardianAddress: string;
  personalDataHash: string;
  ncpStorageURI: string;
  verificationMethod: number;
  verificationLevel: number;
  registeredAt: number;
  lastUpdated: number;
  isActive: boolean;
}

export interface GuardianVerificationProof {
  smsVerified: boolean;
  emailVerified: boolean;
  smsVerifiedAt: number;
  emailVerifiedAt: number;
  verifier: string;
}

// ==================== Pet Types ====================
export interface Pet {
  petId: number;
  petDID: string;
  petName: string;
  breed: string;
  species: string;
  old?: number;
  weight?: number;
  gender?: string;
  color?: string;
  feature?: string;
  neutered?: boolean;
  guardianAddress: string;
  registeredAt: string;
  noseImageUrl?: string;
}

export interface RegisterPetRequest {
  petName: string;
  breed: string;
  species: string;
  old?: number;
  weight?: number;
  gender?: string;
  color?: string;
  feature?: string;
  neutered?: boolean;
  noseImage: File;
}

// ==================== Adoption Types ====================
export interface AdoptionPost {
  adoptId: number;
  petId: number;
  petName: string;
  breed: string;
  species: string;
  old?: number;
  gender?: string;
  neutered?: boolean;
  location: string;
  region: string;
  district: string;
  status: 'AVAILABLE' | 'RESERVED' | 'ADOPTED';
  images?: string[];
  content: string;
  createdAt: string;
  authorNickname: string;
  authorProfileImage?: string;
}

export interface CreateAdoptionPostRequest {
  petId: number;
  content: string;
  images?: string[];
  region: string;
  district: string;
}

// ==================== Story Types ====================
export interface DailyStory {
  storyId: number;
  memberId: number;
  petId: number;
  petName: string;
  content: string;
  images?: string[];
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  authorNickname: string;
  authorProfileImage?: string;
}

export interface ReviewStory extends DailyStory {
  adoptId: number;
}

export interface CreateStoryRequest {
  petId: number;
  content: string;
  images?: string[];
}

// ==================== Comment Types ====================
export interface Comment {
  commentId: number;
  storyId: number;
  memberId: number;
  content: string;
  createdAt: string;
  authorNickname: string;
  authorProfileImage?: string;
}

export interface WriteCommentRequest {
  storyId: number;
  content: string;
}

// ==================== Donation Types ====================
export interface DonationPost {
  donationId: number;
  petId: number;
  petName: string;
  title: string;
  content: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'ACTIVE' | 'ACHIEVED' | 'CLOSED';
  category: string;
  images?: string[];
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  createdAt: string;
  authorNickname: string;
  authorProfileImage?: string;
}

export interface DonationHistory {
  donationHistoryId: number;
  donationId: number;
  memberId: number;
  amount: number;
  message?: string;
  createdAt: string;
  donorNickname?: string;
}

export interface CreateDonationPostRequest {
  memberId: number;
  petId: number;
  title: string;
  targetAmount: number;
  deadline: string;
  category: string;
  content: string;
  images?: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface MakeDonationRequest {
  memberId: number;
  itemId: number;
  donationId: number;
}

// ==================== Chat Types ====================
export interface ChatRoom {
  roomId: number;
  adoptId: number;
  senderId: number;
  receiverId: number;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

export interface ChatMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateChatRoomRequest {
  adoptId: number;
  receiverId: number;
}

// ==================== Payment Types ====================
export interface BoneBalance {
  memberId: number;
  balance: number;
}

export interface PreparePaymentRequest {
  itemId: number;
}

export interface ApprovePaymentRequest {
  orderId: string;
  paymentKey: string;
  finalAmount: number;
}

// ==================== VC/VP Types ====================
export interface VerifiableCredential {
  vcJwt: string;
  credentialType: string;
  issuedAt: string;
  expiresAt?: string;
}

export interface VerifiablePresentation {
  vpJwt: string;
  purpose: string;
  createdAt: string;
}

// ==================== API Response Types ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  cursor?: number;
  hasNext: boolean;
  totalCount?: number;
}

// ==================== Blockchain Types ====================
export interface TransferRequest {
  petDID: string;
  newOwnerAddress: string;
  noseImage: File;
}

export interface TransferStatus {
  transferId: string;
  status: 'PREPARED' | 'VERIFIED' | 'COMPLETED' | 'FAILED';
  petDID: string;
  previousOwner: string;
  newOwner: string;
  createdAt: string;
  completedAt?: string;
}
