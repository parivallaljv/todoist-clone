import Sidebar from "./Sidebar";
import TodayMain from "./TodayMain";

export default function TodayPage() {
  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start p-8">
        <TodayMain />
      </main>
    </div>
  );
}
