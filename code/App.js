import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Button, Text, View } from 'react-native';

import firebase from "firebase/compat";
import { getFirestore } from "firebase/firestore"

import { Provider } from "react-redux";

import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'

import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzJmTKRNyd2XdEtzq5TE2QZ2kW6Nf-rxo",
    authDomain: "huntinggrounds-501e8.firebaseapp.com",
    projectId: "huntinggrounds-501e8",
    storageBucket: "huntinggrounds-501e8.appspot.com",
    messagingSenderId: "177288709363",
    appId: "1:177288709363:web:bde6daf7a3d83a806b6386",
    measurementId: "G-G0M7HXJRBJ",
  };
  firebase.initializeApp(firebaseConfig);


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import MainScreen from './components/Main'
import AddScreen  from './components/main/Add'
import SaveScreen  from './components/main/Save'
import CommentScreen  from './components/main/Comment'

const Stack = createStackNavigator();

export class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    componentDidMount()
    {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user){
                this.setState({
                    loggedIn: false,
                    loaded: true,
                })
            }
            else {
            this.setState({
                loggedIn: true,
                loaded: true,
            }) 
            }
        })
    }
  render() {
      const {loggedIn, loaded} = this.state;
      if (!loaded)
      {
        return (
            <View style = {{ flex: 1, justifyContent: 'center'}}>
                <Text>Loading</Text >
            </View>
        )
      }
    if (!loggedIn)
    {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name= "Landing" component={LandingScreen} options={{headerShown: false}} />
                    <Stack.Screen name= "Register" component={RegisterScreen} options={{headerShown: false}}/>
                    <Stack.Screen name= "Login" component={LoginScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    return (
        <Provider store = {store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen name= "Main" component={MainScreen} options={{headerShown: false}} />
                    <Stack.Screen name= "Add" component={AddScreen} navigation={this.props.navigation}  />
                    <Stack.Screen name= "Upload" component={SaveScreen} navigation={this.props.navigation}/>
                    <Stack.Screen name= "Comment" component={CommentScreen} navigation={this.props.navigation}/>

                </Stack.Navigator> 
            </NavigationContainer>       

        </Provider>
        
    )
  }
}

export default App
