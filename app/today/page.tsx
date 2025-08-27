"use client";
import Sidebar from "./Sidebar";
import TodayMain from "./TodayMain";
import { useAuthGuard } from "../hooks";

export default function TodayPage() {
  const { isAuthenticated, user, isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fcfbf7]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-start p-8">
        <TodayMain />
      </main>
    </div>
  );
}
