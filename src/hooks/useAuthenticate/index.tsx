import { useUserStore } from 'src/store/user'
import { type User } from 'types/models/user'
import { storeToken } from 'src/services/storage'
import { setApiToken } from 'src/services/api'
import { type UseAuthenticateData } from './types'

export function useAuthenticate (): UseAuthenticateData {
  const { setUser } = useUserStore()

  const authenticate = (user: User, token: string): void => {
    setApiToken(token)
    setUser(user)
    storeToken(token).catch(() => {})
  }

  return { authenticate }
}
