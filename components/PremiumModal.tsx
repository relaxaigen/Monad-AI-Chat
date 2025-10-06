'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Zap, Crown, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { PREMIUM_RECEIVER_ADDRESS, PREMIUM_PRICE, addPremiumUser } from '@/lib/premium'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PremiumModal({ isOpen, onClose, onSuccess }: PremiumModalProps) {
  const { address } = useAccount()
  const [isPurchasing, setIsPurchasing] = useState(false)
  
  const { data: hash, sendTransaction } = useSendTransaction()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const handlePurchase = async () => {
    if (!address) return
    
    setIsPurchasing(true)
    
    try {
      sendTransaction({
        to: PREMIUM_RECEIVER_ADDRESS,
        value: parseEther('1'),
      })
    } catch (error) {
      console.error('Error purchasing premium:', error)
      setIsPurchasing(false)
    }
  }

  // Handle successful transaction
  if (isSuccess && hash) {
    if (address) {
      addPremiumUser(address, hash)
      onSuccess()
      onClose()
    }
  }

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
              className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10" />
              
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
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
                >
                  <Crown className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-white text-center mb-2"
                >
                  Upgrade to Premium
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-gray-400 text-center mb-8"
                >
                  Unlock unlimited AI conversations
                </motion.p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Zap, text: 'Unlimited messages per day', highlight: true },
                    { icon: Sparkles, text: 'Priority AI responses', highlight: false },
                    { icon: Check, text: 'No daily limits', highlight: false },
                    { icon: Crown, text: 'Premium badge', highlight: false },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        feature.highlight
                          ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30'
                          : 'bg-white/[0.02]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        feature.highlight
                          ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                          : 'bg-white/5'
                      }`}>
                        <feature.icon className={`w-5 h-5 ${
                          feature.highlight ? 'text-white' : 'text-violet-400'
                        }`} />
                      </div>
                      <span className="text-gray-200">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Price */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-4xl font-bold text-white">1</span>
                    <span className="text-xl text-gray-400">MON</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">One-time payment • Lifetime access</p>
                </motion.div>

                {/* Purchase Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={handlePurchase}
                  disabled={isPurchasing || isConfirming}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isConfirming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming...</span>
                    </>
                  ) : isPurchasing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5" />
                      <span>Upgrade Now</span>
                    </>
                  )}
                </motion.button>

                {/* Info */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-xs text-gray-500 text-center mt-4"
                >
                  Payment will be sent to the Monad AI treasury
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

