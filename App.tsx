import {PaperProvider} from "react-native-paper";
import {LoginScreen} from "screens/login";

export default function App() {
  return (
      <PaperProvider>
          <LoginScreen />
      </PaperProvider>
  );
}
