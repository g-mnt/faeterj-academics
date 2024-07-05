import React, { useEffect, useState, type ReactNode } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ArticleCard } from '../ArticleCard'
import { NoDataCard } from '../NoDataCard'
import { ActivityIndicator } from 'react-native-paper'
import { type ArticleListProps } from './types'
import { type Article } from 'src/types/models/article'
import { useNavigation } from '@react-navigation/native'
import { type ApplicationStackScreenProps } from 'src/navigations/types'
import { useFetch } from 'src/hooks/useFetch'
import { ArticleRepository } from 'src/repositories/article'
import { useToast } from 'src/hooks/useToast'

export function ArticleList ({ data, isLoading, cardType, loadMore, handleFavoriteChange }: ArticleListProps): ReactNode {
  const [articles, setArticles] = useState([...data])
  const { navigate } = useNavigation<ApplicationStackScreenProps>()
  const [{ isLoading: loadingFavorite }, fetchToggleFavorite] = useFetch(ArticleRepository.toggleFavorite)
  const { successToast } = useToast()
  function handleArticlePress (article: Article): void {
    navigate('ViewArticle', { article })
  }

  useEffect(() => {
    setArticles(data)
  }, [data])

  async function handleFavorite (article: Article): Promise<void> {
    const { data: newArticle, error } = await fetchToggleFavorite(article)

    if (error === null && newArticle !== null) {
      article.favorite = newArticle.data.favorite
      setArticles((articles) => [...articles])

      if (handleFavoriteChange !== undefined) {
        handleFavoriteChange(newArticle.data)
      }
      successToast(newArticle.message)
    }
  }
  return (
        <View>
            <FlatList
            data={articles}
            onEndReached={() => { loadMore().catch(() => {}) }}
            renderItem={({ item, index }) => (
                <ArticleCard
                    key={index}
                    style={styles.article}
                    article={item}
                    onPress={handleArticlePress}
                    onPressStar={!loadingFavorite ? handleFavorite : undefined}
                    type={cardType}
                />
            )}
            ListEmptyComponent={ isLoading === false ? <NoDataCard message={'Nenhum artigo encontrado'} /> : null }
            ListFooterComponent={isLoading === true ? <ActivityIndicator /> : null}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  article: {
    marginBottom: 20,
    marginHorizontal: 2
  }
})
