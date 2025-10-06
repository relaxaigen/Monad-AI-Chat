'use client'

import { Chat } from '@/types/chat'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquarePlus, Trash2, MessageSquare } from 'lucide-react'

interface SidebarProps {
  chats: Chat[]
  currentChatId: string | null
  onSelectChat: (chatId: string) => void
  onNewChat: () => void
  onDeleteChat: (chatId: string) => void
  isOpen: boolean
}

export function Sidebar({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
}: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-80 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col h-full relative"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.02] to-transparent pointer-events-none" />

          <div className="relative p-4 border-b border-white/5">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onNewChat}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl px-4 py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-violet-500/20 font-medium"
            >
              <MessageSquarePlus className="w-5 h-5" />
              <span>New Chat</span>
            </motion.button>
          </div>

          <div className="relative flex-1 overflow-y-auto p-3 space-y-1.5">
            {chats.length === 0 ? (
              <div className="text-center text-gray-500 mt-12 px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 opacity-40" />
                </div>
                <p className="text-sm text-gray-600">No conversations yet</p>
                <p className="text-xs text-gray-700 mt-1">Start a new chat to begin</p>
              </div>
            ) : (
              chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`group relative rounded-xl p-3.5 cursor-pointer transition-all duration-200 ${
                    currentChatId === chat.id
                      ? 'bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 shadow-lg shadow-violet-500/5'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10'
                  }`}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-medium truncate transition-colors ${
                        currentChatId === chat.id ? 'text-white' : 'text-gray-300'
                      }`}>
                        {chat.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <p className="text-xs text-gray-500">
                          {chat.messages.length} {chat.messages.length === 1 ? 'message' : 'messages'}
                        </p>
                        {currentChatId === chat.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        )}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteChat(chat.id)
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

