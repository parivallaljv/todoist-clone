"use client";
import React, { useState, useEffect } from "react";
import SidebarNavLink from "./SidebarNavLink";
import AddTaskModal from "./AddTask/AddTaskModal";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTaskStore } from "../store/useTaskStore";
import type { Project } from "../store/useTaskStore";
import {
  Inbox,
  Calendar,
  Clock,
  Tag,
  Menu,
  HelpCircle,
  PlusSquare,
  Plus,
} from "react-feather";
import {
  FiBriefcase,
  FiHome,
  FiBook,
  FiTarget,
  FiUsers,
  FiShoppingCart,
  FiStar,
  FiCalendar,
  FiMoreHorizontal,
} from "react-icons/fi";
import {
  MdWorkOutline,
  MdBusinessCenter,
  MdSchool,
  MdFolderOpen,
} from "react-icons/md";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export interface IconOption {
  icon: React.ReactNode;
  value: string;
  color: string;
}

export const ICON_OPTIONS: IconOption[] = [
  {
    icon: <FiBriefcase color="#db4c3f" size={20} />,
    value: "FiBriefcase",
    color: "#db4c3f",
  },
  {
    icon: <FiHome color="#2196f3" size={20} />,
    value: "FiHome",
    color: "#2196f3",
  },
  {
    icon: <FiBook color="#9c27b0" size={20} />,
    value: "FiBook",
    color: "#9c27b0",
  },
  {
    icon: <FiTarget color="#4caf50" size={20} />,
    value: "FiTarget",
    color: "#4caf50",
  },
  {
    icon: <FiUsers color="#ff9800" size={20} />,
    value: "FiUsers",
    color: "#ff9800",
  },
  {
    icon: <FiShoppingCart color="#795548" size={20} />,
    value: "FiShoppingCart",
    color: "#795548",
  },
  {
    icon: <FiStar color="#fbc02d" size={20} />,
    value: "FiStar",
    color: "#fbc02d",
  },
  {
    icon: <FiCalendar color="#00bcd4" size={20} />,
    value: "FiCalendar",
    color: "#00bcd4",
  },
  {
    icon: <MdWorkOutline color="#607d8b" size={20} />,
    value: "MdWorkOutline",
    color: "#607d8b",
  },
  {
    icon: <MdBusinessCenter color="#8bc34a" size={20} />,
    value: "MdBusinessCenter",
    color: "#8bc34a",
  },
  {
    icon: <MdSchool color="#e91e63" size={20} />,
    value: "MdSchool",
    color: "#e91e63",
  },
  {
    icon: <MdFolderOpen color="#3f51b5" size={20} />,
    value: "MdFolderOpen",
    color: "#3f51b5",
  },
];

function DraggableProject({
  project,
  iconObj,
  taskCount,
  setEditProject,
  setEditProjectName,
  setEditSelectedIcon,
  setDeleteProjectId,
}: {
  project: Project;
  iconObj: IconOption;
  taskCount: number;
  setEditProject: (project: Project | null) => void;
  setEditProjectName: (name: string) => void;
  setEditSelectedIcon: (icon: IconOption) => void;
  setDeleteProjectId: (id: string) => void;
}) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging: sortableDragging,
    listeners: sortableListeners,
    attributes: sortableAttributes,
  } = useSortable({ id: project.id });
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${sortableDragging ? "bg-[#fbeee6]" : ""}`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Drag handle */}
      <span
        {...sortableListeners}
        {...sortableAttributes}
        className="cursor-grab p-1 text-gray-400 hover:text-[#db4c3f] active:cursor-grabbing"
      >
        <GripVertical size={14} />
      </span>
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full text-lg"
        style={{ background: project.color || "#fbeee6" }}
      >
        {iconObj.icon}
      </span>
      <span className="flex-1">{project.name}</span>
      <div className="relative flex items-center">
        <span className="ml-auto text-xs font-semibold text-gray-400">
          {taskCount}
        </span>
        {showMenu && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-1 p-1 text-gray-400 hover:text-[#db4c3f] focus:outline-none">
                <FiMoreHorizontal size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-28 p-1">
              <button
                className="w-full rounded px-2 py-1 text-left text-sm hover:bg-gray-100"
                onClick={() => {
                  setEditProject(project);
                  setEditProjectName(project.name);
                  setEditSelectedIcon(iconObj);
                }}
              >
                Edit
              </button>
              <button
                className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-gray-100"
                onClick={() => setDeleteProjectId(project.id)}
              >
                Delete
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const showAddTask = useTaskStore((state) => state.isCreateTaskModalOpen);
  const openCreateTaskModal = useTaskStore(
    (state) => state.openCreateTaskModal,
  );
  const closeCreateTaskModal = useTaskStore(
    (state) => state.closeCreateTaskModal,
  );
  const pathname = usePathname();
  const tasks = useTaskStore((state) => state.tasks);
  const projects = useTaskStore((state) => state.projects);
  const addProject = useTaskStore((state) => state.addProject);
  const updateProject = useTaskStore((state) => state.updateProject);
  const deleteProject = useTaskStore((state) => state.deleteProject);
  const reorderProjects = useTaskStore((state) => state.reorderProjects);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [editProjectName, setEditProjectName] = useState<string>("");
  const [editSelectedIcon, setEditSelectedIcon] = useState(ICON_OPTIONS[0]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICON_OPTIONS[0]);
  const [projectOrder, setProjectOrder] = useState(projects.map((p) => p.id));

  useEffect(() => {
    setProjectOrder(projects.map((p) => p.id));
  }, [projects]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    addProject({
      id: projectName.toLowerCase().replace(/\s+/g, "-"),
      name: projectName,
      emoji: selectedIcon.value,
    });
    setProjectName("");
    setSelectedIcon(ICON_OPTIONS[0]);
    setShowProjectModal(false);
  };

  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProjectName.trim() || !editProject) return;
    updateProject({
      id: editProject.id,
      name: editProjectName,
      emoji: editSelectedIcon.value,
    });
    setEditProject(null);
  };

  // Count tasks for date-based views
  const countByTab = (tab: string) => tasks.filter((t) => t.tab === tab).length;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = projectOrder.indexOf(active.id as string);
      const newIndex = projectOrder.indexOf(over.id as string);
      const newOrder = arrayMove(projects, oldIndex, newIndex);
      reorderProjects(newOrder);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-200 bg-[#fcfbf7] p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {user?.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-600">
              {user?.given_name?.[0] || user?.name?.[0] || "U"}
            </div>
          )}
          <span className="font-semibold">
            {user?.given_name || user?.name || "User"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Logout
        </Button>
      </div>
      <nav className="flex flex-col gap-1">
        <Button
          onClick={openCreateTaskModal}
          className="items-left flex gap-2 rounded-lg px-3 py-2 text-xl font-medium text-[#db4c3f] hover:bg-[#fbeee6]"
        >
          <PlusSquare size={16} color="#db4c3f" />
          <span>Add Task</span>
        </Button>
        <Link href="/inbox" passHref>
          <SidebarNavLink
            icon={<Inbox size={16} color="#db4c3f" />}
            label="Inbox"
            count={countByTab("inbox")}
            active={pathname === "/inbox"}
            style={{ textDecoration: "none" }}
          />
        </Link>
        <Link href="/today" passHref>
          <SidebarNavLink
            icon={<Calendar size={16} color="#db4c3f" />}
            label="Today"
            count={countByTab("today")}
            active={pathname === "/today"}
            style={{ textDecoration: "none" }}
          />
        </Link>
        <Link href="/upcoming" passHref>
          <SidebarNavLink
            icon={<Clock size={16} color="#db4c3f" />}
            label="Upcoming"
            count={countByTab("upcoming")}
            active={pathname === "/upcoming"}
            style={{ textDecoration: "none" }}
          />
        </Link>
        <Link href="/overdue" passHref>
          <SidebarNavLink
            icon={<Clock size={16} color="#db4c3f" />}
            label="Overdue"
            count={countByTab("overdue")}
            active={pathname === "/overdue"}
            style={{ textDecoration: "none" }}
          />
        </Link>
        <Link href="/filters-labels" passHref>
          <SidebarNavLink
            icon={<Tag size={16} color="#db4c3f" />}
            label="Filters & Labels"
            active={pathname === "/filters-labels"}
            style={{ textDecoration: "none" }}
          />
        </Link>
        {/* <Link href="/more" passHref> */}
        <SidebarNavLink
          icon={<Menu size={16} color="#db4c3f" />}
          label="More"
          active={pathname === "/more"}
          style={{ textDecoration: "none" }}
        />
        {/* </Link> */}
      </nav>
      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold text-gray-500">
          <span>My Projects</span>
          <button
            className="ml-2 rounded-none px-1.5 py-1.5 text-[10px] font-bold hover:bg-gray-200"
            title="Add Project"
            onClick={() => setShowProjectModal(true)}
          >
            <Plus size={12} />
          </button>
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projectOrder}
            strategy={verticalListSortingStrategy}
          >
            {projects.map((project) => {
              const iconObj =
                ICON_OPTIONS.find((opt) => opt.value === project.emoji) ||
                ICON_OPTIONS[0];
              return (
                <Link key={project.id} href={`/project/${project.id}`} passHref>
                  <DraggableProject
                    project={project}
                    iconObj={iconObj}
                    taskCount={
                      tasks.filter((t) => t.projectId === project.id).length
                    }
                    setEditProject={setEditProject}
                    setEditProjectName={setEditProjectName}
                    setEditSelectedIcon={setEditSelectedIcon}
                    setDeleteProjectId={setDeleteProjectId}
                  />
                </Link>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex w-80 flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-2 font-semibold text-gray-700">
              Create Project
            </div>
            <form onSubmit={handleAddProject} className="flex flex-col gap-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {ICON_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`rounded-full border-2 p-1 ${selectedIcon.value === opt.value ? "border-[#db4c3f]" : "border-transparent"}`}
                    onClick={() => setSelectedIcon(opt)}
                  >
                    {opt.icon}
                  </button>
                ))}
              </div>
              <input
                className="rounded border border-gray-200 px-3 py-1 text-sm text-gray-700 focus:outline-none"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                autoFocus
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded bg-gray-200 py-1 text-xs font-semibold text-gray-700"
                  onClick={() => setShowProjectModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded bg-[#db4c3f] py-1 text-xs font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Project Modal */}
      {editProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex w-80 flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-2 font-semibold text-gray-700">Edit Project</div>
            <form onSubmit={handleEditProject} className="flex flex-col gap-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {ICON_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    className={`rounded-full border-2 p-1 ${editSelectedIcon.value === opt.value ? "border-[#db4c3f]" : "border-transparent"}`}
                    onClick={() => setEditSelectedIcon(opt)}
                  >
                    {opt.icon}
                  </button>
                ))}
              </div>
              <input
                className="rounded border border-gray-200 px-3 py-1 text-sm text-gray-700 focus:outline-none"
                placeholder="Project name"
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
                autoFocus
              />

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded bg-gray-200 py-1 text-xs font-semibold text-gray-700"
                  onClick={() => setEditProject(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded bg-[#db4c3f] py-1 text-xs font-semibold text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Project Modal */}
      {deleteProjectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="flex w-80 flex-col gap-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-2 font-semibold text-gray-700">
              Delete Project
            </div>
            <div className="mb-4 text-sm text-gray-600">
              Are you sure you want to delete this project? All its tasks will
              be moved to Inbox.
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded bg-gray-200 py-1 text-xs font-semibold text-gray-700"
                onClick={() => setDeleteProjectId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 rounded bg-[#db4c3f] py-1 text-xs font-semibold text-white"
                onClick={() => {
                  deleteProject(deleteProjectId);
                  setDeleteProjectId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Help & resources */}
      <div className="mt-auto pt-8">
        <SidebarNavLink
          icon={<HelpCircle size={16} color="#db4c3f" />}
          label="Help & resources"
          active={false}
        />
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
