"use client";

import Sidebar from "../today/Sidebar";
import { useTaskStore } from "../store/useTaskStore";
import { Button } from "@/components/ui/button";

const LABEL_OPTIONS = [
  { key: "work", label: "Work", symbol: "💼" },
  { key: "home", label: "Home", symbol: "🏠" },
  { key: "personal", label: "Personal", symbol: "👤" },
  { key: "shopping", label: "Shopping", symbol: "🛒" },
];

function FiltersLabelsMain() {
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.tab === "filters-labels")
  );
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center h-full">
      <div className="w-full flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Filters & Labels
          </h2>
          <div className="text-sm text-gray-500">Organize your tasks</div>
        </div>
        <Button className="flex items-center gap-1 text-[#db4c3f] font-medium text-base hover:underline">
          <span className="text-xl">＋</span> Add filter/label
        </Button>
      </div>
      <div className="w-full flex flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center">
            No tasks with Filters & Labels
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
              <span className="text-gray-800">{task.title}</span>
              <span className="flex gap-1">
                {task.labels && task.labels.length > 0 ? (
                  task.labels.map((lk) => {
                    const found = LABEL_OPTIONS.find((opt) => opt.key === lk);
                    return found ? (
                      <span key={lk} title={found.label}>
                        {found.symbol}
                      </span>
                    ) : null;
                  })
                ) : (
                  <span className="text-xs text-gray-400">No label</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function FiltersLabelsPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <FiltersLabelsMain />
      </main>
    </div>
  );
}
