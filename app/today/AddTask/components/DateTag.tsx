import React from "react";
import { X } from "lucide-react";
import { format } from "date-fns";

export function DateTag({
  date,
  onClear,
}: {
  date: Date;
  onClear: () => void;
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="bg-[#fbeee6] text-[#db4c3f] rounded-full px-3 py-1 text-xs font-medium flex items-end">
        {format(date, "MMM d")}
        <X
          size={14}
          className="pl-2 box-content cursor-pointer"
          onClick={onClear}
        />
      </span>
    </div>
  );
}
