import { Card, Icon, Text, useTheme } from 'react-native-paper'
import { View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { Author } from 'components/Author'
import { type ArticleCardProps } from 'components/ArticleCard/types'
import React, { type ReactNode } from 'react'

export const ArticleCard = ({ article, onPress, onPressStar, ...props }: ArticleCardProps): ReactNode => {
  const { colors } = useTheme()
  return (
    <Card theme={{ roundness: 6 }} {...props}>
      <TouchableOpacity disabled={onPress === undefined} style={styles.touchableContainer} onPress={() => {
        if (onPress !== undefined) {
          onPress(article)
        }
      }}>
        <Card.Content>
            <View style={styles.articleTitleContainer}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Pressable onPress={() => {
                if (onPressStar !== undefined) {
                  onPressStar(article)
                }
              }}>
                <Icon source={'star'} size={25} color={article.favorite ? colors.primary : colors.backdrop } />
              </Pressable>
            </View>
            <Text numberOfLines={2} style={styles.articleDescription}>{article.description}</Text>
            <Author author={article.author} />
        </Card.Content>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  touchableContainer: {
    paddingVertical: 20
  },
  articleTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  articleDescription: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 30,
    marginBottom: 15
  }
})
