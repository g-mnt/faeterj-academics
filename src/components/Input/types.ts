import { type ViewStyle } from 'react-native'
import { type TextInputProps } from 'react-native-paper'

export type InputProps = TextInputProps & {
  containerStyle?: ViewStyle
  errorMessage?: string
}
