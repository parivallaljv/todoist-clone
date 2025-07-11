"use client";

import { createContext, useContext, ReactNode } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";

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
}

export interface TaskState {
  tasks: Task[];
  isCreateTaskModalOpen: boolean;
  openCreateTaskModal: () => void;
  closeCreateTaskModal: () => void;
  addTask: (task: Task) => void;
}


const store: UseBoundStore<StoreApi<TaskState>> = create<TaskState>((set) => ({
  tasks: [], 
  isCreateTaskModalOpen: false, 
  openCreateTaskModal: () => set({ isCreateTaskModalOpen: true }), 
  closeCreateTaskModal: () => set({ isCreateTaskModalOpen: false }), 
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task], 
      isCreateTaskModalOpen: false,  
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
