import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, type ReactNode } from 'react'
import { ArticleList } from 'src/components/ArticleList'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { useInfinityScroll } from 'src/hooks/useInfinityScroll'
import { ArticleRepository } from 'src/repositories/article'
import { useUserStore } from 'src/store/user'
import { UserRole } from 'src/types/models/user'

export const SelfArticleScreen = withAuthLayout((): ReactNode => {
  const [user] = useUserStore((state) => ([state.user]))
  const { data, isLoading, loadMore, refresh } = useInfinityScroll(ArticleRepository.self, { params: {} })
  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      refresh().catch(() => {})
    }
  }, [focused])

  return (
    <ArticleList
        data={data}
        loadMore={loadMore}
        cardType={user?.role === UserRole.Student ? 'approval' : 'favorite'}
        isLoading={isLoading}
    />
  )
}, { pageTitle: 'Meus Artigos' })
