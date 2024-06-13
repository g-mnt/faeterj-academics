import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {LoginScreen} from "screens/login";
import React from "react";
import {ApplicationStackParamList, GuestStackParamList} from "navigations/types";
import {ForgotPasswordScreen} from "screens/forgotPassword";
import {HomeScreen} from "screens/home";
const Stack = createStackNavigator<ApplicationStackParamList>();

export const ApplicationNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}