import React from "react";
import {View} from "react-native";
import {useTheme} from "react-native-paper";
import {Header} from "components/Header";
export const withAuthLayout = <T extends object>(
    WrappedComponent: React.ComponentType<T>,
    {pageTitle}: {pageTitle?: string} = {}
) => ({...props}: T) => {
    const theme = useTheme();
    return (
        <View style={{flex:1, backgroundColor: theme.colors.background}}>
            <Header pageTitle={pageTitle ?? "Faeterj Academics"}/>
            <View style={{
                flex:1,
                width: "100%",
                maxWidth: 1024,
                padding: 20,
                alignSelf: "center",
                alignItems:"center",
            }}>
                <View style={{ flex:1, width: "100%" }}>
                    <WrappedComponent {...props} />
                </View>
            </View>
        </View>
    );
}
