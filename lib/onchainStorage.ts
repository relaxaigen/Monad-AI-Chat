import { createPublicClient, createWalletClient, custom, http, Address } from 'viem'
import { monadTestnet } from './wagmi'
import { Chat, Message } from '@/types/chat'

// TODO: Update this address after deploying the contract
const CHAT_HISTORY_CONTRACT_ADDRESS = '0x93555e5c4377C89b81B5158ED32402DCf43FfDB2' as Address

const CONTRACT_ABI = [
  {
    inputs: [
      { name: 'chatId', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'roles', type: 'string[]' },
      { name: 'contents', type: 'string[]' },
      { name: 'timestamps', type: 'uint256[]' },
    ],
    name: 'saveChat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'chatId', type: 'string' }],
    name: 'getChat',
    outputs: [
      { name: 'title', type: 'string' },
      { name: 'roles', type: 'string[]' },
      { name: 'contents', type: 'string[]' },
      { name: 'timestamps', type: 'uint256[]' },
      { name: 'createdAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUserChatIds',
    outputs: [{ name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'chatId', type: 'string' }],
    name: 'deleteChat',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChatCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export async function saveChatOnChain(chat: Chat, walletClient: any): Promise<boolean> {
  try {
    if (CHAT_HISTORY_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      console.warn('Contract not deployed yet')
      return false
    }

    const roles = chat.messages.map((m) => m.role)
    const contents = chat.messages.map((m) => m.content)
    const timestamps = chat.messages.map((m) => BigInt(m.timestamp))

    const hash = await walletClient.writeContract({
      address: CHAT_HISTORY_CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'saveChat',
      args: [chat.id, chat.title, roles, contents, timestamps],
    })

    console.log('Chat saved on-chain:', hash)
    return true
  } catch (error) {
    console.error('Error saving chat on-chain:', error)
    return false
  }
}

export async function getChatFromChain(chatId: string, address: Address): Promise<Chat | null> {
  try {
    if (CHAT_HISTORY_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      console.warn('Contract not deployed yet')
      return null
    }

    const publicClient = createPublicClient({
      chain: monadTestnet,
      transport: http(),
    })

    const result = await publicClient.readContract({
      address: CHAT_HISTORY_CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getChat',
      args: [chatId],
      account: address,
    })

    const [title, roles, contents, timestamps, createdAt, updatedAt] = result

    const messages: Message[] = roles.map((role, index) => ({
      id: `msg-${timestamps[index]}-${role}`,
      role: role as 'user' | 'assistant',
      content: contents[index],
      timestamp: Number(timestamps[index]),
    }))

    return {
      id: chatId,
      title,
      messages,
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
    }
  } catch (error) {
    console.error('Error getting chat from chain:', error)
    return null
  }
}

export async function getAllChatsFromChain(address: Address): Promise<Chat[]> {
  try {
    if (CHAT_HISTORY_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      console.warn('Contract not deployed yet')
      return []
    }

    const publicClient = createPublicClient({
      chain: monadTestnet,
      transport: http(),
    })

    const chatIds = await publicClient.readContract({
      address: CHAT_HISTORY_CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'getUserChatIds',
      account: address,
    })

    const chats: Chat[] = []
    for (const chatId of chatIds) {
      const chat = await getChatFromChain(chatId, address)
      if (chat) {
        chats.push(chat)
      }
    }

    return chats
  } catch (error) {
    console.error('Error getting all chats from chain:', error)
    return []
  }
}

export async function deleteChatFromChain(chatId: string, walletClient: any): Promise<boolean> {
  try {
    if (CHAT_HISTORY_CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000') {
      console.warn('Contract not deployed yet')
      return false
    }

    const hash = await walletClient.writeContract({
      address: CHAT_HISTORY_CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'deleteChat',
      args: [chatId],
    })

    console.log('Chat deleted from chain:', hash)
    return true
  } catch (error) {
    console.error('Error deleting chat from chain:', error)
    return false
  }
}

