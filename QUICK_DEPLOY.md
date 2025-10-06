# 🚀 Quick Deploy to Vercel (5 Minutes)

## Step 1: Get API Keys (2 minutes)

### Google AI API Key
1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)
4. Save it somewhere safe

### WalletConnect Project ID
1. Go to: https://cloud.walletconnect.com
2. Sign up with GitHub
3. Click "Create New Project"
4. Name: "Monad AI Chat"
5. Copy the Project ID
6. Save it somewhere safe

## Step 2: Push to GitHub (1 minute)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Monad AI Chat"

# Create GitHub repo at: https://github.com/new
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (2 minutes)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" (use GitHub)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find your repo → Click "Import"

3. **Add Environment Variables**
   Click "Environment Variables" section:
   
   **Variable 1:**
   - Name: `GOOGLE_AI_API_KEY`
   - Value: `YOUR_GOOGLE_AI_KEY_HERE`
   
   **Variable 2:**
   - Name: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Value: `YOUR_WALLETCONNECT_PROJECT_ID_HERE`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes ⏳
   - Done! 🎉

## Step 4: Test Your App

1. Click "Visit" button
2. Your app opens at: `https://your-project.vercel.app`
3. Connect wallet
4. Send a test message
5. Works! ✅

## 🎯 That's It!

Your Monad AI Chat is now live! 🚀

**Your URL:** `https://your-project.vercel.app`

---

## 🔧 Troubleshooting

### Build Failed?

**Check environment variables:**
1. Go to Vercel Dashboard
2. Click your project
3. Settings → Environment Variables
4. Make sure both keys are added

**Redeploy:**
1. Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

### App Not Working?

**Check browser console (F12):**
- If you see API errors → Check `GOOGLE_AI_API_KEY`
- If wallet won't connect → Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

**Fix:**
1. Update env vars in Vercel
2. Redeploy

---

## 📱 Share Your App

Your app is live at:
```
https://your-project-name.vercel.app
```

Share it with:
- Twitter/X
- Discord
- Telegram
- Friends

---

## 🎨 Custom Domain (Optional)

Want `monad-ai.com` instead of `.vercel.app`?

1. Buy domain (Namecheap, GoDaddy, etc.)
2. Vercel Dashboard → Settings → Domains
3. Add your domain
4. Update DNS records
5. Done! 🎉

---

**Need help? Check `DEPLOYMENT_GUIDE.md` for detailed instructions!**

