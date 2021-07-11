import React, {useState} from "react";
import {StyleSheet, Text, View, Picker} from "react-native";
import { ThemeProvider, Button, Input, Image} from 'react-native-elements';
import Constants from "expo-constants";
import firebase from "firebase/app";
import firestore from "../Firebase";
import 'firebase/auth';
import {FontAwesome5} from "@expo/vector-icons";

export default function App({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    async function UserLogin(){
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                let collRef = firestore.collection('users').doc(user.user.uid);
                collRef.set({
                    name: name,
                    fname: selectedValue,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    email: email,
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image style={styles.logo_img} source={require('../images/logo.png')} />
                    <Text style={{ fontFamily: 'KanitLight', fontSize: 24, marginTop: 5, }}>Register</Text>
                </View>
                <Picker style={styles.sourcePicker} selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    <Picker.Item label="Tourist" value="Tourist. " />
                    <Picker.Item label="Mister(Mr.)" value="Mr. " />
                    <Picker.Item label="Miss" value="Miss. " />
                    <Picker.Item label="Mrs" value="Mrs. " />
                    <Picker.Item label="Ms" value="Ms. " />
                </Picker>
                <Input style={styles.input} placeholder='Name' onChangeText={setName} leftIcon={
                    <FontAwesome5 name='user-alt' size={15} color='#0085E6'/> }/>
                <Input style={styles.input} placeholder='E-mail' onChangeText={setEmail} leftIcon={
                    <FontAwesome5 name='envelope' size={15} color='#0085E6'/> }/>
                <Input style={styles.input} placeholder='Password' onChangeText={setPassword} secureTextEntry leftIcon={
                    <FontAwesome5 name='key' size={15} color='#0085E6' /> }/>
                <Button title='  Rigister' onPress={() => UserLogin()} icon={
                    <FontAwesome5 name='user-plus' size={15} color='white'/>}
                        buttonStyle={{ backgroundColor: "green" }}/>
                <Button title=' Back' onPress={() => navigation.goBack()} icon={
                    <FontAwesome5 name='arrow-left' size={15} color='white' /> }
                        containerStyle={{ marginTop: 10 }} buttonStyle={{ backgroundColor: "blue" }}/>
            </View>
        </ThemeProvider>
    );
}

const theme = {
    Button: {
        raised: true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        margin: 5,
        fontFamily: 'KanitLight',
        fontSize: 16,
    },
    logo: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo_img: {
        width: 100,
        height: 120,
    },
    picker: {
        fontFamily: 'KanitLight',
        fontSize: 16,
    },
    sourcePicker: {
        color: 'black',
        fontFamily: 'KanitLight',
        fontSize: 36,
        marginLeft: 5,
        marginRight: 0,
        paddingRight: 30,
    },
})