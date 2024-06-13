import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {LoginScreen} from "screens/login";
import React from "react";
import {ApplicationStackParamList, GuestStackParamList} from "navigations/types";
import {ForgotPasswordScreen} from "screens/forgotPassword";
import {HomeScreen} from "screens/home";
import {createDrawerNavigator} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator<ApplicationStackParamList>();

export const ApplicationNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: false}}>
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}