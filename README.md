
# Learn with Jiji Backend

## Setup
1. Copy `.env.example` to `.env` and fill credentials
2. Run:
   npm install
   npm start

## Endpoint
POST /ask-jiji

### Request
{
  "question": "Explain RAG",
  "topic": "AI"
}

## Auth
Auth is mocked for assignment purposes.

## RLS
Row Level Security ensures users can only access their own queries.

## Improvement
With more time: add real AI search, JWT auth middleware, caching.
