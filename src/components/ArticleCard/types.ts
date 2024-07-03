import { type ViewStyle } from 'react-native'
import { type Article } from 'src/types/models/article'

export type ArticleCardProps = {
  article: Article
  style?: ViewStyle
  onPress?: (article: Article) => void
}
