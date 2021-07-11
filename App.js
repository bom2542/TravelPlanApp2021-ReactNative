import * as React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import {Button, StyleSheet, Text, TextInput, View, Alert, Image, Platform, TouchableOpacity} from "react-native";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './screens/Splash';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ResetScreen from './screens/Reset';
import HomeScreen from './screens/Home';
import MeScreen from './screens/Me';
import PlaceDetailScreen from './screens/PlaceDetail';
import MyTripScreen from './screens/MyTrip';
import MyTripDetailScreen from './screens/MyTripDetail';
import CheckinScreen from './screens/Chekin';
import CheckinDetailScreen from './screens/CheckinDetail';

const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row', }}>
                <Image
                    source={require('./images/logo.png')}
                    style={{ width: 40, height: 50, marginLeft: 20,}}
                />
        </View>
    );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainMenu(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="home" color={color} size={size} /> )}} />
            <Tab.Screen name='Trip' component={MyTripScreen} options={{ tabBarLabel: 'Trips', tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="map-marked-alt" color={color} size={size} /> )}} />
            <Tab.Screen name='Checkin' component={CheckinScreen} options={{ tabBarLabel: 'History', tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="map-marker-alt" color={color} size={size} /> )}} />
            <Tab.Screen name='Profile' component={MeScreen} options={{ tabBarLabel: 'User', tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="user" color={color} size={size} /> )}} />
        </Tab.Navigator>
    );
}

export default function App( { navigation } ){
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Reset' component={ResetScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Main' component={MainMenu} options={{
                    headerLeft: () => (
                        <NavigationDrawerStructure navigationProps={navigation} />
                    ),
                    title: 'Travel Planing',
                    headerStyle: {
                        backgroundColor: '#0085E6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'KanitLight',
                        fontSize: 20,
                        marginTop: 3,
                    },
                }}/>
                <Stack.Screen name='PlaceDetail' component={PlaceDetailScreen} options={{
                    title: 'Detail',
                    headerStyle: {
                        backgroundColor: '#0085E6',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'KanitLight',
                        fontSize: 18,
                    },
                }}/>
                <Stack.Screen name='MyTripDetail' component={MyTripDetailScreen} options={{
                    title: 'Trip',
                    headerStyle: {
                        backgroundColor: '#F39C12',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'KanitLight',
                        fontSize: 18,
                    },
                }}/>
                <Stack.Screen name='CheckinDetail' component={CheckinDetailScreen} options={{
                    title: 'Checkin',
                    headerStyle: {
                        backgroundColor: '#186A3B',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'KanitLight',
                        fontSize: 18,
                    },
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}