import { removeToken } from 'src/services/storage'
import { useUserStore } from 'src/store/user'
import { type UseLogoutData } from './types'

export function useLogout (): UseLogoutData {
  const { unsetUser } = useUserStore()
  const logout = (): void => {
    removeToken().catch(() => {})
    unsetUser()
  }
  return {
    logout
  }
}
