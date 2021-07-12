/* Basic Library */
import React, { useState, useEffect, useRef } from "react";
import Constants from 'expo-constants';

/* Ui Library */
import {View, Text, Button, StyleSheet, SafeAreaView, Image, TouchableOpacity, Modal, Alert, TouchableHighlight,} from 'react-native';

/* External Node */
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet from 'react-native-actionsheet';
import moment from "moment";

/* Internal File */
import firestore from '../Firebase';
import {FontAwesome5} from "@expo/vector-icons";

export default function Profile({ navigation }) {

    /* Local Constant */
    const {uid} = firebase.auth().currentUser;
    const [user, setUser] = useState([]);
    const [fname, setFname] = useState([]);
    const [img, setImage] = useState('http://pharadorn.lnw.mn/TravelPlan/images/logo/logo-application.png');
    let actionSheet = useRef();
    const [StartDate, setStartDate] = useState([]);
    const [mail, setMail] = useState([]);
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
            setFname(doc.data().fname);
            setStartDate(moment(doc.data().createdAt.toDate()).fromNow());
            setMail(doc.data().email);
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
                        <Image source={{ uri: img }} style={{ width: 200, height: 200, marginBottom: 15, borderRadius: 200/2,}} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.username}>{fname}{user}</Text>
                <Text style={styles.username2}>User email : {mail}</Text>
                <Text style={styles.username3}>Have been living : {StartDate}</Text>
                <TouchableOpacity style={styles.button} onPress={Logout}>
                    <Text style={{alignItems:"center", color: 'white', fontFamily: 'KanitMedium', fontSize: 14,}} ><FontAwesome5 name='sign-out-alt' size={15} color='white' />  LOGOUT</Text>
                </TouchableOpacity>
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
        // paddingBottom: 15,
        fontFamily: 'KanitMedium',
    },
    username2: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 5,
        fontFamily: 'KanitLight',
    },
    username3: {
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 5,
        fontFamily: 'KanitLight',
        marginBottom: 15,
    },
    button: {
        //margin: 10,
        alignItems: "center",
        backgroundColor: "#DE3F2A",
        padding: 10,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
});