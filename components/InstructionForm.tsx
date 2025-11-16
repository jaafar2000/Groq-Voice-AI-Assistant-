"use client";

export function InstructionForm({
  instruction,
  setInstruction,
}: {
  instruction: string;
  setInstruction: (value: string) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const trimmed = instruction.trim();

        if (trimmed !== "") {
          const cleaned = trimmed.replace(/^Instruction set:\s*/i, "");
          setInstruction("Instruction set: " + cleaned);
        } else {
          setInstruction("Ready.");
        }
      }}
      className="flex-1 flex gap-2"
    >
      <input
        type="text"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="Set AI objective..."
        className="flex-1 px-3 py-2 bg-gray-800 text-sm border border-gray-700 rounded-sm focus:outline-2 outline-purple-500"
      />
      <button className="px-4 py-2 bg-purple-600 text-white text-sm ">
        Apply
      </button>
    </form>
  );
}
