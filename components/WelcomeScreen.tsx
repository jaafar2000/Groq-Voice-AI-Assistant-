"use client";

export function WelcomeScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-400 py-20">
      
      <h2 className="text-xl font-semibold text-fuchsia-400 mb-2">
        Welcome to Your Voice AI Assistant
      </h2>

      <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
        Set an instruction below if you want the AI to respond with a specific 
        style or behavior. Otherwise, click the microphone button and start speaking.
      </p>

      <p className="text-xs text-gray-600 mt-4 max-w-xs">
        Note: The API we’re using has limited requests per minute. 
        Use it normally and avoid spamming if you don’t want it to time out.
      </p>

      <div className="mt-6 text-fuchsia-300 text-sm animate-pulse">
        Tap the mic when you're ready.
      </div>

    </div>
  );
}
