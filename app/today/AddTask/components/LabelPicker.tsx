import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Home, ShoppingCart, Tag, User } from "react-feather";
import { LABEL_OPTIONS } from "../config";

export default function LabelPicker({
  label,
  setLabel,
}: {
  label: string;
  setLabel: (l: string) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const selectedLabel = label
    ? LABEL_OPTIONS.find((l) => l.key === label)
    : null;

  return (
    <div className="relative inline-block" ref={ref}>
      <Button
        type="button"
        className={`"border-[#db4c3f] text-[#db4c3f]" flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium shadow-none hover:bg-[#fbeee6]`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {selectedLabel ? (
          <>
            {selectedLabel.symbol} {selectedLabel.label}
          </>
        ) : (
          <>
            <Tag size={14} color={"#db4c3f"} /> Label
          </>
        )}
      </Button>
      {showDropdown && (
        <div className="absolute top-[110%] z-30 flex min-w-[120px] flex-col gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
          {LABEL_OPTIONS.map((opt) => (
            <Button
              key={opt.key}
              type="button"
              className={`cal-overlay-icon justify-start rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:border-[#db4c3f] hover:bg-[#db4c3f] hover:text-white ${label.includes(opt.key) ? "bg-[#fbeee6] text-[#db4c3f]" : ""}`}
              onClick={() => setLabel(opt.key)}
            >
              {opt.symbol} {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
