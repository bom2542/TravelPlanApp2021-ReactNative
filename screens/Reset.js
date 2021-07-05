import React, {useState, useEffect} from "react";
import {Button, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import Constants from "expo-constants";

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';

export default function App({navigation}){

    const [email, setEmail] = useState('');

    async function ResetPassword(){
        await firebase.auth()
            .sendPasswordResetEmail(email)
            .then((user) => {
                alert('ส่งอีเมล์เรียบร้อยแล้ว');
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} />
            <Button title='Reset' onPress={() => ResetPassword()} />
            <Button title='Back' onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
})