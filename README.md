# To-Do List Mobile Web App (MERN Stack)

A mobile-first To-Do List Application built according to the **SDE-1 (MERN Stack) Assignment** specifications and the Figma mobile design.

---

## 🌟 Key Features

1. **Task Management (CRUD)**:
   - **Create Task**: Mandatory Title and Date & Time, with optional Description and Priority (`Low`, `Medium`, `High`).
   - **Edit Task**: Modify title, timing, date, priority, or notes with immediate UI update.
   - **Delete Task**: Swipe left on any task card on mobile touch/drag to reveal delete action, plus a direct delete icon.
   - **Status Toggle**: Single tap on checkbox toggles between `In Progress` and `Completed` with visual strike-through.
2. **Weekly Organization (Monday to Sunday)**:
   - Tasks are automatically partitioned into calendar weeks starting on **Monday** and ending on **Sunday**.
   - **Summary Cards**: Displays dynamic counts for **Task Complete** and **Task Pending** for the active week.
   - **Weekly Progress**: Visual progress bar indicating completion ratio.
   - **Expandable Week Accordion**: Tap on any week summary card to expand/collapse detailed task breakdown.
3. **Keyword Search**:
   - Dedicated search screen with live filtering across task titles and descriptions.
   - View, edit, toggle, or delete tasks directly from search results.
4. **Figma-Accurate Mobile Design**:
   - **Screen 1**: Welcome / Onboarding Screen with geometric waves and *"Get Started"* flow.
   - **Screen 2**: Home Screen with day-by-day week strip (`Mon`, `Tue`, `Wed`...), metrics, and circular floating action button (`+`).
   - **Screen 3**: Add/Edit Task Modal with start & end time pickers, date selector, priority tags, and description.
   - **Screen 4**: Search overlay with keyboard simulation and instant filtering.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React icons
- **Backend**: Node.js, Express.js, Mongoose 9
- **Database**: MongoDB Atlas (Cloud)

---

## 🚀 Running the Project Locally

### 1. Backend Setup
```bash
cd Backend
npm install
# Ensure .env contains:
# PORT=5000
# MONGO_URI=<your-mongodb-atlas-uri>
node src/index.js
```
Backend runs on: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd Mobile
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📡 API Endpoints

- `GET /api/health` — Health check endpoint
- `GET /api/tasks` — Fetch tasks (query by `search`, `date`, `weekStart`, `status`)
- `GET /api/tasks/weekly-overview` — Get aggregated Monday–Sunday weekly cards & task counts
- `GET /api/tasks/:id` — Fetch task by ID
- `POST /api/tasks` — Create task
- `PUT /api/tasks/:id` — Update task details
- `PATCH /api/tasks/:id/toggle` — Quick toggle completion status
- `DELETE /api/tasks/:id` — Delete task

---

## 🚢 Deployment Guide

- **Frontend (Netlify)**:
  - Connect GitHub repo and set Base Directory: `Mobile`, Build Command: `npm run build`, Publish Directory: `dist`.
  - Add environment variable `VITE_API_URL` pointing to your deployed backend URL.
- **Backend (Render / Railway / Vercel)**:
  - Deploy `Backend` with root directory `Backend`, build command `npm install`, start command `node src/index.js`.
  - Add `MONGO_URI` and `PORT` environment variables.
