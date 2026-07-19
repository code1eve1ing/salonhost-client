import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_SALON_DETAILS,
  SalonDetails,
  SalonSectionKey,
} from "@/types/salon";

interface OnboardingState {
  currentStepIndex: number;
  subdomain: string;
  details: SalonDetails;
  setStepIndex: (index: number) => void;
  nextStep: (lastIndex: number) => void;
  prevStep: () => void;
  updateSection: <K extends SalonSectionKey>(
    key: K,
    value: Partial<SalonDetails[K]>
  ) => void;
  setSubdomain: (value: string) => void;
  reset: () => void;
}

// Persisted to localStorage so a refresh mid-onboarding doesn't lose progress.
// Cleared on submit (see reset()) once the user record is created.
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStepIndex: 0,
      subdomain: "",
      details: DEFAULT_SALON_DETAILS,

      setStepIndex: (index) => set({ currentStepIndex: index }),

      nextStep: (lastIndex) =>
        set((state) => ({
          currentStepIndex: Math.min(state.currentStepIndex + 1, lastIndex),
        })),

      prevStep: () =>
        set((state) => ({
          currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
        })),

      updateSection: (key, value) =>
        set((state) => ({
          details: {
            ...state.details,
            [key]: { ...state.details[key], ...value },
          },
        })),

      setSubdomain: (value) => set({ subdomain: value }),

      reset: () =>
        set({
          currentStepIndex: 0,
          subdomain: "",
          details: DEFAULT_SALON_DETAILS,
        }),
    }),
    { name: "salon-onboarding-draft" }
  )
);
