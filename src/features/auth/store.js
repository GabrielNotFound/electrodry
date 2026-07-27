import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  franchiseId: null,
  setUser: (user) => set({ user }),
  setFranchiseId: (franchiseId) => set({ franchiseId }),
  logout: () => set({ user: null, franchiseId: null }),
}));
