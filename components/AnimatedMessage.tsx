import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export const AnimatedMessage = ({
  msg,
  isLast,
  loading,
}: {
  msg: { role: "user" | "assistant"; text: string };
  isLast: boolean;
  loading: boolean;
}) => {
  const shouldAnimate = msg.role === "assistant" && !loading && isLast;

  const baseClasses = `max-w-[85%] p-3 rounded-sm leading-snug text-base transition-all duration-300  ${
    msg.role === "user"
      ? "bg-purple-600 text-white ml-auto border border-purple-500 w-fit"
      : "text-gray-300"
  }`;

  if (!shouldAnimate) {
    return <div className={baseClasses}>{msg.text}</div>;
  }

  return (
    <div className={baseClasses}>
      <TextGenerateEffect duration={0.3} filter={false} words={msg.text} />
    </div>
  );
};
