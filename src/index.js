import dotenv from 'dotenv';
dotenv.config();

import readlineSync from 'readline-sync';
import path from 'path';
import { fileURLToPath } from 'url';

import { extractTextFromPDF, chunkText } from './pdfUtils.js';
import { embedChunks, embedQuery } from './embedUtils.js';
import { uploadChunksToQdrant, searchSimilarChunks } from './qdrantUtils.js';
import { generateAnswer } from './llmUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLLECTION_NAME = 'pdf_collection';

async function main() {
  // Ask user for PDF file path
  const pdfPath = readlineSync.question('📄 Enter path to PDF file: ');
  const fullPath = path.resolve(__dirname, pdfPath);

  console.log('⏳ Extracting text...');
  const rawText = await extractTextFromPDF(fullPath);

  console.log('✂️ Chunking text...');
  const chunks = chunkText(rawText);

  console.log(`🧠 Embedding ${chunks.length} chunks...`);
  const embeddings = await embedChunks(chunks);

  console.log('📦 Uploading to Qdrant...');
  await uploadChunksToQdrant(chunks, embeddings, COLLECTION_NAME);

  while (true) {
    const question = readlineSync.question('\n❓ Ask a question (or type "exit"): ');
    if (question.toLowerCase() === 'exit') {
      console.log('👋 Exiting...');
      break;
    }

    const queryEmbedding = await embedQuery(question);
    const relevantChunks = await searchSimilarChunks(queryEmbedding, COLLECTION_NAME);

    const answer = await generateAnswer(relevantChunks, question);
    console.log('\n💬 Answer:\n', answer);
  }
}

main().catch((err) => {
  console.error('❌ Error:', err);
});
