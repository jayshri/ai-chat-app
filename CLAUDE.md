# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Setup

Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` before running.

## Architecture

Next.js 13+ App Router app with a simple client-server split:

- **`app/page.tsx`** — The entire chat UI as a single client component. Manages all state (messages, input, loading, error) with React hooks. Persists conversation to `localStorage` under key `"chat_messages"`.
- **`app/api/chat/route.ts`** — POST API route that proxies to OpenAI (`gpt-4o-mini`, max 1024 tokens). Receives `{ messages: [{role, content}] }`, returns `{ reply: string }`. Reads `OPENAI_API_KEY` from server env.
- **`components/MessageItem.tsx`** — Renders a single message. Uses `react-markdown` + `remark-gfm` for assistant messages; plain text for user messages.
- **`types/chat.ts`** — Shared types: `Role = "user" | "assistant"` and `Message { id, role, content, timestamp }`.

The full conversation history is sent to the API on every request to maintain context. There is no external state management library — everything is `useState`/`useEffect`.
