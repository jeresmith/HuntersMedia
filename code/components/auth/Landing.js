import React from 'react'
import { Text, View, Button, Image, StyleSheet} from 'react-native'

import { useNavigation } from '@react-navigation/native';

export default function Landing({navigation}) {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', backgroundColor: '#90EE90'}}>
      <Text style = {styles.title}>Hunting Grounds</Text>
        <Image
        style = {styles.image}
        source={require("C:/Users/OWNER/Documents/GitHub/HuntersMedia/code/assets/adaptive-icon.png")}>
        </Image>
        <Text style = {{textAlign: 'center', marginBottom: 10, fontSize: 20}}>New to Hunting Grounds?</Text>
        <Button
            title='Register Here!'
            onPress={() => navigation.navigate("Register")} />
        <View style = {{paddingVertical:15}}></View>
        <Text style = {{textAlign: 'center', marginBottom: 10, fontSize: 20}}>Already have an account?</Text>
        <Button
            title='Login Here!'
            onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1/1,
    alignSelf: 'center',
    marginBottom: 50,
    height: 300,
    width: 300
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold'
  }
})
