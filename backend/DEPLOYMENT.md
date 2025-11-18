# Deployment Guide

## Backend Deployment on Render

### 1. Environment Variables on Render

Add these environment variables in your Render dashboard:

```env
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/companies_directory?appName=Cluster0
NODE_ENV=production
```

### 2. Build & Start Commands

**Build Command:** (Leave empty or use `npm install`)
```
npm install
```

**Start Command:**
```
npm start
```

### 3. Health Check

Your server will be available at:
- Root: `https://flm-7yrn.onrender.com/` - Shows server status
- Health: `https://flm-7yrn.onrender.com/api/health` - Health check endpoint
- API: `https://flm-7yrn.onrender.com/api/companies` - Companies endpoint

### 4. CORS Configuration

The server is configured to allow all origins. For production, you may want to restrict this to your frontend domain:

```javascript
const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

## Frontend Deployment

### 1. Environment Variables

Create a `.env` file in the `flm` folder:

```env
REACT_APP_API_URL=https://flm-7yrn.onrender.com/api
```

### 2. Build for Production

```bash
cd flm
npm run build
```

### 3. Deploy Frontend

You can deploy the frontend to:
- **Vercel** (Recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **Render** (Static site)

### 4. Update API URL

Make sure your frontend `.env` file points to your Render backend URL.

## Testing Deployment

1. **Check Backend:**
   - Visit: `https://flm-7yrn.onrender.com/`
   - Should show: Server status JSON

2. **Check API:**
   - Visit: `https://flm-7yrn.onrender.com/api/companies`
   - Should show: Companies JSON data

3. **Check Frontend:**
   - Should connect to backend and display companies

## Troubleshooting

### Backend Issues

- **"Cannot GET /"** - Make sure root route is configured
- **CORS errors** - Check CORS configuration in server.js
- **Database connection** - Verify MONGODB_URI in Render environment variables
- **Port issues** - Render uses PORT environment variable automatically

### Frontend Issues

- **API connection failed** - Check REACT_APP_API_URL in .env
- **CORS errors** - Backend CORS must allow frontend domain
- **Build errors** - Run `npm install` before building

## Notes

- Render free tier may spin down after inactivity (cold start delay)
- First request after spin-down may take 30-60 seconds
- Consider upgrading to paid tier for always-on service

