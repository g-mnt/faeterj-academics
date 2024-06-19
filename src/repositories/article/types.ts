import {PaginatedResponse} from "types/request";
import {Article} from "types/models/article";

export type ArticleRepositoryData = {
    index: () => Promise<PaginatedResponse<Article>>
}