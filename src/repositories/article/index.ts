import { type ArticleRepositoryData } from 'repositories/article/types'
import { type JsonDataResponse, type JsonResponse, type PaginatedResponse } from 'types/request'
import { type Article } from 'types/models/article'
import { api } from 'src/services/api'

export const ArticleRepository: ArticleRepositoryData = {
  index: async (params) => {
    const { data } = await api.get<PaginatedResponse<Article>>('articles', { params })
    return data
  },
  post: async (form) => {
    const { data } = await api.postForm<JsonResponse>('articles?method=PUT', form)
    return data
  },
  favorites: async (params) => {
    const { data } = await api.get<PaginatedResponse<Article>>('articles/favorites', { params })
    return data
  },
  self: async (params) => {
    const { data } = await api.get<PaginatedResponse<Article>>('articles/self', { params })
    return data
  },
  toggleFavorite: async (article) => {
    const { data } = await api.get<JsonDataResponse<Article>>(`articles/toggle-favorite/${article.id}`)
    return data
  }
}
