import { Card, Text, useTheme } from 'react-native-paper'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Author } from 'components/Author'
import { type ArticleCardProps } from 'components/ArticleCard/types'
import React, { type ReactNode } from 'react'
import { ArticleStatus } from '../ArticleStatus'
import { IconButton } from '../IconButton'

export const ArticleCard = ({ article, type = 'favorite', onPress, onPressStar, ...props }: ArticleCardProps): ReactNode => {
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
            {type === 'favorite'
              ? <IconButton
                onPress={() => {
                  if (onPressStar !== undefined) {
                    onPressStar(article)
                  }
                }}
                icon={'star'}
                size={25}
                iconColor={article.favorite ? colors.primary : colors.backdrop }
              />
              : type === 'approval' ? <ArticleStatus status={article.status} /> : null
            }
          </View>
          <Text numberOfLines={3} style={styles.articleDescription}>{article.description}</Text>
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
    alignItems: 'center'
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
