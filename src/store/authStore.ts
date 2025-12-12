import { create } from 'zustand';

interface AuthStore {
    storedEmail: string;
    setstoredEmail: (email: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    storedEmail: '',
    setstoredEmail: (email) => set({ storedEmail: email }),
    clearRegistrationData: () => set({
        storedEmail: ''
    }),
}));