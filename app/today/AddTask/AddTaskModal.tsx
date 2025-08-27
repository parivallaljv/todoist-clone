"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import { useTaskStore } from "../../store/useTaskStore";
import "react-day-picker/dist/style.css";
import { addDays, nextMonday, nextSaturday } from "date-fns";
import { Inbox, Calendar, Sun, Monitor } from "react-feather";
import { DateTag } from "./components/DateTag";
import { TitleInput } from "./components/TitleInput";
import { DescriptionInput } from "./components/DescriptionInput";
import { ButtonRow } from "./components/ButtonRow";
import { LocationInput } from "./components/LocationInput";
import { TabDropdown } from "./components/TabDropdown";
import { ActionButtons } from "./components/ActionButtons";
import { PRIORITY_ICON_MAP } from "./components/PriorityPicker";
import { REMINDER_ICON_MAP } from "./components/ReminderPicker";
import { LABEL_OPTIONS } from "./config";
import {
  FiBriefcase,
  FiHome,
  FiBook,
  FiTarget,
  FiUsers,
  FiShoppingCart,
  FiStar,
  FiCalendar,
} from "react-icons/fi";
import {
  MdWorkOutline,
  MdBusinessCenter,
  MdSchool,
  MdFolderOpen,
} from "react-icons/md";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AddTaskModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | "urgent"
  >("low");
  const [location, setLocation] = useState("");
  const [reminder, setReminder] = useState<Date | null>(null);
  const [label, setLabel] = useState("");
  const ICON_OPTIONS = [
    { icon: <FiBriefcase color="#db4c3f" size={16} />, value: "FiBriefcase" },
    { icon: <FiHome color="#2196f3" size={16} />, value: "FiHome" },
    { icon: <FiBook color="#9c27b0" size={16} />, value: "FiBook" },
    { icon: <FiTarget color="#4caf50" size={16} />, value: "FiTarget" },
    { icon: <FiUsers color="#ff9800" size={16} />, value: "FiUsers" },
    {
      icon: <FiShoppingCart color="#795548" size={16} />,
      value: "FiShoppingCart",
    },
    { icon: <FiStar color="#fbc02d" size={16} />, value: "FiStar" },
    { icon: <FiCalendar color="#00bcd4" size={16} />, value: "FiCalendar" },
    {
      icon: <MdWorkOutline color="#607d8b" size={16} />,
      value: "MdWorkOutline",
    },
    {
      icon: <MdBusinessCenter color="#8bc34a" size={16} />,
      value: "MdBusinessCenter",
    },
    { icon: <MdSchool color="#e91e63" size={16} />, value: "MdSchool" },
    { icon: <MdFolderOpen color="#3f51b5" size={16} />, value: "MdFolderOpen" },
  ];
  const projects = useTaskStore((state) => state.projects);
  const TABS = [
    { key: "inbox", label: "Inbox", icon: <Inbox size={16} color="#db4c3f" /> },
    ...projects.map((project: { id: string; name: string; emoji: string }) => {
      const iconObj =
        ICON_OPTIONS.find((opt) => opt.value === project.emoji) ||
        ICON_OPTIONS[0];
      return {
        key: project.id,
        label: project.name,
        icon: iconObj.icon,
      };
    }),
  ];
  const [selectedTab, setSelectedTab] = useState("inbox");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("inbox");
  const [tabDropdownOpen, setTabDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Determine date-based view tab
    let computedTab = selectedTab;
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDate = new Date(date);
      taskDate.setHours(0, 0, 0, 0);
      if (taskDate.getTime() === today.getTime()) {
        computedTab = "today";
      } else if (taskDate.getTime() > today.getTime()) {
        computedTab = "upcoming";
      } else if (taskDate.getTime() < today.getTime()) {
        computedTab = "overdue";
      }
    }
    addTask({
      id: Date.now().toString(),
      title,
      description,
      date,
      priority,
      label,
      location,
      deadline,
      subTasks: [],
      comments: [],
      projectId: selectedProjectId,
      tab: computedTab,
    });
    onClose();
  };

  const quickSelects = [
    {
      label: "Today",
      date: new Date(),
      icon: <Calendar size={14} color="#db4c3f" />,
    },
    {
      label: "Tomorrow",
      date: addDays(new Date(), 1),
      icon: <Sun size={14} color="#db4c3f" />,
    },
    {
      label: "Next week",
      date: nextMonday(new Date()),
      icon: <Calendar size={14} color="#db4c3f" />,
    },
    {
      label: "Next weekend",
      date: nextSaturday(new Date()),
      icon: <Monitor size={14} color="#db4c3f" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[450px] max-w-full overflow-visible rounded-2xl border border-gray-100 p-0 shadow-2xl">
        <DialogTitle></DialogTitle>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="px-5 pt-5 pb-0">
            <div className="mb-2 flex items-center gap-2">
              {date && <DateTag date={date} onClear={() => setDate(null)} />}
              {priority && (
                <span className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-medium">
                  {PRIORITY_ICON_MAP[priority]}
                </span>
              )}
              {reminder &&
                (() => {
                  const opt = [
                    { label: "Tomorrow", date: addDays(new Date(), 1) },
                    { label: "Next Week", date: addDays(new Date(), 7) },
                    { label: "Next Month", date: addDays(new Date(), 30) },
                  ].find(
                    (opt) =>
                      opt.date.toDateString() === reminder.toDateString(),
                  );
                  return opt ? (
                    <span className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-medium">
                      {
                        REMINDER_ICON_MAP[
                          opt.label as keyof typeof REMINDER_ICON_MAP
                        ]
                      }
                    </span>
                  ) : null;
                })()}
              {label &&
                (() => {
                  const match = LABEL_OPTIONS.find(
                    (l: { key: string; symbol: React.ReactNode }) =>
                      l.key === label,
                  );
                  return match ? (
                    <span
                      key={match.key}
                      className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-medium"
                    >
                      {match.symbol}
                    </span>
                  ) : null;
                })()}
            </div>
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
                priority={priority}
                setPriority={setPriority}
                reminder={reminder}
                setReminder={setReminder}
                label={label}
                setLabel={setLabel}
              />
            </div>
            <LocationInput
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TabDropdown
              TABS={TABS}
              selectedTab={selectedProjectId}
              setSelectedTab={(k: string) => {
                setSelectedProjectId(k);
                setSelectedTab(k);
              }}
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
