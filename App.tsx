import React, { type ReactNode } from 'react'
import { PaperProvider, useTheme } from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Navigations } from 'src/navigations'
import * as SplashScreen from 'expo-splash-screen'
import { Toast } from 'src/components/Toast'

SplashScreen.preventAutoHideAsync().catch(() => {})

export default function App (): ReactNode {
  const { colors } = useTheme()

  return (
      <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
              <PaperProvider theme={{ dark: false, colors: { ...colors, primary: '#425381' } }}>
                <Navigations />
                <Toast />
              </PaperProvider>
          </SafeAreaView>
      </SafeAreaProvider>
  )
}
