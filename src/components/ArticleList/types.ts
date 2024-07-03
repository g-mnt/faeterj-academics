import { type Article } from 'src/types/models/article'

export type ArticleListProps = {
  data: Article[]
  isLoading?: boolean
  loadMore: () => Promise<void>
  handleFavoriteChange?: (article: Article) => void

}
