import React from 'react';
import {Icon, Text} from 'react-native-paper';
import {View} from 'react-native';

export const Header = ({pageTitle}: {pageTitle: string}) => {
    return (
       <View style={{
           flexDirection: 'row',
           width: '100%',
           justifyContent: 'space-between',
           alignItems: 'center',
           paddingHorizontal: 20,
           paddingVertical:15,
           borderBottomWidth: 0.8,
       }}>
           <Icon size={25} source={require('@assets/app_icon.jpg')} />
           <Text style={{fontWeight: '900', fontSize: 18 }} adjustsFontSizeToFit>{pageTitle}</Text>
           <Icon size={25} source={require('@assets/app_icon.jpg')} />
       </View>
    );
};
