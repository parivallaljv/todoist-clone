import React from "react";
import { Button } from "@/components/ui/button";

export function ActionButtons({
  onCancel,
  onSubmit,
  disabled,
}: {
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-8 pb-8 pt-6 justify-end">
      <Button
        type="button"
        className="text-sm text-gray-500 bg-transparent hover:bg-gray-100 rounded-full px-4 py-2"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="bg-[#fbeee6] hover:bg-[#db4c3f] text-[#db4c3f] hover:text-white text-sm font-semibold px-5 py-2 rounded-full shadow-none transition"
        disabled={disabled}
        onClick={onSubmit}
      >
        Add task
      </Button>
    </div>
  );
}
