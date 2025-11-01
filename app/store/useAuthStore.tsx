"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AUTH_CONSTANTS } from "../constants/auth";

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  fetchGoogleUserInfo: (accessToken: string) => Promise<User | null>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setAccessToken: (token) => set({ accessToken: token }),

      setLoading: (loading) => set({ isLoading: loading }),

      login: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      fetchGoogleUserInfo: async (accessToken) => {
        try {
          set({ isLoading: true });

          const response = await fetch(AUTH_CONSTANTS.GOOGLE_USERINFO_URL, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            const user: User = {
              id: userData.id,
              email: userData.email,
              name: userData.name,
              picture: userData.picture,
              given_name: userData.given_name,
              family_name: userData.family_name,
            };

            set({ user, isAuthenticated: true, isLoading: false });
            return user;
          } else {
            throw new Error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          set({ isLoading: false });
          return null;
        }
      },
    }),
    {
      name: AUTH_CONSTANTS.SESSION_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
      }),
    },
  ),
);
