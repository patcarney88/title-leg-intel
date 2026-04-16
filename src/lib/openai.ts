interface ChatMessage {
  role: "system" | "user";
  content: string;
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export async function generateStructuredDraft(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const baseUrl = process.env.OPENAI_BASE_URL ?? "https://openrouter.ai/api/v1";
  const model = process.env.OPENAI_MODEL ?? "openai/gpt-4o";

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You generate concise legislative impact analysis for title insurance professionals. Return valid JSON only.",
    },
    { role: "user", content: prompt },
  ];

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      response_format: { type: "json_object" },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`AI request failed with ${response.status}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("AI response was empty");
  }

  return JSON.parse(content) as Record<string, unknown>;
}
