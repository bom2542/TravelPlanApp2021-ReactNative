import React, {useState, useEffect} from "react";
import {StyleSheet, Text, TextInput, View, Alert} from "react-native";
import Constants from "expo-constants";
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemeProvider, Button, Input, Image} from 'react-native-elements';

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';

export default function App({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function UserLogin(){
        await firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                navigation.reset({index:0, routes: [{name: 'Main'}]});
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        async function CheckLogin(){
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    navigation.reset({index:0, routes: [{name: 'Main'}]});
                }
            });
        }
        CheckLogin();
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.logo_img} source={require('../images/logo.png')} />
                <Text style={{ fontFamily: 'KanitLight', fontSize: 28 }}>วางแผนการท่องเที่ยว</Text>
                <Text style={{ fontFamily: 'KanitLight', fontSize: 16 }}>Travel Plan Application</Text>
            </View>

            {/* Form Login */}
            <Input style={styles.input} placeholder='E-mail' onChangeText={setEmail} leftIcon={
                    <FontAwesome5 name='user-alt' size={20} color='#0085E6'/> }/>
            <Input style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry leftIcon={
                    <FontAwesome5 name='key' size={20} color='#0085E6' /> }/>
            <Button title='  Login' onPress={() => UserLogin()} icon={
                    <FontAwesome5 name='sign-in-alt' size={15} color='white'/>}
                    buttonStyle={{ backgroundColor: "green" }}/>
            <Button title=' Register' onPress={() => navigation.navigate('Register')} icon={
                    <FontAwesome5 name='user-plus' size={15} color='white' /> }
                    containerStyle={{ marginTop: 10 }} buttonStyle={{ backgroundColor: "blue" }}/>
            <Button title='  Reset' onPress={() => navigation.navigate('Reset')} icon={
                <FontAwesome5 name='unlock-alt' size={15} color='white' /> }
                    containerStyle={{ marginTop: 10 }} buttonStyle={{ backgroundColor: "red" }}/>

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
        padding: 10,
    },
    input: {
        paddingLeft: 10,
        fontFamily: 'KanitLight',
    },
    logo: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo_img: {
        width: 100,
        height: 150,
    },
})