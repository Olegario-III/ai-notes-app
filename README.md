# AI Notes Quiz App

A full-stack AI-powered notes and quiz web application built with React, Express, and SQLite. Users can create notes, organize them by category, generate AI quizzes from their notes, and manage learning progress through an interactive dashboard.

---

# Features

## Notes Management

* Add notes
* Delete notes
* Fetch saved notes
* Filter by category
* Filter by time:

  * Today
  * This Week
  * This Month

## AI Quiz Generator

* Generate quizzes from notes using AI
* OpenRouter API integration
* Supports dynamic AI prompts
* Planned quiz difficulty system:

  * Easy → Multiple Choice
  * Medium → Enumeration
  * Hard → Essay

## Dashboard System

* Sidebar navigation
* Notes page
* Quiz page
* Profile page

## Authentication (Planned)

* User registration
* Login system
* JWT authentication
* Protected dashboard routes

---

# Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* CSS3

## Backend

* Express.js
* Node.js

## Database

* SQLite

## AI Integration

* OpenRouter API
* GPT-based quiz generation

---

# Project Structure

```txt
frontend/
│
├── components/
│   ├── Sidebar.jsx
│   ├── AddNote.jsx
│   ├── NotesList.jsx
│   ├── Filters.jsx
│   └── Quiz.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── NotesPage.jsx
│   ├── QuizPage.jsx
│   ├── ProfilePage.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── App.jsx
├── main.jsx
└── index.css


backend/
│
├── routes/
│   ├── notes.js
│   └── quiz.js
│
├── database/
│   └── db.js
│
├── services/
│   └── aiService.js
│
├── server.js
├── notes.db
└── .env
```

---

# API Endpoints

## Notes Routes

### Get All Notes

```http
GET /notes
```

### Add Note

```http
POST /notes
```

Request Body:

```json
{
  "content": "Sample note",
  "category": "Programming"
}
```

### Delete Note

```http
DELETE /notes/:id
```

---

# Quiz Route

### Generate Quiz

```http
POST /quiz
```

Request Body:

```json
{
  "notes": "Your notes content here"
}
```

---

# Environment Variables

Create a `.env` file inside the backend folder:

```env
OPENROUTER_API_KEY=your_api_key_here
```

---

# Installation

## Clone Repository

```bash
git clone <your-repo-url>
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

# Current Learning Goals

This project was built to practice and understand:

* Full-stack development
* REST APIs
* Express routing
* SQLite queries
* React hooks
* React Router
* AI API integration
* Authentication systems
* Async/await
* JSON handling
* Frontend/backend communication

---

# Future Improvements

* Quiz scoring system
* Quiz history saving
* AI answer checking
* Authentication with JWT
* Protected routes
* User profiles
* Better responsive UI
* Deployment
* PostgreSQL migration
* Markdown support
* Rich text editor
* AI flashcards
* Export notes as PDF

---

# Author

Built by Olegario Aleño III as a full-stack learning project focused on AI-powered educational tools.
