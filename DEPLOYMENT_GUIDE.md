# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Monad AI Chat"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" or "Login" (use GitHub account)

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Done! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - What's your project's name? **monad-ai-chat**
   - In which directory is your code located? **.**
   - Want to override settings? **N**

4. **Add Environment Variables**
   ```bash
   vercel env add GOOGLE_AI_API_KEY
   vercel env add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔑 Getting Required API Keys

### 1. Google AI API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to Vercel as `GOOGLE_AI_API_KEY`

### 2. WalletConnect Project ID

1. Go to: https://cloud.walletconnect.com
2. Sign up / Login
3. Click "Create New Project"
4. Name it "Monad AI Chat"
5. Copy the "Project ID"
6. Add to Vercel as `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

## 📋 Pre-Deployment Checklist

### ✅ Required Files (Already Done)

- ✅ `package.json` - Dependencies
- ✅ `next.config.ts` - Next.js config
- ✅ `tsconfig.json` - TypeScript config
- ✅ `.gitignore` - Git ignore rules
- ✅ All source files

### ✅ Environment Variables Needed

1. **`GOOGLE_AI_API_KEY`**
   - Required for AI chat
   - Get from Google AI Studio
   - Keep secret (server-side only)

2. **`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`**
   - Required for wallet connection
   - Get from WalletConnect Cloud
   - Public (client-side accessible)

### ⚠️ Important Notes

- **Don't commit `.env.local`** - Already in `.gitignore`
- **Add env vars in Vercel dashboard** - Not in code
- **Use `NEXT_PUBLIC_` prefix** - For client-side variables

## 🔧 Vercel Configuration

### Automatic Settings (No Changes Needed)

Vercel auto-detects:
- ✅ Framework: Next.js 15
- ✅ Node Version: 18.x or higher
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

### Custom Settings (Optional)

If you need to customize, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## 🌐 After Deployment

### 1. Get Your URL

After deployment, Vercel gives you:
- **Production URL**: `https://your-project.vercel.app`
- **Preview URLs**: For each git push

### 2. Test Your App

1. Visit your Vercel URL
2. Connect wallet
3. Send a test message
4. Check premium features
5. Verify everything works

### 3. Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Click your project
3. Go to "Settings" → "Domains"
4. Add your custom domain
5. Follow DNS instructions

## 🐛 Troubleshooting

### Build Fails

**Error: Missing environment variables**
```
Solution: Add env vars in Vercel dashboard
```

**Error: Module not found**
```bash
# Clear cache and rebuild
vercel --force
```

**Error: TypeScript errors**
```bash
# Check locally first
npm run build
```

### Runtime Errors

**Error: API key not found**
```
Solution: Check env vars are set in Vercel
Go to: Settings → Environment Variables
```

**Error: Wallet not connecting**
```
Solution: Check NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set
Make sure it has NEXT_PUBLIC_ prefix
```

**Error: AI not responding**
```
Solution: Check GOOGLE_AI_API_KEY is valid
Test key at: https://aistudio.google.com
```

## 📊 Deployment Checklist

### Before Deploying

- [ ] Code pushed to GitHub
- [ ] Google AI API key obtained
- [ ] WalletConnect Project ID obtained
- [ ] `.env.local` not committed
- [ ] Build works locally (`npm run build`)

### During Deployment

- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Build successful
- [ ] No errors in build logs

### After Deployment

- [ ] Site loads correctly
- [ ] Wallet connection works
- [ ] AI chat works
- [ ] Premium features work
- [ ] No console errors

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected to GitHub:
- ✅ Push to `main` → Auto deploy to production
- ✅ Push to other branches → Auto deploy to preview
- ✅ Pull requests → Auto deploy to preview

### Manual Deployments

```bash
# Deploy current code
vercel

# Deploy to production
vercel --prod

# Deploy specific branch
git checkout feature-branch
vercel
```

## 📈 Monitoring

### Vercel Dashboard

Monitor your app:
- **Analytics**: Page views, visitors
- **Logs**: Runtime logs, errors
- **Performance**: Load times, Core Web Vitals
- **Deployments**: History, rollbacks

### Access Logs

```bash
# View logs
vercel logs YOUR_DEPLOYMENT_URL

# Follow logs in real-time
vercel logs YOUR_DEPLOYMENT_URL --follow
```

## 🎯 Production Optimizations

### Already Optimized

- ✅ Next.js 15 with Turbopack
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Font optimization
- ✅ Static generation where possible

### Additional Optimizations (Optional)

1. **Enable Analytics**
   ```bash
   npm install @vercel/analytics
   ```

2. **Enable Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```

3. **Add to `app/layout.tsx`**
   ```typescript
   import { Analytics } from '@vercel/analytics/react'
   import { SpeedInsights } from '@vercel/speed-insights/next'
   
   // Add to layout
   <Analytics />
   <SpeedInsights />
   ```

## 🔐 Security

### Environment Variables

- ✅ Never commit API keys
- ✅ Use Vercel env vars
- ✅ Rotate keys regularly
- ✅ Use different keys for dev/prod

### Best Practices

- ✅ HTTPS enabled by default
- ✅ Secure headers configured
- ✅ API routes protected
- ✅ Client-side validation

## 💰 Pricing

### Vercel Free Tier (Hobby)

Perfect for this project:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Analytics (basic)

### When to Upgrade

Only if you need:
- More bandwidth (>100GB/month)
- Team collaboration
- Advanced analytics
- Priority support

## 🎉 You're Done!

Your Monad AI Chat is now live on Vercel! 🚀

**Next Steps:**
1. Share your URL
2. Test all features
3. Monitor analytics
4. Collect feedback
5. Iterate and improve

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

