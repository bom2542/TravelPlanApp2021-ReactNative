import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TextInput, View, Alert} from "react-native";
import Constants from "expo-constants";
import { ThemeProvider, Button, Input, Image} from 'react-native-elements';

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';
import {FontAwesome5} from "@expo/vector-icons";

export default function App({navigation}){

    const [email, setEmail] = useState('');

    async function ResetPassword(){
        await firebase.auth()
            .sendPasswordResetEmail(email)
            .then((user) => {
                alert('Email send success, please checking!!');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
    <ThemeProvider theme={theme}>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.logo_img} source={require('../images/logo.png')} />
                <Text style={{ fontFamily: 'KanitLight', fontSize: 24, marginTop: 5, }}>Forgotten Password</Text>
            </View>
            <Input style={styles.input} placeholder='E-mail' onChangeText={setEmail} leftIcon={
                <FontAwesome5 name='envelope' size={15} color='#0085E6'/> }/>
            <Button title='  Reset' onPress={() => ResetPassword()} icon={
                <FontAwesome5 name='unlock-alt' size={15} color='white'/>}
                    buttonStyle={{ backgroundColor: "red" }}/>
            <Button title=' Back' onPress={() => navigation.goBack()} icon={
                <FontAwesome5 name='arrow-left' size={15} color='white' /> }
                    containerStyle={{ marginTop: 10 }} buttonStyle={{ backgroundColor: "blue" }}/>
        </View>
    </ThemeProvider>
    );
}

const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    input: {
        margin: 5,
        fontFamily: 'KanitLight',
        fontSize: 16,
    },
    logo: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo_img: {
        width: 100,
        height: 120,
    },
})