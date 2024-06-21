import {ArticleRepositoryData} from "repositories/article/types";
import {PaginatedResponse} from "types/request";
import {Article} from "types/models/article";
import {api} from "src/services/api";

export const ArticleRepository: ArticleRepositoryData = {
    index: async (params) => {
        const {data} = await api.get<PaginatedResponse<Article>>("articles", {params});
        return data;
    }
}