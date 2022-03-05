//import {View, Text, Button, ScrollView, Image, StyleSheet} from 'react-native';

import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat'
require('firebase/firestore')
import {StyleSheet, View, Text, Image, FlatList, Button, ScrollView} from 'react-native';
import {connect} from 'react-redux'



function Feed(props) {
    const [posts, setPosts] = useState([]); 
    

    useEffect(() => {
      let posts = [];
      if(props.usersLoaded == props.following.length){
        for(let i = 0; i < props.following.length; i++)
        {
          const user = props.users.find(el => el.uid === props.following[i]);
          if(user != undefined){
            posts =[...posts, ...user.posts]
          }
        }

        posts.sort(function(x,y) {
          return x.creation - y.creation;
        })

        setPosts(posts);

      }
        
    }, [props.usersLoaded])
    

    return (
      <View style={styles.container}>
          <View style={styles.containerGallery}>
              <FlatList
                  numColumns={1}
                  horizontal={false}
                  data={posts}
                  renderItem={({item}) => 
                  (
                      <View style={styles.containerImage}>
                          <Text style={styles.container}>{item.user.username}</Text>
                          <Image
                            style={styles.image}
                            source={{uri: item.downloadURL}}
                          />
                          <Text 
                          onPress={() => 
                            props.navigation.navigate('Comment', {  postId: item.id, uid: item.user.uid })}>
                            View comments...
                            </Text>
                      </View>
                  )}
              />
          </View> 
      </View>
         
      
    )
}

const styles = StyleSheet.create({
    topBar: {
      paddingTop: 50,
      backgroundColor: '#006400'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#006400',
    },
    image: {
        aspectRatio: 1/1,
        marginBottom: 10,
        marginStart: 10,
        height: 70,
        width: 70
    },
    button: {
      backgroundColor: '#D2B48C',
      paddingEnd: 10,
      paddingTop: 50
    },
    post: {
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    containerGallery: {
      flex: 1
    },
    image: {
      flex: 1,
      aspectRatio: 1/1
    },
    containerImage:{
      flex: 1/3
    },
    container: {
      flex: 1,
    }

})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,

})


export default connect(mapStateToProps, null)(Feed);