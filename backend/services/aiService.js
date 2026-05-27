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
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content: `
You are an AI quiz generator.

Generate a clear and well-formatted quiz.

Rules:
- Create 5 questions
- Include answers
- Match the requested difficulty
- Focus only on the provided notes
- Keep formatting clean and readable
            `
          },

          {
            role: "user",
            content: `
Category: ${category || "General"}

Difficulty: ${difficulty}

Notes:
${notes}

Generate the quiz now.
            `
          }
        ]
      })
    }
  );

  const data = await response.json();

  console.log(data);

  return data.choices[0].message.content;
}