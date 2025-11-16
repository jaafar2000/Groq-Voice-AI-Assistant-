import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { Buffer } from 'buffer';

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return new NextResponse("Missing text", { status: 400 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

    const tts = await groq.audio.speech.create({
      model: "playai-tts",
      voice: "Jennifer-PlayAI", 
      input: text,
    });

    const audioBuffer = await tts.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');
    
    if (!audioBase64) {
      throw new Error("TTS API returned empty audio data.");
    }

    return new NextResponse(audioBase64, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Speak API Error:", error);
    return new NextResponse("Failed to generate audio (500).", { status: 500 });
  }
}