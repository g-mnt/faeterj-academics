import React, {useEffect} from "react";
import {GuestNavigation} from "navigations/guest";
import {useUserStore} from "src/store/user";
import {ApplicationNavigation} from "navigations/application";
import {useFetch} from "hooks/useFetch";
import {AuthRepository} from "repositories/auth";
import {ActivityIndicator, useTheme} from "react-native-paper";
import {View} from "react-native";
import {getToken} from "src/services/storage";
import {setApiToken} from "src/services/api";
import * as SplashScreen from 'expo-splash-screen';

export const Navigations : React.FC = () => {
    const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
    const [{isLoading}, fetchSelf] = useFetch(AuthRepository.self);
    const {colors} = useTheme();

    const checkUser = async () => {
        const token = await getToken();
        SplashScreen.hideAsync().catch(() => {});

        if(token){
            setApiToken(token);
            const data = await fetchSelf();
            if(data){
                setUser(data)
            }
        }
    }

    useEffect(() => {
        if (!user) {
           checkUser().catch(() => {});
        }
    }, []);

    if(!user && isLoading) {
         return <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={colors.primary} />
         </View>
    }

    return !user ? <GuestNavigation /> : <ApplicationNavigation />;
}