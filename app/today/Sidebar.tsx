"use client";

import React from "react";
import SidebarNavLink from "./SidebarNavLink";
import SidebarProjects from "./SidebarProjects";
import AddTaskModal from "./AddTask/AddTaskModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTaskStore } from "../store/useTaskStore";
import type { TaskState } from "../store/useTaskStore";
import { useSearchModal } from "../components/SearchModalContext";

const navLinks = [
  { icon: "➕", label: "Add task", id: "add-task", href: undefined },
  { icon: "🔍", label: "Search", id: "search", href: "/search" },
  { icon: "📥", label: "Inbox", id: "inbox", href: "/inbox", count: 1 },
  { icon: "📅", label: "Today", id: "today", href: "/today", active: true },
  { icon: "⏳", label: "Upcoming", id: "upcoming", href: "/upcoming" },
  {
    icon: "🏷️",
    label: "Filters & Labels",
    id: "filters-labels",
    href: "/filters-labels",
  },
  { icon: "☰", label: "More", id: "more", href: "/more" },
];

export default function Sidebar() {
  const showAddTask = useTaskStore(
    (state: TaskState) => state.isCreateTaskModalOpen
  );
  const openCreateTaskModal = useTaskStore(
    (state: TaskState) => state.openCreateTaskModal
  );
  const closeCreateTaskModal = useTaskStore(
    (state: TaskState) => state.closeCreateTaskModal
  );
  const pathname = usePathname();
  const { setSearchModalOpen } = useSearchModal();

  return (
    <aside className="w-64 bg-[#fcfbf7] border-r border-gray-200 flex flex-col min-h-screen p-4">
      {/* User/Profile section */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span className="font-semibold">Pari</span>
      </div>
      {/* Main nav links */}
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => {
          if (link.id === "add-task") {
            return (
              <SidebarNavLink
                key={link.id}
                icon={link.icon}
                label={link.label}
                count={link.count}
                active={false}
                onClick={openCreateTaskModal}
              />
            );
          }
          if (link.id === "search") {
            return (
              <SidebarNavLink
                key={link.id}
                icon={link.icon}
                label={link.label}
                count={link.count}
                active={pathname === link.href}
                onClick={() => setSearchModalOpen(true)}
                style={{ textDecoration: "none" }}
              />
            );
          }
          return (
            <Link key={link.id} href={link.href!} passHref>
              <SidebarNavLink
                icon={link.icon}
                label={link.label}
                count={link.count}
                active={pathname === link.href}
                style={{ textDecoration: "none" }}
              />
            </Link>
          );
        })}
      </nav>
      {/* Projects section */}
      <SidebarProjects />
      {/* Help & resources */}
      <div className="mt-auto pt-8">
        <SidebarNavLink icon="❓" label="Help & resources" active={false} />
      </div>
      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <AddTaskModal open={showAddTask} onClose={closeCreateTaskModal} />
        </div>
      )}
    </aside>
  );
}
