import React, { type ReactNode } from 'react'
import { Portal, Dialog as PaperDialog, Button, Text } from 'react-native-paper'
import { type DialogProps } from './types'

export function Dialog ({ title, description, onConfirmationPress, onCancelPress, ...props }: DialogProps): ReactNode {
  return (
    <Portal>
        <PaperDialog {...props}>
            {title !== undefined && (
                <PaperDialog.Title>
                    <Text>{title}</Text>
                </PaperDialog.Title>
            )}
            <PaperDialog.Content>
                <Text>{description}</Text>
            </PaperDialog.Content>
            <PaperDialog.Actions>
                <Button onPress={onCancelPress} mode="outlined">
                    Cancelar
                </Button>
                <Button onPress={onConfirmationPress} mode="contained">
                    Confirmar
                </Button>
            </PaperDialog.Actions>
        </PaperDialog>
    </Portal>
  )
}
