"use client";

import { useState, useRef, useEffect } from "react";
import { useAudioRecorder } from "./hooks/useAudioRecorder";
import { useChatStream } from "./hooks/useChatStream";
import { playSpeech } from "./hooks/useSpeechPlayer";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MicButton } from "@/components/MicButton";
import { InstructionForm } from "@/components/InstructionForm";
import { MessagesList } from "@/components/MessagesList";

export default function Home() {
  const [instruction, setInstruction] = useState("");

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { streamChat } = useChatStream();

  const { recording, startRecording, stopRecording } = useAudioRecorder(
    async (blob) => {
      try {
        setLoading(true);
        setInstruction("Transcribing...");

        const form = new FormData();
        form.append("file", blob);

        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: form,
        });

        const text = await res.text();
        setMessages((prev) => [...prev, { role: "user", text }]);

        let streamedText = "";
        setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

        await streamChat({
          text,
          instruction,
          onChunk: (chunk: string) => {
            streamedText = chunk;
            setMessages((prev) => {
              const msgs = [...prev];
              msgs[msgs.length - 1].text = chunk;
              return msgs;
            });
          },
        });

        setInstruction("Speaking...");
        await playSpeech(streamedText);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-6 flex flex-col items-center relative">
      <header className="w-full max-w-2xl text-center py-6 space-y-2">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-fuchsia-600 bg-clip-text text-transparent">
          Groq Voice AI
        </h1>
        <p className="text-xs font-mono text-fuchsia-400 tracking-wide opacity-80">
          STATUS: {instruction || "Ready"}
        </p>
      </header>

      <div className="w-full max-w-2xl mb-4">
        <InstructionForm
          instruction={instruction}
          setInstruction={setInstruction}
        />
      </div>

      <div
        className="
        max-h-[600px]
        w-full max-w-5xl flex-1 overflow-y-auto 
        p-5 rounded-xl  shadow-inner 
        space-y-4 scroll-custom
      "
      >
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <MessagesList
            messages={messages}
            loading={loading}
            bottomRef={bottomRef}
          />
        )}
      </div>

      <div className="relative w-full max-h-[140px] flex items-end justify-center">
        {recording && (
          <div
            className={`
      absolute bottom-0 w-full max-w-5xl h-40
      bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-40
      blur-3xl
    `}
          ></div>
        )}

        <div className="relative z-10">
          <MicButton
            recording={recording}
            loading={loading}
            start={startRecording}
            stop={stopRecording}
          />
        </div>
      </div>
    </div>
  );
}
