import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet, Image, Text} from 'react-native';

import firebase from 'firebase/compat';


export class Register extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password:'',
            username:''
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp()
    {
        const { email, password, username} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
           firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set ({ username, 
              email })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
  render() {
    return (
      <View style={{paddingTop: 50}}>
        <Text style = {styles.title}>Hunting Grounds</Text>
        <View style={styles.inputBox}>
          <TextInput
          placeholder="username"
          onChangeText={(username) => this.setState( {username})}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState( {email})}
          />
        </View>
        <View style={styles.inputBox}>
        <TextInput
          placeholder="password"
          secureTextEntry = {true}
          onChangeText={(password) => this.setState( {password})}
          />
        </View>
        <View style={{padding: 20}}></View>
        <Button
        onPress={() => this.onSignUp()}
        title = "Sign Up"
        color={'#D2B48C'}
        />
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

export default Register
