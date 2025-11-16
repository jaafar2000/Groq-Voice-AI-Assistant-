import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "edge";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, instruction } = await req.json();
    if (!message) {
      return new NextResponse("Missing message", { status: 400 });
    }
    const systemPrompt = instruction?.trim()
      ? instruction
      : "You are a helpful assistant.";
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const token = chunk?.choices?.[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(token));
          }
        } catch (err) {
          console.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Chat API Error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process chat request" }),
      { status: 500 }
    );
  }
}
