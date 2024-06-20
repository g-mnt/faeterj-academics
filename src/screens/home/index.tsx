import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { ArticleCard } from 'components/ArticleCard'
import { ArticleRepository } from 'repositories/article'
import { useInfinityScroll } from 'hooks/useInfinityScroll'
import { NoDataCard } from 'src/components/NoDataCard'
import { ActivityIndicator } from 'react-native-paper'

export const HomeScreen = withAuthLayout(() => {
  const { data, isLoading, loadMore } = useInfinityScroll(ArticleRepository.index, { params: {} })
  return (
        <View>
            <FlatList
                data={data}
                onEndReached={() => { loadMore().catch(() => {}) }}
                renderItem={({ item, index }) => (
                    <ArticleCard
                        key={index}
                        style={styles.article}
                        article={{
                          ...item,
                          favorite: false
                        }}
                    />
                )}
                ListEmptyComponent={
                    !isLoading ? <NoDataCard message={'Nenhum artigo encontrado'} /> : null
                }
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
