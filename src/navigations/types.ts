import { type DrawerNavigationProp } from '@react-navigation/drawer'
import { type StackNavigationProp } from '@react-navigation/stack'
import { type Article } from 'src/types/models/article'
export type GuestStackParamList = {
  Login: undefined
  ForgotPassword: undefined
}

export type ApplicationStackParamList = {
  Home: undefined
  PublishArticle: undefined
  ViewArticle: { article: Article }
  FavoriteArticles: undefined
  SelfArticles: undefined
  ArticlesValidation: undefined
}

export type GuestStackScreenProps = StackNavigationProp<GuestStackParamList>
export type ApplicationStackScreenProps = DrawerNavigationProp<ApplicationStackParamList>
