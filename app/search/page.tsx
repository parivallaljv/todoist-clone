import Sidebar from "../today/Sidebar";

function SearchMain() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center h-full">
      <div className="w-full flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Search</h2>
          <div className="text-sm text-gray-500">Find your tasks</div>
        </div>
      </div>
      <input
        className="w-full max-w-md px-4 py-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-[#db4c3f]"
        placeholder="Search tasks..."
      />
      <div className="w-full flex flex-col gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <span className="text-gray-800">Buy groceries</span>
          <span className="text-xs text-gray-400">Inbox</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <span className="text-gray-800">Finish project report</span>
          <span className="text-xs text-gray-400">Upcoming</span>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <SearchMain />
      </main>
    </div>
  );
}
