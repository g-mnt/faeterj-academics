import {Text} from "react-native-paper";
import {Header} from "components/Header";
import {View} from "react-native";
import {withAuthLayout} from "src/HOC/withAuthLayout";

export const HomeScreen = withAuthLayout(() => {
    return (
        <View>
            <Text>Logado</Text>
        </View>
    )
})