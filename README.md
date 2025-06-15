# Habit Buddy

A simple full-stack Habit Tracker application with user authentication and habit management (create, list, update, complete with streak logic, and delete). Built with Node.js, Express, MongoDB on the backend, and React (Vite) on the frontend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
  - [Backend `.env.example`](#backend-envexample)
  - [Frontend `.env.example`](#frontend-envexample)
- [Getting Started (Local Development)](#getting-started-local-development)
  - [Clone the Repo](#clone-the-repo)
  - [Setup Backend](#setup-backend)
  - [Setup Frontend](#setup-frontend)
- [API Endpoints](#api-endpoints)
- [Frontend Usage](#frontend-usage)
- [Testing the API](#testing-the-api)
- [Scripts and Commands](#scripts-and-commands)
- [Git & Version Control](#git--version-control)
- [Deployment](#deployment)
  - [Backend Deployment](#backend-deployment)
  - [Frontend Deployment](#frontend-deployment)
- [Environment-Specific Git Ignore](#environment-specific-git-ignore)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Register and login with JWT-based auth, password hashing via bcrypt.
- **Habit Management**:
  - Create habits with `title`, optional `description`, optional `frequency` (`daily`/`weekly`/`monthly`), optional `targetCount`.
  - List all habits for the logged-in user.
  - Update habit fields (title, description, frequency, targetCount).
  - Complete habits once per period with streak-tracking logic:
    - **Daily**: only once per day; if completed yesterday, streak increments, otherwise resets.
    - **Weekly**: only once per week; if completed in the immediately previous week, streak increments, otherwise resets.
    - **Monthly**: only once per month; if completed in the immediately previous month, streak increments, otherwise resets.
  - Delete habits.
- **Front-End**: React app bootstrapped with Vite; components for login/signup, dashboard, habit form/card.
- **Back-End**: Node.js + Express, MongoDB via Mongoose, CORS for local development, environment config via dotenv.
- **Structure**: Monorepo with separate `backend/` and `frontend/` folders.
- **Clean Git**: `.gitignore` configured to ignore `node_modules/`, `.env`, build outputs, logs, etc.
- **Extensible**: Placeholder for future features like reminders, analytics, profile management.

---

## Tech Stack

- **Backend**:
  - Node.js, Express
  - MongoDB with Mongoose
  - Authentication: bcrypt, jsonwebtoken
  - Middleware: express-async-handler for async error handling, custom JWT verification middleware
  - CORS via `cors`
  - Configuration via `dotenv`
- **Frontend**:
  - React (functional components, hooks) with Vite
  - Fetch API wrapped in `src/services/api.js`
  - Plain CSS or CSS modules
- **Development Tools**:
  - nodemon (optional) for auto-reload during backend development
  - Vite dev server for fast frontend hot-reload
  - Git for version control

---

## Prerequisites

- **Node.js & npm**: v14+ recommended. npm comes bundled with Node.js.
- **Git**: for version control.
- **MongoDB**:
  - Local: install MongoDB Community Edition and run `mongod` locally.
  - OR Cloud: MongoDB Atlas URI.
- **Code Editor**: VSCode recommended.

---

## Project Structure

Monorepo layout (root folder contains `backend/` and `frontend/`):

habit-buddy/
├─ backend/
│ ├─ controllers/
│ │ ├─ authController.js
│ │ └─ habitController.js
│ ├─ middleware/
│ │ └─ verifyToken.js
│ ├─ models/
│ │ ├─ User.js
│ │ └─ Habit.js
│ ├─ routes/
│ │ ├─ authRoutes.js
│ │ └─ habitRoutes.js
│ ├─ server.js
│ ├─ package.json
│ ├─ .env.example
│ └─ .env # NOT committed
└─ frontend/
├─ public/
│ └─ index.html
├─ src/
│ ├─ components/
│ │ ├─ Login.jsx
│ │ ├─ Signup.jsx
│ │ ├─ Dashboard.jsx
│ │ ├─ HabitForm.jsx
│ │ ├─ HabitCard.jsx
│ │ └─ Header.jsx
│ ├─ services/
│ │ └─ api.js
│ ├─ App.jsx
│ ├─ main.jsx
│ ├─ styles.css / App.css
│ └─ ...
├─ package.json
├─ vite.config.js
├─ .env.example
└─ .env # NOT committed
├─ .gitignore
└─ README.md

yaml
Copy
Edit

---

## Environment Variables

Environment variables are sensitive and vary per user/deployment. We commit only `.env.example`. Each user clones the repo and creates their own `.env`.

### Backend `.env.example`

```text
# Backend environment variables for Habit Buddy

# MongoDB connection URI (local or Atlas). Example for local:
MONGO_URI=mongodb://127.0.0.1:27017/habitbuddy

# Port on which the backend server listens
PORT=5000

# JWT secret for signing tokens. Replace with a strong secret.
JWT_SECRET=your_jwt_secret_here
Instructions: After cloning, copy to backend/.env and fill real values:

macOS/Linux/Git Bash:

bash
Copy
Edit
cd backend
cp .env.example .env
Windows PowerShell:

powershell
Copy
Edit
cd backend
copy .env.example .env
Open backend/.env and set actual MONGO_URI, PORT, and JWT_SECRET.

Frontend .env.example
text
Copy
Edit
# Frontend environment variables for Habit Buddy

# Backend API base URL for development; in production, set to deployed backend URL
VITE_API_URL=http://localhost:5000
Instructions: After cloning, copy to frontend/.env:

macOS/Linux/Git Bash:

bash
Copy
Edit
cd frontend
cp .env.example .env
Windows PowerShell:

powershell
Copy
Edit
cd frontend
copy .env.example .env
Open frontend/.env and adjust VITE_API_URL as needed.

Note: .env files are listed in .gitignore and not tracked by Git.

Getting Started (Local Development)
Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
Setup Backend
bash
Copy
Edit
cd backend
cp .env.example .env      # on macOS/Linux or Git Bash
# Windows PowerShell: copy .env.example .env

npm install
node server.js            # or npm start
You should see:

bash
Copy
Edit
✅ MongoDB connected
✅ Server running on http://localhost:5000
Setup Frontend
In a new terminal:

bash
Copy
Edit
cd frontend
cp .env.example .env      # on macOS/Linux or Git Bash
# Windows PowerShell: copy .env.example .env

npm install
npm run dev
You should see something like:

bash
Copy
Edit
VITE vX.Y.Z  dev server running at:

> Local: http://localhost:5173/
Open your browser at http://localhost:5173 to use the app.

Use the App
Sign Up: Register a user (name, email, password).

Login: Authenticate and store JWT token in localStorage.

Dashboard: List habits, add new habit, complete habit (streak logic), edit, delete.

Logout: Clear token and return to login.

Error Handling: Invalid operations return errors; display messages appropriately.

API Endpoints
Base URL: http://localhost:5000/api

Auth
POST /api/auth/register

Body:

json
Copy
Edit
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "yourpassword"
}
Response:

json
Copy
Edit
{
  "token": "<JWT token>",
  "user": {
    "id": "<user id>",
    "name": "Your Name",
    "email": "you@example.com"
  }
}
POST /api/auth/login

Body:

json
Copy
Edit
{
  "email": "you@example.com",
  "password": "yourpassword"
}
Response:

json
Copy
Edit
{
  "token": "<JWT token>",
  "user": {
    "id": "<user id>",
    "name": "Your Name",
    "email": "you@example.com"
  }
}
Habits (Protected: require Authorization: Bearer <token>)
GET /api/habits

Returns array of habit objects for the logged-in user.

POST /api/habits

Body:

json
Copy
Edit
{
  "title": "Exercise",
  "description": "30 min run",
  "frequency": "daily",      // optional
  "targetCount": 1           // optional
}
Response: created habit object.

PATCH /api/habits/:id/complete

Complete the habit for the current period; updates streak and lastCompleted.

Response: updated habit object.

Error 400 if already completed in this period.

PUT /api/habits/:id

Body: any of { "title": "...", "description": "...", "frequency": "...", "targetCount": ... }

Response: updated habit object.

DELETE /api/habits/:id

Response:

json
Copy
Edit
{ "message": "Habit deleted" }
Frontend Usage
src/services/api.js wraps fetch and includes JWT from localStorage for protected calls.

On login/signup success: localStorage.setItem("authToken", token).

On 401 responses: clear token and redirect to login.

Components:

Login.jsx / Signup.jsx: handle auth flows.

Dashboard.jsx: fetch and display habits.

HabitForm.jsx: create/edit habits.

HabitCard.jsx: display habit details; buttons for “Complete”, “Edit”, “Delete”.

Header.jsx: logout button.

Styling: plain CSS; extend as desired.

Development: Vite hot-reloads on code changes.

Testing the API
Use curl or Postman:

bash
Copy
Edit
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Export token
TOKEN="<paste_token_here>"

# Create habit
curl -X POST http://localhost:5000/api/habits \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Read","description":"Read 20 pages","frequency":"daily","targetCount":1}'

# List habits
curl -X GET http://localhost:5000/api/habits \
  -H "Authorization: Bearer $TOKEN"

# Complete habit
curl -X PATCH http://localhost:5000/api/habits/<habitId>/complete \
  -H "Authorization: Bearer $TOKEN"

# Update habit
curl -X PUT http://localhost:5000/api/habits/<habitId> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"frequency":"weekly"}'

# Delete habit
curl -X DELETE http://localhost:5000/api/habits/<habitId> \
  -H "Authorization: Bearer $TOKEN"
Scripts and Commands
Backend (backend/package.json)
json
Copy
Edit
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
npm install

npm start or node server.js

npm run dev (with nodemon) for auto-reload

Frontend (frontend/package.json)
json
Copy
Edit
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
npm install

npm run dev

npm run build (outputs to dist)

npm run preview

Git & Version Control
Initialize repo at project root: git init

.gitignore contents:

bash
Copy
Edit
**/node_modules/
**/.env
frontend/dist/
*.log
.vscode/
.DS_Store
Commit often:

bash
Copy
Edit
git add .
git commit -m "Describe changes"
Push to GitHub:

bash
Copy
Edit
git remote add origin https://github.com/your-username/habit-tracker.git
git branch -M main
git push -u origin main
Use branches for features: git checkout -b feature/xyz

Deployment
Backend Deployment
bash
Copy
Edit
# Example steps for a platform like Render/Heroku:

# 1. Push code to GitHub
# 2. Connect backend repo to hosting platform
# 3. Set environment variables on the platform:
#    MONGO_URI, JWT_SECRET, PORT (if needed), FRONTEND_URL
# 4. Configure CORS in server.js:
#    const allowedOrigins = [process.env.FRONTEND_URL];
#    app.use(cors({ origin: allowedOrigins, credentials: true }));
# 5. Platform runs `npm start` automatically.
# 6. Verify with GET request to deployed backend URL.
Frontend Deployment
bash
Copy
Edit
# Example steps for Vercel/Netlify:

# 1. Push code to GitHub
# 2. Connect frontend repo to hosting platform
# 3. Set env var: VITE_API_URL=https://your-backend-url
# 4. Build & publish:
#    Build command: npm run build
#    Publish directory: dist
# 5. Verify deployed site works with backend.
Environment-Specific Git Ignore
Ensure .gitignore includes:

bash
Copy
Edit
**/node_modules/
**/.env
frontend/dist/
*.log
.vscode/
.DS_Store
Future Improvements
Form validation & improved UI (Tailwind, component libraries).

User profile management.

Password reset via email.

Reminder/notification feature (cron + email/push).

Analytics & charts for habit history.

Pagination/filtering for many habits.

Automated tests (Jest, Supertest, React Testing Library).

CI/CD (GitHub Actions).

Logging & monitoring (winston/pino, Sentry).

Security enhancements (rate limiting, helmet, sanitization).

Internationalization, theming (dark mode).

Mobile app version (React Native).

Dockerization and docker-compose for local dev.

Contributing
bash
Copy
Edit
# 1. Fork the repo.
# 2. Clone your fork.
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker

# 3. Create a branch:
git checkout -b feature/your-feature

# 4. Implement changes, add tests if applicable.

# 5. Commit:
git add .
git commit -m "Add feature XYZ"

# 6. Push:
git push -u origin feature/your-feature

# 7. Open a Pull Request against main.