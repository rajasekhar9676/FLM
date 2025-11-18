# MongoDB Connection String Setup

## MongoDB Atlas Connection String Format

When using MongoDB Atlas, your connection string should include the database name:

```
mongodb+srv://username:password@cluster.mongodb.net/database_name?options
```

## For This Project

Use this format in your `.env` file:

```env
MONGODB_URI=mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0
```

### Important Notes:

1. **Database Name**: Add `/companies_directory` (or your preferred database name) after the cluster URL
2. **Username/Password**: Replace `abc:abc` with your actual MongoDB Atlas credentials
3. **Query Parameters**: Keep `?appName=Cluster0` or add other options like:
   - `?retryWrites=true&w=majority`
   - `?appName=Cluster0&retryWrites=true&w=majority`

## Example Connection Strings

### With Database Name (Recommended)
```
mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0
```

### With Additional Options
```
mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?retryWrites=true&w=majority&appName=Cluster0
```

## Local MongoDB (Alternative)

If using local MongoDB instead:
```
mongodb://localhost:27017/companies_directory
```

## Security Note

⚠️ **Never commit your `.env` file to version control!** It contains sensitive credentials.

Make sure `.env` is in your `.gitignore` file.

