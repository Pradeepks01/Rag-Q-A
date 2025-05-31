# 📄 RAG-Based PDF Q&A System

A **Retrieval-Augmented Generation (RAG)** powered Question-Answering system that allows you to ask questions from any PDF document. It uses **OpenAI Embeddings** and **Qdrant Vector DB** to store and search text chunks for context-aware answers.

---

## ✨ Features

- ✅ Extracts text from uploaded PDF files.
- ✂️ Splits content into chunks for better embedding and retrieval.
- 🧠 Uses OpenAI Embeddings to vectorize chunks and queries.
- 📦 Stores and retrieves chunks using Qdrant Vector DB.
- 💬 Answers questions using OpenAI's LLM (GPT).
- 🖥️ Runs as a terminal CLI app (Node.js).

---

## 📁 Project Structure

rag-doc-qna/
├── src/
│ ├── index.js # Main CLI logic
│ ├── pdfUtils.js # PDF parsing and chunking
│ ├── embedUtils.js # OpenAI embedding functions
│ ├── qdrantUtils.js # Qdrant client helpers
│ └── llmUtils.js # Answer generation using OpenAI
├── .env # API keys and configuration
├── package.json

---

## 🚀 Setup & Run

### 1. Clone this repo

```bash
git clone https://github.com/yourusername/rag-doc-qna.git
```
cd rag-doc-qna
2. Install dependencies
npm install
3. Create .env file
Create a .env file in the root with the following content:
OPENAI_API_KEY=your_openai_api_key
QDRANT_API_KEY=your_qdrant_api_key     # Optional if using Qdrant Cloud
QDRANT_URL=http://localhost:6333       # Or your cloud instance
4. Run the app
node src/index.js
