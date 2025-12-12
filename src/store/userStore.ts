// store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    name?: string;
    accessToken?: string;
    role?: string;
    isVerified?: boolean;
    createdAt?: string;
}

interface UserStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setAccessToken: (token: string) => void;
    clearUser: () => void;
    setLoading: (loading: boolean) => void;
    getUserFullName: () => string;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user
                }),

            setAccessToken: (accessToken) =>
                set((state) => ({
                    user: state.user ? { ...state.user, accessToken } : null
                })),

            clearUser: () =>
                set({
                    user: null,
                    isAuthenticated: false
                }),

            setLoading: (loading) =>
                set({ isLoading: loading }),

            getUserFullName: () => {
                const user = get().user;
                if (!user) return '';
                return `${user.firstName} ${user.lastName}`.trim();
            },
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);

export const syncAuthWithStore = (session: any) => {
    const { setUser, setAccessToken } = useUserStore.getState();

    if (session?.user) {
        const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: (session.user as any).firstName || '',
            lastName: (session.user as any).lastName || '',
            name: session.user.name || '',
            accessToken: (session as any).accessToken,
        };

        setUser(userData);

        if ((session as any).accessToken) {
            setAccessToken((session as any).accessToken);
        }
    } else {
        useUserStore.getState().clearUser();
    }
};