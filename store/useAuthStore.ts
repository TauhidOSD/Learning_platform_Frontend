"use client";
import { create } from "zustand";

export type Role = "student" | "instructor" | "admin";
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  bio?: string;
}

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem("user");
      set({ user: raw ? JSON.parse(raw) : null, hydrated: true });
    } catch {
      set({ user: null, hydrated: true });
    }
  },
}));
