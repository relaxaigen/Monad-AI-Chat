# Chat History Smart Contract

This smart contract allows users to store their chat history on-chain on the Monad testnet.

## Features

- Store chat messages on-chain
- Retrieve chat history
- Delete chats
- Each user's chats are private to their wallet address

## Deployment Instructions

1. Install Hardhat or Foundry for contract deployment
2. Configure Monad testnet RPC in your deployment script
3. Deploy the contract to Monad testnet
4. Update the contract address in the frontend configuration

## Contract Address

After deployment, update the contract address in:
- `lib/onchainStorage.ts`

## Functions

- `saveChat(chatId, title, roles, contents, timestamps)` - Save a chat to the blockchain
- `getChat(chatId)` - Retrieve a chat by ID
- `getUserChatIds()` - Get all chat IDs for the connected user
- `deleteChat(chatId)` - Delete a chat
- `getChatCount()` - Get the number of chats for the user

