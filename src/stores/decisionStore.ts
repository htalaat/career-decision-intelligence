import { create } from "zustand";

interface DecisionState {
  activeDecisionId: string | null;
  setActiveDecision: (id: string | null) => void;
  reset: () => void;
}

/** Tracks the active decision being viewed/edited */
export const useDecisionStore = create<DecisionState>((set) => ({
  activeDecisionId: null,
  setActiveDecision: (id) => set({ activeDecisionId: id }),

  reset: () => set({ activeDecisionId: null }),
}));
