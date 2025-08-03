"use client";

import { createContext, useContext, ReactNode } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";

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
  labels?: string[];
  location?: string;
  deadline?: Date | null;
  tab?: string;
  subTasks?: Task[];
  comments?: Comment[];
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  color?: string;
}

export interface TaskState {
  tasks: Task[];
  projects: Project[];
  isCreateTaskModalOpen: boolean;
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;
  addTask: (task: Task) => void;
  addSubTask: (parentId: string, subTask: Task) => void;
  removeSubTask: (parentId: string, subTaskId: string) => void;
  addComment: (taskId: string, comment: Comment) => void;
  removeComment: (taskId: string, commentId: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  reorderProjects: (newOrder: Project[]) => void;
}

const defaultProjects: Project[] = [
  { id: "home", name: "Home", emoji: "🏡" },
  { id: "my-work", name: "My work", emoji: "🎯" },
  { id: "education", name: "Education", emoji: "📚" },
  { id: "goal-tracker", name: "Goal Tracker", emoji: "#" },
];

const store: UseBoundStore<StoreApi<TaskState>> = create<TaskState>((set) => ({
  tasks: [],
  projects: defaultProjects,
  isCreateTaskModalOpen: false,
  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }),
  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
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
        t.tab === projectId ? { ...t, tab: "inbox" } : t,
      ),
    })),
  reorderProjects: (newOrder) => set({ projects: newOrder }),
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
