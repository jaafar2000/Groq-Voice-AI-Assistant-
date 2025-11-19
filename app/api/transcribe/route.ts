import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return new NextResponse("No audio file provided.", { status: 400 });
    }

    // FIX: create a proper file with a filename
    const fixedFile = new File([file], "audio.webm", { type: file.type });

    const transcription = await groq.audio.transcriptions.create({
      file: fixedFile,
      model: "whisper-large-v3",
    });

    const text = (transcription as any)?.text;

    if (!text || text.trim().length === 0) {
      return new NextResponse("I couldn't hear you clearly. Try again.", {
        status: 400,
      });
    }

    return new NextResponse(text, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("Transcription API Error:", err);
    return new NextResponse("Transcription failed. Try again.", {
      status: 500,
    });
  }
}
