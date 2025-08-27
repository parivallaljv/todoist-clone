"use client";
import Sidebar from "../today/Sidebar";
import { useTaskStore, TaskState } from "../store/useTaskStore";
import AddTaskModal from "../today/AddTask/AddTaskModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskDetailsModal } from "../today/components/TaskDetailsModal";

function OverdueMain() {
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.tab === "overdue"),
  );
  const showAddTask = useTaskStore(
    (state: TaskState) => state.isCreateTaskModalOpen,
  );
  const openCreateTaskModal = useTaskStore(
    (state: TaskState) => state.openCreateTaskModal,
  );
  const closeCreateTaskModal = useTaskStore(
    (state: TaskState) => state.closeCreateTaskModal,
  );
  const setSelectedTask = useTaskStore((state) => state.setSelectedTask);
  const [showTaskModal, setShowTaskModal] = useState(false);
  return (
    <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col items-center justify-center">
      <div className="mb-8 flex w-full items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold text-gray-900">Overdue</h2>
          <div className="text-sm text-gray-500">Tasks with past due dates</div>
        </div>
        <Button
          className="hover:none flex items-center gap-1 bg-amber-50 text-base font-medium text-[#db4c3f] hover:bg-amber-50"
          onClick={openCreateTaskModal}
        >
          <span className="text-xl">＋</span> Add task
        </Button>
      </div>
      <div className="flex w-full flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400">No overdue tasks</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow"
              onClick={() => {
                setSelectedTask(task?.id);
                setShowTaskModal(true);
              }}
            >
              <span className="text-gray-800">{task.title}</span>
              <span className="text-xs text-gray-400">
                {task.date ? new Date(task.date).toLocaleDateString() : ""}
              </span>
            </div>
          ))
        )}
      </div>
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <AddTaskModal open={showAddTask} onClose={closeCreateTaskModal} />
        </div>
      )}
      <TaskDetailsModal
        allTask={tasks}
        open={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />
    </div>
  );
}

export default function OverduePage() {
  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-start p-8">
        <OverdueMain />
      </main>
    </div>
  );
}
