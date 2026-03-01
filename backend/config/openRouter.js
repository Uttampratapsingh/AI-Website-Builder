const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
const model = "deepseek/deepseek-chat";

const generateResponse = async (prompt) => {
    console.log("Generating response for prompt:", prompt);
    const res = await fetch(openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.OPENROUTE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
            role: "system",
            content: "You must return only valid raw json."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    }),
  });

  if(!res.ok){
    const errorData = await res.json();
    console.error("OpenRouter API Error:", errorData);
    throw new Error(`OpenRouter API Error: ${errorData.error.message}`);
  }

  const data = await res.json();
  console.log("OpenRouter API Response recieved:", data);
  return data.choices[0].message.content;
};