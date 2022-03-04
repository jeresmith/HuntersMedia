import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet, Image, Text} from 'react-native';

import firebase from 'firebase/compat';


export class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password:'',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp()
    {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
  render() {
    return (
      <View style={{paddingTop: 50, backgroundColor: '#90EE90'}}>
          <Text style = {styles.title}>Hunting Grounds</Text>
          <Image
          style = {styles.image}
          source={require("C:/Users/OWNER/Documents/GitHub/HuntersMedia/code/assets/adaptive-icon.png")}>
          </Image>
          <View style = {styles.inputBox}>
            <TextInput
            placeholder="email"
            onChangeText={(email) => this.setState( {email})}
            />
          </View>
          <View style = {styles.inputBox}>
            <TextInput
            placeholder="password"
            secureTextEntry = {true}
            onChangeText={(password) => this.setState( {password})}
            />
          </View>
          <View style={{padding: 20}}></View>
          <Button
          onPress={() => this.onSignUp()}
          title = "Sign In"
          />
          <View style={{backgroundColor: '#90EE90', padding: 100 }}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1/1,
    alignSelf: 'center',
    marginBottom: 50,
    height: 150,
    width: 150
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold'
  },
  inputBox: {
    borderColor: '#0f0f0f',
    borderWidth: 1,
    margin: 10,
    padding: 10
  }
})

export default Login

export default Login
