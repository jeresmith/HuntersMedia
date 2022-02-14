import React from 'react'
import { Text, View, Button } from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export default function landing() {
  return (
    <View style = {{ flex: 1, justifyContent: 'center'}}>
        <Button
            title='Register'
            onPress={() => navigation.navigate("Register")} />
        <Button
            title='Login'
            onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
