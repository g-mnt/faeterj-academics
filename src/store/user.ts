import {create} from "zustand";
import {User} from "types/models/user";

interface UserState {
    user: User | null
    setUser: (user: User) => void
    unsetUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
    user: {
        id: 0,
        name: 'Gabriel Monteiro',
        email: 'gabriel@faeterj.com',
    },
    setUser: (user) => set(() => ({ user })),
    unsetUser: () => set(() => ({user: null}))
}))