"use client";

import React, { useState } from "react";
import { TaskStoreProvider } from "../store/useTaskStore";
import SearchModal from "./SearchModal";
import { SearchModalContext } from "./SearchModalContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <TaskStoreProvider>
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
      <SearchModalContext.Provider value={{ setSearchModalOpen }}>
        {children}
      </SearchModalContext.Provider>
    </TaskStoreProvider>
  );
}
