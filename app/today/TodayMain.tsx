"use client";
import React from "react";
import { TaskState, useTaskStore } from "../store/useTaskStore";
import AddTaskModal from "./AddTask/AddTaskModal";
import { Button } from "@/components/ui/button";

export default function TodayMain() {
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.tab === "today")
  );
  const showAddTask = useTaskStore(
    (state: TaskState) => state.isCreateTaskModalOpen
  );
  const openCreateTaskModal = useTaskStore(
    (state: TaskState) => state.openCreateTaskModal
  );
  const closeCreateTaskModal = useTaskStore(
    (state: TaskState) => state.closeCreateTaskModal
  );
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center h-full">
      <div className="w-full flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Today</h2>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString()} · Today{" "}
            <span className="text-gray-400">{tasks.length}</span>
          </div>
        </div>
        <Button
          className="flex items-center gap-1 text-[#db4c3f] font-medium text-base hover:none bg-amber-50 hover:bg-amber-50"
          onClick={openCreateTaskModal}
        >
          <span className="text-xl">＋</span> Add task
        </Button>
      </div>
      <div className="w-full flex flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center">No tasks for Today</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
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
    </div>
  );
}
