import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, type ReactNode } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { ArticleCard } from 'src/components/ArticleCard'
import { NoDataCard } from 'src/components/NoDataCard'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { useInfinityScroll } from 'src/hooks/useInfinityScroll'
import { type ApplicationStackScreenProps } from 'src/navigations/types'
import { ArticleRepository } from 'src/repositories/article'
import { type Article } from 'src/types/models/article'

export const favortieArticlesScreen = withAuthLayout((): ReactNode => {
  const navigation = useNavigation<ApplicationStackScreenProps>()
  const { data, isLoading, loadMore, refresh } = useInfinityScroll(ArticleRepository.favorites, { params: {} })
  const focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      refresh().catch(() => {})
    }
  }, [focused])

  const handleArticlePress = (article: Article): void => {
    navigation.navigate('ViewArticle', { article })
  }

  return (
      <View>
        <FlatList
          data={data}
          onEndReached={() => { loadMore().catch(() => {}) }}
          renderItem={({ item, index }) => (
            <ArticleCard
              key={index}
              style={styles.article}
              article={item}
              onPress={handleArticlePress}
            />
          )}
          ListEmptyComponent={ !isLoading ? <NoDataCard message={'Nenhum artigo encontrado'} /> : null }
          ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
        />
      </View>
  )
})

const styles = StyleSheet.create({
  article: {
    marginBottom: 20,
    marginHorizontal: 2
  }
})
