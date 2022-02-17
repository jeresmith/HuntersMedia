import React, { Component } from 'react'
import { View, Button, TextInput} from 'react-native';

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
        const { email, password, } = this.state;
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
      <View>
          <TextInput
            placeholder="username"
            onChangeText={(username) => this.setState( {username})}
            />
            <TextInput
            placeholder="email"
            onChangeText={(email) => this.setState( {email})}
            />
            <Button
                onPress={() => this.onSignUp()}
                title = "Sign In"
            />
      </View>
    )
  }
}

export default Login