import ViewPager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Colors, Headline, Text } from 'react-native-paper';
import RF from '../utils/RF';
import NavigationService from '../../../shared/utils/NavigationService';

export default function Splash() {
    const nav = useNavigation();
    const [currentStep, setStep] = useState(0);
    
    useEffect(()=>{
        setTimeout(() => {
            NavigationService.reset("SignIn");
        }, 1500);
    }, [])

    return (
        <View style={style.wrapper}>
            <Image
                style={style.splash}
                resizeMode="cover"
                source={require('../assets/splash.png')}
            />
            {/* <Text style={style.content}>prospa</Text> */}

        </View>
    );
}

const style = StyleSheet.create({
    screen: {
        padding: 0,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pager: {
        flex: 1,
        width: '100%',
        borderWidth: 2,
        marginBottom: 20,
        borderColor: 'red',
    },
    dots: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    page: {
        padding: 20,
    },
    content: {
        lineHeight: 20,
        color: Colors.grey600,
    },
    splash: {
        width: RF(183),
        height: RF(40),
    },
    hero: {
        height: '70%',
    },
});
