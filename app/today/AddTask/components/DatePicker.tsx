"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Sun, X } from "react-feather";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";

// Quick select options for the date picker
const QUICK_SELECTS = [
  {
    label: "Today",
    icon: <Sun size={14} color="#ff9800" />,
    date: new Date(),
  },
  {
    label: "Tomorrow",
    icon: <Calendar size={14} color="#2196f3" />,
    date: addDays(new Date(), 1),
  },
  {
    label: "Next Week",
    icon: <Clock size={14} color="#db4c3f" />,
    date: addDays(new Date(), 7),
  },
];

export default function DatePicker({
  date,
  setDate,
}: {
  date: Date | null;
  setDate: (d: Date | null) => void;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="relative inline-block" ref={ref}>
      <Button
        type="button"
        className="flex items-center rounded-xs border border-[#db4c3f] px-0.5 py-0.5 text-xs font-medium text-[#db4c3f] hover:bg-[#fbeee6]"
        onClick={() => setShowCalendar((prev) => !prev)}
      >
        <Calendar size={10} color="#db4c3f" />
        {date ? format(date, "EEE") : "Pick a date"}
        {date && (
          <span
            className="ml-1"
            onClick={(e) => {
              e.stopPropagation();
              setDate(null);
            }}
          >
            <X size={10} color="#db4c3f" />
          </span>
        )}
      </Button>
      {showCalendar && (
        <div
          className="absolute top-[110%] left-0 z-20 w-[180px] rounded-xl border border-gray-100 bg-white p-0 shadow-lg"
          style={{ fontSize: 12 }}
        >
          <div className="mb-1 flex flex-col gap-1 p-1">
            {QUICK_SELECTS.map((q) => (
              <Button
                key={q.label}
                type="button"
                className="cal-overlay-icon flex items-center justify-start gap-2 rounded border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 hover:border-[#db4c3f] hover:bg-[#db4c3f] hover:text-white"
                onClick={() => {
                  setDate(q.date);
                  setShowCalendar(false);
                }}
              >
                <span>{q.icon}</span>
                <span>{q.label}</span>
                <span className="ml-auto text-xs text-gray-400">
                  {format(q.date, "EEE d MMM")}
                </span>
              </Button>
            ))}
          </div>
          <DayPicker
            mode="single"
            selected={date ?? undefined}
            onSelect={(d) => {
              setDate(d!);
              setShowCalendar(false);
            }}
            fromMonth={new Date()}
            modifiersClassNames={{ selected: "bg-[#db4c3f] text-white" }}
            className="custom-daypicker mb-1 text-xs"
            style={{
              fontSize: 12,
              padding: 0,
              width: 180,
              maxWidth: 200,
              margin: 0,
            }}
            showOutsideDays={false}
            captionLayout={undefined}
          />
        </div>
      )}
    </div>
  );
}
