'use client'

import { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])

  return (
    <div className="relative border-t border-white/5 bg-black/40 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto p-6">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={disabled}
              rows={1}
              className="w-full bg-white/[0.03] text-white rounded-2xl px-5 py-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 placeholder-gray-500 transition-all duration-200"
              style={{
                minHeight: '56px',
                maxHeight: '200px',
              }}
            />
            {!input && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Sparkles className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSend}
            disabled={disabled || !input.trim()}
            className="relative group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl p-4 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-500/20"
          >
            <Send className="w-5 h-5" />
            {input.trim() && !disabled && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"
              />
            )}
          </motion.button>
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}

