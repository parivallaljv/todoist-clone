"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ClipboardList,
  Clock,
  Repeat,
  Users,
  Puzzle,
  Layers,
  Zap,
  HelpCircle,
  Lightbulb,
  Download,
} from "lucide-react";

const madeForItems = [
  { icon: <CheckCircle className="w-5 h-5 mr-2" />, label: "Task Management" },
  {
    icon: <ClipboardList className="w-5 h-5 mr-2" />,
    label: "Project Management",
  },
  { icon: <Clock className="w-5 h-5 mr-2" />, label: "Time Management" },
  { icon: <Repeat className="w-5 h-5 mr-2" />, label: "Habit Forming" },
  { icon: <Users className="w-5 h-5 mr-2" />, label: "Teamwork" },
];

const resourcesItems = [
  { icon: <Puzzle className="w-5 h-5 mr-2" />, label: "Integrations" },
  { icon: <Layers className="w-5 h-5 mr-2" />, label: "Templates" },
  { icon: <Zap className="w-5 h-5 mr-2" />, label: "Getting Started" },
  { icon: <HelpCircle className="w-5 h-5 mr-2" />, label: "Help Center" },
  {
    icon: <Lightbulb className="w-5 h-5 mr-2" />,
    label: "Productivity Methods + Quiz",
  },
  { icon: <Lightbulb className="w-5 h-5 mr-2" />, label: "Inspiration Hub" },
  { icon: <Download className="w-5 h-5 mr-2" />, label: "Downloads" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="w-full flex items-center justify-between py-3 px-6 md:px-16 bg-white shadow-sm fixed z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="bg-red-500 w-10 h-10 rounded flex items-center justify-center">
          {/* SVG logo */}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#fff" />
            <path
              d="M7 8h10M7 12h10M7 16h10"
              stroke="#EA4B2A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="text-2xl font-bold text-[#EA4B2A]">todoist</span>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-8">
        <div className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          {/* Made For Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("madefor")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Button
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                openDropdown === "madefor" ? "bg-gray-100" : ""
              }`}
            >
              Made For
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            {openDropdown === "madefor" && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-3 z-50 animate-fadeIn">
                {madeForItems.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center px-5 py-2 hover:bg-gray-100 transition"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("resources")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Button
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                openDropdown === "resources" ? "bg-gray-100" : ""
              }`}
            >
              Resources
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            {openDropdown === "resources" && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-3 z-50 animate-fadeIn">
                {resourcesItems.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center px-5 py-2 hover:bg-gray-100 transition"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" className="hover:text-[#EA4B2A] transition">
            Pricing
          </a>
          <span className="mx-2 text-gray-300">|</span>
          <a href="login" className="hover:text-[#EA4B2A] transition">
            Log in
          </a>
        </div>
        <Button className="bg-[#EA4B2A] hover:bg-[#d13b1f] text-white px-6 py-2 rounded-lg text-base font-semibold shadow transition-all">
          Start for free
        </Button>
      </div>
    </nav>
  );
}
