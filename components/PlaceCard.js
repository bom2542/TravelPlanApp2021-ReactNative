import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert} from "react-native";

import firestore from "../Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';
import Constants from "expo-constants";

export default function App(props, { navigation }){

    function Detail(){
        props.navigation.navigate('PlaceDetail', {
            PlaceName: props.name,
            PlacePicture: props.picture,
            PlaceDesc: props.desc,
            PlaceLat: props.lat,
            PlaceLong: props.long,
            PlaceID: props.id,
        });
    }

    return(
        <TouchableOpacity style={styles.card} onPress={Detail}>
                <View>
                    <Image source={{uri: props.picture}} style={styles.img} />
                </View>
                <View style={styles.desc}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                            <Text style={styles.place_name}>{props.name}</Text>
                            <Text style={styles.place_province}>@{props.province}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.place_desc}>
                        {props.desc}
                    </Text>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#000080',
        borderRadius: 7,
        overflow: "hidden",
        marginBottom: 15,
        width: '100%',
    },
    img: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: 100,
        resizeMode: 'cover',
    },
    desc: {
        padding: 10,
    },
    place_name: {
        fontFamily: 'KanitMedium',
        fontSize: 14,
        color: '#FDFEFE',
    },
    place_province: {
        fontFamily: 'KanitLight',
        fontSize: 14,
        color: '#FDFEFE',
    },
    place_desc: {
        fontFamily: 'KanitLight',
        color: '#FDFEFE',
        paddingTop: 5,
        fontSize: 12,
    }
})