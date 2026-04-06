import { create } from "zustand";

interface CompareState {
  selectedPathIds: string[];
  customWeights: Record<string, number> | null;
  togglePath: (id: string) => void;
  clearSelection: () => void;
  setCustomWeights: (weights: Record<string, number> | null) => void;
}

/** Tracks paths selected for comparison and custom weight overrides */
export const useCompareStore = create<CompareState>((set) => ({
  selectedPathIds: [],
  customWeights: null,

  togglePath: (id) =>
    set((s) => ({
      selectedPathIds: s.selectedPathIds.includes(id)
        ? s.selectedPathIds.filter((x) => x !== id)
        : s.selectedPathIds.length < 5
          ? [...s.selectedPathIds, id]
          : s.selectedPathIds,
    })),

  clearSelection: () => set({ selectedPathIds: [], customWeights: null }),

  setCustomWeights: (weights) => set({ customWeights: weights }),
}));
