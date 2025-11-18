# Companies Directory - Full Stack Application

A modern, responsive React-based frontend application with a Node.js + Express + MongoDB backend for managing and displaying company information with advanced filtering, sorting, and pagination features.

## Features

### Frontend
- ✅ **Responsive UI** built with React.js and Material UI
- ✅ **Company Display** in a modern card layout
- ✅ **Advanced Filtering** by name, industry, location (city/country)
- ✅ **Search Functionality** with real-time filtering
- ✅ **Sorting Options** by name, industry, employees, founded year, date added
- ✅ **Pagination** with customizable items per page
- ✅ **Loading States** with spinner indicators
- ✅ **Error Handling** with user-friendly error messages
- ✅ **State Management** using React Context API
- ✅ **Modern UI/UX** with Material UI components and smooth animations

### Backend
- ✅ **RESTful API** with Express.js
- ✅ **MongoDB Database** for data persistence
- ✅ **Advanced Querying** with filtering, sorting, and pagination
- ✅ **Filter Endpoints** for dynamic filter options
- ✅ **Seed Data** script for initial database population

## Tech Stack

### Frontend
- React 19.2.0
- Material UI (MUI) 5.15.0
- Axios for API calls
- React Context API for state management

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 8.0.3
- CORS enabled
- dotenv for environment variables

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
cd flm
```

### 2. Install Frontend Dependencies

```bash
cd flm
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Set up MongoDB

Make sure MongoDB is running on your system. If using MongoDB Atlas, update the connection string in `backend/.env`.

### 5. Configure Environment Variables

Create a `.env` file in the `backend` directory (already created with defaults):

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

**⚠️ Important**: When using MongoDB Atlas, add the database name (`/companies_directory`) after the cluster URL and before the `?`. 

Example: `mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0`

For the frontend, create a `.env` file in the `flm` directory (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Seed the Database

```bash
cd backend
npm run seed
```

This will populate the database with 20 sample companies.

## Running the Application

### Start the Backend Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start the Frontend Application

```bash
cd flm
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Get Companies
```
GET /api/companies
Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- search: Search term (searches name and description)
- industry: Filter by industry
- location: Filter by city
- country: Filter by country
- sortBy: Sort field (name, industry, employees, founded, createdAt)
- sortOrder: Sort order (asc, desc)
```

### Get Filter Options
```
GET /api/companies/filters
Returns unique industries, countries, and cities
```

### Get Single Company
```
GET /api/companies/:id
```

### Create Company
```
POST /api/companies
Body: Company object
```

## Project Structure

```
flm/
├── backend/
│   ├── models/
│   │   └── Company.js
│   ├── routes/
│   │   └── companies.js
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── flm/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CompanyCard.js
│   │   │   ├── CompanyList.js
│   │   │   ├── FilterBar.js
│   │   │   ├── Pagination.js
│   │   │   └── SortBar.js
│   │   ├── context/
│   │   │   └── CompanyContext.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Features in Detail

### Filtering
- **Search**: Real-time search across company names and descriptions
- **Industry Filter**: Dropdown to filter by industry
- **Location Filters**: Separate filters for city and country
- **Clear Filters**: One-click button to reset all filters

### Sorting
- Sort by: Name, Industry, Employees, Founded Year, Date Added
- Sort order: Ascending or Descending

### Pagination
- Customizable items per page (10, 20, 50, 100)
- Page navigation with first/last buttons
- Shows current page and total pages

### UI/UX
- Material UI design system
- Responsive grid layout (adapts to screen size)
- Hover effects on company cards
- Loading spinners during data fetch
- Error messages for failed requests
- Empty state messages when no results found

## Development

### Backend Development
- Uses nodemon for auto-reload during development
- MongoDB connection with error handling
- CORS enabled for frontend communication

### Frontend Development
- React Context API for global state management
- Component-based architecture
- Material UI theming
- Responsive design with MUI Grid system

## Future Enhancements

- [ ] Add company detail view/modal
- [ ] Implement infinite scroll option
- [ ] Add export functionality (CSV, PDF)
- [ ] User authentication and favorites
- [ ] Advanced analytics dashboard
- [ ] Image uploads for company logos
- [ ] Real-time updates with WebSockets

## License

This project is open source and available for educational purposes.

## Author

Created as a full-stack development project demonstrating React, Node.js, Express, and MongoDB integration.

