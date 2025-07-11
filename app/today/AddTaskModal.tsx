"use client";
import React, { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddTaskModal({ onClose }: { onClose: () => void }) {
  const addTask = useTaskStore((state) => state.addTask);
  const [showMenu, setShowMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | "urgent"
  >("low");
  const [location, setLocation] = useState("");
  const LABEL_OPTIONS = [
    { key: "work", label: "Work", symbol: "💼" },
    { key: "home", label: "Home", symbol: "🏠" },
    { key: "personal", label: "Personal", symbol: "👤" },
    { key: "shopping", label: "Shopping", symbol: "🛒" },
  ];
  const [labels, setLabels] = useState<string[]>([]);
  const TABS = [
    { key: "inbox", label: "Inbox", icon: "📁" },
    { key: "today", label: "Today", icon: "📅" },
    { key: "upcoming", label: "Upcoming", icon: "⏳" },
    { key: "filters-labels", label: "Filters & Labels", icon: "🏷️" },
    { key: "more", label: "More", icon: "☰" },
  ];
  const [selectedTab, setSelectedTab] = useState("inbox");
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      id: Date.now().toString(),
      title,
      description,
      date,
      priority,
      labels,
      location,
      deadline,
      tab: selectedTab,
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-0 min-w-[420px] max-w-[95vw] min-h-[320px] relative">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="px-6 pt-6 pb-2">
          <input
            className="w-full text-lg font-semibold text-gray-800 placeholder-gray-400 bg-transparent outline-none mb-1"
            placeholder="Fix bike tire this weekend"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full text-sm text-gray-500 placeholder-gray-300 bg-transparent outline-none mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={setDate}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Deadline"
                value={deadline}
                onChange={setDeadline}
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <span className="text-sm font-medium">Priority:</span>
            <select
              className="rounded px-2 py-1 border focus:outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              style={{
                backgroundColor:
                  priority === "low"
                    ? "#e0f7fa"
                    : priority === "medium"
                    ? "#fff9c4"
                    : priority === "high"
                    ? "#ffe0b2"
                    : priority === "urgent"
                    ? "#ffcdd2"
                    : undefined,
                color:
                  priority === "low"
                    ? "#00796b"
                    : priority === "medium"
                    ? "#fbc02d"
                    : priority === "high"
                    ? "#e65100"
                    : priority === "urgent"
                    ? "#c62828"
                    : undefined,
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            <span
              style={{
                display: "inline-block",
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor:
                  priority === "low"
                    ? "#e0f7fa"
                    : priority === "medium"
                    ? "#fff9c4"
                    : priority === "high"
                    ? "#ffe0b2"
                    : priority === "urgent"
                    ? "#ffcdd2"
                    : undefined,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <span className="text-sm font-medium">Labels:</span>
            <select
              multiple
              className="rounded px-2 py-1 border focus:outline-none"
              value={labels}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setLabels(selected);
              }}
            >
              {LABEL_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.symbol} {opt.label}
                </option>
              ))}
            </select>
            <span className="flex gap-1 ml-2">
              {labels.map((lk) => {
                const found = LABEL_OPTIONS.find((opt) => opt.key === lk);
                return found ? (
                  <span key={lk} title={found.label}>
                    {found.symbol}
                  </span>
                ) : null;
              })}
            </span>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <span className="text-sm font-medium">Location:</span>
            <span className="text-lg">📍</span>
            <input
              className="rounded px-2 py-1 border focus:outline-none flex-1"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ minWidth: 0 }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 px-6 pb-2">
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#e6f4ea] text-green-700 text-xs font-medium border border-green-200"
          >
            <span className="text-base">🗓️</span> Today
          </button>
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#fbe9e7] text-[#db4c3f] text-xs font-medium border border-[#fbe9e7]"
          >
            Priority
          </button>
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#f3f0fc] text-[#7c3aed] text-xs font-medium border border-[#f3f0fc]"
          >
            Reminders
          </button>
          <button
            type="button"
            className="ml-auto flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
            onClick={() => setShowMenu((v) => !v)}
          >
            <span className="text-xl">⋯</span>
          </button>
        </div>
        {/* Dropdown menu */}
        {showMenu && (
          <div className="absolute right-6 top-24 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-10 animate-fadeIn">
            <div className="flex flex-col py-2">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="text-orange-400">★</span> Labels
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="text-orange-400">📍</span> Location
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="text-orange-400">⏰</span> Deadline
              </button>
              <div className="border-t my-1" />
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span className="text-gray-400">➕</span> Add extension...
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-xs text-[#db4c3f] font-semibold hover:bg-gray-50"
              >
                Edit task actions
              </button>
            </div>
          </div>
        )}
        <div className="flex items-center px-6 py-2 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              className="flex items-center gap-1 text-gray-700 text-sm font-medium px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setTabDropdownOpen((v) => !v)}
            >
              <span>{TABS.find((t) => t.key === selectedTab)?.icon}</span>
              <span>{TABS.find((t) => t.key === selectedTab)?.label}</span>
              <span className="ml-1">▼</span>
            </button>
            {tabDropdownOpen && (
              <div className="absolute left-0 top-8 bg-white border rounded shadow z-10 min-w-[140px] animate-fadeIn">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 ${
                      selectedTab === tab.key ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => {
                      setSelectedTab(tab.key);
                      setTabDropdownOpen(false);
                    }}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="text-xs text-gray-500 hover:underline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#db4c3f] hover:bg-[#c44536] text-white text-xs font-semibold px-4 py-1.5 rounded transition"
            >
              Add task
            </button>
          </div>
        </div>
      </form>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
        aria-label="Close"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
