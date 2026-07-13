# ani.dev — Abhay Kumar Bid Portfolio Platform

This repository contains the premium, digital-agency-level personal brand platform for **Abhay Kumar Bid** (`ani.dev`), built using Next.js, Express, and MongoDB.

## Features

- **Apple × Vercel × Linear Aesthetics**: Dark-mode glassmorphic layouts, fine glows, and premium typography using Google Fonts (Outfit, Inter).
- **Interactive Console Mode**: Konami code listener (`↑ ↑ ↓ ↓ ← → ← → B A`) anywhere triggers a confetti blast and opens the developer terminal.
- **Dynamic AI Assistant Agent**: A custom search helper trained on portfolio details (skills, projects, timeline) allowing recruiters to interrogate the database.
- **Admin Control Panel**: Secured JWT authentication dashboard for CRUD operations on projects, editing skills, and reviewing contact submissions.
- **PWA & SEO Ready**: Includes PWA configurations (`manifest.json`), Google crawlers metadata (`robots.txt`), and sitemap mappings (`sitemap.ts`).

---

## Folder Structure

```
├── backend/            # Node.js + Express API + Mongoose Models
├── frontend/           # Next.js App Router + Tailwind CSS
├── docker-compose.yml  # Multi-container local orchestration config
└── README.md           # Documentation
```

---

## Getting Started

### Method 1: Docker (Recommended)
Launch the entire system (including a local MongoDB database) with one command:
```bash
docker-compose up --build
```
- Frontend will be live at: `http://localhost:3000`
- Backend API will be live at: `http://localhost:5000`

---

### Method 2: Local Development

#### 1. Setup Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create your `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and launch the dev compiler:
   ```bash
   npm install
   npm run dev
   ```
4. (Optional) Run the database seed script to populate projects/admin accounts:
   ```bash
   npm run seed
   ```

#### 2. Setup Frontend
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install UI packages and boot the Next.js local server:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

---

## Admin Credentials (Defaults)
Seeding the database creates a default admin account:
- **Username**: `admin`
- **Password**: `admin123`

*Make sure to change these credentials via the admin console before deploying.*
