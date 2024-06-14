import {PaperProvider, useTheme} from "react-native-paper";
import {LoginScreen} from "screens/login";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Navigations} from "src/navigations";

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
