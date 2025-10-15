/**
 * Web3Token authentication utilities
 *
 * This module provides utilities for generating Web3Token signatures
 * for authenticating with the DogCatPaw API Gateway.
 *
 * Backend uses `web3-token` package to verify signatures.
 */

import Web3Token from 'web3-token';

/**
 * Generate a Web3Token for API authentication
 *
 * @param signMessage - Function to sign a message (from wagmi/viem)
 * @param expiresIn - Token expiration time (default: '1d')
 * @returns Web3Token string
 *
 * @example
 * ```tsx
 * import { useSignMessage } from 'wagmi';
 * import { generateWeb3Token } from '@/lib/auth/web3-token';
 *
 * const { signMessageAsync } = useSignMessage();
 * const token = await generateWeb3Token(signMessageAsync);
 * ```
 */
export async function generateWeb3Token(
  signMessage: (args: { message: string }) => Promise<string>,
  expiresIn: string = '1d'
): Promise<string> {
  try {
    // Generate Web3Token using the provided sign function
    const token = await Web3Token.sign(
      async (msg: string) => {
        // Sign the message using wagmi's signMessage
        // wagmi expects { message: string } not just string
        return await signMessage({ message: msg });
      },
      expiresIn
    );

    return token;
  } catch (error) {
    console.error('Failed to generate Web3Token:', error);
    throw new Error('Failed to generate authentication token');
  }
}

/**
 * Verify a Web3Token (client-side validation)
 *
 * @param token - Web3Token to verify
 * @returns Decoded token data
 */
export async function verifyWeb3Token(token: string) {
  try {
    const { address, body } = await Web3Token.verify(token);
    return {
      address: address.toLowerCase(),
      body,
    };
  } catch (error) {
    console.error('Failed to verify Web3Token:', error);
    throw new Error('Invalid authentication token');
  }
}

/**
 * Hook-based Web3Token generator
 * Use this in React components with wagmi hooks
 */
export class Web3TokenManager {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  /**
   * Get current token if valid, otherwise generate new one
   */
  async getToken(
    signMessage: (message: string) => Promise<string>,
    expiresIn: string = '1d'
  ): Promise<string> {
    // Check if current token is still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // Generate new token
    this.token = await generateWeb3Token(signMessage, expiresIn);

    // Set expiry time (1 day = 86400000 ms)
    const expiryMs = this.parseExpiresIn(expiresIn);
    this.tokenExpiry = Date.now() + expiryMs;

    return this.token;
  }

  /**
   * Clear stored token
   */
  clearToken() {
    this.token = null;
    this.tokenExpiry = null;
  }

  /**
   * Parse expires in string to milliseconds
   */
  private parseExpiresIn(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 's': return value * 1000;
      case 'm': return value * 60 * 1000;
      case 'h': return value * 60 * 60 * 1000;
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: return 24 * 60 * 60 * 1000; // Default 1 day
    }
  }
}

/**
 * Development mode helper
 * In dev mode, backend doesn't require Web3Token
 */
export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV !== 'production';
}

/**
 * Get authentication headers for API requests
 *
 * @param walletAddress - User's wallet address
 * @param web3Token - Optional Web3Token (required in production)
 * @returns Headers object
 */
export function getAuthHeaders(
  walletAddress: string,
  web3Token?: string
): Record<string, string> {
  const headers: Record<string, string> = {
    'walletaddress': walletAddress.toLowerCase(),
  };

  // Add Web3Token if provided (required in production)
  if (web3Token) {
    headers['authorization'] = web3Token;
  } else if (!isDevelopmentMode()) {
    console.warn('Web3Token not provided in production mode');
  }

  return headers;
}
