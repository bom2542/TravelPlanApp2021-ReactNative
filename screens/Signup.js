import React, {useState, useEffect} from "react";
import {Button, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import Constants from "expo-constants";

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';

export default function App({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function UserLogin(){
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                alert('สำเร็จ');
                let collRef = firestore.collection('users').doc(user.user.uid);
                collRef.set({
                    name: name
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Name' onChangeText={setName} />
            <TextInput style={styles.input} placeholder='E-mail' onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry />
            <Button title='Register' onPress={() => UserLogin()} />
            <Button title="Back" onPress={() => navigation.goBack()} />
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
    }
})