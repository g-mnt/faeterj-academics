import React, { type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { type ArticleStatusProps } from './types'
import { ArticleStatuses } from 'src/types/models/article'

export function ArticleStatus ({ status }: ArticleStatusProps): ReactNode {
  return <View style={[
    styles.base,
    status === ArticleStatuses.Approved
      ? styles.approved
      : status === ArticleStatuses.Pending
        ? styles.pending
        : styles.rejected
  ]}>

  </View>
}

const styles = StyleSheet.create({
  base: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginVertical: 10
  },
  pending: {
    backgroundColor: 'lightgray'
  },
  approved: {
    backgroundColor: 'darkgreen'
  },
  rejected: {
    backgroundColor: 'darkred'
  }
})
