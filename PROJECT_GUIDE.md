# Lead Management CRM Guide

This project is a simple CRM used to manage business leads.

## What Is A Lead?

A lead is a possible customer. In this project, one lead has:

- Name
- Email
- Phone
- Company name
- Status
- Notes
- Created date

## Main Idea

The frontend shows screens to the user.

The backend receives API requests from the frontend.

The database stores the lead records.

```txt
React UI -> Axios API call -> Express route -> Controller -> Model -> Supabase/Postgres
```

## Frontend

Location:

```txt
client/
```

Important files:

- `src/App.jsx`: defines frontend routes
- `src/pages/Dashboard.jsx`: main dashboard page
- `src/pages/AddLead.jsx`: add lead page
- `src/pages/EditLead.jsx`: edit lead page
- `src/api/leadApi.js`: Axios API functions
- `src/hooks/useLeads.js`: fetches leads and statistics
- `src/components/LeadForm.jsx`: reusable add/edit form
- `src/components/LeadTable.jsx`: table that displays leads

## Backend

Location:

```txt
server/
```

Important files:

- `server.js`: starts the backend server
- `app.js`: configures Express middleware and routes
- `routes/leadRoutes.js`: defines API URLs
- `controllers/leadController.js`: handles request and response logic
- `models/leadModel.js`: talks to Supabase
- `middleware/validation.js`: validates input fields
- `middleware/errorHandler.js`: sends standard error responses

## API Explanation

Create lead:

```txt
POST /api/leads
```

Get all leads:

```txt
GET /api/leads?page=1&limit=10&search=rohit&status=New&sortBy=created_at&order=desc
```

Get one lead:

```txt
GET /api/leads/:id
```

Update lead:

```txt
PUT /api/leads/:id
```

Delete lead:

```txt
DELETE /api/leads/:id
```

Get statistics:

```txt
GET /api/leads/stats
```

## Status Options

```txt
New
Contacted
Qualified
Converted
Lost
```

## Validation Rules

The backend checks:

- Name is required
- Email must be valid
- Phone is required
- Status must be one of the allowed status values

The frontend also checks the same basic fields before submitting.

## Supabase Setup

The project now uses Supabase for real data. There is no in-memory demo database.

For API calls, add your Supabase URL and key in `.env`.

For table creation, add a database connection string:

```txt
SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key
DATABASE_URL=your_database_connection_string
```

Then run:

```bash
cd server
npm run setup-db
```

If you only have anon key, create the table manually by running `server/sql/schema.sql` in Supabase SQL Editor.

## Interview Explanation

You can say:

```txt
I built a full-stack Lead Management CRM using React and Express. The frontend uses reusable components for forms, tables, filters and charts. The backend follows an MVC-style structure with routes, controllers, models, validation middleware and error handling. The app supports CRUD operations, search, filtering, sorting, pagination and statistics. All lead data is stored in Supabase PostgreSQL.
```

## How To Run

Backend:

```bash
cd server
npm install
npm run dev
```

Frontend:

```bash
cd client
npm install
npm run dev
```

Open:

```txt
http://localhost:5173
```

## Simple File Flow Example

When you click Add Lead:

```txt
LeadForm.jsx
-> createLead() in leadApi.js
-> POST /api/leads
-> leadRoutes.js
-> addLead() in leadController.js
-> createLead() in leadModel.js
-> Supabase table or demo data
```
