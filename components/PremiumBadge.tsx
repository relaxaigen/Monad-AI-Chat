'use client'

import { motion } from 'framer-motion'
import { Crown, Zap } from 'lucide-react'
import { useAccount } from 'wagmi'
import { isPremiumUser, getRemainingMessages, getTimeUntilReset } from '@/lib/premium'
import { useState, useEffect } from 'react'

interface PremiumBadgeProps {
  onUpgradeClick: () => void
  messageCount?: number // Add prop to trigger updates
}

export function PremiumBadge({ onUpgradeClick, messageCount }: PremiumBadgeProps) {
  const { address } = useAccount()
  const [isPremium, setIsPremium] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const [resetTime, setResetTime] = useState('')

  // Update when address changes or messageCount changes
  useEffect(() => {
    if (address) {
      setIsPremium(isPremiumUser(address))
      setRemaining(getRemainingMessages(address))
      setResetTime(getTimeUntilReset())
    }
  }, [address, messageCount]) // Added messageCount dependency

  // Update reset time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setResetTime(getTimeUntilReset())
      // Also update remaining messages in case day changed
      if (address) {
        setRemaining(getRemainingMessages(address))
      }
    }, 60000)
    return () => clearInterval(interval)
  }, [address])

  // Listen for localStorage changes (for cross-tab updates)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('monad-message-count') || e.key?.includes('monad-premium-users')) {
        if (address) {
          setIsPremium(isPremiumUser(address))
          setRemaining(getRemainingMessages(address))
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [address])

  // Listen for custom events (for same-tab updates)
  useEffect(() => {
    const handleMessageCountChange = () => {
      if (address) {
        setRemaining(getRemainingMessages(address))
      }
    }

    const handlePremiumStatusChange = () => {
      if (address) {
        setIsPremium(isPremiumUser(address))
        setRemaining(getRemainingMessages(address))
      }
    }

    window.addEventListener('messageCountChanged', handleMessageCountChange)
    window.addEventListener('premiumStatusChanged', handlePremiumStatusChange)

    return () => {
      window.removeEventListener('messageCountChanged', handleMessageCountChange)
      window.removeEventListener('premiumStatusChanged', handlePremiumStatusChange)
    }
  }, [address])

  if (!address) return null

  if (isPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30"
      >
        <Crown className="w-4 h-4 text-violet-400" />
        <span className="text-sm font-medium text-violet-300">Premium</span>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Message Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10"
      >
        <Zap className={`w-4 h-4 ${remaining <= 3 ? 'text-orange-400' : 'text-gray-400'}`} />
        <span className={`text-sm font-medium ${remaining <= 3 ? 'text-orange-300' : 'text-gray-300'}`}>
          {remaining}/10 messages
        </span>
      </motion.div>

      {/* Upgrade Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onUpgradeClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-violet-500/20"
      >
        <Crown className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Upgrade</span>
      </motion.button>
    </div>
  )
}

