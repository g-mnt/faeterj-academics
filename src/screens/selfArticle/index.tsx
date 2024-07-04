import React, { type ReactNode } from 'react'
import { ArticleList } from 'src/components/ArticleList'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { useInfinityScroll } from 'src/hooks/useInfinityScroll'
import { ArticleRepository } from 'src/repositories/article'

export const SelfArticleScreen = withAuthLayout((): ReactNode => {
  const { data, isLoading, loadMore } = useInfinityScroll(ArticleRepository.self, { params: {} })
  return (
    <ArticleList data={data} loadMore={loadMore} isLoading={isLoading} />
  )
})
