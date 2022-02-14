import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzJmTKRNyd2XdEtzq5TE2QZ2kW6Nf-rxo",
    authDomain: "huntinggrounds-501e8.firebaseapp.com",
    projectId: "huntinggrounds-501e8",
    storageBucket: "huntinggrounds-501e8.appspot.com",
    messagingSenderId: "177288709363",
    appId: "1:177288709363:web:bde6daf7a3d83a806b6386",
    measurementId: "G-G0M7HXJRBJ"
  };

if(firebase.apps.length === 0)
{
    firebase.initializeApp(firebaseConfig)
}

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name= "Landing" component={LandingScreen} options={{HeaderShown: false}} />
                <Stack.Screen name= "Register" component={RegisterScreen}/>
                <Stack.Screen name= "Login" component={LoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}