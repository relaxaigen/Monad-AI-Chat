import { createPublicClient, http, Address } from 'viem'
import { monadTestnet } from './wagmi'

const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
})

export async function checkWalletTransactions(address: Address): Promise<number> {
  try {
    // Get the current block number
    const currentBlock = await publicClient.getBlockNumber()
    
    // Get transaction count (nonce) for the address
    const txCount = await publicClient.getTransactionCount({
      address,
      blockNumber: currentBlock,
    })
    
    return Number(txCount)
  } catch (error) {
    console.error('Error checking transactions:', error)
    return 0
  }
}

export function hasMinimumTransactions(txCount: number): boolean {
  return txCount >= 3
}

