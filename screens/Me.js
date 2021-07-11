// import React, {useState, useEffect} from "react";
// import {Button, StyleSheet, Text, TextInput, View, Alert, Image, Platform} from "react-native";
// import Constants from "expo-constants";
//
// import firebase from "firebase/app";
// import firestore from "../Firebase";
// import 'firebase/auth';
// import 'firebase/storage';
//
// import * as ImagePicker from 'expo-image-picker';
// import { createDrawerNavigator } from '@react-navigation/drawer';
//
// const Drawer = createDrawerNavigator();
//
// export default function App({navigation}){
//
//     const [currentUser, setCurrentUser] = useState('');
//     const [name, setName] = useState('');
//     const [image, setImage] = useState('');
//
//     useEffect(() => {
//         async function CheckLogin(){
//             firebase.auth().onAuthStateChanged((user) => {
//                 if(user){
//                     setCurrentUser(user);
//
//                     const docRef = firestore.collection('users').doc(user.uid);
//                     docRef.get().then((doc) => {
//                         setName(doc.data().name);
//                     });
//                     let storageRef = firebase.storage().ref();
//                     let picRef = storageRef.child(user.uid + '.jpg').getDownloadURL();
//                     picRef.then((url) => setImage(url));
//                 }
//             });
//         }
//         CheckLogin();
//     }, []);
//
//     useEffect(() => {
//         async function AskPer() {
//             if(Platform.OS !== 'web'){
//                 const {status} = await ImagePicker.requestCameraPermissionsAsync();
//                 if(status !== 'granted'){
//                     alert('Need Permission');
//                 }
//             }
//         }
//         AskPer();
//     }, []);
//
//     async function UploadPic() {
//         let result = await ImagePicker.launchCameraAsync();
//         if(!result.cancelled){
//             let response = await fetch(result.uri);
//             let blob = await response.blob();
//
//             let storageRef = firebase.storage().ref();
//             let picRef = storageRef.child(currentUser.uid + '.jpg');
//
//             picRef.put(blob).then((pic) => {
//                 alert('Uploaded!!!');
//                 setImage(result.uri);
//             });
//         }
//     }
//
//     async function Logout(){
//         await firebase.auth().signOut();
//         navigation.reset({index: 0, routes: [{name: 'Login'}]});
//     }
//
//     return (
//         <View style={styles.container}>
//             <Image source={image == '' ? require('../images/logo.png') : {uri:image}} style={{width: 150, height: 150, borderRadius: 150/2, }} />
//             <Button title='Change Pic' onPress={() => UploadPic()} />
//             <Text>{ name }</Text>
//             <Button title='Logout' onPress={() => Logout()} />
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: Constants.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//         padding: 8,
//     },
//     paragraph: {
//         margin: 24,
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     input: {
//         borderWidth: 1,
//         padding: 10,
//         margin: 5,
//     },
// })



/* Basic Library */
import React, { useState, useEffect, useRef } from "react";
import Constants from 'expo-constants';

/* Ui Library */
import {View, Text, Button, StyleSheet, SafeAreaView, Image, TouchableOpacity, Modal, Alert, TouchableHighlight,} from 'react-native';

/* External Node */
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';

/* Internal File */
import firestore from '../Firebase';

export default function Profile({ navigation }) {

    /* Local Constant */
    const {uid} = firebase.auth().currentUser;
    const [user, setUser] = useState([]);
    const [img, setImage] = useState('https://reactnative.dev/img/tiny_logo.png');
    let actionSheet = useRef();
    var optionArray = ['Take photos', 'Choose Gallery', 'Cancel'];

    const showActionSheet = () => {
        //To show the Bottom ActionSheet
        actionSheet.current.show();
    };

    /* Permission Request */
    async function askCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') alert('Not');
    }

    async function askMedia() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') alert('Not');
    }

    async function LoadImage() {
        var storageRef = firebase.storage().ref();
        var imgRef = storageRef.child(uid + '.jpg');
        imgRef.getDownloadURL().then((url) => setImage(url));
    }

    /* Get user name function */
    async function GetUser() {
        const cityRef = firestore.collection('users').doc(uid);
        const doc = await cityRef.get();
        if (!doc.exists) {
        } else {
            setUser(doc.data().name);
        }
    }

    async function GetImageFromTakePhotos() {
        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });

        if (!result.cancelled) {
            // console.log(result.uri);
            let response = await fetch(result.uri);
            let blob = await response.blob();

            var storageRef = firebase.storage().ref();
            var imgRef = storageRef.child(uid + '.jpg');
            // console.log(imgRef);
            imgRef
                .put(blob)
                .then((snap) => {
                    //console.log('Uploaded!!!');
                    LoadImage();
                })
                .catch((error) => console.log(error.message));
        }
    }

    async function GetImageFromChooseGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

        if (!result.cancelled) {
            // console.log(result.uri);
            let response = await fetch(result.uri);
            let blob = await response.blob();

            var storageRef = firebase.storage().ref();
            var imgRef = storageRef.child(uid + '.jpg');
            imgRef
                .put(blob)
                .then((snap) => {
                    LoadImage();
                })
                .catch((error) => console.log(error.message));
        }
    }

    useEffect(() => {
        LoadImage();
        askCamera();
        askMedia();
        GetUser();
    }, []);

    /* Logout Function */
    async function Logout(){
        await firebase.auth().signOut();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{alignItems: 'center', }}>
                    <TouchableOpacity onPress={showActionSheet}>
                        <Image source={{ uri: img }} style={{ width: 150, height: 150, marginBottom: 20, borderRadius: 150/2,}} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.username}>{user}</Text>
                    <Button title={"Logout"} onPress={Logout} />
                <ActionSheet
                    ref={actionSheet}
                    title={'Please select sources your image?'}
                    options={optionArray}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={(index) => {
                        if(optionArray[index] == 'Take photos'){
                            GetImageFromTakePhotos();
                        }else if(optionArray[index] == 'Choose Gallery'){
                            //alert('Choose Gallery, OK');
                            GetImageFromChooseGallery();
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#FFF4E6',
    },
    username: {
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 20,
    },
});