import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Platform, Switch} from "react-native";
import { ThemeProvider, Input, Button } from 'react-native-elements';
import MapView, { Marker, Callout } from "react-native-maps"
import moment from "moment";
import StDateTimePickerModal from "react-native-modal-datetime-picker";
import Constants from "expo-constants";
import { FontAwesome5 } from '@expo/vector-icons';

import firestore from "../Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';

import CommentCard from '../components/CommentCard';

export default function App({ route, navigation }){

    const { PlacePicture, PlaceName, PlaceDesc, PlaceLat, PlaceLong, PlaceID, PlaceDate } = route.params;

    const [currentUser, setCurrentUser] = useState(null);

    //Constant Comment
    const [comment, setComment] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState([]);
    const [image, setImage] = useState('');

    //Constant DateTime
    const today = new Date();
    const [pickerMode, setPickerMode] = useState(null);
    const [inline, setInline] = useState(false);
    const [date] = useState(today);
    const [StartDate, setStartDate] = useState('');
    const [StartDate2, setStartDate2] = useState('');
    const showDateTimePicker = () => {
        setPickerMode("datetime");
    };
    const hidePicker = () => {
        setPickerMode(null);
    };
    const StartHandleConfirm = (date) => {
        hidePicker();
        setStartDate(date);
        setStartDate2((moment(date).format('llll')));
    };

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

    async function SaveMyTrip(){
        const MyTrip = { place_id: PlaceID, trip_date: StartDate, PlacePicture: PlacePicture, PlaceName : PlaceName, PlaceDesc : PlaceDesc, PlaceLat : PlaceLat, PlaceLong : PlaceLong,};
        await firebase.firestore().collection('users').doc(currentUser.uid).collection('trip').doc().set(MyTrip)
            .then(function (){
                navigation.navigate('Trip');
            }).catch(function (){});
    }

    async function SaveComment(){
        const MakeComment = { name: name, message: message, createdAt: firebase.firestore.FieldValue.serverTimestamp(), picture: image};

        await firebase.firestore().collection('places').doc(PlaceID).collection('comment').doc().set(MakeComment)
            .then(function (){
                GetComment();
            }).catch(function (){});
    }

    async function GetComment() {
        const collRef = firestore.collection('places').doc(PlaceID).collection('comment').orderBy('createdAt', 'desc');
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

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Image source={{uri: PlacePicture}} style={styles.img} />
                <View style={{paddingTop: 5, alignItems: 'center',}}>
                    <Text style={styles.place_name}>{PlaceName}</Text>
                </View>
                <View style={{padding: 10,}}>
                    <Text style={styles.place_desc}>   {PlaceDesc}</Text>
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
            <ThemeProvider theme={theme}>
            <View style={styles.footer_fixed}>
                <View style={{ flex: 1, flexDirection: "row", paddingTop: 20, paddingBottom: 20,alignItems: 'center', marginTop: 20,}}>
                    <TouchableOpacity style={styles.start_date_box} onPress={showDateTimePicker}>
                            <Text style={styles.font_16pt}><FontAwesome5 name='calendar-alt' size={15} color='white' />  Enter Start</Text>
                    </TouchableOpacity>
                    <View style={styles.end_date_box}>
                        <Text style={styles.font_14pt}>{StartDate2}</Text>
                    </View>
                    {Platform.OS === "ios" && (
                        <View style={style.inlineSwitchContainer}>
                            <Text style={style.inlineSwitchText}>Display inline?</Text>
                            <Switch value={inline} onValueChange={setInline} />
                        </View>
                    )}
                    <StDateTimePickerModal
                        isVisible={pickerMode !== null}
                        mode={pickerMode}
                        onConfirm={StartHandleConfirm}
                        onCancel={hidePicker}
                        display={inline ? "inline" : undefined}
                        minimumDate={date}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={SaveMyTrip}>
                    <Text style={{alignItems:"center", color: 'white', fontFamily: 'KanitMedium', fontSize: 16,}} ><FontAwesome5 name='luggage-cart' size={15} color='white' />  ADD TO TRIP</Text>
                </TouchableOpacity>
            </View>
            </ThemeProvider>
        </SafeAreaView>
    );
}

const theme = {
    Button: {
        raised: true
    }
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
        backgroundColor: "#0065A2",
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
    start_date_box: {
        marginLeft: 5,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00B0BA',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
    },
    end_date_box: {
        marginRight: 5,
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#FF5C77',
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
    },
    font_14pt: {
        fontFamily: 'KanitLight',
        fontSize: 14,
        color: 'white',
    },
    font_16pt: {
        fontFamily: 'KanitMedium',
        fontSize: 14,
        color: 'white',
    },
    inlineSwitchContainer: {
        marginTop: 28,
        flexDirection: "row",
        alignItems: "center",
    },
    inlineSwitchText: {
        fontSize: 18,
        marginRight: 8,
    },
})