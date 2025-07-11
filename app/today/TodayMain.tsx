"use client";
import React from "react";
import { useTaskStore } from "../store/useTaskStore";

export default function TodayMain() {
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.tab === "today")
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
        <button className="flex items-center gap-1 text-[#db4c3f] font-medium text-base hover:underline">
          <span className="text-xl">＋</span> Add task
        </button>
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
    </div>
  );
}
