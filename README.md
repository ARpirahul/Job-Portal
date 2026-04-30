# Job Portal - Final Year Project

A full-stack job portal built with React (frontend) + Node.js/Express + MongoDB (backend).

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Redux
- **Backend**: Node.js + Express + MongoDB
- **Deploy**: Vercel (frontend) + Render (backend)

## Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your MongoDB URI
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Deploy

### Backend → Render
1. Push to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo → select `backend` folder
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add environment variables from `.env`

### Frontend → Vercel
1. Go to vercel.com → New Project
2. Connect GitHub repo → select `frontend` folder
3. Add env variable: `VITE_API_URL=https://your-render-url.onrender.com`
4. Deploy!
