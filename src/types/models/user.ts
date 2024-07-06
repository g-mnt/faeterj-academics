export enum UserRole {
  Professor = 'Professor',
  Student = 'Aluno'
}

export type User = {
  id: number
  name: string
  email: string
  avatar_url: string | null
  role: string
}
