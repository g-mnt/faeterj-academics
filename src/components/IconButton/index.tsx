import React, { type ReactNode } from 'react'
import { Pressable } from 'react-native'
import { Icon } from 'react-native-paper'
import { type IconButtonProps } from './types'

export function IconButton ({ icon, size = 35, iconColor = 'black', ...props }: IconButtonProps): ReactNode {
  return (
        <Pressable {...props}>
            <Icon source={icon} size={size} color={iconColor} />
        </Pressable>
  )
}
