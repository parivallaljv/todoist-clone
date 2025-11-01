import React from "react";
import DatePicker from "./DatePicker";
import PriorityPicker from "./PriorityPicker";
import ReminderPicker from "./ReminderPicker";
import LabelPicker from "./LabelPicker";

interface ButtonRowProps {
  date: Date | null;
  setDate: (_date: Date | null) => void;
  priority: "low" | "medium" | "high" | "urgent";
  setPriority: (_priority: "low" | "medium" | "high" | "urgent") => void;
  reminder: Date | null;
  setReminder: (_reminder: Date | null) => void;
  label: string;
  setLabel: (_label: string) => void;
}

export function ButtonRow(props: ButtonRowProps) {
  const {
    date,
    setDate,
    priority,
    setPriority,
    reminder,
    setReminder,
    label,
    setLabel,
  } = props;

  return (
    <div className="relative z-10 mt-1 mb-1 flex gap-2">
      <DatePicker date={date} setDate={setDate} />
      <PriorityPicker priority={priority} setPriority={setPriority} />
      <ReminderPicker reminder={reminder} setReminder={setReminder} />
      <LabelPicker label={label} setLabel={setLabel} />
    </div>
  );
}
