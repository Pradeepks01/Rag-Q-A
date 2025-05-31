import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Embed multiple text chunks
export async function embedChunks(chunks) {
  // OpenAI embeddings endpoint supports batching in v4
  // But here, embedding one by one for simplicity
  const embeddings = [];

  for (const chunk of chunks) {
    const response = await openai.embeddings.create({
      input: chunk,
      model: 'text-embedding-3-large',
    });
    embeddings.push(response.data[0].embedding);
  }

  return embeddings;
}

// Embed a single query string
export async function embedQuery(query) {
  const response = await openai.embeddings.create({
    input: query,
    model: 'text-embedding-3-large',
  });
  return response.data[0].embedding;
}
