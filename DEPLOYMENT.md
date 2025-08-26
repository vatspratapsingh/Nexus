# NEXUS - Deployment Guide for Render

## Prerequisites ✅
- MongoDB Atlas database configured
- GitHub repository with your code
- Render account

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Verify Files
- ✅ `render.yaml` - Deployment configuration
- ✅ `backend/package.json` - Backend dependencies
- ✅ `frontend/package.json` - Frontend dependencies
- ✅ `package.json` - Root build scripts

## Step 2: Deploy to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `nexus-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

### 2.3 Set Environment Variables (Backend)
Add these in Render dashboard:
```
NODE_ENV=production
MONGO_URL=mongodb+srv://Nexus_user:Vats_020879@nexus.h0n0ifx.mongodb.net/nexus?retryWrites=true&w=majority
JWT_SECRET_KEY=nexus-super-secret-jwt-key-2024-production
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
PORT=10000
```

### 2.4 Deploy Frontend
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `nexus-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Plan**: Free

### 2.5 Set Environment Variables (Frontend)
Add in Render dashboard:
```
VITE_STREAM_API_KEY=your-stream-api-key
```

## Step 3: Update CORS (After Deployment)

After getting your frontend URL, update `backend/src/server.js`:

```javascript
origin: process.env.NODE_ENV === "production" 
    ? ["https://your-frontend-url.onrender.com"]
    : ["http://localhost:5173", "http://localhost:5174"],
```

## Step 4: Test Deployment

1. **Backend**: `https://nexus-backend.onrender.com/api/users`
2. **Frontend**: `https://nexus-frontend.onrender.com`

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check build logs in Render
2. **CORS Errors**: Update CORS origins with correct frontend URL
3. **Database Connection**: Verify MongoDB Atlas network access allows all IPs
4. **Environment Variables**: Ensure all variables are set in Render dashboard

### MongoDB Atlas Setup:
1. Go to MongoDB Atlas dashboard
2. Network Access → Add IP Address → Allow Access from Anywhere
3. Database Access → Verify user credentials

## Optional: Stream Chat Setup

For full functionality, get Stream Chat API keys:
1. Go to [getstream.io](https://getstream.io)
2. Create account and app
3. Get API Key and Secret
4. Update environment variables in Render

## URLs After Deployment:
- **Frontend**: `https://nexus-frontend.onrender.com`
- **Backend**: `https://nexus-backend.onrender.com`
