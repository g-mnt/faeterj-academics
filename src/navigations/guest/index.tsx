import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from 'screens/login'
import React from 'react'
import { type GuestStackParamList } from 'navigations/types'
const Stack = createStackNavigator<GuestStackParamList>()

export const GuestNavigation: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
