import React from "react";
import {StyleSheet, Text, View, Image, ActivityIndicator,} from "react-native";
import Constants from "expo-constants";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App({navigation}) {

    let [fontsLoaded] = useFonts({
        'KanitLight': require('../assets/fonts/Kanit-Light.ttf'),
        'KanitBold': require('../assets/fonts/Kanit-Bold.ttf'),
        'KanitMedium': require('../assets/fonts/Kanit-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return (
            <View style={styles.container}>
                    <Image style={styles.logo} source={require('../images/logo.png')} />
                    <Text style={{ fontFamily: 'KanitLight', fontSize: 28 }}>วางแผนการท่องเที่ยว</Text>
                    <Text style={{ fontFamily: 'KanitLight', fontSize: 16 }}>Travel Plan Application</Text>
                    <ActivityIndicator style={{marginTop: 40}} size="large" color="#1ABC9C" />
                    <View style={styles.footer}>
                        <Text style={{ fontFamily: 'KanitLight', fontSize: 10 }}>©2021 Pharadorn Boonruam, B6134228</Text>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        marginTop: 150,
        padding: 8,
        alignItems: 'center',
    },
    logo: {
        width: 130,
        height: 180,
    },
    footer: {
        marginTop: 190,
    }
})