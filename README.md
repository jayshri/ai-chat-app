# AI Chat App
This is simple AI chat bot using React and Next.js. This app lets you chat with OpenAI and displays response with storing the previous conversations in the form of chat history. It stores your chat history between refreshes, supports clearing the conversation, and handles basic accessibility for screen readers.

Used Claude for spec.md to draw marmaid diagram of entire application. 

## Getting Started

1. Clone the repo
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env.local` and replace your OpenAI API key
4. Run `npm run dev` and open http://localhost:3000

## Notes
I used localStorage to store the chat history temporary to keep the setup simple but in production app, I'd replace this with a server-side database so the history persists across multiple devices and users.  

## Styling AI Responses
I used Markdown to render the AI responses for better readability.  
I specifically used `react-markdown` with `remark-gfm` to support formatting such as headings, lists, and code blocks.

