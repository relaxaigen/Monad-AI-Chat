import { Chat } from '@/types/chat'
import { saveChatToLocal, getChatHistory, deleteChatById } from './chatStorage'
import { type Address } from 'viem'

// Simple localStorage-only storage
export async function saveChat(chat: Chat, address?: Address): Promise<void> {
  saveChatToLocal(chat)
  console.log('💾 Saved to localStorage:', chat.id)
}

// Load chats from localStorage
export async function loadChats(address?: Address): Promise<Chat[]> {
  const localChats = getChatHistory()
  console.log(`📁 Loaded ${localChats.length} chats from localStorage`)
  return localChats
}

// Delete from localStorage
export async function deleteChat(chatId: string, address?: Address): Promise<void> {
  deleteChatById(chatId)
  console.log('🗑️ Deleted from localStorage:', chatId)
}

