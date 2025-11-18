# Troubleshooting Guide

## "Failed to fetch" Error

If you're seeing "Failed to fetch" errors, follow these steps:

### 1. Check if Backend Server is Running

**Start the backend server:**
```bash
cd backend
npm start
```

You should see:
```
MongoDB Connected
Server running on port 5000
```

### 2. Verify Backend is Accessible

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{"status":"OK","message":"Server is running"}
```

### 3. Check MongoDB Connection

Make sure MongoDB is connected. In the backend console, you should see:
```
MongoDB Connected
```

If you see an error, check your `.env` file in the `backend` directory:

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/companies_directory?appName=Cluster0
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/companies_directory
```

### 4. Seed the Database

If the database is empty, seed it:
```bash
cd backend
npm run seed
```

### 5. Check Frontend API URL

In `flm/src/context/CompanyContext.js`, the API URL is:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

You can create a `.env` file in the `flm` directory to override:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Check CORS

The backend has CORS enabled. If you still have issues, make sure:
- Backend is running on port 5000
- Frontend is trying to connect to `http://localhost:5000/api`

### 7. Check Browser Console

Open browser DevTools (F12) and check:
- Console tab for error messages
- Network tab to see if requests are being made
- Check if requests are failing (red status)

### 8. Common Issues

**Port Already in Use:**
```bash
# Windows: Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

**MongoDB Connection Failed:**
- Check your MongoDB Atlas connection string
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify database name is in the connection string

**No Data Showing:**
- Run the seed script: `cd backend && npm run seed`
- Check if companies exist in MongoDB

### 9. Test API Endpoints Manually

**Test filters endpoint:**
```bash
curl http://localhost:5000/api/companies/filters
```

**Test companies endpoint:**
```bash
curl http://localhost:5000/api/companies
```

### 10. Restart Everything

Sometimes a fresh start helps:
1. Stop both frontend and backend (Ctrl+C)
2. Restart backend: `cd backend && npm start`
3. Restart frontend: `cd flm && npm start`

## Still Having Issues?

1. Check the browser console for detailed error messages
2. Check the backend console for server errors
3. Verify all dependencies are installed: `npm install` in both directories
4. Make sure MongoDB is running and accessible

