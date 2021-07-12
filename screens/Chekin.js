import React, {useState, useEffect} from "react";
import {Button, StyleSheet, Text, TextInput, View, Alert, ScrollView} from "react-native";
import Constants from "expo-constants";
import moment from "moment";

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';

import CheckinCard from '../components/CheckinCard';

export default function App({navigation}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function CheckLogin(){
            firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    setCurrentUser(user);
                    let collRef = firestore
                        .collection('users')
                        .doc(user.uid)
                        .collection('checkin')
                        .orderBy('Checkin_date', 'desc');

                    collRef.get().then((querySnap) => {
                        const tempDoc = querySnap.docs.map((doc) => {
                            return {id: doc.id, ...doc.data()};
                        });
                        setProducts(tempDoc);
                    });
                }
            });
        }
        const unsubs = navigation.addListener('focus', () => {
            CheckLogin();
        })
        return unsubs;
    }, [navigation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {products.map((item) => (
                    <CheckinCard
                        date={moment(item.Checkin_date.toDate()).calendar()}
                        PlacePicture={item.PlacePicture}
                        PlaceName={item.PlaceName}
                        PlaceDesc={item.PlaceDesc}
                        PlaceLat={item.PlaceLat}
                        PlaceLong={item.PlaceLong}
                        PlaceID={item.place_id}
                        id={item.id}
                        navigation={navigation}
                        user={currentUser.uid}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
})