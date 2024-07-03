import { type JsonResponse, type PaginatedRequestProps, type PaginatedResponse } from 'types/request'
import { type Article } from 'types/models/article'

export type IndexParams = {
  search?: string
} & PaginatedRequestProps

export type ArticleRepositoryData = {
  index: (params: IndexParams) => Promise<PaginatedResponse<Article>>
  post: (form: FormData) => Promise<JsonResponse>
  favorites: (params: IndexParams) => Promise<PaginatedResponse<Article>>
}
