import React, { useEffect, useRef, type ReactNode } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useToastStore } from 'src/store/toast'

export function Toast (): ReactNode {
  const [isVisible, title, status] = useToastStore((state) => [state.isVisible, state.title, state.status])
  const fadeAnim = useRef(new Animated.Value(0)).current
  const { colors } = useTheme()

  useEffect(() => {
    if (isVisible) {
      fadeIn()
    } else {
      fadeOut()
    }
  }, [isVisible])

  function fadeIn (): void {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start()
  }

  function fadeOut (): void {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.toastContainer,
        { opacity: fadeAnim, backgroundColor: status === 'success' ? colors.primary : colors.error }
      ]}>
          <Text style={styles.toastTitle}>{title}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    bottom: 0,
    left: 0,
    right: 0
  },
  toastContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  toastTitle: {
    color: 'white',
    fontWeight: 600,
    fontSize: 15
  }
})
