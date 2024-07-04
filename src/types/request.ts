export type PaginatedRequestProps = {
  page?: number
  per_page?: number
}

export type Meta = {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export type PaginatedResponse<T> = {
  meta: Meta
  data: T[]
}

export type JsonResponse = {
  message: string
}

export type JsonDataResponse<T> = {
  data: T
  message: string
}
