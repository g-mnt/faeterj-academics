import {PaginatedRequestProps, PaginatedResponse} from "types/request";
import {Article} from "types/models/article";

export type IndexParams = {
    search?: string
} & PaginatedRequestProps

export type ArticleRepositoryData = {
    index: (params: IndexParams) => Promise<PaginatedResponse<Article>>
}