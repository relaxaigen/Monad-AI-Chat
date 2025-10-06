'use client'

import { Message } from '@/types/chat'
import { motion } from 'framer-motion'
import { User, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex gap-4 px-6 py-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20 ring-1 ring-white/10">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3.5 ${
          isUser
            ? 'bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
            : 'bg-white/[0.03] text-gray-100 border border-white/10 backdrop-blur-sm'
        }`}
      >
        {isUser ? (
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="text-[15px] leading-relaxed mb-3 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-3 last:mb-0 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-3 last:mb-0 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-[15px] leading-relaxed text-gray-200">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-300">{children}</em>
                ),
                code: ({ children, className }) => {
                  const isInline = !className
                  return isInline ? (
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-violet-300 text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block px-4 py-3 rounded-lg bg-black/40 text-gray-300 text-sm font-mono overflow-x-auto border border-white/10">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="mb-3 last:mb-0">{children}</pre>
                ),
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold text-white mb-3">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold text-white mb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-white mb-2">{children}</h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-violet-500 pl-4 italic text-gray-300 mb-3">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-400/20 ring-1 ring-white/10">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </motion.div>
  )
}

