import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

// Define Monad Testnet with correct configuration
export const monadTestnet = defineChain({
  id: 10143, // 0x279f
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.monad.xyz'],
      webSocket: ['wss://monad-testnet.drpc.org'],
    },
    public: {
      http: ['https://testnet-rpc.monad.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com',
      apiUrl: 'https://testnet.monadexplorer.com/api'
    },
  },
  testnet: true,
})

export const config = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})

