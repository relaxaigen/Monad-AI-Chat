import { Chat, Message } from '@/types/chat'

const STORAGE_KEY = 'monad-chat-history'

export function saveChatToLocal(chat: Chat): void {
  if (typeof window === 'undefined') return
  
  try {
    const existing = getChatHistory()
    const index = existing.findIndex(c => c.id === chat.id)
    
    if (index >= 0) {
      existing[index] = chat
    } else {
      existing.unshift(chat)
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch (error) {
    console.error('Error saving chat:', error)
  }
}

export function getChatHistory(): Chat[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading chat history:', error)
    return []
  }
}

export function getChatById(id: string): Chat | null {
  const history = getChatHistory()
  return history.find(c => c.id === id) || null
}

export function deleteChatById(id: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const history = getChatHistory()
    const filtered = history.filter(c => c.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting chat:', error)
  }
}

export function createNewChat(): Chat {
  return {
    id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'New Chat',
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

export function generateChatTitle(firstMessage: string): string {
  const maxLength = 50
  const cleaned = firstMessage.trim()
  
  if (cleaned.length <= maxLength) {
    return cleaned
  }
  
  return cleaned.substring(0, maxLength) + '...'
}

