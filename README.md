# AI Notes Quiz App

A full-stack study app for creating notes, generating AI-powered quizzes from those notes, reviewing quiz history, and managing user access. The project combines a React frontend with an Express backend, SQLite storage, JWT authentication, and OpenRouter-based AI quiz generation.

## What the app does

- Register and log in with secure JWT-based authentication
- Create, edit, delete, and filter personal notes
- Generate quizzes from saved notes using AI
- Choose quiz difficulty levels: easy, medium, and hard
- Review past quiz attempts with answers and scores
- Access an admin-only user management area

## Features

### Authentication

- User registration and login
- Password hashing with bcrypt
- Protected routes for authenticated users
- Role-based access with basic admin support

### Notes

- Add and manage notes per user
- Filter notes by category and time range
- Keep notes organized in a simple dashboard experience

### Quiz generation

- Generate quizzes from selected notes
- Support for easy, medium, and hard questions
- AI-generated questions and answers through OpenRouter
- Score results and track performance over time

### Quiz history

- Save completed quiz attempts
- Review scores, percentages, and individual answers
- Expand quiz history details for each attempt

## Tech stack

### Frontend

- React
- Vite
- React Router DOM
- CSS

### Backend

- Node.js
- Express
- JWT authentication
- bcrypt
- CORS

### Data and AI

- SQLite
- OpenRouter API
- GPT-based quiz generation via OpenAI-compatible model

## Project structure

```text
backend/
  database/
    db.js
  middleware/
    adminMiddleware.js
    authMiddleware.js
  routes/
    auth.js
    gradeQuiz.js
    notes.js
    quiz.js
    quizHistory.js
    users.js
  services/
    aiService.js
  server.js

frontend/
  ai-notes-app/
    src/
      components/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
      index.css
```

## Prerequisites

- Node.js 18 or newer
- npm

## Environment variables

Create a file named .env inside the backend folder with the following values:

```env
OPENROUTER_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

## Installation and setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ai-notes-app
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Start the backend server

```bash
node server.js
```

The API will run at http://localhost:3000.

### 4. Install frontend dependencies

```bash
cd ../frontend/ai-notes-app
npm install
```

### 5. Start the frontend app

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## API overview

### Authentication

- POST /auth/register
- POST /auth/login

### Notes

- GET /notes
- POST /notes
- PUT /notes/:id
- DELETE /notes/:id

### Quiz

- POST /quiz
- POST /grade-quiz

### Quiz history

- GET /quiz-history
- GET /quiz-history/:id

### Admin users

- GET /users
- PUT /users/:id/role
- DELETE /users/:id

## Notes about the current build

- Easy quizzes are generated as multiple-choice questions.
- Medium and hard quiz generation depends on AI responses and may vary.
- Admin features are available for accounts with the admin role.

## Future ideas

- Better AI grading for medium and hard questions
- More detailed quiz feedback
- Pagination for quiz history
- Deployment and production hardening
- Richer note editing and export options

## Author

Built as a full-stack learning project focused on AI-assisted study tools and modern web development.
