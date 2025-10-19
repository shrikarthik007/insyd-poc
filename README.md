# 🧾 Insyd Payment Manager (POC)

A unified cheque and cash payment management system built using **Next.js**, **Supabase**, and an **Express proxy backend**.  
The goal of this Proof of Concept (POC) is to simplify cheque and cash transaction tracking for businesses.

---

## 🚀 Live Links

- **🌐 Live App:** [https://insyd-poc-sigma.vercel.app](https://insyd-poc-sigma.vercel.app)
- **📘 Solution Document (Notion):** [Insyd Payment Manager POC – Solution Overview](https://www.notion.so/Insyd-Payment-Manager-POC-29060e92bc1b80f49a50d7daf9aa805c)
- **💻 GitHub Repo:** [https://github.com/shrikarthik007/insyd-poc](https://github.com/shrikarthik007/insyd-poc)

---

## 🧠 Overview

The **Insyd Payment Manager POC** provides a web-based interface for managing **cheque** and **cash** transactions.  
It allows users to record, update, and monitor all payment activities in a single dashboard.

This project demonstrates:
- Integration of **Next.js frontend**
- **Express.js** backend proxy for future scalability
- Use of **Supabase** for database, authentication (future), and real-time data
- Deployment pipeline via **Vercel**

---

## 🏗️ Architecture Diagram (Text View)

┌──────────────────────────────┐
│ Frontend (UI)                │
│ Next.js + TailwindCSS        │
│ Pages:                       │
│ - /                          │
│ - /cheques (list/add/edit)   │
│ - /cash (list/add/edit)      │
└──────────────┬───────────────┘
               │
▼
┌──────────────────────────────┐
│ Express.js Proxy API         │
│ Handles CRUD requests & API  │
│ routes requests to Supabase  │
└──────────────┬───────────────┘
               │
▼
┌──────────────────────────────┐
│ Supabase (PostgreSQL)        │
│ Tables:                      │
│ - cheques                    │
│ - cash_payments              │
│ Features:                    │
│ - Row Level Security (RLS)   │
│ - Realtime APIs              │
└──────────────────────────────┘

yaml
Copy code

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | Next.js 15 + React + TailwindCSS | UI & Routing |
| **Backend** | Express.js | API Proxy / Future scalability |
| **Database** | Supabase (PostgreSQL) | Persistent storage |
| **Hosting** | Vercel | Deployment and CI/CD |
| **Auth (Future)** | Supabase Auth | User-level security |

---

## 🧩 Core Features

✅ **Cheque Management**
- Add, edit, and delete cheque details  
- Track status (Pending, Cleared, Bounced)

✅ **Cash Management**
- Record and manage cash payments  
- Track purpose, payer, and amount  

✅ **Unified Dashboard**
- View both cheque and cash transactions  

✅ **Modern UI**
- Responsive, dark theme  
- Styled using TailwindCSS  

✅ **Express Proxy Backend**
- Abstracts API calls for modular scalability  

✅ **Supabase Integration**
- Database + RLS policies for secure CRUD  

---

## 🧠 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/shrikarthik007/insyd-poc.git
   cd insyd-poc
Install dependencies

bash
Copy code
npm install
Set up environment variables
Create a .env.local file in the root folder with:

ini
Copy code
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
Run the development server

bash
Copy code
npm run dev
Visit http://localhost:3000 🚀

🧩 Future Enhancements
To make the system production-ready and enterprise-scalable, the following enhancements are planned:

Enhancement	Description
🔐 Authentication	Supabase Auth for user-level data segregation
📊 Analytics Dashboard	Graphs for cheque vs cash trends
🔔 Notifications	Alerts for bounced/pending cheques
📤 Export Tools	CSV/PDF summary reports
🔎 Search & Filters	Improve data discoverability
📄 Pagination	Better performance on large datasets

🧾 Summary
The Insyd Payment Manager POC delivers a unified solution for cheque and cash management,
addressing multiple business pain points with a single, scalable, and efficient platform.

It fulfills all assignment goals:
✅ Next.js frontend
✅ Express.js backend proxy
✅ Supabase integration
✅ Deployed live on Vercel

👨‍💻 Author
Shrikarthik Holebagil