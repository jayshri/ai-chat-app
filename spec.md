# spec.md

## Application Architecture

```mermaid
flowchart TD
    User([User]) -->|types message| UI[app/page.tsx\nChat UI]

    UI -->|loads on mount| LS[(localStorage\nchat_messages)]
    UI -->|saves on change| LS

    UI -->|POST /api/chat\n{messages}| API[app/api/chat/route.ts\nAPI Route]

    API -->|reads| ENV[OPENAI_API_KEY\n.env.local]
    API -->|POST chat/completions\ngpt-4o-mini| OpenAI[OpenAI API]
    OpenAI -->|{reply}| API
    API -->|{reply}| UI

    UI -->|renders| MI[components/MessageItem.tsx]
    MI -->|assistant messages| MD[react-markdown\n+ remark-gfm]
    MI -->|user messages| PT[plain text]
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as page.tsx
    participant LS as localStorage
    participant API as /api/chat
    participant OAI as OpenAI

    UI->>LS: load messages on mount
    U->>UI: submit message
    UI->>UI: append user message to state
    UI->>API: POST {messages: [...history]}
    API->>OAI: POST /v1/chat/completions
    OAI-->>API: {choices[0].message.content}
    API-->>UI: {reply}
    UI->>UI: append assistant message to state
    UI->>LS: persist updated messages
```
