"use client";
import React from "react";

const projects = [
  { name: "Home", emoji: "🏡", count: 4 },
  { name: "My work", emoji: "🎯", count: 5 },
  { name: "Education", emoji: "📚", count: 3 },
  { name: "Goal Tracker", emoji: "#", count: 32 },
];

export default function SidebarProjects() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-2 px-2">
        <span>My Projects</span>
        <span className="bg-gray-200 rounded px-1.5 py-0.5 text-[10px] font-bold ml-2">
          USED: 4/5
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="w-6 flex items-center justify-center text-lg">
              {project.emoji}
            </span>
            <span className="flex-1">{project.name}</span>
            <span className="ml-auto text-xs text-gray-400 font-semibold">
              {project.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
