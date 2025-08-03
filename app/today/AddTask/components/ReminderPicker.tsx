import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Sun, Calendar as CalendarIcon } from "react-feather";
import { addDays } from "date-fns";

const REMINDER_OPTIONS = [
  {
    label: "Tomorrow",
    value: addDays(new Date(), 1),
    icon: <Sun size={14} color="#ff9800" />,
  },
  {
    label: "Next Week",
    value: addDays(new Date(), 7),
    icon: <CalendarIcon size={14} color="#2196f3" />,
  },
  {
    label: "Next Month",
    value: addDays(new Date(), 30),
    icon: <Clock size={14} color="#db4c3f" />,
  },
];

export const REMINDER_ICON_MAP = {
  Tomorrow: <Sun size={14} color="#ff9800" />,
  "Next Week": <CalendarIcon size={14} color="#2196f3" />,
  "Next Month": <Clock size={14} color="#db4c3f" />,
};

export default function ReminderPicker({
  reminder,
  setReminder,
}: {
  reminder: Date | null;
  setReminder: (d: Date) => void;
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
        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium shadow-none hover:bg-[#fbeee6] ${
          showDropdown
            ? "border-[#db4c3f] bg-[#fbeee6] text-[#db4c3f]"
            : "border-gray-200 bg-white text-gray-700"
        }`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {reminder ? (
          REMINDER_OPTIONS.find(
            (opt) => opt.value.toDateString() === reminder.toDateString(),
          )?.icon || <Clock size={14} color="#db4c3f" />
        ) : (
          <Clock size={14} color={"#db4c3f"} />
        )}
        {reminder
          ? REMINDER_OPTIONS.find(
              (opt) => opt.value.toDateString() === reminder.toDateString(),
            )?.label || "Reminders"
          : "Reminders"}
      </Button>
      {showDropdown && (
        <div
          className="absolute top-[110%] left-0 z-30 flex min-w-[120px] flex-col gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
          style={{ fontSize: 12 }}
        >
          {REMINDER_OPTIONS.map((opt) => (
            <Button
              key={opt.label}
              type="button"
              className="cal-overlay-icon rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:border-[#db4c3f] hover:bg-[#db4c3f] hover:text-white"
              style={{ minWidth: 50, padding: "2px 10px" }}
              onClick={() => {
                setReminder(opt.value);
                setShowDropdown(false);
              }}
            >
              {opt.icon} {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
