"use client";

import Sidebar from "../today/Sidebar";
import { useTaskStore } from "../store/useTaskStore";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { LABEL_OPTIONS } from "../today/AddTask/config";
import type { Task } from "../store/useTaskStore";

type FilterType =
  | "today"
  | "upcoming"
  | "overdue"
  | "noDate"
  | "priority"
  | "project";

function isToday(d: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime();
}

function doesTaskMatchFilter(task: Task, type: FilterType, value?: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  switch (type) {
    case "today":
      return !!task.date && isToday(task.date);
    case "upcoming": {
      if (!task.date) return false;
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() > today.getTime();
    }
    case "overdue": {
      if (!task.date) return false;
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() < today.getTime();
    }
    case "noDate":
      return !task.date;
    case "priority":
      return task.priority === value;
    case "project":
      return task.projectId === value;
    default:
      return false;
  }
}

function FiltersLabelsMain() {
  const tasks = useTaskStore((state) => state.tasks);
  const filters = useTaskStore((state) => state.filters);
  const addFilter = useTaskStore((state) => state.addFilter);
  const projects = useTaskStore((state) => state.projects);

  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>([]);
  const [selectedLabelKeys, setSelectedLabelKeys] = useState<string[]>([]);
  const [showAddFilter, setShowAddFilter] = useState(false);
  const [newFilterName, setNewFilterName] = useState("");
  const [newFilterType, setNewFilterType] = useState<FilterType>("today");
  const [newFilterValue, setNewFilterValue] = useState<string>("");

  const selectedFilters = useMemo(
    () => filters.filter((f) => selectedFilterIds.includes(f.id)),
    [filters, selectedFilterIds],
  );

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply label filters (OR logic - task must match at least one selected label)
    if (selectedLabelKeys.length > 0) {
      result = result.filter((t) => selectedLabelKeys.includes(t.label || ""));
    }

    // Apply filter criteria (AND logic - task must match ALL selected filters)
    if (selectedFilters.length > 0) {
      result = result.filter((t) =>
        selectedFilters.every((filter) =>
          doesTaskMatchFilter(t, filter.type as FilterType, filter.value),
        ),
      );
    }

    return result;
  }, [tasks, selectedLabelKeys, selectedFilters]);

  function toggleFilter(filterId: string) {
    setSelectedFilterIds((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  }

  function toggleLabel(labelKey: string) {
    setSelectedLabelKeys((prev) =>
      prev.includes(labelKey)
        ? prev.filter((key) => key !== labelKey)
        : [...prev, labelKey],
    );
  }

  function handleCreateFilter(e: React.FormEvent) {
    e.preventDefault();
    if (!newFilterName.trim()) return;
    const id = `flt-${Date.now()}`;
    addFilter({
      id,
      name: newFilterName.trim(),
      type: newFilterType,
      value: newFilterValue || undefined,
    });
    setNewFilterName("");
    setNewFilterType("today");
    setNewFilterValue("");
    setShowAddFilter(false);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center">
      <div className="mb-8 flex w-full items-center justify-between">
        <div>
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            Filters & Labels
          </h2>
          <div className="text-sm text-gray-500">Organize your tasks</div>
        </div>
        <Button
          className="flex items-center gap-1 text-base font-medium text-[#db4c3f] hover:underline"
          onClick={() => setShowAddFilter(true)}
        >
          <span className="text-xl">＋</span> Add filter
        </Button>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            Filters
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`rounded-lg border p-3 text-left text-sm hover:border-[#db4c3f] ${selectedFilterIds.includes(f.id) ? "border-[#db4c3f] bg-[#fbeee6]" : "border-gray-200 bg-white"}`}
                onClick={() => toggleFilter(f.id)}
              >
                <div className="font-medium text-gray-800">{f.name}</div>
                <div className="text-xs text-gray-500">{f.type}</div>
                {selectedFilterIds.includes(f.id) && (
                  <div className="mt-1 text-xs text-[#db4c3f]">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">Labels</div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {LABEL_OPTIONS.map((l) => (
              <button
                key={l.key}
                className={`flex items-center gap-2 rounded-lg border p-3 text-left text-sm hover:border-[#db4c3f] ${selectedLabelKeys.includes(l.key) ? "border-[#db4c3f] bg-[#fbeee6]" : "border-gray-200 bg-white"}`}
                onClick={() => toggleLabel(l.key)}
              >
                <span>{l.symbol}</span>
                <span className="font-medium text-gray-800">{l.label}</span>
                {selectedLabelKeys.includes(l.key) && (
                  <div className="mt-1 text-xs text-[#db4c3f]">✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold text-gray-500">
            Results
          </div>
          {(selectedFilterIds.length > 0 || selectedLabelKeys.length > 0) && (
            <div className="mb-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
              <div className="font-medium">Active Filters:</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedFilterIds.map((id) => {
                  const filter = filters.find((f) => f.id === id);
                  return filter ? (
                    <span
                      key={id}
                      className="rounded-full bg-[#db4c3f] px-2 py-1 text-xs text-white"
                    >
                      {filter.name}
                    </span>
                  ) : null;
                })}
                {selectedLabelKeys.map((key) => {
                  const label = LABEL_OPTIONS.find((l) => l.key === key);
                  return label ? (
                    <span
                      key={key}
                      className="flex items-center gap-1 rounded-full bg-[#db4c3f] px-2 py-1 text-xs text-white"
                    >
                      {label.symbol} {label.label}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
          {filteredTasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-200 p-6 text-center text-gray-400">
              {selectedFilterIds.length === 0 && selectedLabelKeys.length === 0
                ? "Select filters or labels to see tasks."
                : "No tasks match the selected criteria."}
            </div>
          ) : (
            <div className="flex w-full flex-col gap-2">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
                >
                  <span className="text-gray-800">{task.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {task.priority}
                    </span>
                    {task.label && (
                      <span className="text-xs text-gray-400">
                        {LABEL_OPTIONS.find((l) => l.key === task.label)?.label}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex w-96 flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-2 font-semibold text-gray-700">
              Create Filter
            </div>
            <form onSubmit={handleCreateFilter} className="flex flex-col gap-3">
              <input
                className="rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                placeholder="Filter name"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <select
                  className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                  value={newFilterType}
                  onChange={(e) => {
                    const t = e.target.value as FilterType;
                    setNewFilterType(t);
                    setNewFilterValue("");
                  }}
                >
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="overdue">Overdue</option>
                  <option value="noDate">No date</option>
                  <option value="priority">Priority</option>
                  <option value="project">Project</option>
                </select>
                {newFilterType === "priority" && (
                  <select
                    className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                    value={newFilterValue}
                    onChange={(e) => setNewFilterValue(e.target.value)}
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                )}
                {newFilterType === "project" && (
                  <select
                    className="flex-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                    value={newFilterValue}
                    onChange={(e) => setNewFilterValue(e.target.value)}
                  >
                    <option value="">Select project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded bg-gray-200 py-2 text-xs font-semibold text-gray-700"
                  onClick={() => setShowAddFilter(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded bg-[#db4c3f] py-2 text-xs font-semibold text-white"
                  disabled={
                    !newFilterName.trim() ||
                    ((newFilterType === "priority" ||
                      newFilterType === "project") &&
                      !newFilterValue)
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
