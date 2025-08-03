import React from "react";
import { X } from "react-feather";
import { format } from "date-fns";

export function DateTag({
  date,
  onClear,
}: {
  date: Date;
  onClear: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-end rounded-xs bg-[#fbeee6] px-3 py-1 text-xs font-medium text-[#db4c3f]">
        {format(date, "MMM d")}
        <X
          size={14}
          color="#db4c3f"
          className="box-content cursor-pointer pl-2"
          onClick={onClear}
        />
      </span>
    </div>
  );
}
