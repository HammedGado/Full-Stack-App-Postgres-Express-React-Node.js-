# Quick Start Guide

## ✅ What's Been Set Up

Full-stack application has been integrated! Here's what's ready:

```
### Project Structure
- ✅ **Client** (React app) - Copied from Project 3 (FavLinks)
- ✅ **Server** (Express API) - Adapted from Project 4 (users API) to work with links
- ✅ **Database Schema** - SQL file ready for links table
- ✅ **Environment Files** - Example files provided
- ✅ **Git Configuration** - .gitignore set up to protect sensitive data
```

```
### Features Implemented
- ✅ **Create** - Add new links via form with category selection
- ✅ **Read** - Display all links in table or card view
- ✅ **Update** - Edit existing links
- ✅ **Delete** - Remove links from database
- ✅ **Search & Filter** - Real-time search and category filtering
- ✅ **Sort** - Multiple sorting options (name, date, category)
- ✅ **Card View** - Beautiful card layout with favicons
- ✅ **Categories** - Color-coded category organization
- ✅ **API Integration** - React connected to Express API using axios
- ✅ **React Hooks** - useState, useEffect, and useMemo implemented
- ✅ **Props** - Components communicate via props
```

## 🚀 Next Steps

```
### 1. Set Up Database

```bash
# Create database
createdb your_database_name

# Or using psql
psql -U postgres
CREATE DATABASE your_database_name;
\q

# Run schema
psql -U your_db_user -d your_database_name -f server/database.sql
```
```markdown
### 1. Set Up Database

```bash
# Create database
createdb your_database_name

# Or using psql
psql -U postgres
CREATE DATABASE your_database_name;
\q

# Run schema
psql -U your_db_user -d your_database_name -f server/database.sql
```

### 2. Configure Environment Variables

**Server (.env):**
```bash
cd server
cp env.example .env
# Edit .env with your database credentials
```

**Client (.env):**
```bash
cd client
cp env.example .env
# Usually no changes needed unless API URL is different
```

### 3. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 4. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:3001
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
# App runs on http://localhost:5173
```

```markdown
### 5. Test the Application

1. Open browser to `http://localhost:5173`
2. Add a new link using the form (select a category)
3. Toggle between Table View and Card View
4. Test search functionality - type in the search bar
5. Filter by category using the dropdown
6. Try different sort options
7. Click "Edit" to update a link
8. Click "Delete" to remove a link
```

## 📝 Important Notes

1. **Database Connection**: Make sure PostgreSQL is running and your credentials in `server/.env` are correct

2. **API URL**: The React app connects to `http://localhost:3001` by default. Update `client/.env` if your backend runs on a different port.

3. **CORS**: The Express server has CORS enabled to allow requests from the React app.

4. **Git Commits**: Make sure to commit your work in logical chunks:
   - Initial setup
   - Database configuration
   - API implementation
   - React integration
   - Environment setup

## 🐛 Troubleshooting

**"Failed to load links" error:**
- Make sure the Express server is running
- Check that the database is connected
- Verify the API URL in `client/.env`

**Database connection errors:**
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `server/.env`
- Ensure the database exists

**Port already in use:**
- Change PORT in `server/.env`
- Update `VITE_API_URL` in `client/.env` to match

## 📦 Deployment Checklist

Before deploying:

- [ ] Update `client/.env` with production API URL
- [ ] Set environment variables on hosting platform
- [ ] Run database migrations on production database
- [ ] Test all CRUD operations
- [ ] Verify .env files are in .gitignore
- [ ] Commit all changes to GitHub

## 🎉 You're Ready!

Your full-stack app is integrated and ready to use. Follow the steps above to get it running locally, then deploy when ready!

