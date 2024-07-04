import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState, type ReactNode } from 'react'
import { ArticleList } from 'src/components/ArticleList'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { useInfinityScroll } from 'src/hooks/useInfinityScroll'
import { ArticleRepository } from 'src/repositories/article'
import { type Article } from 'src/types/models/article'

export const FavoriteArticlesScreen = withAuthLayout((): ReactNode => {
  const { data, isLoading, loadMore, refresh } = useInfinityScroll(ArticleRepository.favorites, { params: {} })
  const [articles, setArticles] = useState<Article[]>([])
  const focused = useIsFocused()

  useEffect(() => {
    setArticles([...data])
  }, [data])

  useEffect(() => {
    if (focused) {
      refresh().catch(() => {})
    }
  }, [focused])

  function handleFavoriteChanged (article: Article): void {
    if (!article.favorite) {
      setArticles((articles) => articles.filter(({ id }) => id !== article.id))
    }
  }

  return (
      <ArticleList
        data={articles}
        loadMore={loadMore}
        isLoading={isLoading}
        handleFavoriteChange={handleFavoriteChanged}
      />
  )
})
