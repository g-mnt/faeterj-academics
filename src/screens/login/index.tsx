import React from 'react';
import { View } from 'react-native';
import {TextInput} from "react-native-paper";

export const LoginScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
                mode="outlined"
                label="Email"
                placeholder="Email"
            />
        </View>
    )
}