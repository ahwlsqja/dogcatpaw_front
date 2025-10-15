// lib/wagmi.config.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { Chain } from 'viem';

// Hyperledger Besu custom network configuration
export const besuNetwork: Chain = {
  id: 1337, // Replace with your actual chain ID
  name: 'Hyperledger Besu',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BESU_RPC_URL || 'http://besu-networ-besu-rpc-ext-43e7a-108790139-4b974a576079.kr.lb.naverncp.com:8545']
    },
    public: {
      http: [process.env.NEXT_PUBLIC_BESU_RPC_URL || 'http://besu-networ-besu-rpc-ext-43e7a-108790139-4b974a576079.kr.lb.naverncp.com:8545']
    },
  },
  blockExplorers: {
    default: {
      name: 'Besu Explorer',
      url: process.env.NEXT_PUBLIC_BESU_EXPLORER_URL || 'http://localhost:4000'
    },
  },
  testnet: true,
};

// RainbowKit v2.x automatically configures connectors including MetaMask
export const config = getDefaultConfig({
  appName: 'DogCatPaw',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [besuNetwork],
  ssr: true, // Enable for Next.js SSR
});
