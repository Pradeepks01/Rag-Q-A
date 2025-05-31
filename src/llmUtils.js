import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate answer from relevant chunks and user question
 * Combines the chunks into context and asks OpenAI chat completion
 * 
 * @param {string[]} chunks - Array of text chunks relevant to the query
 * @param {string} question - User's question
 * @returns {Promise<string>} - Generated answer text
 */
export async function generateAnswer(chunks, question) {
  // Combine chunks into a single context string (limit length if needed)
  const context = chunks.join('\n\n');

  // Construct system prompt with instructions (optional)
  const systemPrompt = `You are an assistant helping to answer questions based on provided document context. Use the context below to answer the question.`;

  // Construct user prompt
  const userPrompt = `Context:\n${context}\n\nQuestion: ${question}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: 500,
    temperature: 0.2,
  });

  return response.choices[0].message.content.trim();
}
