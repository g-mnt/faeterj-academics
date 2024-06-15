import {PaperProvider, useTheme} from "react-native-paper";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Navigations} from "src/navigations";
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
    const {colors} = useTheme()

  return (
      <SafeAreaProvider>
          <SafeAreaView style={{flex:1}}>
              <PaperProvider theme={{ dark:false, colors: {...colors, primary: '#425381'} }}>
                <Navigations />
              </PaperProvider>
          </SafeAreaView>
      </SafeAreaProvider>
  );
}
