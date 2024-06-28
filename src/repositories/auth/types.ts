import { type LoginForm } from 'screens/login/types'
import { type User } from 'types/models/user'

export type LoginResponse = {
  token: string
  user: User
}

export type AuthRepositoryData = {
  login: (loginForm: LoginForm) => Promise<LoginResponse>
  self: () => Promise<User>
}
