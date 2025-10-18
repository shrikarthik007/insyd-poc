# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Create `.env` File

Copy the template and add your Supabase credentials:

```bash
cp .env.template .env
```

Then edit `.env` and replace with your actual values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
PORT=4000
```

**Where to find your Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy "Project URL" and "anon public" key

### Step 2: Run the Application

```bash
npm run dev
```

This will start:
- ✅ Next.js frontend on http://localhost:3000
- ✅ Express backend on http://localhost:4000

### Step 3: Test the API

Open your browser and visit:
- Frontend: http://localhost:3000
- API Health Check: http://localhost:4000
- Get Cheques: http://localhost:4000/api/cheques
- Get Cash Payments: http://localhost:4000/api/cash

## 📁 Project Structure

```
insyd-poc/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── cheques/      # Cheque management pages
│   │   ├── cash/         # Cash payment pages
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   └── lib/
│       ├── api.ts        # API utility functions (NEW!)
│       └── supabaseClient.ts
├── server/
│   └── index.ts          # Express backend (NEW!)
├── .env                  # Environment variables (CREATE THIS!)
└── package.json
```

## 🔄 Using the API in Your Frontend

### Option 1: Use the API Utility (Recommended)

```typescript
import { chequesApi, cashApi } from '@/lib/api'

// Fetch all cheques
const { success, data, error } = await chequesApi.getAll()

// Create a new cheque
await chequesApi.create({
  payer: 'John Doe',
  amount: 5000,
  cheque_no: 'CHQ123',
  bank_name: 'HDFC',
  pdc_date: '2025-01-15',
  status: 'pending'
})

// Update a cheque
await chequesApi.update(1, { status: 'cleared' })

// Delete a cheque
await chequesApi.delete(1)
```

### Option 2: Direct Supabase (Current Method)

Your existing code using Supabase directly will continue to work:

```typescript
import { supabase } from '@/lib/supabaseClient'

const { data } = await supabase.from('cheques').select('*')
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend |
| `npm run dev:next` | Run only Next.js frontend |
| `npm run dev:server` | Run only Express backend |
| `npm run build` | Build for production |
| `npm start` | Start production server |

## 🐛 Troubleshooting

### Port 4000 already in use
```bash
lsof -ti:4000 | xargs kill -9
```

### Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
```

### Environment variables not loading
- Make sure `.env` file exists in project root
- Restart the server after creating/modifying `.env`
- Check for typos in variable names

### CORS errors
- The backend has CORS enabled for all origins
- Make sure both servers are running
- Check browser console for specific errors

## 📚 Next Steps

1. ✅ **Backend is ready** - All CRUD endpoints are working
2. 🔄 **Optional**: Migrate frontend to use API instead of direct Supabase
3. 🎨 **Continue building** - Add more features as needed

For detailed API documentation, see [SERVER_SETUP.md](./SERVER_SETUP.md)

## 🎉 You're All Set!

Your payment management system now has:
- ✅ Modern Next.js frontend
- ✅ RESTful Express backend
- ✅ Supabase database
- ✅ Full CRUD operations for cheques and cash payments
- ✅ Dark mode UI
- ✅ TypeScript throughout

Happy coding! 🚀
