# Full Stack App - React + Express + PostgreSQL

A full-stack application demonstrating CRUD operations with React frontend, Express API backend, and PostgreSQL database.

## Features

- ✅ **Create** - Add new links with name, URL, and category
- ✅ **Read** - View all links in table or card view
- ✅ **Update** - Edit existing links
- ✅ **Delete** - Remove links from the database
- ✅ **Search & Filter** - Real-time search by name/URL and filter by category
- ✅ **Sort** - Sort links by name, date, or category
- ✅ **Card View** - Beautiful card view with favicons and category badges
- ✅ **Categories** - Organize links with color-coded categories (Work, Personal, Learning, etc.)
- ✅ React components with hooks (useState, useEffect, useMemo)
- ✅ Props for component communication
- ✅ Secure environment variable management

## Project Structure

```
Full Stack App/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── components/
│ │ │ ├── Form.jsx
│ │ │ ├── LinkContainer.jsx
│ │ │ ├── Table.jsx
│ │ │ ├── SearchBar.jsx
│ │ │ ├── CardView.jsx
│ │ │ └── LinkCard.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
├── server/ # Express API backend
│ ├── index.js
│ ├── queries.js
│ ├── database.sql
│ └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE your_database_name;
```

2. Run the database schema:
```bash
psql -U your_db_user -d your_database_name -f server/database.sql
```

Or manually create the table with category support:
```sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
ALTER TABLE links ADD COLUMN category VARCHAR(50) DEFAULT 'General';
```
## Additional Features

### Search & Filter
- Real-time search by link name or URL
- Filter links by category
- Sort by name (A-Z, Z-A), date (newest, oldest), or category

### View Modes
- **Table View**: Traditional table layout with all details
- **Card View**: Modern card layout with favicons and category badges

### Categories
Organize your links with predefined categories:
- Work
- Personal
- Learning
- Shopping
- Entertainment
- General (default)

Each category has a unique color for easy identification.

```
### 2. Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` file and update with your database credentials:
   ```env
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   PORT=3001
   ```

4. Start the server:
```bash
npm run dev    # Development mode with nodemon
# or
npm start      # Production mode
```

The API will run on `http://localhost:3001`

### 3. Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
   - Update `client/.env` if your API URL is different:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. Start the development server:
```bash
npm run dev
```

The React app will run on `http://localhost:5173` (or another port if 5173 is busy)

## API Endpoints

- `GET /api/links` - Get all links
- `GET /api/links/:id` - Get a specific link by ID
- `POST /api/links` - Create a new link
  ```json
  {
    "name": "Google",
    "url": "https://www.google.com"
  }
  ```
- `PUT /api/links/:id` - Update a link
  ```json
  {
    "name": "Google Updated",
    "url": "https://www.google.com"
  }
  ```
- `DELETE /api/links/:id` - Delete a link

## React Components

### LinkContainer
- Main container component managing state with `useState`
- Handles API calls using `useEffect` for data fetching
- Manages CRUD operations

### Form
- Reusable form component for both creating and updating links
- Uses `useState` for form state management
- Receives props for submit handler and editing state

### Table
- Displays links in a table format
- Receives data and handlers via props
- Supports edit and delete actions

## Security Notes

- ✅ Database credentials stored in `.env` files (not committed to Git)
- ✅ `.gitignore` configured to exclude sensitive files
- ✅ Environment variables used for configuration

## Deployment

### Backend Deployment (Heroku Example)

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Add PostgreSQL addon:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

3. Set environment variables:
```bash
heroku config:set DB_USER=your_user
heroku config:set DB_HOST=your_host
# ... etc
```

4. Deploy:
```bash
git push heroku main
```

### Frontend Deployment (Vercel Example)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Set environment variable `VITE_API_URL` to your deployed backend URL

## Development Workflow

1. Start PostgreSQL database
2. Start the Express server (`cd server && npm run dev`)
3. Start the React app (`cd client && npm run dev`)
4. Open browser to `http://localhost:5173`

## Git Commits

Make sure to commit your work in logical chunks:
- Initial project setup
- Database schema and queries
- Express API routes
- React components
- API integration
- Environment configuration
- Deployment configuration

## License

MIT

