"use client";
import Sidebar from "../today/Sidebar";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fcfbf7]">
      <Sidebar />
      <main className="flex flex-1 flex-col items-center justify-start p-8">
        {children}
      </main>
    </div>
  );
}
