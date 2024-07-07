import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, type ReactNode } from 'react'
import { ArticleList } from 'src/components/ArticleList'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { useInfinityScroll } from 'src/hooks/useInfinityScroll'
import { ArticleRepository } from 'src/repositories/article'

export const PendingArticlesScreen = withAuthLayout((): ReactNode => {
  const { data, isLoading, loadMore, refresh } = useInfinityScroll(ArticleRepository.pending, { params: {} })
  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      refresh().catch(() => {})
    }
  }, [focused])

  return (
    <ArticleList data={data} loadMore={loadMore} isLoading={isLoading} cardType='none' />
  )
}, { pageTitle: 'Validar Artigos' })
