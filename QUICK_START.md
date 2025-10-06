# 🚀 Quick Start Guide - Monad AI Chat

## ⚡ Get Started in 3 Steps

### Step 1: Configure API Key

1. **Get Google AI Studio API Key**
   - Visit: https://aistudio.google.com/app/apikey
   - Sign in with Google
   - Click "Create API Key"
   - Copy the key

2. **Add to Environment File**
   - Open `.env.local` in the project root
   - Replace the placeholder:
   ```
   GOOGLE_AI_API_KEY=AIzaSy...your_actual_key_here
   ```

### Step 2: Start the Application

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

### Step 3: Connect Your Wallet

1. Click "Connect Wallet" button
2. Select your wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection
4. Switch to Monad testnet if prompted

## 📋 Requirements Checklist

Before you can chat:

- ✅ Google AI API key configured
- ✅ Wallet connected to Monad testnet
- ✅ At least 3 transactions on Monad testnet

## 🔧 Monad Testnet Configuration

If your wallet doesn't have Monad testnet:

**Network Details:**
- Network Name: `Monad Testnet`
- RPC URL: `https://testnet.monad.xyz`
- Chain ID: `41454`
- Currency Symbol: `MON`
- Block Explorer: `https://explorer.testnet.monad.xyz`

## 💡 Getting Test Transactions

Need transactions on Monad testnet?

1. Get testnet MON tokens from a faucet
2. Make a few test transactions:
   - Send tokens to another address
   - Interact with any test contract
   - Any on-chain transaction counts

3. Wait for confirmations
4. Refresh the app

## 🎯 Using the Chat

### Creating a New Chat
- Click the "New Chat" button in the sidebar
- Start typing your message

### Sending Messages
- Type your message in the input field
- Press Enter to send (Shift+Enter for new line)
- Wait for AI response

### Managing Chat History
- All chats are saved automatically
- Click on any chat in the sidebar to open it
- Hover over a chat and click the trash icon to delete

### Sidebar Controls
- Click the menu icon (☰) to toggle sidebar
- Sidebar shows all your chat history
- Active chat is highlighted in purple

## 🎨 UI Features

### Color Scheme
- **Primary**: Purple gradients
- **Background**: Dark with subtle purple tint
- **Messages**: 
  - Your messages: Purple gradient
  - AI messages: Dark gray

### Animations
- Smooth transitions on all interactions
- Message slide-in animations
- Typing indicator while AI responds
- Hover effects on buttons

## 🔍 Troubleshooting

### "Failed to generate response"
**Solution:** 
- Check API key in `.env.local`
- Restart dev server: `Ctrl+C` then `npm run dev`

### "Insufficient Activity"
**Solution:**
- You need 3+ transactions on Monad testnet
- Current count is shown on the screen
- Make more transactions and refresh

### Wallet Won't Connect
**Solution:**
- Make sure you're on Monad testnet
- Try disconnecting and reconnecting
- Clear browser cache

### Chat Not Saving
**Solution:**
- Check if you're in private/incognito mode
- Try a different browser
- Check browser console for errors

## 📱 Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Esc` - Close sidebar (when open)

## 🎓 Tips for Best Experience

1. **Keep Messages Focused**: AI responds better to clear, specific questions
2. **Use Chat History**: Create separate chats for different topics
3. **Check Transaction Count**: Make sure you have enough transactions before starting
4. **Refresh if Needed**: If something seems stuck, refresh the page

## 🔐 Privacy & Security

- ✅ Chats stored locally in your browser
- ✅ No data sent to third parties (except Google AI for responses)
- ✅ Wallet only used for verification (read-only)
- ✅ No private keys ever accessed

## 📊 What's Happening Behind the Scenes

1. **Wallet Connection**: RainbowKit handles secure wallet connection
2. **Transaction Check**: App reads your transaction count from Monad RPC
3. **Access Control**: Grants/denies access based on transaction count
4. **AI Chat**: Messages sent to Google AI Studio API
5. **Storage**: Chats saved to browser localStorage

## 🚀 Next Steps

Once you're chatting:

- Explore different conversation topics
- Create multiple chats for organization
- Check out the smart contract in `/contracts` for on-chain storage
- Customize the UI colors in `app/globals.css`

## 📚 Additional Resources

- **Full Documentation**: See `README.md`
- **Setup Guide**: See `SETUP.md`
- **Features**: See `FEATURES.md`
- **Smart Contract**: See `contracts/README.md`

## 🆘 Need Help?

1. Check browser console (F12) for errors
2. Check terminal where `npm run dev` is running
3. Review the troubleshooting section above
4. Open an issue on GitHub with details

---

**You're all set! Start chatting with AI on Monad testnet! 💜**

Current Status: 
- ✅ Application running at http://localhost:3000
- ⏳ Waiting for you to configure API key and connect wallet
- 🎉 Ready to chat once requirements are met!

