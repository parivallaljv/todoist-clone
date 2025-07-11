"use client";
import Sidebar from "../today/Sidebar";
import { useTaskStore } from "../store/useTaskStore";

function InboxMain() {
  const tasks = useTaskStore((state) =>
    state.tasks.filter((task) => task.tab === "inbox")
  );
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center h-full">
      <div className="w-full flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Inbox</h2>
          <div className="text-sm text-gray-500">All unsorted tasks</div>
        </div>
        <button className="flex items-center gap-1 text-[#db4c3f] font-medium text-base hover:underline">
          <span className="text-xl">＋</span> Add task
        </button>
      </div>
      <div className="w-full flex flex-col gap-4">
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center">No tasks in Inbox</div>
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

export default function InboxPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <InboxMain />
      </main>
    </div>
  );
}
