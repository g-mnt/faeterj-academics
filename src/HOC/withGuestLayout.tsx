import React from "react";
import {View} from "react-native";
import {useTheme} from "react-native-paper";
export const withGuestLayout = <T extends object>(WrappedComponent: React.ComponentType<T> ) => ({...props}: T) => {
    const theme = useTheme();
    return (
        <View style={{flex:1, backgroundColor: theme.colors.background}}>
            <View style={{
                flex:1,
                width: "100%",
                maxWidth: 1024,
                padding: 20,
                alignSelf: "center",
                alignItems:"center",
            }}>
                <WrappedComponent {...props} />
            </View>
        </View>
    );
}
