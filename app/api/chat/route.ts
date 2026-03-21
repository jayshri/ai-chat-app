import { NextRequest, NextResponse } from "next/server";
// Makes request to the OpenAi API and returns the response.
export async function POST(req: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "Please configure OpenAI API key inside .env.local file" },
                { status: 500 }
            );
        }
    
        const body = await req.json();
        const messages = body.messages;

        // compose the request body and get the response from OpenAI API.
        let response: Response;
        try {
            response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    ...messages,
                ],
                max_tokens: 1024,
                }),
            });
        } catch (error) {
            return NextResponse.json(
                { error: "An error occurred while calling OpenAI API" },
                { status: 500 }
            );
        }
        // If the response is not ok, then return an error message with status code.
        if (!response.ok) {
            return NextResponse.json(
            { error: "OpenAI request failed" },
            { status: response.status }
            );
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }   
}