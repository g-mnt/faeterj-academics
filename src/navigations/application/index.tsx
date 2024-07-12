import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from 'components/DrawerContent'
import { useRoutes } from 'src/hooks/useRoutes'

const Drawer = createDrawerNavigator()

export const ApplicationNavigation: React.FC = () => {
  const { routes } = useRoutes()
  return (
        <NavigationContainer>
            <Drawer.Navigator
                backBehavior='history'
                screenOptions={{ headerShown: false, drawerStyle: { width: '100%' } }}
                drawerContent={DrawerContent}
            >
                {routes.map((route) => (
                    <Drawer.Screen key={route.name} name={route.name} component={route.component} />
                ))}
            </Drawer.Navigator>
        </NavigationContainer>
  )
}
