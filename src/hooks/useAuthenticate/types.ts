import { type User } from 'src/types/models/user'

export type UseAuthenticateData = {
  authenticate: (user: User, token: string) => void
}
