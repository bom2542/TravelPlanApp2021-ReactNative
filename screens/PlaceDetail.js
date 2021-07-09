import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, View, Image, Dimensions, ScrollView, TextInput, SafeAreaView, TouchableOpacity} from "react-native";
import { Input, ThemeProvider } from 'react-native-elements';
import MapView, { Marker, Callout } from "react-native-maps"
import moment from "moment";
import Constants from "expo-constants";
import { FontAwesome5 } from '@expo/vector-icons';

import firestore from "../Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';

import CommentCard from '../components/CommentCard';

export default function App({ route, navigation }){

    const { PlacePicture, PlaceName, PlaceDesc, PlaceLat, PlaceLong, PlaceID } = route.params;
    const [comment, setComment] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState([]);
    const [image, setImage] = useState('');

    useEffect(() => {
        async function CheckLogin(){
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    // setCurrentUser(user);

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

    async function SaveComment(){
        const MakeComment = { name: name, message: message, createdAt: firebase.firestore.FieldValue.serverTimestamp(), picture: image};

        await firebase.firestore().collection('places').doc(PlaceID).collection('comment').doc().set(MakeComment)
            .then(function (){
                GetComment();
            }).catch(function (){});
    }

    async function GetComment() {
        const collRef = firestore.collection('places').doc(PlaceID).collection('comment').orderBy('createdAt', 'desc');;
        const col = await collRef.get();
        let res = [];
        col.forEach((doc) => {
            res = [...res, ...[doc.data()]];
        });
        setComment(res);
    }

    useEffect(() => {
        GetComment();
    }, []);

    moment.locale('th');

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Image source={{uri: PlacePicture}} style={styles.img} />
                <View style={{paddingTop: 5, alignItems: 'center',}}>
                    <Text style={styles.place_name}>{PlaceName}</Text>
                </View>
                <View style={{padding: 10,}}>
                    <Text style={styles.place_desc}>     {PlaceDesc}</Text>
                </View>
                <View style={{paddingTop: 10, paddingLeft: 20, paddingBottom: 10,}}>
                    <Text style={styles.place_name2}><FontAwesome5 name="map-marked-alt" /> จุดที่ตั้ง{PlaceName}</Text>
                </View>
                <MapView style={styles.map}
                    initialRegion= {{
                        latitude: PlaceLat,
                        longitude: PlaceLong,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09,
                    }} provider="google" >
                    <Marker coordinate={{
                            latitude: PlaceLat,
                            longitude: PlaceLong,
                        }} pinColor="red">
                        <Callout>
                            <Text style={styles.place_desc}>{PlaceName}</Text>
                        </Callout>
                    </Marker>
                </MapView>
                <View style={{paddingTop: 20, paddingLeft: 20, paddingBottom: 10,}}>
                    <Text style={styles.place_name2}><FontAwesome5 name="comment-dots" /> รีวิว{PlaceName}</Text>
                </View>
                <View style={styles.CommentList}>
                    {comment.map((item) => (
                        <CommentCard
                            name={item.name}
                            message={item.message}
                            pic={item.picture}
                            date={moment(item.createdAt.toDate()).calendar()}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer_fixed}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{alignItems:"center", color: 'white', fontFamily: 'KanitMedium', fontSize: 16,}} ><FontAwesome5 name='luggage-cart' size={15} color='white' />  ADD TO TRIP</Text>
                </TouchableOpacity>
            </View>
            {/*<View style={styles.footer_fixed}>*/}
            {/*    <View style={styles.Comment}>*/}
            {/*        /!*<Input style={styles.textStyle} placeholder="Review in this location ..." onChangeText={setMessage}/>*!/*/}
            {/*        /!*<Button title="Review" color="#1E6738" onPress={SaveComment} />*!/*/}
            {/*        */}
            {/*    </View>*/}
            {/*</View>*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    img: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        width: Dimensions.get("window").width,
        height: 400,
        resizeMode: 'stretch',
    },
    desc: {
        padding: 10,
    },
    place_name: {
        fontFamily: 'KanitMedium',
        fontSize: 21,
        color: 'black',
    },
    place_name2: {
        fontFamily: 'KanitMedium',
        fontSize: 16,
        color: 'black',
    },
    place_province: {
        fontFamily: 'KanitLight',
        fontSize: 14,
        color: '#FDFEFE',
    },
    place_desc: {
        fontFamily: 'KanitLight',
        color: 'black',
        paddingTop: 5,
        fontSize: 14,
    },
    map: {
        width: Dimensions.get("window").width,
        height: 300,
    },
    footer_fixed: {
        backgroundColor: '#FBFCFC',
        padding: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //justifyContent: "flex-start",
        alignSelf: 'center',
        width: '100%',
    },
    CommentList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        alignContent: 'stretch',
    },
    Comment: {
        width: '60%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textStyle:{
        paddingLeft: 5,
        fontFamily: 'KanitLight',
        fontSize: 14,
    },
    button: {
        margin: 10,
        alignItems: "center",
        backgroundColor: "#154360",
        padding: 10,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
})