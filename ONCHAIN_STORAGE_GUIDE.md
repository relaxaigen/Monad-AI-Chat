# On-Chain Chat History - Implementation Guide

## 🎉 What's Implemented

Your chat history is now saved **on-chain** to Monad testnet! This means:
- ✅ Access your chats from any device with the same wallet
- ✅ Chats are permanently stored on the blockchain
- ✅ LocalStorage backup for offline access
- ✅ Automatic sync between devices

## 📋 Current Status

### ✅ Completed
1. **Smart Contract** - `contracts/ChatHistory.sol`
   - Stores chat messages on-chain
   - Per-wallet chat history
   - CRUD operations (Create, Read, Update, Delete)

2. **Hybrid Storage System** - `lib/hybridStorage.ts`
   - Saves to both localStorage AND blockchain
   - Loads from blockchain first, fallback to localStorage
   - Automatic sync

3. **Integration** - `app/page.tsx`
   - Loads chats from blockchain when wallet connects
   - Saves new chats to blockchain automatically
   - Deletes from blockchain when you delete a chat

### ⏳ Pending
1. **Deploy Smart Contract** to Monad testnet
2. **Update Contract Address** in `lib/onchainStorage.ts`

## 🚀 How to Deploy the Contract

### Option 1: Using Remix (Easiest)

1. **Go to Remix IDE**
   - Visit: https://remix.ethereum.org

2. **Create New File**
   - Create `ChatHistory.sol`
   - Copy content from `contracts/ChatHistory.sol`

3. **Compile Contract**
   - Click "Solidity Compiler" tab
   - Select compiler version `0.8.20`
   - Click "Compile ChatHistory.sol"

4. **Deploy to Monad Testnet**
   - Click "Deploy & Run Transactions" tab
   - Environment: Select "Injected Provider - MetaMask"
   - Make sure MetaMask is connected to Monad testnet
   - Click "Deploy"
   - Confirm transaction in MetaMask

5. **Copy Contract Address**
   - After deployment, copy the contract address
   - Update `CHAT_HISTORY_CONTRACT_ADDRESS` in `lib/onchainStorage.ts`

### Option 2: Using Hardhat

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat
npx hardhat init

# Copy contract to contracts folder
cp contracts/ChatHistory.sol hardhat-project/contracts/

# Create deployment script
# (See deployment script below)

# Deploy
npx hardhat run scripts/deploy.ts --network monadTestnet
```

**Deployment Script** (`scripts/deploy.ts`):
```typescript
import { ethers } from "hardhat";

async function main() {
  const ChatHistory = await ethers.getContractFactory("ChatHistory");
  const chatHistory = await ChatHistory.deploy();
  await chatHistory.deployed();

  console.log("ChatHistory deployed to:", chatHistory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Hardhat Config** (`hardhat.config.ts`):
```typescript
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10143,
      accounts: [process.env.PRIVATE_KEY!]
    }
  }
};

export default config;
```

## 📝 After Deployment

### Update Contract Address

1. **Open** `lib/onchainStorage.ts`

2. **Find this line** (line 6):
```typescript
const CHAT_HISTORY_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as Address
```

3. **Replace with your deployed address**:
```typescript
const CHAT_HISTORY_CONTRACT_ADDRESS = '0xYOUR_DEPLOYED_ADDRESS_HERE' as Address
```

4. **Save the file**

5. **Restart dev server**:
```bash
npm run dev
```

## ✨ How It Works

### Saving Chats

```typescript
// When you send a message:
1. Message is added to chat
2. Chat is saved to localStorage (instant backup)
3. Chat is saved to blockchain (permanent storage)
4. Transaction is confirmed on Monad testnet
```

### Loading Chats

```typescript
// When you connect wallet:
1. App tries to load from blockchain first
2. If blockchain has chats, they are loaded
3. Blockchain chats sync to localStorage
4. If blockchain fails, fallback to localStorage
```

### Syncing Between Devices

```typescript
// Device 1:
- You chat and save to blockchain

// Device 2 (same wallet):
- Connect wallet
- Chats automatically load from blockchain
- You see all your previous chats!
```

## 🔧 Technical Details

### Smart Contract Functions

```solidity
// Save a chat
function saveChat(
  string chatId,
  string title,
  string[] roles,
  string[] contents,
  uint256[] timestamps
)

// Get a specific chat
function getChat(string chatId) returns (
  string title,
  string[] roles,
  string[] contents,
  uint256[] timestamps,
  uint256 createdAt,
  uint256 updatedAt
)

// Get all chat IDs for user
function getUserChatIds() returns (string[])

// Delete a chat
function deleteChat(string chatId)

// Get chat count
function getChatCount() returns (uint256)
```

### Gas Costs (Estimated)

- **Save Chat** (10 messages): ~0.001 MON
- **Delete Chat**: ~0.0005 MON
- **Read Chat**: Free (view function)

### Storage Structure

```
User Wallet Address
  ├── Chat 1
  │   ├── ID: "chat-123"
  │   ├── Title: "Hello Monad"
  │   ├── Messages: [...]
  │   ├── Created: timestamp
  │   └── Updated: timestamp
  ├── Chat 2
  └── Chat 3
```

## 🎯 Benefits

### For Users
- ✅ Access chats from any device
- ✅ Never lose chat history
- ✅ Truly decentralized storage
- ✅ Own your data

### For Developers
- ✅ No backend database needed
- ✅ Automatic sync
- ✅ Blockchain security
- ✅ Transparent and auditable

## 🐛 Troubleshooting

### "Contract not deployed yet"
- Deploy the contract using Remix or Hardhat
- Update the contract address in `lib/onchainStorage.ts`

### "Transaction failed"
- Make sure you have MON tokens for gas
- Check you're connected to Monad testnet
- Verify contract address is correct

### "Chats not loading from blockchain"
- Check browser console for errors
- Verify wallet is connected
- Make sure contract is deployed
- Check contract address is correct

## 📊 Current Implementation

### Files Modified
1. `lib/hybridStorage.ts` - New hybrid storage system
2. `lib/onchainStorage.ts` - Blockchain interaction
3. `app/page.tsx` - Integration with UI
4. `contracts/ChatHistory.sol` - Smart contract

### Files Created
1. `lib/contract.ts` - Contract ABI and address
2. `lib/hybridStorage.ts` - Hybrid storage wrapper

## 🚀 Next Steps

1. **Deploy Contract** to Monad testnet
2. **Update Address** in `lib/onchainStorage.ts`
3. **Test** by connecting wallet on two different devices
4. **Verify** chats sync between devices

---

**Once deployed, your chats will be accessible from any device with the same wallet!** 🎉

