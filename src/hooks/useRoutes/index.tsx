import { HomeScreen } from 'screens/home'
import { type RouteData, type UseRoutesData } from './types'
import { PublishArticleScreen } from 'src/screens/publishArticle'

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
    icon: 'home',
    component: PublishArticleScreen,
    hidden: false
  }
  ]

  return { routes }
}
