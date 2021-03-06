import React from 'react'
import { Text, View, Button, Image, StyleSheet} from 'react-native'

import { useNavigation } from '@react-navigation/native';

export default function Landing({navigation}) {
  return (
    <View style = {{ flex: 1, justifyContent: 'center'}}>
      <Text style = {styles.title}>Hunting Grounds</Text>
        <Image
        style = {styles.image}
        source={require("../../assets/adaptive-icon.png")}>
        </Image>
        <Text style = {{textAlign: 'center', marginBottom: 10, fontSize: 20}}>New to Hunting Grounds?</Text>
        <View style={styles.button}> 
        <Button
            title='Register Here!'
            onPress={() => navigation.navigate("Register")} 
            color='#D2B48C'/>
        </View>
        <View style = {{paddingVertical:5}}></View>
        <Text style = {{textAlign: 'center', marginBottom: 10, fontSize: 20}}>Already have an account?</Text>
        <View style={styles.button}> 
        <Button
            title='Login Here!'
            onPress={() => navigation.navigate("Login")} 
            color='#D2B48C'/>
          </View>
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
  },
  button: {
    marginHorizontal: 50,
  }

})
