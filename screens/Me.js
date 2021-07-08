import React, {useState, useEffect} from "react";
import {Button, StyleSheet, Text, TextInput, View, Alert, Image, Platform} from "react-native";
import Constants from "expo-constants";

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';
import 'firebase/storage';

import * as ImagePicker from 'expo-image-picker';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App({navigation}){

    const [currentUser, setCurrentUser] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        async function CheckLogin(){
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    setCurrentUser(user);

                    const docRef = firestore.collection('users').doc(user.uid);
                    docRef.get().then((doc) => {
                        setName(doc.data().name);
                    });
                    let storageRef = firebase.storage().ref();
                    let picRef = storageRef.child(user.uid + '.jpg').getDownloadURL();
                    picRef.then((url) => setImage(url));
                }
            });
        }
        CheckLogin();
    }, []);

    useEffect(() => {
        async function AskPer() {
            if(Platform.OS !== 'web'){
                const {status} = await ImagePicker.requestCameraPermissionsAsync();
                if(status !== 'granted'){
                    alert('Need Permission');
                }
            }
        }
        AskPer();
    }, []);

    async function UploadPic() {
        let result = await ImagePicker.launchCameraAsync();
        if(!result.cancelled){
            let response = await fetch(result.uri);
            let blob = await response.blob();

            let storageRef = firebase.storage().ref();
            let picRef = storageRef.child(currentUser.uid + '.jpg');

            picRef.put(blob).then((pic) => {
                alert('Uploaded!!!');
                setImage(result.uri);
            });
        }
    }

    async function Logout(){
        await firebase.auth().signOut();
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
    }

    return (
        <View style={styles.container}>
            <Image source={image == '' ? require('../images/logo.png') : {uri:image}} style={{width: 150, height: 150, borderRadius: 150/2, }} />
            <Button title='Change Pic' onPress={() => UploadPic()} />
            <Text>{ name }</Text>
            <Button title='Logout' onPress={() => Logout()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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