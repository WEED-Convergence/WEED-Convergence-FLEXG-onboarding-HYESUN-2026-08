"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SelectedChecklistItemContextValue {
  selectedChecklistItemId: number;
  setSelectedChecklistItemId: (id: number) => void;
}

const SelectedChecklistItemContext = createContext<SelectedChecklistItemContextValue | null>(null);

export function SelectedChecklistItemProvider({ children }: { children: ReactNode }) {
  const [selectedChecklistItemId, setSelectedChecklistItemId] = useState(1);

  return (
    <SelectedChecklistItemContext.Provider value={{ selectedChecklistItemId, setSelectedChecklistItemId }}>
      {children}
    </SelectedChecklistItemContext.Provider>
  );
}

export function useSelectedChecklistItem() {
  const context = useContext(SelectedChecklistItemContext);
  if (!context) {
    throw new Error("useSelectedChecklistItem must be used within a SelectedChecklistItemProvider");
  }
  return context;
}
