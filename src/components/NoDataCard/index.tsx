import React, { type ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text } from 'react-native-paper'

type NoDataCardData = {
  message: string
}

export function NoDataCard ({ message }: NoDataCardData): ReactNode {
  return (
        <Card mode='outlined'>
          <Card.Content>
            <Text style={styles.message}>{message}</Text>
          </Card.Content>
        </Card>
  )
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center'
  }
})
