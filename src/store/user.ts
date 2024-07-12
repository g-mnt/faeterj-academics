import { create } from 'zustand'
import { type User } from 'types/models/user'

type UserState = {
  user: User | null
  setUser: (user: User) => void
  unsetUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => { set(() => ({ user })) },
  unsetUser: () => { set(() => ({ user: null })) }
}))
