import pkg from 'qdrant-client';
const { QdrantClient } = pkg;

const client = new QdrantClient({
  url: process.env.QDRANT_URL || 'http://localhost:6333',
  // apiKey: process.env.QDRANT_API_KEY, // if you have API key for Qdrant cloud or secured instance
});

export async function uploadChunksToQdrant(chunks, embeddings, collectionName) {
  // Create collection if not exists
  const collections = await client.getCollections();
  if (!collections.collections.some(c => c.name === collectionName)) {
    await client.createCollection({
      collection_name: collectionName,
      vectors: {
        size: embeddings[0].length,
        distance: 'Cosine',  // or 'Dot' or 'Euclid' based on your choice
      },
    });
  }

  // Prepare points to upload
  const points = chunks.map((chunk, idx) => ({
    id: idx.toString(),  // string ids for points
    vector: embeddings[idx],
    payload: { text: chunk }, // storing text chunk as payload for retrieval
  }));

  // Upload points in batches if needed (Qdrant has limits)
  await client.upsert({
    collection_name: collectionName,
    points,
  });
}

export async function searchSimilarChunks(queryEmbedding, collectionName, limit = 5) {
  const searchResult = await client.search({
    collection_name: collectionName,
    vector: queryEmbedding,
    limit,
    with_payload: true,
  });

  // Extract text chunks from payloads
  return searchResult.map(point => point.payload.text);
}
