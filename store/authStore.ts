import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/salon";

interface AuthState {
  token: string | null;
  user: User | null;
  setSession: (token: string, user: User) => void;
  setUser: (user: User) => void;
  setTemplate: (templateId: string) => void;
  logout: () => void;
}

// Persisting the JWT in localStorage keeps the user logged in across refreshes.
// This is the "simple JWT auth" approach requested — no refresh tokens/rotation.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      setUser: (user) => set({ user }),
      setTemplate: (templateId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                active_template: templateId,
              }
            : null,
        })),
      logout: () => set({ token: null, user: null }),
    }),
    { name: "salon-auth" }
  )
);
