import { HomeScreen } from 'screens/home'
import { type RouteData, type UseRoutesData } from './types'
import { PublishArticleScreen } from 'src/screens/publishArticle'
import { ViewArticleScreen } from 'src/screens/viewArticle'
import { FavoriteArticlesScreen } from 'src/screens/favoriteArticles'
import { SelfArticleScreen } from 'src/screens/selfArticle'
import { PendingArticlesScreen } from 'src/screens/pendingArticles'

export const useRoutes = (): UseRoutesData => {
  const routes: RouteData[] = [
    {
      name: 'Home',
      displayName: 'Página Inicial',
      icon: 'home',
      component: HomeScreen,
      hidden: false
    },
    {
      name: 'PublishArticle',
      displayName: 'Publicar Artigo',
      icon: 'pencil-outline',
      component: PublishArticleScreen,
      hidden: false
    },
    {
      name: 'FavoriteArticles',
      displayName: 'Artigos Favoritos',
      icon: 'star',
      component: FavoriteArticlesScreen,
      hidden: false
    },
    {
      name: 'SelfArticles',
      displayName: 'Meus Artigos',
      icon: 'text-box-multiple-outline',
      component: SelfArticleScreen,
      hidden: false
    },
    {
      name: 'ArticlesValidation',
      displayName: 'Validação de Artigos',
      icon: 'text-box-check-outline',
      component: PendingArticlesScreen,
      hidden: false
    },
    {
      name: 'ViewArticle',
      displayName: 'Ver Artigo',
      icon: 'pencil-outline',
      component: ViewArticleScreen,
      hidden: true
    }
  ]

  return { routes }
}
