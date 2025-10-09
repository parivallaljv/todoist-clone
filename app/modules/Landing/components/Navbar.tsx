"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clipboard,
  Clock,
  Repeat,
  Users,
  ChevronDown,
} from "react-feather";
import { useRouter } from "next/navigation";

// const madeForItems = [
//   {
//     icon: <CheckCircle color="#db4c3f" className="mr-2 h-5 w-5" />,
//     label: "Task Management",
//   },
//   {
//     icon: <Clipboard color="#db4c3f" className="mr-2 h-5 w-5" />,
//     label: "Project Management",
//   },
//   {
//     icon: <Clock color="#db4c3f" className="mr-2 h-5 w-5" />,
//     label: "Time Management",
//   },
//   {
//     icon: <Repeat color="#db4c3f" className="mr-2 h-5 w-5" />,
//     label: "Habit Forming",
//   },
//   {
//     icon: <Users color="#db4c3f" className="mr-2 h-5 w-5" />,
//     label: "Teamwork",
//   },
// ];

export default function Navbar() {
  // const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  return (
    <nav className="fixed z-50 flex w-full items-center justify-between bg-white px-6 py-3 shadow-sm md:px-16">

      <div className="flex items-center space-x-2">
        <span className="flex h-10 w-10 items-center justify-center rounded border border-[#db4c3f] bg-white">
          <CheckCircle size={28} color="#db4c3f" />
        </span>
        <span className="text-2xl font-bold text-[#EA4B2A]">todoist</span>
      </div>

      {/* Menu */}
      <div className="flex items-center space-x-8">
        <div className="hidden items-center space-x-6 font-medium text-gray-800 md:flex">
          {/* Made For Dropdown
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("madefor")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Button
              className={`flex items-center gap-1 rounded px-2 py-1 text-gray-800 transition hover:text-[#EA4B2A]${openDropdown === "madefor" ? "bg-gray-100" : ""
                }`}
            >
              Made For
              <ChevronDown color="#db4c3f" className="h-4 w-4" />
            </Button>
            {openDropdown === "madefor" && (
              <div className=" absolute left-0 z-50 mt-2 w-64 rounded-xl bg-white py-3 shadow-lg">
                {madeForItems.map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center px-5 py-2 transition hover:bg-gray-100"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" className="transition hover:text-[#EA4B2A]">
            Pricing
          </a>
          
          */}
          <span onClick={() => router.push("/login")} className="transition hover:text-[#EA4B2A] cursor-pointer">
            Log in
          </span>
        </div>
        <span className="mx-2 text-gray-300">|</span>
        <Button onClick={() => router.push("/signup")} className="rounded-lg bg-[#EA4B2A] px-6 py-2 text-base font-semibold text-white shadow transition-all hover:bg-[#d13b1f]">
          Start for free
        </Button>
      </div>
    </nav>
  );
}
