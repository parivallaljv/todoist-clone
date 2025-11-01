"use client";

import { createContext, useContext, ReactNode } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";

interface SubTask {
  id: string;
  title: string;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  date: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  date?: Date | null;
  priority?: "low" | "medium" | "high" | "urgent";
  label?: string;
  location?: string;
  deadline?: Date | null;
  projectId?: string;
  tab?: string;
  subTasks?: SubTask[];
  comments?: Comment[];
  reminder?: Date | null;
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  color?: string;
}

export interface Filter {
  id: string;
  name: string;
  type: "today" | "upcoming" | "overdue" | "noDate" | "priority" | "project";
  value?: string;
}

export interface TaskState {
  tasks: Task[];
  projects: Project[];
  filters: Filter[];
  selectedTaskId: string | null;
  setSelectedTask: (id: string | null) => void;
  isCreateTaskModalOpen: boolean;
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;
  addTask: (task: Task) => void;
  addSubTask: (parentId: string, subTask: SubTask) => void;
  removeSubTask: (parentId: string, subTaskId: string) => void;
  addComment: (taskId: string, comment: Comment) => void;
  removeComment: (taskId: string, commentId: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  reorderProjects: (newOrder: Project[]) => void;
  addFilter: (filter: Filter) => void;
  deleteFilter: (filterId: string) => void;
}

const defaultProjects: Project[] = [
  { id: "inbox", name: "Inbox", emoji: "📥" },
  { id: "home", name: "Home", emoji: "🏡" },
  { id: "my-work", name: "My work", emoji: "🎯" },
  { id: "education", name: "Education", emoji: "📚" },
  { id: "goal-tracker", name: "Goal Tracker", emoji: "#" },
];

const defaultFilters: Filter[] = [
  { id: "flt-today", name: "Today", type: "today" },
  { id: "flt-upcoming", name: "Upcoming", type: "upcoming" },
  { id: "flt-overdue", name: "Overdue", type: "overdue" },
  { id: "flt-no-date", name: "No date", type: "noDate" },
];

const store: UseBoundStore<StoreApi<TaskState>> = create<TaskState>((set) => ({
  tasks: [],
  projects: defaultProjects,
  filters: defaultFilters,
  isCreateTaskModalOpen: false,
  selectedTaskId: null,
  setSelectedTask: (task) => set({ selectedTaskId: task }),
  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }),
  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, subTasks: [], comments: [] }],
      isCreateTaskModalOpen: false,
    })),
  addSubTask: (parentId, subTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === parentId
          ? { ...task, subTasks: [...(task.subTasks || []), subTask] }
          : task,
      ),
    })),
  removeSubTask: (parentId, subTaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === parentId
          ? {
            ...task,
            subTasks: (task.subTasks || []).filter(
              (st) => st.id !== subTaskId,
            ),
          }
          : task,
      ),
    })),
  addComment: (taskId, comment) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, comments: [...(task.comments || []), comment] }
          : task,
      ),
    })),
  removeComment: (taskId, commentId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            comments: (task.comments || []).filter((c) => c.id !== commentId),
          }
          : task,
      ),
    })),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  updateProject: (project) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
      tasks: state.tasks.map((t) =>
        t.projectId === projectId ? { ...t, projectId: "inbox" } : t,
      ),
    })),
  reorderProjects: (newOrder) => set({ projects: newOrder }),
  addFilter: (filter) =>
    set((state) => ({
      filters: [...state.filters, filter],
    })),
  deleteFilter: (filterId) =>
    set((state) => ({
      filters: state.filters.filter((f) => f.id !== filterId),
    })),
}));

const TaskStoreContext = createContext<UseBoundStore<
  StoreApi<TaskState>
> | null>(null);

export function TaskStoreProvider({ children }: { children: ReactNode }) {
  return (
    <TaskStoreContext.Provider value={store}>
      {children}
    </TaskStoreContext.Provider>
  );
}

export function useTaskStore<T>(selector: (state: TaskState) => T): T {
  const zustandStore = useContext(TaskStoreContext);
  if (!zustandStore) {
    throw new Error("useTaskStore must be used within a TaskStoreProvider");
  }
  return zustandStore(selector);
}
