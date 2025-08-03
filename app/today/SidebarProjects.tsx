"use client";
import React from "react";

export const projects = [
  { name: "Home", emoji: "🏡", count: 4 },
  { name: "My work", emoji: "🎯", count: 5 },
  { name: "Education", emoji: "📚", count: 3 },
  { name: "Goal Tracker", emoji: "#", count: 32 },
];

export default function SidebarProjects() {
  return (
    <div className="mt-8">
      <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
        <span>My Projects</span>
        <span className="ml-2 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold">
          USED: 4/5
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="flex w-6 items-center justify-center text-lg">
              {project.emoji}
            </span>
            <span className="flex-1">{project.name}</span>
            <span className="ml-auto text-xs font-semibold text-gray-400">
              {project.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
