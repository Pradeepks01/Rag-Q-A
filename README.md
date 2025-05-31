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

## 🚀 Setup & Run

### 1. Clone this repo

```bash
https://github.com/Pradeepks01/Rag-Q-A.git
```

### 2. Install dependencies
```shell
npm install
```

### 3. Create .env file
```js
OPENAI_API_KEY=your_openai_api_key
QDRANT_API_KEY=your_qdrant_api_key     
QDRANT_URL=http://localhost:6333
```       

### 4. Run the app
```shell
node src/index.js
```
