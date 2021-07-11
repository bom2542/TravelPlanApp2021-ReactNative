import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, } from "react-native";
import 'firebase/auth';

export default function App(props, { navigation }){

    function Detail(){
        props.navigation.navigate('MyTripDetail', {
            PlaceName: props.PlaceName,
            PlacePicture: props.PlacePicture,
            PlaceDesc: props.PlaceDesc,
            PlaceLat: props.PlaceLat,
            PlaceLong: props.PlaceLong,
            PlaceID: props.PlaceID,
            PlaceDate: props.date,
            id: props.id,
        });
    }

    return(
        <TouchableOpacity style={styles.card} onPress={Detail}>
            <View>
                <Image source={{uri: props.PlacePicture}} style={styles.img} />
            </View>
            <View style={styles.desc}>
                    <Text style={styles.place_name}>{props.PlaceName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                    <Text style={styles.place_province}>Start : {props.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F39C12',
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