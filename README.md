# AI Notes Quiz App

A full-stack AI-powered study application built with React, Express, SQLite, JWT Authentication, and OpenRouter AI.

Users can create and organize notes, generate AI-powered quizzes from their notes, track quiz history, and manage their learning progress through a secure dashboard.

---

# Features

## Authentication

* User registration
* User login
* JWT authentication
* Password hashing with bcrypt
* Protected routes
* User-specific data access
* Logout functionality

---

## Notes Management

* Add notes
* Edit notes
* Delete notes
* View saved notes
* Category filtering
* Time filtering:

  * Today
  * This Week
  * This Month
* User-specific notes storage

---

## AI Quiz Generator

Generate quizzes directly from your notes using AI.

### Difficulty Levels

#### Easy

* Multiple choice questions
* 4 answer choices
* Automatically scored

#### Medium

* Enumeration / short-answer questions
* AI-assisted grading (in development)

#### Hard

* Essay questions
* AI essay scoring (in development)

### Quiz Features

* Generate quizzes from notes
* Category-based quiz generation
* AI-generated questions
* Automatic scoring
* Quiz result calculation
* Percentage scoring

---

## Quiz History

Track previous quiz attempts.

Features:

* Save completed quizzes
* View quiz history
* Expandable history cards
* Review previous answers
* View score and percentage
* User-specific quiz history

---

## Dashboard

Single-page application dashboard with:

* Notes page
* Quiz page
* Quiz history page
* Profile page
* Sidebar navigation

---

# Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* CSS3
* Component-based architecture

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

## Database

* SQLite

Tables:

* users
* notes
* quiz_history
* quiz_answers

## AI Integration

* OpenRouter API
* GPT-powered quiz generation

Current model:

* openai/gpt-3.5-turbo

---

# Project Structure

```txt
src/
│
├── components/
│   ├── Sidebar.jsx
│   ├── AddNote.jsx
│   ├── NotesList.jsx
│   ├── Filters.jsx
│   ├── Quiz.jsx
│   ├── QuizQuestion.jsx
│   ├── QuizResult.jsx
│   ├── QuizFilters.jsx
│   ├── QuizNotesPreview.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── NotesPage.jsx
│   ├── QuizPage.jsx
│   ├── QuizHistoryPage.jsx
│   ├── ProfilePage.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── services/
│   └── quizService.js
│
├── utils/
│   └── quizUtils.js
│
├── App.jsx
├── main.jsx
└── index.css


backend/
│
├── routes/
│   ├── auth.js
│   ├── notes.js
│   ├── quiz.js
│   └── quizHistory.js
│
├── database/
│   └── db.js
│
├── middleware/
│   └── authMiddleware.js
│
├── services/
│   └── aiService.js
│
├── server.js
├── notes.db
├── package.json
└── .env
```

---

# API Endpoints

## Authentication

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

---

## Notes

### Get Notes

```http
GET /notes
```

### Add Note

```http
POST /notes
```

### Update Note

```http
PUT /notes/:id
```

### Delete Note

```http
DELETE /notes/:id
```

---

## Quiz

### Generate Quiz

```http
POST /quiz
```

---

## Quiz History

### Save Quiz Result

```http
POST /quiz-history
```

### Get Quiz History

```http
GET /quiz-history
```

### Get Quiz Attempt Details

```http
GET /quiz-history/:id
```

---

# Environment Variables

Create a `.env` file inside the backend folder:

```env
OPENROUTER_API_KEY=your_api_key_here

JWT_SECRET=your_jwt_secret_here
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Backend Setup

```bash
cd backend

npm install

node server.js
```

---

# Current Limitations

* Medium difficulty answers still use strict answer matching
* Essay questions are not yet scored
* AI feedback/remarks are not yet implemented
* No quiz history pagination
* PostgreSQL migration not yet completed

---

# Planned Improvements

* AI grading for medium difficulty quizzes
* AI essay scoring
* Personalized AI feedback and remarks
* Quiz answer feedback
* Quiz history detail component refactor
* Dashboard enhancements
* PostgreSQL migration
* Deployment
* AI flashcards
* Export notes
* Rich text editor

---

# Learning Objectives

This project was built to practice:

* React development
* Component architecture
* REST API development
* Express.js
* SQLite
* Authentication with JWT
* Password hashing
* Protected routes
* AI integration
* Full-stack development
* Database relationships
* Async programming
* State management

---

# Author

Built by Olegario Aleño III as a full-stack learning project focused on AI-powered educational tools and modern web development.
