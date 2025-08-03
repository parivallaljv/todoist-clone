import React from "react";
import DatePicker from "./DatePicker";
import PriorityPicker from "./PriorityPicker";
import ReminderPicker from "./ReminderPicker";
import LabelPicker from "./LabelPicker";

export function ButtonRow(props: any) {
  const {
    date,
    setDate,
    priority,
    setPriority,
    reminder,
    setReminder,
    labels,
    setLabels,
  } = props;

  return (
    <div className="relative z-10 mt-1 mb-1 flex gap-2">
      <DatePicker date={date} setDate={setDate} />
      <PriorityPicker priority={priority} setPriority={setPriority} />
      <ReminderPicker reminder={reminder} setReminder={setReminder} />
      <LabelPicker labels={labels} setLabels={setLabels} />
    </div>
  );
}
