"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select";
import { useTaskStore } from "../../store/useTaskStore";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays, nextMonday, nextSaturday } from "date-fns";
import { X } from "lucide-react";
import { DateTag } from "./components/DateTag";
import { TitleInput } from "./components/TitleInput";
import { DescriptionInput } from "./components/DescriptionInput";
import { ButtonRow } from "./components/ButtonRow";
import { LocationInput } from "./components/LocationInput";
import { TabDropdown } from "./components/TabDropdown";
import { ActionButtons } from "./components/ActionButtons";

export default function AddTaskModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const addTask = useTaskStore((state) => state.addTask);
  const [showMenu, setShowMenu] = useState<string | null>(null);
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
  const [showCalendar, setShowCalendar] = useState(false);
  // Add for label dropdown
  const [showLabelDropdown, setShowLabelDropdown] = useState(false);

  console.log(open, "open");

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

  // Quick-select logic
  const quickSelects = [
    { label: "Today", date: new Date(), icon: "🗓️" },
    { label: "Tomorrow", date: addDays(new Date(), 1), icon: "🌞" },
    { label: "Next week", date: nextMonday(new Date()), icon: "📅" },
    { label: "Next weekend", date: nextSaturday(new Date()), icon: "💻" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[450px] max-w-full p-0 rounded-2xl shadow-2xl border border-gray-100 overflow-visible">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="px-5 pt-5 pb-0">
            {/* Picked date tag above title */}
            {date && <DateTag date={date} onClear={() => setDate(null)} />}
            <div className="relative">
              <TitleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <DescriptionInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <ButtonRow
                date={date}
                setDate={setDate}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                priority={priority}
                setPriority={setPriority}
                showLabelDropdown={showLabelDropdown}
                setShowLabelDropdown={setShowLabelDropdown}
                labels={labels}
                setLabels={setLabels}
                LABEL_OPTIONS={LABEL_OPTIONS}
                quickSelects={quickSelects}
              />
            </div>
            <LocationInput
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TabDropdown
              TABS={TABS}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              tabDropdownOpen={tabDropdownOpen}
              setTabDropdownOpen={setTabDropdownOpen}
            />
          </div>
          <ActionButtons onCancel={onClose} onSubmit={handleSubmit} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
