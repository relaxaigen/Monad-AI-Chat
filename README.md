# Monad AI Chat 🚀

A modern, animated AI chat application built on Monad testnet with advanced AI capabilities. Users must connect their wallet and have at least 3 transactions on Monad testnet to access the chat.

## ✨ Features

- 🔐 **Wallet Authentication**: Connect with Monad testnet wallet
- 🎯 **Transaction Gating**: Requires 3+ transactions on Monad testnet
- 🤖 **AI-Powered Chat**: Advanced AI assistant via Google AI Studio
- 💬 **Chat History**: Save and manage multiple chat conversations
- 🎨 **Modern UI**: Beautiful purple-themed interface with smooth animations
- ⛓️ **On-Chain Storage**: Optional smart contract for storing chat history on-chain
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🌊 **Streaming Responses**: Real-time AI responses with typing effect

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Web3**: Wagmi, Viem, RainbowKit
- **AI**: Google Generative AI
- **Smart Contracts**: Solidity

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Monad testnet wallet with at least 3 transactions
- Google AI Studio API key

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_studio_api_key_here
   ```

   Get your Google AI Studio API key from: https://aistudio.google.com/app/apikey

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Monad Testnet Setup

The application is pre-configured for Monad testnet with the following details:
- **Chain ID**: 10143 (0x279f)
- **RPC URL**: https://testnet-rpc.monad.xyz
- **WebSocket**: wss://monad-testnet.drpc.org
- **Explorer**: https://testnet.monadexplorer.com
- **Block Gas Limit**: 150000000

### Wallet Requirements

To use the chat, your wallet must:
1. Be connected to Monad testnet
2. Have at least 3 transactions on the network

## 📝 Smart Contract Deployment (Optional)

To enable on-chain chat history storage:

1. **Navigate to the contracts directory**
   ```bash
   cd contracts
   ```

2. **Deploy the ChatHistory contract**

   Use Hardhat, Foundry, or Remix to deploy `ChatHistory.sol` to Monad testnet

3. **Update the contract address**

   Edit `lib/onchainStorage.ts` and update the `CHAT_HISTORY_CONTRACT_ADDRESS` constant with your deployed contract address

## 🎨 UI Features

- **Purple Theme**: Modern gradient design with purple accents
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Sidebar with chat history
- **Message Bubbles**: Distinct styling for user and AI messages
- **Loading States**: Animated typing indicators
- **Empty States**: Beautiful welcome screens

## 📂 Project Structure

```
monad-chat/
├── app/
│   ├── api/chat/route.ts         # AI chat API endpoint
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main chat page
│   └── globals.css               # Global styles
├── components/
│   ├── ChatInterface.tsx         # Main chat interface
│   ├── ChatMessage.tsx           # Message bubble component
│   ├── ChatInput.tsx             # Message input field
│   ├── Sidebar.tsx               # Chat history sidebar
│   └── LoadingIndicator.tsx     # Typing indicator
├── lib/
│   ├── wagmi.ts                  # Web3 configuration
│   ├── providers.tsx             # React providers
│   ├── checkTransactions.ts     # Transaction verification
│   ├── chatStorage.ts            # Local storage utilities
│   └── onchainStorage.ts         # On-chain storage utilities
├── hooks/
│   └── useChat.ts                # Chat state management hook
├── types/
│   └── chat.ts                   # TypeScript types
└── contracts/
    ├── ChatHistory.sol           # Smart contract
    └── README.md                 # Contract docs
```

## 🔐 Security Notes

- Chat history is stored locally in browser localStorage by default
- On-chain storage is optional and requires gas fees
- Never share your private keys or API keys
- The app only reads transaction count from your wallet

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Web3 integration via [Wagmi](https://wagmi.sh/) and [RainbowKit](https://www.rainbowkit.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Happy Chatting! 💜**
