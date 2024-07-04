import React, { useEffect } from 'react'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { ArticleRepository } from 'repositories/article'
import { useInfinityScroll } from 'hooks/useInfinityScroll'
import { useIsFocused } from '@react-navigation/native'
import { ArticleList } from 'src/components/ArticleList'

export const HomeScreen = withAuthLayout(() => {
  const { data, isLoading, loadMore, refresh } = useInfinityScroll(ArticleRepository.index, { params: {} })
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
      isLoading={isLoading}
    />
  )
})
