import { type DialogProps as PaperDialogProps } from 'react-native-paper'
export type DialogProps = {
  title?: string
  description: string
  onConfirmationPress?: () => void
  onCancelPress?: () => void
} & Omit<PaperDialogProps, 'children'>
