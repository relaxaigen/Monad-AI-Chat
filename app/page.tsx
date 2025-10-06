'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChatInterface } from '@/components/ChatInterface'
import { Sidebar } from '@/components/Sidebar'
import { Chat } from '@/types/chat'
import { createNewChat, generateChatTitle } from '@/lib/chatStorage'
import { loadChats, saveChat, deleteChat } from '@/lib/hybridStorage'
import { checkWalletTransactions, hasMinimumTransactions } from '@/lib/checkTransactions'
import { canSendMessage, incrementMessageCount, isPremiumUser, getRemainingMessages } from '@/lib/premium'
import { PremiumModal } from '@/components/PremiumModal'
import { PremiumBadge } from '@/components/PremiumBadge'
import { LimitReachedModal } from '@/components/LimitReachedModal'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, AlertCircle, Loader2 } from 'lucide-react'

export default function Home() {
  const { address, isConnected } = useAccount()
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)
  const [txCount, setTxCount] = useState(0)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [canSend, setCanSend] = useState(true)
  const [messageCount, setMessageCount] = useState(0) // Track message count for real-time updates

  // Load chat history on mount and when wallet connects
  useEffect(() => {
    async function loadChatHistory() {
      const history = await loadChats(address)
      setChats(history)
      if (history.length > 0) {
        setCurrentChat(history[0])
      } else {
        const newChat = createNewChat()
        setCurrentChat(newChat)
      }
    }
    loadChatHistory()
  }, [address])

  // Check wallet access and message limits when connected
  useEffect(() => {
    async function checkAccess() {
      if (!address || !isConnected) {
        setHasAccess(false)
        setTxCount(0)
        setCanSend(false)
        return
      }

      setIsCheckingAccess(true)
      try {
        const count = await checkWalletTransactions(address)
        setTxCount(count)
        setHasAccess(hasMinimumTransactions(count))

        // Check message limits
        setCanSend(canSendMessage(address))
        setMessageCount(getRemainingMessages(address))
      } catch (error) {
        console.error('Error checking access:', error)
        setHasAccess(false)
      } finally {
        setIsCheckingAccess(false)
      }
    }

    checkAccess()
  }, [address, isConnected])

  const handleNewChat = async () => {
    const newChat = createNewChat()
    setCurrentChat(newChat)
    await saveChat(newChat, address)
    setChats([newChat, ...chats])
  }

  const handleSelectChat = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId)
    if (chat) {
      setCurrentChat(chat)
    }
  }

  const handleDeleteChat = async (chatId: string) => {
    await deleteChat(chatId, address)
    const updatedChats = chats.filter((c) => c.id !== chatId)
    setChats(updatedChats)

    if (currentChat?.id === chatId) {
      if (updatedChats.length > 0) {
        setCurrentChat(updatedChats[0])
      } else {
        const newChat = createNewChat()
        setCurrentChat(newChat)
      }
    }
  }

  const handleChatUpdate = async (updatedChat: Chat) => {
    // Check if this is a new user message (increment count)
    if (address && currentChat) {
      const oldMessageCount = currentChat.messages.length
      const newMessageCount = updatedChat.messages.length

      // If a new user message was added
      if (newMessageCount > oldMessageCount) {
        const lastMessage = updatedChat.messages[updatedChat.messages.length - 1]
        if (lastMessage.role === 'user') {
          // Check if user can send message
          if (!canSendMessage(address)) {
            setShowLimitModal(true)
            return
          }
          // Increment message count for free users
          if (!isPremiumUser(address)) {
            incrementMessageCount(address)
            setCanSend(canSendMessage(address))
            setMessageCount(getRemainingMessages(address)) // Update count in real-time
          }
        }
      }
    }

    await saveChat(updatedChat, address)
    setChats((prev) => {
      const index = prev.findIndex((c) => c.id === updatedChat.id)
      if (index >= 0) {
        const newChats = [...prev]
        newChats[index] = updatedChat
        return newChats
      }
      return [updatedChat, ...prev]
    })
  }

  const handlePremiumSuccess = () => {
    if (address) {
      setCanSend(true)
      setMessageCount(getRemainingMessages(address)) // Update to show unlimited
      setShowPremiumModal(false)
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#0a0a0f]">
      {/* Header - Modern minimal design */}
      <header className="relative border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5" />
        <div className="relative px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-200 group"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              ) : (
                <Menu className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </motion.button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.6"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white tracking-tight">
                  Monad AI
                </h1>
                <p className="text-xs text-gray-500">Built on Monad Testnet</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && address && (
              <PremiumBadge
                onUpgradeClick={() => setShowPremiumModal(true)}
                messageCount={messageCount}
              />
            )}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          chats={chats}
          currentChatId={currentChat?.id || null}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          isOpen={sidebarOpen}
        />

        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] via-transparent to-purple-500/[0.03]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/[0.08] via-transparent to-transparent" />

          {!isConnected ? (
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-lg px-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative w-24 h-24 mx-auto mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur-xl opacity-40 animate-pulse" />
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-white mb-4 tracking-tight"
                >
                  Connect Your Wallet
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  Connect your Monad testnet wallet to start chatting with AI
                </motion.p>
              </motion.div>
            </div>
          ) : isCheckingAccess ? (
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-2xl animate-pulse" />
                  <Loader2 className="relative w-16 h-16 text-violet-500 animate-spin mx-auto mb-6" />
                </div>
                <p className="text-gray-400 text-lg">Verifying wallet eligibility...</p>
              </motion.div>
            </div>
          ) : !hasAccess ? (
            <div className="flex-1 flex items-center justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-lg px-6"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative w-24 h-24 mx-auto mb-8"
                >
                  <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl" />
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  Insufficient Activity
                </h2>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  You need at least 3 transactions on Monad testnet to access the chat.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-sm text-gray-400">Current transactions:</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{txCount}</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-lg text-gray-400">3</span>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  Make a few transactions on Monad testnet and refresh the page
                </p>
              </motion.div>
            </div>
          ) : currentChat ? (
            <ChatInterface
              initialChat={currentChat}
              onChatUpdate={handleChatUpdate}
            />
          ) : null}
        </main>
      </div>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSuccess={handlePremiumSuccess}
      />

      {/* Limit Reached Modal */}
      <LimitReachedModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        onUpgrade={() => {
          setShowLimitModal(false)
          setShowPremiumModal(true)
        }}
      />
    </div>
  )
}
