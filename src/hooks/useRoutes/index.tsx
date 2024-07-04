import { HomeScreen } from 'screens/home'
import { type RouteData, type UseRoutesData } from './types'
import { PublishArticleScreen } from 'src/screens/publishArticle'
import { ViewArticleScreen } from 'src/screens/viewArticle'

export const useRoutes = (): UseRoutesData => {
  const routes: RouteData[] = [{
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
    name: 'ViewArticle',
    displayName: 'Ver Artigo',
    icon: 'pencil-outline',
    component: ViewArticleScreen,
    hidden: true
  }
  ]

  return { routes }
}
