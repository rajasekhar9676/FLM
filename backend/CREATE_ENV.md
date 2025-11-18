# Create .env File

## ⚠️ IMPORTANT: Create the .env file manually

The `.env` file is not tracked by git (for security). You need to create it manually.

## Steps:

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create a new file named `.env`** (with the dot at the beginning)

3. **Copy and paste this content into the file:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0
NODE_ENV=development
```

4. **Replace the MongoDB credentials:**
   - Replace `abc:abc` with your actual MongoDB Atlas username and password
   - Make sure the database name `/companies_directory` is included
   - Keep the `?appName=Cluster0` part

5. **Save the file**

## For Windows (PowerShell):

```powershell
cd backend
@"
PORT=5000
MONGODB_URI=mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8
```

## For Windows (Command Prompt):

```cmd
cd backend
echo PORT=5000 > .env
echo MONGODB_URI=mongodb+srv://abc:abc@cluster0.vlb04hq.mongodb.net/companies_directory?appName=Cluster0 >> .env
echo NODE_ENV=development >> .env
```

## After creating .env:

1. **Update the MongoDB credentials** in the file
2. **Restart your backend server:**
   ```bash
   npm start
   ```

3. **You should see:**
   ```
   ✅ MongoDB Connected Successfully
   Database: companies_directory
   ```

## Troubleshooting:

- Make sure the file is named exactly `.env` (with the dot)
- Make sure it's in the `backend` folder
- Check that MongoDB Atlas IP is whitelisted (add `0.0.0.0/0` for all IPs)
- Verify your username and password are correct

