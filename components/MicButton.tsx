"use client";

import { Mic, Square, Loader2 } from "lucide-react";
type MicButtonProps = {
  recording: boolean;
  loading: boolean;
  start: () => void;
  stop: () => void;
};

export function MicButton({ recording, loading, start, stop }: MicButtonProps) {
  return (
    <button
      onClick={recording ? stop : start}
      disabled={loading}
      className={`
        w-16 h-16 rounded-full flex items-center justify-center
        ${
          loading
            ? "opacity-60 bg-gray-700 cursor-not-allowed"
            : "hover:scale-105"
        }
        ${
          recording
            ? "bg-red-600 animate-pulse border-4 border-white/70"
            : "bg-gradient-to-br from-purple-500 to-fuchsia-600 border-2 border-fuchsia-700"
        }
      `}
    >
      {loading ? (
        <Loader2 className="animate-spin text-white w-6 h-6" />
      ) : recording ? (
        <Square className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
