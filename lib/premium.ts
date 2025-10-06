import { Address } from 'viem'

// Premium payment receiver address
export const PREMIUM_RECEIVER_ADDRESS = '0x8814a93b36f6f02ab5579c7da8e543a95436aa25' as Address

// Premium price in MON (1 MON)
export const PREMIUM_PRICE = '1000000000000000000' // 1 MON in wei

// Free tier limits
export const FREE_DAILY_MESSAGE_LIMIT = 10

// Storage keys
const PREMIUM_USERS_KEY = 'monad-premium-users'
const MESSAGE_COUNT_KEY = 'monad-message-count'

interface MessageCount {
  count: number
  date: string // YYYY-MM-DD format
}

interface PremiumUser {
  address: string
  purchasedAt: number
  txHash: string
}

// Check if user is premium
export function isPremiumUser(address: Address): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const stored = localStorage.getItem(PREMIUM_USERS_KEY)
    if (!stored) return false
    
    const premiumUsers: PremiumUser[] = JSON.parse(stored)
    return premiumUsers.some(u => u.address.toLowerCase() === address.toLowerCase())
  } catch (error) {
    console.error('Error checking premium status:', error)
    return false
  }
}

// Add user to premium list
export function addPremiumUser(address: Address, txHash: string): void {
  if (typeof window === 'undefined') return

  try {
    const stored = localStorage.getItem(PREMIUM_USERS_KEY)
    const premiumUsers: PremiumUser[] = stored ? JSON.parse(stored) : []

    // Check if already premium
    if (premiumUsers.some(u => u.address.toLowerCase() === address.toLowerCase())) {
      return
    }

    premiumUsers.push({
      address: address.toLowerCase(),
      purchasedAt: Date.now(),
      txHash,
    })

    localStorage.setItem(PREMIUM_USERS_KEY, JSON.stringify(premiumUsers))
    console.log('✅ User upgraded to premium:', address)

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('premiumStatusChanged', {
      detail: { address, isPremium: true }
    }))
  } catch (error) {
    console.error('Error adding premium user:', error)
  }
}

// Get today's date in YYYY-MM-DD format
function getTodayDate(): string {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// Get message count for today
export function getMessageCount(address: Address): number {
  if (typeof window === 'undefined') return 0
  
  try {
    const key = `${MESSAGE_COUNT_KEY}-${address.toLowerCase()}`
    const stored = localStorage.getItem(key)
    
    if (!stored) return 0
    
    const data: MessageCount = JSON.parse(stored)
    const today = getTodayDate()
    
    // Reset count if it's a new day
    if (data.date !== today) {
      return 0
    }
    
    return data.count
  } catch (error) {
    console.error('Error getting message count:', error)
    return 0
  }
}

// Increment message count
export function incrementMessageCount(address: Address): void {
  if (typeof window === 'undefined') return

  try {
    const key = `${MESSAGE_COUNT_KEY}-${address.toLowerCase()}`
    const today = getTodayDate()
    const currentCount = getMessageCount(address)

    const data: MessageCount = {
      count: currentCount + 1,
      date: today,
    }

    localStorage.setItem(key, JSON.stringify(data))

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('messageCountChanged', {
      detail: { address, count: data.count }
    }))
  } catch (error) {
    console.error('Error incrementing message count:', error)
  }
}

// Check if user can send message
export function canSendMessage(address: Address): boolean {
  // Premium users have unlimited messages
  if (isPremiumUser(address)) {
    return true
  }
  
  // Free users have daily limit
  const count = getMessageCount(address)
  return count < FREE_DAILY_MESSAGE_LIMIT
}

// Get remaining messages for free users
export function getRemainingMessages(address: Address): number {
  if (isPremiumUser(address)) {
    return Infinity
  }
  
  const count = getMessageCount(address)
  return Math.max(0, FREE_DAILY_MESSAGE_LIMIT - count)
}

// Get time until reset (midnight)
export function getTimeUntilReset(): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const diff = tomorrow.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${hours}h ${minutes}m`
}

