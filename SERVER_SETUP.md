# Express Backend Server Setup

## Overview
This project now includes an Express backend server that provides REST API endpoints for managing cheques and cash payments.

## Architecture
- **Frontend**: Next.js (http://localhost:3000)
- **Backend**: Express API (http://localhost:4000)
- **Database**: Supabase

## Setup Instructions

### 1. Create `.env` File
Create a `.env` file in the project root with the following variables:

```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
PORT=4000
```

**To get your Supabase credentials:**
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" → use as `SUPABASE_URL`
4. Copy the "anon public" key → use as `SUPABASE_ANON_KEY`

### 2. Install Dependencies
All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 3. Run the Application

**Option 1: Run both frontend and backend together (Recommended)**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Frontend
npm run dev:next

# Terminal 2 - Backend
npm run dev:server
```

## API Endpoints

### Cheques Endpoints

#### GET /api/cheques
Fetch all cheques ordered by PDC date (descending)

**Response:**
```json
{
  "success": true,
  "data": [...]
}
```

#### POST /api/cheques
Create a new cheque

**Request Body:**
```json
{
  "payer": "John Doe",
  "amount": 5000,
  "cheque_no": "CHQ123456",
  "bank_name": "HDFC Bank",
  "pdc_date": "2025-01-15",
  "status": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "data": {...}
}
```

#### PUT /api/cheques/:id
Update an existing cheque

**Request Body:** (all fields optional)
```json
{
  "payer": "Jane Doe",
  "amount": 6000,
  "bank_name": "ICICI Bank",
  "pdc_date": "2025-01-20",
  "status": "cleared"
}
```

#### DELETE /api/cheques/:id
Delete a cheque

**Response:**
```json
{
  "success": true,
  "message": "Cheque deleted successfully"
}
```

### Cash Payment Endpoints

#### GET /api/cash
Fetch all cash payments ordered by payment date (descending)

#### POST /api/cash
Create a new cash payment

**Request Body:**
```json
{
  "payer": "John Doe",
  "amount": 2000,
  "payment_date": "2025-01-10",
  "purpose": "Office supplies",
  "notes": "Purchased stationery",
  "status": "received"
}
```

#### PUT /api/cash/:id
Update an existing cash payment

#### DELETE /api/cash/:id
Delete a cash payment

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Testing the API

You can test the API using:

1. **Browser** - For GET requests: http://localhost:4000/api/cheques

2. **cURL** - Example:
```bash
curl http://localhost:4000/api/cheques
```

3. **Postman** or **Insomnia** - Import the endpoints and test

4. **Thunder Client** (VS Code extension) - Test directly in VS Code

## Next Steps

To integrate the backend with your frontend:

1. Create an API utility file (e.g., `src/lib/api.ts`)
2. Replace direct Supabase calls with fetch/axios calls to your Express API
3. Update all components to use the new API endpoints

Example:
```typescript
// Instead of:
const { data } = await supabase.from('cheques').select('*')

// Use:
const response = await fetch('http://localhost:4000/api/cheques')
const { data } = await response.json()
```

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9
```

**Environment variables not loading:**
- Ensure `.env` file is in the project root
- Restart the server after creating/modifying `.env`

**CORS errors:**
- The server has CORS enabled for all origins
- If issues persist, check browser console for specific errors
