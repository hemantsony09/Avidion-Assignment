# Campaign Manager

A full-stack campaign management application built with Next.js (frontend) and Express.js (backend) with PostgreSQL database.

## Project Structure

```
Avidion-Assignment/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory
│   ├── package.json
│   └── ...
└── backend/          # Express.js backend API
    ├── src/
    │   ├── index.js  # Main server file
    │   └── db/       # Database files
    ├── package.json
    └── ...
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (v14 or higher)
- **Git**

### Installing PostgreSQL

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hemantsony09/Avidion-Assignment
cd Avidion-Assignment
```

### 2. Backend Setup

#### Step 1: Navigate to backend directory
```bash
cd backend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure environment variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env  # If .env.example exists, or create manually
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campaign_manager
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3001
NODE_ENV=development
```

#### Step 4: Create PostgreSQL database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE campaign_manager;

# Exit psql
\q
```

#### Step 5: Run database migration

```bash
npm run migrate
```

This will create the `campaigns` table with the required schema.

#### Step 6: Seed database (optional)

To populate the database with sample data:

```bash
npm run seed
```

#### Step 7: Start the backend server

```bash
npm run dev
```

The backend API will be running on `http://localhost:3001`

### 3. Frontend Setup

#### Step 1: Navigate to frontend directory

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Configure environment variables (optional)

Create a `.env.local` file in the `frontend/` directory if you need to customize the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

By default, the frontend connects to `http://localhost:3001`.

#### Step 4: Start the frontend development server

```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## Running the Project

### Development Mode

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:3000`

### Production Build

#### Backend:
```bash
cd backend
npm start
```

#### Frontend:
```bash
cd frontend
npm run build
npm start
```

## API Endpoints

The backend API provides the following endpoints:

- `GET /health` - Health check endpoint
- `GET /campaigns` - Get all campaigns
- `GET /campaigns/:id` - Get a single campaign
- `POST /campaigns` - Create a new campaign
- `PUT /campaigns/:id` - Update a campaign
- `PATCH /campaigns/:id` - Partial update (status, sent, replies)
- `DELETE /campaigns/:id` - Delete a campaign

## Testing the Connection

A test script is available to verify the backend connection:

```bash
cd backend
./test-connection.sh
```

This script will:
1. Test the backend health endpoint
2. Test GET /campaigns
3. Test POST /campaigns

## Available Scripts

### Backend Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run migrate` - Run database migration
- `npm run seed` - Seed database with sample data

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Troubleshooting

### Backend Issues

**Database connection failed:**
- Ensure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Verify database credentials in `.env` file
- Check if database exists: `psql -U postgres -l`

**Port already in use:**
- Change `PORT` in `.env` file to a different port (e.g., 3002)
- Or kill the process using port 3001

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend (should be enabled by default)

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## License

Private project

