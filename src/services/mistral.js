const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions'

const SYSTEM_PROMPT = `You are CarbonTatva AI, an expert industrial sustainability advisor specializing in energy efficiency, emissions reduction, and sustainability compliance for industrial facilities.
You have deep knowledge of BEE (Bureau of Energy Efficiency) guidelines, ISO 50001, ESG reporting, motor efficiency, boiler optimization, HVAC systems, and renewable energy integration.
Always cite sources when possible. Format responses with clear sections using markdown-style headings and bullet points where appropriate.
Keep answers practical and specific to industrial contexts.`

export async function sendMessage(messages) {
  const apiKey = import.meta.env.VITE_MISTRAL_API_KEY
  if (!apiKey) throw new Error('Mistral API key not configured.')

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'mistral-large-latest',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.3,
      max_tokens: 1500,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
