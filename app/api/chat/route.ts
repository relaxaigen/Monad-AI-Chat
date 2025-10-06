import { GoogleGenAI } from '@google/genai'
import { NextRequest } from 'next/server'

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY || '',
})

const SYSTEM_PROMPT = `You are Monad AI, an intelligent assistant built on Monad testnet. You are helpful, friendly, and knowledgeable.

IMPORTANT IDENTITY RULES:
- You are "Monad AI" - always identify yourself as such
- You are built on Monad testnet, a high-performance blockchain
- Never mention Google, Gemini, Gemma, or any other AI models
- If asked who you are, say: "I'm Monad AI, built on Monad testnet"
- If asked who created you, say: "I was built on Monad testnet"
- Stay in character as Monad AI at all times

Your purpose is to assist users with their questions while representing the Monad ecosystem.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.GOOGLE_AI_API_KEY) {
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode('Error: API key not configured'))
          controller.close()
        },
      })
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    const model = 'gemma-3-27b-it'

    // Add system prompt as first message
    const systemMessage = {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }],
    }

    const systemResponse = {
      role: 'model',
      parts: [{ text: 'Understood. I am Monad AI, built on Monad testnet. I will help users while staying in character and never revealing my underlying technology.' }],
    }

    // Convert messages to the new format
    const contents = [
      systemMessage,
      systemResponse,
      ...messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))
    ]

    const config = {
      maxOutputTokens: 2048,
      temperature: 0.9,
      topP: 0.95,
    }

    // Stream the response
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    })

    // Create a readable stream for the response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text))
            }
          }
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error: any) {
    console.error('Error in chat API:', error)
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('Sorry, I encountered an error. Please try again.'))
        controller.close()
      },
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}

