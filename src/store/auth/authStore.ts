import { create } from "zustand";

interface AuthUser {
    _id: string;
    name: string;
    email: string;
    dateOfBirth: string;
    role: string;
    isActive: boolean;
}


interface AuthState {
    user: AuthUser | null;

    accessToken: string | null;

    refreshToken: string | null;

    isAuthenticated: boolean;

    setAuth: (
        user: AuthUser,
        accessToken: string,
        refreshToken: string
    ) => void;

    logout: () => void;
}


export const useAuthStore = create<AuthState>(
    (set) => ({
        // ----------------------------------------------
        // Initial State
        // ----------------------------------------------

        user: null,

        accessToken: null,

        refreshToken: null,

        isAuthenticated: false,

        // ----------------------------------------------
        // Set Authentication
        // ----------------------------------------------

        setAuth: (
            user,
            accessToken,
            refreshToken
        ) => {
            set({
                user,
                accessToken,
                refreshToken,
                isAuthenticated: true,
            });
        },

        // ----------------------------------------------
        // Logout
        // ----------------------------------------------

        logout: () => {
            set({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
            });
        },
    })
);


export default useAuthStore;