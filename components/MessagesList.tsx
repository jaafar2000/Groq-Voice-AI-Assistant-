"use client";

import { AnimatedMessage } from "./AnimatedMessage";
type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type MessagesListProps = {
  messages: ChatMessage[];
  loading: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};
export function MessagesList({
  messages,
  loading,
  bottomRef,
}: MessagesListProps) {
  return (
    <>
      {messages.map((msg, i) => (
        <AnimatedMessage
          key={i}
          msg={msg}
          isLast={i === messages.length - 1}
          loading={loading}
        />
      ))}
      <div ref={bottomRef} />
    </>
  );
}
