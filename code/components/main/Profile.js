import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat'
require('firebase/firestore')
import {StyleSheet, View, Text, Image, FlatList, Button, ScrollView} from 'react-native';
import {connect} from 'react-redux'


function Profile(props) {
    const [userPosts, setUserPosts] = useState([]); 
    const [user, setUser] = useState(null); 
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const {currentUser, posts } = props; 
        //console.log({currentUser, posts })

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else
        {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get() //get dispatch
                .then((snapshot) => {
                    if(snapshot.exists){
                        setUser(snapshot.data());
                    }
                    else{
                        console.log('does not exist')
                    }
                })
      
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get() 
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => { //array of posts
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
          }

        if(props.following.indexOf(props.route.params.uid) > -1) {
                setFollowing(true); 
        }
        else {
            setFollowing(false); 
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .set({})
    }

    const onUnfollow = () => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
        .delete()
    }

    if (user === null) { 

        return <View/> 
    }


    return (
        <View style={styles.container}>
            
            <View style = {styles.userInfo}>
                <Text> {user.username} </Text>
                <Text> {user.email} </Text>
            <View/>

            {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                <View> 
                    {following ? (
                        <Button 
                            title = "Following"
                            onPress = {() => onUnfollow()}
                            color = '#D2B48C'>
                            
                        </Button>
                    ) : 
                    (
                        <Button 
                            title = "Follow"
                            onPress = {() => onFollow()}
                            color = '#D2B48C'>  
                        </Button>
                    )}
                </View>
            ) : null }

            </View>
            <View style = {styles.containerGallery}>
                <FlatList 
                    numColumns = {3}
                    horizontal = {false}
                    data = {userPosts}
                    renderItem = {({item}) => (
                        <View
                            style = {styles.containerImage}>

                            <Image
                                style = {styles.image2}
                                source = {{uri: item.downloadURL}}
                            />
                        </View>
                    )}
                />

            </View>
      </View>
      
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1 
    }, 

    image2 : {
        flex: 1, 
        aspectRatio: 1/1 
    },
    containerImage: { 
        flex: 1/3 
    },
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
      userInfo: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#90EE90'
      }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})


export default connect(mapStateToProps, null)(Profile);