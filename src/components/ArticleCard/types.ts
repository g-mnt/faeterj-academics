import { type ViewStyle } from 'react-native'
import { type Article } from 'src/types/models/article'

export type ArticleCardType = 'none' | 'favorite' | 'approval'

export type ArticleCardProps = {
  article: Article
  style?: ViewStyle
  type?: ArticleCardType
  onPress?: (article: Article) => void
  onPressStar?: (article: Article) => void
}
