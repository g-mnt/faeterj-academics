import React, { type ReactNode } from 'react'
import { Avatar, Icon, Text, useTheme } from 'react-native-paper'
import { Pressable, View } from 'react-native'
import { type DrawerContentComponentProps } from '@react-navigation/drawer'
import { useRoutes } from 'hooks/useRoutes'
import { useUserStore } from 'src/store/user'
import { useLogout } from 'hooks/useLogout'

export const DrawerContent = ({ navigation, state }: DrawerContentComponentProps): ReactNode => {
  const user = useUserStore((state) => state.user)
  const { routes } = useRoutes()
  const { colors } = useTheme()
  const { logout } = useLogout()
  return (
        <View style={{ flex: 1, width: '100%' }}>
            <View style={{
              width: '100%',
              borderBottomWidth: 0.8,
              marginBottom: 5,
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <Icon size={60} source={require('@assets/app_icon.jpg')} />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                    {routes.filter(({ hidden }) => !hidden).map((route, index) => (
                        <Pressable
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              paddingVertical: 10,
                              paddingHorizontal: 20
                            }}
                            key={route.name}
                            onPress={() => { navigation.navigate(route.name) }}
                        >
                            <Icon size={35} source={route.icon} color={state.index === index ? colors.primary : 'black'} />
                            <Text style={{
                              padding: 10,
                              marginLeft: 10,
                              fontSize: 20,
                              fontWeight: 'bold',
                              color: state.index === index ? colors.primary : 'black'
                            }}>{route.displayName}</Text>
                        </Pressable>
                    ))}
                </View>
                <View style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderTopWidth: 0.8,
                  padding: 15,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 5
                    }}>
                        <Avatar.Icon size={35} icon="account" />
                        <View style={{
                          marginLeft: 10
                        }}>
                            <Text>{user?.name}</Text>
                            <Text>{user?.email}</Text>
                        </View>
                    </View>
                    <Pressable onPress={logout}>
                        <Icon size={25} source='logout' color={colors.primary} />
                    </Pressable>
                </View>
            </View>
        </View>
  )
}
