"use client";

export function useChatStream() {
  async function streamChat({
    text,
    instruction,
    onChunk,
  }: {
    text: string;
    instruction: string;
    onChunk: (chunk: string) => void;
  }) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, instruction }),
    });

    if (!res.body) throw new Error("Chat streaming failed.");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      const chunk = decoder.decode(value || new Uint8Array());
      buffer += chunk;
      onChunk(buffer);
    }

    return buffer;
  }

  return { streamChat };
}
