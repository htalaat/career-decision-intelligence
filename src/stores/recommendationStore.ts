import { create } from "zustand";

interface RecommendationState {
  latestRunId: string | null;
  shortlistedIds: string[];
  setLatestRunId: (id: string) => void;
  toggleShortlist: (careerPathId: string) => void;
  setShortlist: (ids: string[]) => void;
  reset: () => void;
}

/** Tracks latest recommendation run and shortlisted career paths */
export const useRecommendationStore = create<RecommendationState>((set) => ({
  latestRunId: null,
  shortlistedIds: [],

  setLatestRunId: (id) => set({ latestRunId: id }),

  toggleShortlist: (careerPathId) =>
    set((s) => ({
      shortlistedIds: s.shortlistedIds.includes(careerPathId)
        ? s.shortlistedIds.filter((id) => id !== careerPathId)
        : [...s.shortlistedIds, careerPathId],
    })),

  setShortlist: (ids) => set({ shortlistedIds: ids }),

  reset: () => set({ latestRunId: null, shortlistedIds: [] }),
}));
