import React, { type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TextInput, useTheme } from 'react-native-paper'
import { type InputProps } from './types'

export function Input (props: InputProps): ReactNode {
  const { colors } = useTheme()
  return (
        <View style={props.containerStyle}>
            <TextInput {...props} />
            {typeof props.errorMessage === 'string'
              ? <Text style={[styles.errorMessage, { color: colors.error }]}>{props.errorMessage}</Text>
              : <></>
            }
        </View>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: 5,
    marginLeft: 10
  }
})
