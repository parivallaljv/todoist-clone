"use client";

import Sidebar from "../today/Sidebar";
import { useTaskStore } from "../store/useTaskStore";
import { Button } from "@/components/ui/button";
import { Briefcase, Home as HomeIcon, User, ShoppingCart } from "react-feather";

const LABEL_OPTIONS = [
  {
    key: "work",
    label: "Work",
    symbol: <Briefcase size={14} color="#db4c3f" />,
  },
  {
    key: "home",
    label: "Home",
    symbol: <HomeIcon size={14} color="#db4c3f" />,
  },
  {
    key: "personal",
    label: "Personal",
    symbol: <User size={14} color="#db4c3f" />,
  },
  {
    key: "shopping",
    label: "Shopping",
    symbol: <ShoppingCart size={14} color="#db4c3f" />,
  },
];

function FiltersLabelsMain() {
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.tab === "filters-labels"),
  );
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center">
      <div className="mb-8 flex w-full items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            Filters & Labels
          </h2>
          <div className="text-sm text-gray-500">Organize your tasks</div>
        </div>
        <Button className="flex items-center gap-1 text-base font-medium text-[#db4c3f] hover:underline">
          <span className="text-xl">＋</span> Add filter/label
        </Button>
      </div>
      <div className="flex w-full flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400">
            No tasks with Filters & Labels
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
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
      <main className="flex flex-1 flex-col items-center justify-start p-8">
        <FiltersLabelsMain />
      </main>
    </div>
  );
}
