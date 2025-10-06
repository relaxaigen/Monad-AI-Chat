'use client'

import { useEffect, useRef, useState } from 'react'
import { Chat } from '@/types/chat'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { LoadingIndicator } from './LoadingIndicator'
import { StreamingMessage } from './StreamingMessage'
import { useChat } from '@/hooks/useChat'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface ChatInterfaceProps {
  initialChat: Chat
  onChatUpdate: (chat: Chat) => void
}

export function ChatInterface({ initialChat, onChatUpdate }: ChatInterfaceProps) {
  const { chat, isLoading, streamingMessage, sendMessage, updateChat } = useChat(initialChat)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateChat(initialChat)
  }, [initialChat.id])

  useEffect(() => {
    onChatUpdate(chat)
  }, [chat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages, isLoading, streamingMessage])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {chat.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative inline-block mb-8"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-white mb-4 tracking-tight"
              >
                Welcome to Monad AI
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-lg mb-8 leading-relaxed"
              >
                Start a conversation with AI on Monad testnet
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
              >
                {[
                  { icon: '💬', title: 'Natural Conversations', desc: 'Chat naturally with AI' },
                  { icon: '⚡', title: 'Fast Responses', desc: 'Get instant answers' },
                  { icon: '🔒', title: 'Secure & Private', desc: 'Your data stays safe' },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-200"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h3 className="text-sm font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto py-8">
            {chat.messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
            {streamingMessage && (
              <StreamingMessage content={streamingMessage} />
            )}
            {isLoading && !streamingMessage && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  )
}

