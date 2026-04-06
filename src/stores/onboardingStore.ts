import { create } from "zustand";

interface OnboardingState {
  currentStep: number;
  answers: Record<string, unknown>;
  setAnswer: (key: string, value: unknown) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

/** Tracks onboarding progress and draft answers before save */
export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 1,
  answers: {},

  setAnswer: (key, value) =>
    set((s) => ({ answers: { ...s.answers, [key]: value } })),

  nextStep: () =>
    set((s) => ({ currentStep: Math.min(s.currentStep + 1, 10) })),

  prevStep: () =>
    set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

  goToStep: (step) => set({ currentStep: step }),

  reset: () => set({ currentStep: 1, answers: {} }),
}));
