import React, { useState } from 'react'

import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import firebase from 'firebase/compat';
import { useLinkProps } from '@react-navigation/native';
require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
        .collection('users')
        .where('username', '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id; 
                return{id, ...data}
            });
            setUsers(users); 

        })
    }
    return (
      <View style={{paddingTop: 20}}>
          <View style = {styles.inputBox}>
            <TextInput 
              placeholder = "Search"
              onChangeText = {(search) => fetchUsers(search)}
            />
            </View>
        <View style = {styles.inputBox}>
          <FlatList
                numColumns={1}
                horizontal = {false}
                data = {users}
                renderItem = {({item}) => (
                    <TouchableOpacity
                        onPress = {() => props.navigation.navigate("Profile", {uid: item.id})}> 
                        <Text>{item.username}</Text>
                    </TouchableOpacity>
                    
                )}
          />
          </View>

      </View>
    )
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

