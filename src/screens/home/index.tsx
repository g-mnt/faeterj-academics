import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { ArticleCard } from 'components/ArticleCard'
import { ArticleRepository } from 'repositories/article'
import { useInfinityScroll } from 'hooks/useInfinityScroll'
import { NoDataCard } from 'src/components/NoDataCard'
import { ActivityIndicator } from 'react-native-paper'
import { type Article } from 'src/types/models/article'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { type ApplicationStackScreenProps } from 'src/navigations/types'

export const HomeScreen = withAuthLayout(() => {
  const navigation = useNavigation<ApplicationStackScreenProps>()
  const { data, isLoading, loadMore, refresh } = useInfinityScroll(ArticleRepository.index, { params: {} })
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
