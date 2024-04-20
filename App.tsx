import {PaperProvider} from "react-native-paper";
import {LoginScreen} from "screens/login";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function App() {
  return (
      <SafeAreaProvider>
          <SafeAreaView style={{flex:1}}>
              <PaperProvider theme={{ dark:false }}>
                  <LoginScreen />
              </PaperProvider>
          </SafeAreaView>
      </SafeAreaProvider>
  );
}
