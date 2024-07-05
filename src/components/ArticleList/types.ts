import { type Article } from 'src/types/models/article'
import { type ArticleCardType } from '../ArticleCard/types'

export type ArticleListProps = {
  data: Article[]
  isLoading?: boolean
  cardType?: ArticleCardType
  loadMore: () => Promise<void>
  handleFavoriteChange?: (article: Article) => void

}
