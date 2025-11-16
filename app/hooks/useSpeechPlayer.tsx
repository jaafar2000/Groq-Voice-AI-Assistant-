"use client";

export async function playSpeech(text: string) {
  const res = await fetch("/api/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const base64 = await res.text();
  const audio = new Audio("data:audio/mp3;base64," + base64);
  audio.play();
}
