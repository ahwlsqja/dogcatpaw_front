'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { authService } from '@/lib/api';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const isAuthenticated = !!user && isConnected;

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('accessToken');
        const savedWallet = localStorage.getItem('walletAddress');

        if (token && savedWallet && isConnected && address === savedWallet) {
          // Fetch user data
          const userData = await authService.getCurrentUser(savedWallet);
          setUser(userData);
        } else {
          setUser(null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('walletAddress');
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('walletAddress');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [address, isConnected]);

  const login = async () => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsLoading(true);

      // Step 1: Sign message to prove wallet ownership
      const message = `Login to DogCatPaw\nAddress: ${address}\nTimestamp: ${Date.now()}`;
      const signature = await signMessageAsync({ message });

      // Step 2: In a real implementation, you would:
      // - Create a VP (Verifiable Presentation) with the signature
      // - Send VP to backend for authentication
      // For now, we'll use a placeholder VP

      const vpJwt = `placeholder_vp_jwt_${signature}`;

      // Step 3: Login with VP
      const authResponse = await authService.loginWithVP(address, vpJwt);

      // Step 4: Store tokens and user data
      localStorage.setItem('accessToken', authResponse.accessToken);
      if (authResponse.refreshToken) {
        localStorage.setItem('refreshToken', authResponse.refreshToken);
      }
      localStorage.setItem('walletAddress', address);

      setUser(authResponse.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('walletAddress');
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!address) return;

    try {
      const userData = await authService.getCurrentUser(address);
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    }
  };

  // Auto-logout when wallet disconnects
  useEffect(() => {
    if (!isConnected && user) {
      logout();
    }
  }, [isConnected]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
