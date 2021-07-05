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

const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            {/*<TouchableOpacity onPress={toggleDrawer}>*/}
                <Image
                    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png', }}
                    style={{ width: 30, height: 30, marginLeft: 15 }}
                />
            {/*</TouchableOpacity>*/}
        </View>
    );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function SelfMenu() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Profile" component={MeScreen} />
        </Drawer.Navigator>
    );
}

function MainMenu(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} options={{ tabBarLabel: 'HOME', tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="home" color={color} size={size} /> )}} />
            <Tab.Screen name='Me' component={SelfMenu} options={{ tabBarLabel: 'USER', tabBarIcon: ({ color, size }) => ( <FontAwesome5 name="user" color={color} size={size} /> )}} />
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
                        fontFamily: 'KanitMedium',
                        fontSize: 20,
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}