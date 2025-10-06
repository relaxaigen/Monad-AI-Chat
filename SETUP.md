# Setup Guide for Monad AI Chat

## Quick Start

### 1. Get Google AI Studio API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### 2. Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace `your_google_ai_studio_api_key_here` with your actual API key:
   ```
   GOOGLE_AI_API_KEY=AIzaSy...your_actual_key_here
   ```

### 3. Install Dependencies (if not already done)

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Setting Up Monad Testnet Wallet

### Option 1: MetaMask

1. Open MetaMask
2. Click on the network dropdown
3. Click "Add Network" or "Add a network manually"
4. Enter the following details:
   - **Network Name**: Monad Testnet
   - **RPC URL**: https://testnet.monad.xyz
   - **Chain ID**: 41454
   - **Currency Symbol**: MON
   - **Block Explorer URL**: https://explorer.testnet.monad.xyz

### Option 2: Use RainbowKit's Built-in Connection

The app uses RainbowKit which will automatically prompt you to add the Monad testnet when you connect your wallet.

## Getting Test Transactions

To use the chat, you need at least 3 transactions on Monad testnet:

1. Get Monad testnet tokens from a faucet (check Monad's official channels)
2. Make a few test transactions:
   - Send tokens to another address
   - Interact with a test contract
   - Make any on-chain transaction

3. Wait for the transactions to be confirmed

## Testing the Application

### Test Checklist

- [ ] Application loads without errors
- [ ] Can connect wallet via RainbowKit
- [ ] Transaction count is displayed correctly
- [ ] Access is granted with 3+ transactions
- [ ] Access is denied with less than 3 transactions
- [ ] Can create a new chat
- [ ] Can send messages to AI
- [ ] AI responds correctly
- [ ] Chat history is saved
- [ ] Can switch between chats
- [ ] Can delete chats
- [ ] Sidebar opens and closes
- [ ] Animations work smoothly

## Troubleshooting

### "Failed to generate response" Error

- Check that your Google AI API key is correct in `.env.local`
- Restart the development server after changing environment variables
- Check the browser console for detailed error messages

### Wallet Connection Issues

- Make sure you're on Monad testnet
- Try disconnecting and reconnecting your wallet
- Clear browser cache and try again

### Transaction Count Not Updating

- Make sure your wallet is connected
- Check that the RPC URL is accessible
- Wait a few seconds and refresh the page

### Chat Not Saving

- Check browser console for localStorage errors
- Make sure you're not in private/incognito mode
- Try a different browser

## Development Tips

### Hot Reload

Next.js has hot reload enabled by default. Any changes you make to the code will automatically refresh the browser.

### Viewing Logs

- **Browser Console**: Right-click → Inspect → Console tab
- **Server Logs**: Check the terminal where you ran `npm run dev`

### Modifying the UI

- Colors are defined in `app/globals.css` and component files
- Purple theme uses Tailwind classes like `purple-500`, `purple-600`, etc.
- Animations are controlled by Framer Motion in component files

## Optional: Deploy Smart Contract

If you want to enable on-chain chat storage:

1. Install Hardhat or Foundry
2. Configure deployment script for Monad testnet
3. Deploy `contracts/ChatHistory.sol`
4. Update `CHAT_HISTORY_CONTRACT_ADDRESS` in `lib/onchainStorage.ts`
5. Extend the UI to add on-chain save functionality

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `GOOGLE_AI_API_KEY`
5. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

Make sure to set the `GOOGLE_AI_API_KEY` environment variable on your deployment platform.

## Support

If you encounter any issues:
1. Check this guide first
2. Review the main README.md
3. Check browser console for errors
4. Open an issue on GitHub with details

---

Happy building! 🚀

