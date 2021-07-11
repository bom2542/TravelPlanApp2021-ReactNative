import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert} from "react-native";
import 'firebase/auth';

export default function App(props){

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
                <View style={{padding: 10, }}>
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
        overflow: 'hidden',
        marginBottom: 15,
        width: '100%',
    },
    img: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: 100,
        resizeMode: 'cover',
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