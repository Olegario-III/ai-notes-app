// src/services/quizService.js

export async function generateQuizRequest(
  notes,
  category,
  difficulty
) {
  const token =
    localStorage.getItem("token");

  const allNotes = notes
    .map((note) => note.content)
    .join("\n");

  const res = await fetch(
    "http://localhost:3000/quiz",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        notes: allNotes,
        category,
        difficulty,
      }),
    }
  );

  return await res.json();
}

export async function saveQuizHistory(
  payload
) {
  const token =
    localStorage.getItem("token");

  const res = await fetch(
    "http://localhost:3000/quiz-history",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return await res.json();
}

export async function gradeQuiz(
  questions
) {
  const token =
    localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:3000/grade-quiz",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify({
        questions,
      }),
    }
  );

  return response.json();
}