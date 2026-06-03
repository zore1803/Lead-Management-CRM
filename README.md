# Lead Management CRM

A simple full-stack CRM assignment for managing sales leads.

## Features

- Create, view, update and delete leads
- Search by name, email or company
- Filter by lead status
- Sort by name, status or created date
- Pagination with 10 records per page
- Statistics cards and charts
- Responsive dashboard UI
- Express validation and standard API responses

## Tech Stack

Frontend:
- React + Vite
- Axios
- React Router
- Recharts
- CSS

Backend:
- Node.js
- Express.js
- Express Validator

Database:
- Supabase PostgreSQL

## Folder Structure

```txt
lead-management-crm/
  client/
    src/
      api/
      components/
      hooks/
      pages/
      utils/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
```

## Database Schema

Run this SQL in Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company_name VARCHAR(255),
    status VARCHAR(30) DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Backend runs at:

```txt
http://localhost:5000
```

For Supabase, fill these values in `server/.env`:

```txt
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_supabase_postgres_connection_string
```

Example `DATABASE_URL` format:

```txt
DATABASE_URL=postgresql://postgres:YOUR_DATABASE_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
```

If your database password contains special characters like `@`, `#`, `%`, `/`, `:` or spaces, URL-encode the password before putting it in the URL.

This project also supports the lowercase names you added in the root `.env`:

```txt
supabase_project_url=your_supabase_project_url
supabase_anon_key=your_supabase_anon_key
supabase_db_url=your_supabase_postgres_connection_string
```

To create the database table automatically:

```bash
cd server
npm run setup-db
```

If you do not add `DATABASE_URL` or `supabase_db_url`, run the SQL from `server/sql/schema.sql` manually in Supabase SQL Editor.

For this internship assignment, the SQL enables public CRUD policies so the app can work with your anon key. In a production CRM, you would add authentication and restrict these policies per user.

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

## API Routes

```txt
GET    /api/leads
GET    /api/leads/stats
GET    /api/leads/search?q=rohit
GET    /api/leads/:id
POST   /api/leads
PUT    /api/leads/:id
DELETE /api/leads/:id
```

## Standard API Response

Success:

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

## Deployment

Frontend:
- Deploy `client` folder on Vercel.
- Add `VITE_API_URL=https://your-render-backend-url`.

Backend:
- Deploy `server` folder on Render.
- Add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CLIENT_URL`.

Database:
- Create Supabase project.
- Add backend environment variables.
- Run `npm run setup-db` or run `server/sql/schema.sql` in Supabase SQL Editor.
