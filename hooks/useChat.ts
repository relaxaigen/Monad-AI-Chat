import { useState, useCallback } from 'react'
import { Message, Chat } from '@/types/chat'
import { saveChatToLocal, generateChatTitle } from '@/lib/chatStorage'

export function useChat(initialChat: Chat) {
  const [chat, setChat] = useState<Chat>(initialChat)
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState<string>('')

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    }

    // Update chat with user message
    const updatedMessages = [...chat.messages, userMessage]
    let updatedChat = {
      ...chat,
      messages: updatedMessages,
      updatedAt: Date.now(),
    }

    // Generate title from first message
    if (chat.messages.length === 0) {
      updatedChat.title = generateChatTitle(content)
    }

    setChat(updatedChat)
    saveChatToLocal(updatedChat)
    setIsLoading(true)
    setStreamingMessage('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      // Read the streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          fullText += chunk
          setStreamingMessage(fullText)
        }
      }

      // Create final assistant message
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: fullText,
        timestamp: Date.now(),
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      const finalChat = {
        ...updatedChat,
        messages: finalMessages,
        updatedAt: Date.now(),
      }

      setChat(finalChat)
      saveChatToLocal(finalChat)
      setStreamingMessage('')
    } catch (error) {
      console.error('Error sending message:', error)

      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      }

      const errorChat = {
        ...updatedChat,
        messages: [...updatedMessages, errorMessage],
        updatedAt: Date.now(),
      }

      setChat(errorChat)
      saveChatToLocal(errorChat)
      setStreamingMessage('')
    } finally {
      setIsLoading(false)
    }
  }, [chat, isLoading])

  const updateChat = useCallback((newChat: Chat) => {
    setChat(newChat)
  }, [])

  return {
    chat,
    isLoading,
    streamingMessage,
    sendMessage,
    updateChat,
  }
}

