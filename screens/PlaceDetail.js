import React, {useEffect, useState} from "react";
import {Button, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import Constants from "expo-constants";

import firestore from "../Firebase";
import firebase from 'firebase/app';
import 'firebase/auth';

export default function App({ route, navigation }){

    const { PlacePicture, PlaceName } = route.params;

    return(
        <View>
            <Text>{PlacePicture}</Text>
            <Text>{PlaceName}</Text>
        </View>
    );
}