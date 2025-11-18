# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

#### Frontend
```bash
cd flm
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas (Cloud):**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Get your connection string
- **IMPORTANT**: Add the database name to your connection string!

### 3. Configure Environment Variables

The backend `.env` file is already created with default values. If you need to change them:

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/companies_directory
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/companies_directory?appName=Cluster0
NODE_ENV=development
```

**⚠️ Important**: Make sure to:
1. Replace `username:password` with your actual MongoDB Atlas credentials
2. Replace `cluster.mongodb.net` with your actual cluster URL
3. **Add `/companies_directory`** (or your preferred database name) after the cluster URL
4. Keep the `?appName=Cluster0` or add other options like `?retryWrites=true&w=majority`

**Example with your connection string:**
```env
MONGODB_URI=mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0
```

### 4. Seed the Database

```bash
cd backend
npm run seed
```

This will create 20 sample companies in your database.

### 5. Start the Backend Server

```bash
cd backend
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 6. Start the Frontend

Open a new terminal:

```bash
cd flm
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

## Troubleshooting

### MongoDB Connection Issues

1. **MongoDB not running:**
   - Make sure MongoDB is installed and running
   - Check if the service is running: `mongosh` or `mongo`

2. **Connection refused:**
   - Verify MongoDB is running on port 27017
   - Check firewall settings
   - For MongoDB Atlas, verify your IP is whitelisted

### Port Already in Use

If port 5000 or 3000 is already in use:

1. **Backend:** Change `PORT` in `backend/.env`
2. **Frontend:** Update `REACT_APP_API_URL` in `flm/.env` to match

### CORS Issues

The backend has CORS enabled. If you still see CORS errors:
- Make sure the backend is running
- Check that `REACT_APP_API_URL` matches your backend URL

### No Companies Showing

1. Make sure you've run the seed script: `cd backend && npm run seed`
2. Check MongoDB connection in backend console
3. Verify the database has companies: Use MongoDB Compass or `mongosh`

## Testing the Application

1. **Search:** Type in the search box to filter companies
2. **Filters:** Use dropdowns to filter by industry, country, or city
3. **Sort:** Change sort field and order
4. **Pagination:** Navigate through pages and change items per page
5. **Clear:** Use the Clear button to reset all filters

## Project Structure

```
flm/
├── backend/              # Node.js + Express backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── scripts/         # Database seeding
│   └── server.js        # Main server file
│
└── flm/                 # React frontend
    └── src/
        ├── components/  # React components
        ├── context/    # Context API for state
        └── App.js      # Main app component
```

## Next Steps

- Customize the theme in `flm/src/App.js`
- Add more companies via the API
- Extend the Company model with more fields
- Add authentication if needed
- Deploy to production

Enjoy building! 🚀

