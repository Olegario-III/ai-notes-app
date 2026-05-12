export async function generateQuiz(notes) {
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
            role: "user",
            content: `
Create a quiz based on these notes:

${notes}
            `
          }
        ]
      })
    }
  );

  const data = await response.json();

  return data.choices[0].message.content;
}