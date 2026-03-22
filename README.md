# AI Chat App
This is simple AI chat bot using React and Next.js. This app lets you chat with OpenAI and displays response with storing the previous conversations in the form of chat history. 

## Getting Started

1. Clone the repo
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env.local` and replace your OpenAI API key
4. Run `npm run dev` and open http://localhost:3000

## Notes
I used localStorage to store the chat history temporary to keep the setup simple but in production app, I'd replace this with a server-side database so the history persists across multiple devices and users.  