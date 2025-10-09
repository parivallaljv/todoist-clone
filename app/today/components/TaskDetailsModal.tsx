"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PRIORITY_ICON_MAP } from "../AddTask/components/PriorityPicker";
import { LABEL_OPTIONS } from "../AddTask/config";
import { REMINDER_ICON_MAP } from "../AddTask/components/ReminderPicker";
import { Calendar, Flag, Clock, MapPin, Trash2 } from "react-feather";
import { Task, useTaskStore } from "../../store/useTaskStore";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SubTask {
  id: string;
  title: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  date: Date;
}

export function TaskDetailsModal({
  open,
  onClose,
}: {
  allTask: Task[];
  open: boolean;
  onClose: () => void;
}) {
  const addSubTask = useTaskStore((state) => state.addSubTask);
  const removeSubTask = useTaskStore((state) => state.removeSubTask);
  const addComment = useTaskStore((state) => state.addComment);
  const removeComment = useTaskStore((state) => state.removeComment);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [commentText, setCommentText] = useState("");
  const task = useTaskStore(
    (s) => s.tasks.find((t) => t.id === s.selectedTaskId) || null,
  );

  if (!task) return null;
  // Find label objects
  const labelObj = task?.label
    ? LABEL_OPTIONS.find((l) => l.key === task.label) || null
    : null;
  // Priority icon
  const priorityIcon = task.priority ? (
    PRIORITY_ICON_MAP[task.priority as keyof typeof PRIORITY_ICON_MAP]
  ) : (
    <Flag size={16} color="#bdbdbd" />
  );
  // Reminder (show first if multiple)
  let reminderLabel = null;
  let reminderIcon = null;
  if (task?.reminder) {
    const opts = [
      {
        label: "Tomorrow",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
      {
        label: "Next Week",
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
      {
        label: "Next Month",
        date: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
    ];
    const found = opts.find(
      (opt) => {
        if (typeof task?.reminder === "string") {
          return opt?.date?.toDateString() === new Date(task?.reminder).toDateString();
        }
        return opt?.date?.toDateString() === task?.reminder?.toDateString();
      });


    if (found) {
      reminderLabel = found.label;
      reminderIcon =
        REMINDER_ICON_MAP[found?.label as keyof typeof REMINDER_ICON_MAP];
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e6e3df] bg-[#faf9f7] p-0 shadow-xl sm:max-w-4xl">
        <div className="flex h-[600px]">
          {/* Left: Task details */}
          <div className="flex w-2xs flex-1 flex-col p-10">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400">Inbox</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {task.title}
            </h2>
            <div className="mb-6 text-gray-400">
              {task.description || <span className="italic">Description</span>}
            </div>
            {/* Sub-tasks */}
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold text-gray-500">
                Sub-tasks
              </div>
              <ul className="mb-2 flex flex-col gap-2">
                {task?.subTasks ? (
                  task?.subTasks?.map((st: SubTask) => (
                    <li
                      key={st.id}
                      className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1"
                    >
                      <span className="flex-1 text-sm text-gray-800">
                        {st.title}
                      </span>
                      <button
                        onClick={() => removeSubTask(task.id, st.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400">No sub-tasks</li>
                )}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!subTaskTitle.trim()) return;
                  addSubTask(task.id, {
                    id: Date.now().toString(),
                    title: subTaskTitle,
                  });
                  setSubTaskTitle("");
                }}
                className="flex gap-2"
              >
                <input
                  className="flex-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 focus:outline-none"
                  placeholder="Add sub-task"
                  value={subTaskTitle}
                  onChange={(e) => setSubTaskTitle(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#db4c3f] px-3 py-1 text-xs font-semibold text-white"
                >
                  Add
                </button>
              </form>
            </div>
            {/* Comments */}
            <div className="mt-auto flex flex-col gap-2">
              <div className="mb-1 text-xs font-semibold text-gray-500">
                Comments
              </div>
              <ul className="mb-2 flex max-h-24 flex-col gap-2 overflow-y-auto">
                {task?.comments ? (
                  task?.comments?.map((c: Comment) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1"
                    >
                      <span className="flex-1 text-xs text-gray-800">
                        {c.text}
                      </span>
                      <button
                        onClick={() => removeComment(task.id, c.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400">No comments</li>
                )}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!commentText.trim()) return;
                  addComment(task.id, {
                    id: Date.now().toString(),
                    text: commentText,
                    author: "User",
                    date: new Date(),
                  });
                  setCommentText("");
                }}
                className="flex gap-2"
              >
                <input
                  className="flex-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 focus:outline-none"
                  placeholder="Add a comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#db4c3f] px-3 py-1 text-xs font-semibold text-white"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
          {/* Right: Meta info */}
          <div className="flex w-[220px] flex-col gap-6 border-l border-[#e6e3df] bg-[#f7f5f3] p-8">
            <div>
              <div className="mb-1 text-xs text-gray-400">Project</div>
              <div className="flex items-center gap-2 font-medium text-gray-700">
                <span className="text-base">📁</span> Inbox
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-400">Date</div>
              <div className="flex items-center gap-2 font-medium text-green-700">
                <Calendar size={16} color="#4caf50" />{" "}
                {task.date ? new Date(task.date).toLocaleDateString() : "—"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-400">Deadline</div>
              <div className="flex items-center gap-2 font-medium text-orange-600">
                <Clock size={16} color="#ff9800" />{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "—"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-400">Priority</div>
              <div className="flex items-center gap-2 font-medium text-gray-700">
                {priorityIcon}{" "}
                {task.priority
                  ? task.priority.charAt(0).toUpperCase() +
                  task.priority.slice(1)
                  : "—"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-400">Labels</div>
              <div className="flex items-center gap-2 font-medium text-gray-700">
                {labelObj ? (
                  <span key={labelObj.key} className="flex items-center gap-1">
                    {labelObj.symbol} {labelObj.label}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-400">Reminders</div>
              <div className="flex items-center gap-2 font-medium text-gray-700">
                {reminderIcon}{" "}
                {reminderLabel || <span className="text-gray-400">—</span>}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-gray-400">Location</div>
              <div className="flex items-center gap-2 font-medium text-orange-600">
                <MapPin size={16} color="#ff9800" />{" "}
                {task.location || <span className="text-gray-400">—</span>}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
