// Moved from app/project/[id].tsx
"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTaskStore } from "../../store/useTaskStore";
import { ICON_OPTIONS } from "../../today/Sidebar";
import AddTaskModal from "../../today/AddTask/AddTaskModal";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "react-feather";
import { TaskDetailsModal } from "../../today/components/TaskDetailsModal";

export default function ProjectPage() {
  const { id } = useParams();
  const projects = useTaskStore((state) => state.projects);
  const tasks = useTaskStore((state) =>
    state.tasks.filter((t) => t.tab === id),
  );
  const project = projects.find((p) => p.id === id);
  const iconObj = project
    ? ICON_OPTIONS.find(
        (opt: { value: string; icon: React.ReactNode; color: string }) =>
          opt.value === project.emoji,
      )
    : null;
  const [showAddTask, setShowAddTask] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const removeTask = useTaskStore(
    (state) => (taskId: string) =>
      (state.tasks = state.tasks.filter((t) => t.id !== taskId)),
  );

  if (!project) return <div className="p-8">Project not found.</div>;

  const handleComplete = (taskId: string) => {
    setCompletedTasks((prev) => [...prev, taskId]);
  };

  return (
    <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col items-center justify-center">
      <div className="mb-8 flex w-full items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-lg"
          style={{ background: project.color || "#fbeee6" }}
        >
          {iconObj?.icon}
        </span>
        <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
        <Button
          className="ml-auto rounded bg-[#db4c3f] px-3 py-1 text-white hover:text-[#db4c3f]"
          onClick={() => setShowAddTask(true)}
        >
          + Add Task
        </Button>
      </div>
      <div className="flex w-full flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400">
            No tasks in this project
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow ${completedTasks.includes(task.id) ? "line-through opacity-50" : ""}`}
              onClick={() => {
                setSelectedTask(task);
                setShowTaskModal(true);
              }}
            >
              <span className="text-gray-800">{task.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete(task.id);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <CheckCircle size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(task.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <span className="text-xs text-gray-400">
                  {task.date ? new Date(task.date).toLocaleDateString() : ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <AddTaskModal
            open={showAddTask}
            onClose={() => setShowAddTask(false)}
          />
        </div>
      )}
      <TaskDetailsModal
        task={selectedTask}
        open={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />
    </div>
  );
}
