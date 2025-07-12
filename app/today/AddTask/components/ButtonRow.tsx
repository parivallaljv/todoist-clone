import React from "react";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { X } from "lucide-react";

export function ButtonRow({
  date,
  setDate,
  showCalendar,
  setShowCalendar,
  showMenu,
  setShowMenu,
  priority,
  setPriority,
  showLabelDropdown,
  setShowLabelDropdown,
  labels,
  setLabels,
  LABEL_OPTIONS,
  quickSelects,
}: any) {
  return (
    <div className="flex gap-2 mt-1 mb-1 relative z-10">
      {/* Date button/tag */}
      {date ? (
        <Button
          type="button"
          className="bg-[#fbeee6] text-[#db4c3f] rounded-full px-3 py-1 text-xs font-medium flex items-center border border-[#db4c3f]"
          onClick={() => setShowCalendar(!showCalendar)}
          style={{ minWidth: 40, padding: "2px 8px" }}
        >
          {format(date, "EEE")}
          <span
            className="ml-1"
            onClick={(e) => {
              e.stopPropagation();
              setDate(null);
            }}
          >
            <X size={14} />
          </span>
        </Button>
      ) : (
        <Button
          type="button"
          className={`flex items-center gap-1 rounded-full border text-xs font-medium shadow-none ${
            showCalendar
              ? "bg-[#fbeee6] border-[#db4c3f] text-[#db4c3f]"
              : "bg-white border-gray-200 text-gray-700"
          }`}
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowMenu(null);
          }}
          tabIndex={-1}
          style={{ minWidth: 40, padding: "2px 8px" }}
        >
          <span>🗓️</span> Day
        </Button>
      )}
      {/* Priority button/tag */}
      <Button
        type="button"
        className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium shadow-none ${
          showMenu === "priority"
            ? "bg-[#fbeee6] border-[#db4c3f] text-[#db4c3f]"
            : "bg-white border-gray-200 text-gray-700"
        }`}
        onClick={() => {
          setShowMenu(showMenu === "priority" ? null : "priority");
          setShowCalendar(false);
          setShowLabelDropdown(false);
        }}
        style={{ minWidth: 60, padding: "2px 10px" }}
      >
        <span>⚡</span> {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Button>
      {/* Reminders button */}
      <Button
        type="button"
        className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium shadow-none ${
          showMenu === "reminder"
            ? "bg-[#fbeee6] border-[#db4c3f] text-[#db4c3f]"
            : "bg-white border-gray-200 text-gray-700"
        }`}
        onClick={() => {
          setShowMenu("reminder");
          setShowCalendar(false);
          setShowLabelDropdown(false);
        }}
        style={{ minWidth: 80, padding: "2px 10px" }}
      >
        <span>⏰</span> Reminders
      </Button>
      {/* Labels button/tag */}
      <Button
        type="button"
        className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium shadow-none ${
          showLabelDropdown
            ? "bg-[#fbeee6] border-[#db4c3f] text-[#db4c3f]"
            : "bg-white border-gray-200 text-gray-700"
        }`}
        onClick={() => {
          setShowLabelDropdown(!showLabelDropdown);
          setShowMenu(null);
          setShowCalendar(false);
        }}
        style={{ minWidth: 60, padding: "2px 10px" }}
      >
        {labels.length > 0 ? (
          <>
            {LABEL_OPTIONS.find((l: any) => l.key === labels[0])?.symbol}{" "}
            {LABEL_OPTIONS.find((l: any) => l.key === labels[0])?.label}
          </>
        ) : (
          <span>🏷️ Label</span>
        )}
      </Button>
      {/* Calendar Overlay (Date/Reminder) */}
      {(showCalendar || showMenu === "reminder") && (
        <div
          className="absolute left-0 top-[110%] bg-white rounded-xl shadow-lg border border-gray-100 p-0 w-[180px] z-20"
          style={{ fontSize: 12 }}
        >
          <div className="mb-1 flex flex-col gap-1 p-1">
            {quickSelects.map((q: any) => (
              <Button
                key={q.label}
                type="button"
                className="flex justify-start items-center gap-2 px-1 py-1 rounded bg-white border-gray-200 text-gray-700 hover:bg-[#db4c3f] hover:text-white hover:border-[#db4c3f] text-xs"
                onClick={() => {
                  setDate(q.date);
                  setShowCalendar(false);
                  setShowMenu(null);
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
              setShowMenu(null);
            }}
            fromMonth={new Date()}
            modifiersClassNames={{
              selected: "bg-[#db4c3f] text-white",
            }}
            className="mb-1 text-xs"
            style={{
              fontSize: 12,
              padding: 0,
              width: 180,
              margin: 0,
            }}
            showOutsideDays={false}
            captionLayout={undefined}
          />
          <div className="flex gap-2 mt-1 px-1 pb-1">
            <Button
              type="button"
              className="flex-1 border text-xs py-1 rounded-full bg-white border-gray-200 text-gray-700 shadow-none"
            >
              Time
            </Button>
            <Button
              type="button"
              className="flex-1 border text-xs py-1 rounded-full bg-white border-gray-200 text-gray-700 shadow-none"
            >
              Repeat
            </Button>
          </div>
        </div>
      )}
      {/* Priority Dropdown Overlay */}
      {showMenu === "priority" && (
        <div
          className="absolute left-[70px] top-[110%] bg-white rounded-xl shadow-lg border border-gray-100 p-1 flex flex-col gap-1 z-30 min-w-[120px]"
          style={{ fontSize: 12 }}
        >
          {["low", "medium", "high", "urgent"].map((p) => (
            <Button
              key={p}
              type="button"
              className={`px-2 py-1 rounded-full text-xs font-medium border hover:bg-[#db4c3f] hover:text-white hover:border-[#db4c3f] bg-white text-gray-700 border-gray-200
              `}
              style={{ minWidth: 50, padding: "2px 10px" }}
              onClick={() => {
                setPriority(p);
                setShowMenu(null);
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
      )}
      {/* Labels Dropdown Overlay */}
      {showLabelDropdown && (
        <div
          className="absolute left-[130px] top-[110%] bg-white rounded-xl shadow-lg border border-gray-100 p-1 flex flex-col gap-1 z-30 min-w-[120px]"
          style={{ fontSize: 12 }}
        >
          {LABEL_OPTIONS.map((opt: any) => (
            <Button
              key={opt.key}
              type="button"
              className={`px-2 py-1 rounded-full text-xs font-medium border hover:bg-[#db4c3f] hover:text-white hover:border-[#db4c3f] bg-white text-gray-700 border-gray-200
              `}
              style={{ minWidth: 50, padding: "2px 10px" }}
              onClick={() =>
                setLabels(
                  labels.includes(opt.key)
                    ? labels.filter((l: string) => l !== opt.key)
                    : [...labels, opt.key]
                )
              }
            >
              {opt.symbol} {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
