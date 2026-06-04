// backend/services/aiService.js

export async function generateQuiz(
  notes,
  category,
  difficulty
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content: `
You are an AI quiz generator.

Generate EXACTLY 10 questions based only on the provided notes.

IMPORTANT:
- The quiz MUST contain exactly 10 questions.
- Returning fewer than 10 questions is incorrect.

Difficulty Rules:

EASY:
- Multiple choice questions
- 4 choices per question
- Include the correct answer

MEDIUM:
- Enumeration or short-answer questions
- Include the correct answer

HARD:
- Essay questions
- Include a model answer

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use code blocks.
Do NOT add explanations before or after the JSON.

Easy format:
{
  "questions": [
    {
      "question": "What is React?",
      "choices": [
        "Library",
        "Database",
        "Browser",
        "Language"
      ],
      "answer": "Library"
    }
  ]
}

Medium format:
{
  "questions": [
    {
      "question": "Name the three parts of MVC.",
      "answer": "Model, View, Controller"
    }
  ]
}

Hard format:
{
  "questions": [
    {
      "question": "Explain how React state works.",
      "answer": "Model answer here"
    }
  ]
}
            `,
          },

          {
            role: "user",
            content: `
Category: ${category || "General"}

Difficulty: ${difficulty}

Notes:
${notes}

Generate the quiz now.
            `,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const quizText =
    data.choices[0].message.content;

  console.log("AI Response:");
  console.log(quizText);

  try {
    const quiz = JSON.parse(quizText);

    return quiz;
  } catch (error) {
    console.error("Failed to parse quiz JSON:");
    console.error(error);

    throw new Error("Invalid quiz format returned by AI");
  }
}


export async function gradeQuizAnswers(
  questions
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content: `
You are an AI quiz grader.

Evaluate each answer based on meaning, not exact wording.

If the student's answer conveys the same idea as the correct answer,
mark it correct.

Return ONLY valid JSON.

Format:

{
  "results": [
    {
      "isCorrect": true,
      "feedback": "Answer captures the correct concept."
    }
  ]
}
            `,
          },

          {
            role: "user",
            content: JSON.stringify(
              questions
            ),
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const text =
    data.choices[0].message.content;

  return JSON.parse(text);
}