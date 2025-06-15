

# Habit Buddy

A simple full-stack Habit Tracker application with user authentication and habit management (create, list, update, complete with streak logic, and delete). Built with Node.js, Express, MongoDB on the backend, and React (Vite) on the frontend.

---

## Table of Contents

- [Habit Buddy](#habit-buddy)
  - [Table of Contents](#table-of-contents)
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
    - [Use the App](#use-the-app)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Habits (Protected: require `Authorization: Bearer <token>`)](#habits-protected-require-authorization-bearer-token)
  - [Frontend Usage](#frontend-usage)
  - [Testing the API](#testing-the-api)
  - [Scripts and Commands](#scripts-and-commands)
    - [Backend (`backend/package.json`)](#backend-backendpackagejson)
    - [Frontend (`frontend/package.json`)](#frontend-frontendpackagejson)
  - [Git \& Version Control](#git--version-control)
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

- **Daily**: Only once per day; streak increments if completed yesterday, otherwise resets to 1

- **Weekly**: Only once per week; streak increments if completed in the previous calendar week, otherwise resets to 1

- **Monthly**: Only once per month; streak increments if completed in the previous calendar month, otherwise resets to 1

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

- **Node.js & npm**: v16+ recommended. npm comes bundled with Node.js.

- **Git**: for version control.

- **MongoDB**:

- Local: install MongoDB Community Edition and run `mongod` locally.

- OR Cloud: MongoDB Atlas URI.

- **Code Editor**: VSCode recommended.

---

## Project Structure

Monorepo layout (root folder contains `backend/` and `frontend/`):

```

habit-buddy/

├── backend/

│   ├── controllers/

│   │   ├── authController.js

│   │   └── habitController.js

│   ├── middleware/

│   │   └── verifyToken.js

│   ├── models/

│   │   ├── User.js

│   │   └── Habit.js

│   ├── routes/

│   │   ├── authRoutes.js

│   │   └── habitRoutes.js

│   ├── server.js

│   ├── package.json

│   ├── .env.example

│   └── .env # NOT committed

└── frontend/

├── public/

│   └── index.html

├── src/

│   ├── components/

│   │   ├── Login.jsx

│   │   ├── Signup.jsx

│   │   ├── Dashboard.jsx

│   │   ├── HabitForm.jsx

│   │   ├── HabitCard.jsx

│   │   └── Header.jsx

│   ├── services/

│   │   └── api.js

│   ├── App.jsx

│   ├── main.jsx

│   ├── styles.css (or App.css)

│   └── ...

├── package.json

├── vite.config.js

├── .env.example

└── .env # NOT committed

├── .gitignore

└── README.md

```

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

```

**Instructions**: After cloning, create `.env` file in backend directory:

```bash

cd backend

cp .env.example .env  # macOS/Linux

# Windows: copy .env.example .env

```

Open `backend/.env` and set actual `MONGO_URI`, `PORT`, and `JWT_SECRET`.

### Frontend `.env.example`

```text

# Frontend environment variables for Habit Buddy

# Backend API base URL for development; in production, set to deployed backend URL

VITE_API_URL=http://localhost:5000

```

**Instructions**: After cloning, create `.env` file in frontend directory:

```bash

cd frontend

cp .env.example .env  # macOS/Linux

# Windows: copy .env.example .env

```

Open `frontend/.env` and adjust `VITE_API_URL` as needed.

> **Note**: `.env` files are listed in `.gitignore` and not tracked by Git.

---

## Getting Started (Local Development)

### Clone the Repo

```bash

git clone https://github.com/Poojan-Bansal/habit-tracker.git

cd habit-tracker

```

### Setup Backend

```bash

cd backend

npm install

```

Create `.env` file (see [Environment Variables](#environment-variables) section) then start server:

```bash

node server.js  # or npm start

```

You should see:

```bash

✅ MongoDB connected

✅ Server running on http://localhost:5000

```

### Setup Frontend

In a new terminal:

```bash

cd frontend

npm install

```

Create `.env` file (see [Environment Variables](#environment-variables) section) then start dev server:

```bash

npm run dev

```

You should see:

```bash

VITE vX.Y.Z  dev server running at:

> Local: http://localhost:5173/

```

Open your browser at http://localhost:5173 to use the app.

### Use the App

1. **Sign Up**: Register a user (name, email, password)

2. **Login**: Authenticate and store JWT token in localStorage

3. **Dashboard**:

- List habits

- Add new habit

- Complete habit (streak logic)

- Edit/Delete habits

4. **Logout**: Clear token and return to login

5. **Error Handling**: Invalid operations show error messages

---

## API Endpoints

Base URL: `http://localhost:5000/api`

### Auth

**POST** `/api/auth/register`

Body:

```json

{

"name": "Your Name",

"email": "you@example.com",

"password": "yourpassword"

}

```

Response:

```json

{

"token": "<JWT token>",

"user": {

"id": "<user id>",

"name": "Your Name",

"email": "you@example.com"

}

}

```

**POST** `/api/auth/login`

Body:

```json

{

"email": "you@example.com",

"password": "yourpassword"

}

```

Response:

```json

{

"token": "<JWT token>",

"user": {

"id": "<user id>",

"name": "Your Name",

"email": "you@example.com"

}

}

```

**GET** `/api/auth/logout`

Clears authentication token (client should remove token from storage)

### Habits (Protected: require `Authorization: Bearer <token>`)

**GET** `/api/habits`

Returns array of habit objects for logged-in user

**POST** `/api/habits`

Body:

```json

{

"title": "Exercise",

"description": "30 min run",

"frequency": "daily",

"targetCount": 1

}

```

Response: Created habit object

**PATCH** `/api/habits/:id/complete`

Complete habit for current period (updates streak and lastCompleted)

Response: Updated habit object

Error `400` if already completed in current period

**PUT** `/api/habits/:id`

Body (any combination of fields):

```json

{

"title": "Updated Title",

"description": "New description",

"frequency": "weekly",

"targetCount": 3

}

```

Response: Updated habit object

**DELETE** `/api/habits/:id`

Response:

```json

{

"message": "Habit deleted"

}

```

---

## Frontend Usage

- `src/services/api.js`: Handles API requests with JWT authentication

- Token management: `localStorage` for JWT persistence

- Component structure:

- `Login.jsx`/`Signup.jsx`: Authentication flows

- `Dashboard.jsx`: Main habit management interface

- `HabitForm.jsx`: Create/edit habit form

- `HabitCard.jsx`: Display habit with action buttons

- `Header.jsx`: Navigation and logout

---

## Testing the API

Use curl or Postman:

```bash

# Register

curl -X POST http://localhost:5000/api/auth/register \

-H "Content-Type: application/json" \

-d '{"name":"Test User","email":"test@example.com","password":"pass123"}'

# Login (save token)

curl -X POST http://localhost:5000/api/auth/login \

-H "Content-Type: application/json" \

-d '{"email":"test@example.com","password":"pass123"}'

# Set token variable (Unix/macOS)

export TOKEN="<paste_token_here>"

# Create habit

curl -X POST http://localhost:5000/api/habits \

-H "Content-Type: application/json" \

-H "Authorization: Bearer $TOKEN" \

-d '{"title":"Read","description":"Read 20 pages","frequency":"daily"}'

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

```

> **Windows CMD users**: Replace `export TOKEN="..."` with `set TOKEN=...` and use `%TOKEN%` instead of `$TOKEN`

---

## Scripts and Commands

### Backend (`backend/package.json`)

```json

"scripts": {

"start": "node server.js",

"dev": "nodemon server.js"

}

```

Usage:

```bash

npm install       # Install dependencies

npm start         # Start production server

npm run dev       # Start dev server (with nodemon)

```

### Frontend (`frontend/package.json`)

```json

"scripts": {

"dev": "vite",

"build": "vite build",

"preview": "vite preview"

}

```

Usage:

```bash

npm install       # Install dependencies

npm run dev       # Start dev server

npm run build     # Create production build

npm run preview   # Preview production build

```

---

## Git & Version Control

```bash

# Initialize repo

git init

# Add all files

git add .

# Commit changes

git commit -m "Initial commit"

# Connect to remote

git remote add origin https://github.com/your-username/habit-tracker.git

# Push to main branch

git push -u origin main

# Create feature branch

git checkout -b feature/new-feature

```

---

## Deployment

### Backend Deployment

1. Push code to GitHub

2. Create new app on hosting platform (Render, Heroku, etc.)

3. Set environment variables:

- `MONGO_URI` (production MongoDB URI)

- `JWT_SECRET`

- `PORT` (if required by host)

- `FRONTEND_URL` (for CORS)

4. Configure CORS in `server.js`:

```js

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({

origin: allowedOrigins,

credentials: true

}));

```

5. Platform should automatically run `npm start`

### Frontend Deployment

1. Push code to GitHub

2. Create new app on hosting platform (Vercel, Netlify, etc.)

3. Set environment variable:

- `VITE_API_URL` (deployed backend URL)

4. Configure build settings:

- Build Command: `npm run build`

- Publish Directory: `dist`

5. Deploy application

---

## Environment-Specific Git Ignore

```gitignore

# .gitignore

**/node_modules/

**/.env

frontend/dist/

*.log

.vscode/

.DS_Store

```

---

## Future Improvements

- [ ] Form validation & improved UI (TailwindCSS)

- [ ] Password reset functionality

- [ ] Habit reminders (email/notifications)

- [ ] Analytics dashboard

- [ ] Social sharing features

- [ ] Mobile app (React Native)

- [ ] Automated testing (Jest, React Testing Library)

- [ ] CI/CD pipeline

- [ ] Docker support

---



---


