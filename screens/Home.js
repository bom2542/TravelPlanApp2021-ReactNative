import React, {useState, useEffect} from "react";
import {Button, StyleSheet, Text, TextInput, View, Alert, ScrollView} from "react-native";
import Constants from "expo-constants";

import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';

import PlaceCard from '../components/PlaceCard';

export default function App({navigation}) {

    const [products, setProducts] = useState([]);

    async function GetPlaces() {
        let collRef = firestore.collection('places').orderBy('createdAt', 'desc');
        await collRef.get().then((querySnap) => {
            const tempDoc = querySnap.docs.map((doc) => {
                return {id: doc.id, ...doc.data()};
            });
            setProducts(tempDoc);
        });
    }

    useEffect(() => {
        GetPlaces();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                {products.map((item) => (
                    <PlaceCard
                        name={item.name}
                        picture={item.picture}
                        desc={item.desc}
                        province={item.province}
                        id={item.id}
                        navigation={navigation}
                        lat={item.lat}
                        long={item.long}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
})