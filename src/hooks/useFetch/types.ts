import { type AxiosError } from 'axios'

export type FetchFunctionProps<P, T> = (params: P) => Promise<T>

export type FetchApiProps<T> = {
  params?: T
  showErrorToast?: boolean
}

export type FetchApiStateReturn<T> = {
  data: T | null
  error: AxiosError | null
  isLoading: boolean
}

export type FetchApiReturn<P, T> = [
  state: FetchApiStateReturn<T>,
  (v?: P) => Promise<FetchApiStateReturn<T>>
]
