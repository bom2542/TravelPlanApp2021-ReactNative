import * as React from 'react';
import {Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, Alert} from 'react-native';

export default function App(props) {

    const window = Dimensions.get('window');

    async function CommentNotify(){
        Alert.alert(props.name +' ('+ props.date +')'+ ' : ', props.message);
    }

    return (
        <TouchableOpacity onPress={() => CommentNotify()}>
            <View style={[ styles.container, { width: (window.width - 20)},]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ margin: 5, }}>
                        <Image source={{uri: props.pic}} style={styles.img}  />
                    </View>
                    <View style={{ marginTop: 3, }}>
                        <Text style={styles.name}>{props.name}</Text>
                    </View>
                </View>
                <View>
                    <Text numberOfLines={2} style={styles.message}>
                        {props.message}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#D5DBDB',
        borderRadius: 7,
    },
    name: {
        fontSize: 15,
        margin: 5,
        fontFamily: 'KanitMedium',
    },
    message: {
        marginLeft: 5,
        fontSize: 16,
        fontFamily: 'KanitLight',
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
    }
});