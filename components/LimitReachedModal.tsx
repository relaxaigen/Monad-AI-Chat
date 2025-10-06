'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Crown, Zap } from 'lucide-react'
import { getTimeUntilReset } from '@/lib/premium'
import { useState, useEffect } from 'react'

interface LimitReachedModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

export function LimitReachedModal({ isOpen, onClose, onUpgrade }: LimitReachedModalProps) {
  const [resetTime, setResetTime] = useState('')

  useEffect(() => {
    setResetTime(getTimeUntilReset())
    const interval = setInterval(() => {
      setResetTime(getTimeUntilReset())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-pink-500/10" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 15 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-white text-center mb-2"
                >
                  Daily Limit Reached
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-gray-400 text-center mb-8"
                >
                  You've used all 10 free messages for today
                </motion.p>

                {/* Reset Timer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6"
                >
                  <Clock className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">Messages reset in</p>
                    <p className="text-lg font-semibold text-white">{resetTime}</p>
                  </div>
                </motion.div>

                {/* Options */}
                <div className="space-y-3">
                  {/* Upgrade Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={onUpgrade}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
                  >
                    <Crown className="w-5 h-5" />
                    <span>Upgrade to Premium - 1 MON</span>
                  </motion.button>

                  {/* Wait Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={onClose}
                    className="w-full py-3 px-6 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] text-gray-300 font-medium transition-all duration-200 border border-white/10"
                  >
                    Wait for Reset
                  </motion.button>
                </div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20"
                >
                  <p className="text-sm text-violet-300 text-center">
                    <strong>Premium benefits:</strong> Unlimited messages, no daily limits, priority support
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

