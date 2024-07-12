import { type JsonDataResponse, type JsonResponse, type PaginatedRequestProps, type PaginatedResponse } from 'types/request'
import { type ArticleStatuses, type Article } from 'types/models/article'

export type IndexParams = {
  search?: string
} & PaginatedRequestProps

export type UpdateParams = {
  id: number
  status?: ArticleStatuses
  title?: string
  description?: string
}

export type ArticleRepositoryData = {
  index: (params: IndexParams) => Promise<PaginatedResponse<Article>>
  pending: (params: IndexParams) => Promise<PaginatedResponse<Article>>
  post: (form: FormData) => Promise<JsonResponse>
  favorites: (params: IndexParams) => Promise<PaginatedResponse<Article>>
  toggleFavorite: (article: Article) => Promise<JsonDataResponse<Article>>
  self: (params: IndexParams) => Promise<PaginatedResponse<Article>>
  update: (params: UpdateParams) => Promise<JsonDataResponse<Article>>
  delete: (article: Article) => Promise<JsonResponse>
}
