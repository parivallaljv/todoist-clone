import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, ArrowDown, AlertTriangle, AlertOctagon } from "react-feather";

const PRIORITY_OPTIONS = [
  { key: "low", label: "Low", icon: <ArrowDown size={14} color="#4caf50" /> },
  { key: "medium", label: "Medium", icon: <Zap size={14} color="#ff9800" /> },
  {
    key: "high",
    label: "High",
    icon: <AlertTriangle size={14} color="#db4c3f" />,
  },
  {
    key: "urgent",
    label: "Urgent",
    icon: <AlertOctagon size={14} color="#8b0000" />,
  },
];

export const PRIORITY_ICON_MAP = {
  low: <ArrowDown size={14} color="#4caf50" />,
  medium: <Zap size={14} color="#ff9800" />,
  high: <AlertTriangle size={14} color="#db4c3f" />,
  urgent: <AlertOctagon size={14} color="#8b0000" />,
};

export default function PriorityPicker({
  priority,
  setPriority,
}: {
  priority: "low" | "medium" | "high" | "urgent";
  setPriority: (p: "low" | "medium" | "high" | "urgent") => void;
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

  return (
    <div className="relative inline-block" ref={ref}>
      <Button
        type="button"
        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium shadow-none hover:bg-[#fbeee6] ${showDropdown
          ? "border-[#db4c3f] bg-[#fbeee6] text-[#db4c3f]"
          : "border-gray-200 bg-white text-gray-700"
          }`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {PRIORITY_OPTIONS.find((opt) => opt.key === priority)?.icon}
        {PRIORITY_OPTIONS.find((opt) => opt.key === priority)?.label}
      </Button>
      {showDropdown && (
        <div
          className="absolute top-[110%] z-30 flex min-w-[120px] flex-col gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
          style={{ fontSize: 12 }}
        >
          {PRIORITY_OPTIONS.map((opt) => (
            <Button
              key={opt.key}
              type="button"
              className="cal-overlay-icon justify-start gap-3 rounded-full border border-gray-200 bg-white px-3 py-1 text-left text-xs font-medium text-gray-700 hover:border-[#db4c3f] hover:bg-[#db4c3f] hover:text-white"
              onClick={() => {
                setPriority(opt.key as "low" | "medium" | "high" | "urgent");
                setShowDropdown(false);
              }}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
