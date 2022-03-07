import React, {useState, userEffect, useEffect} from 'react'

import {View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native'



import firebase from 'firebase/compat'
require('firebase/firestore')

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUsersData} from '../../redux/actions/index'

 function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {

        function matchUserToComment(comments){

            for (let i = 0; i < comments.length; i++)
            {
                if(comments[i].hasOwnProperty('user'))
                {
                    continue;
                }


                const user = props.users.find(x  => x.uid === comments[i].creator)
                //added an extra comment
                if (user == undefined)
                {
                    props.fetchUsersData(comments[i].creator, false)

                }else {
                    comments[i].user = user;
                }
            }

            setComments(comments);


        }


        if (props.route.params.postId !== postId)
        {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc =>{
                        const data = doc.data();
                        const id = doc.id;
                        return {id, ...data}
                    })
                    matchUserToComment(comments)
                
            })
            setPostId(props.route.params.postId)
        }else {
            matchUserToComment(comments)
        }

    }, [props.route.params.postId, props.users])


const onCommentSend = () => {
    firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .add({
                    creator: firebase.auth().currentUser.uid,
                    text
                }).then((function () {
                    props.navigation.popToTop()
                }))

}

  return (
    <View>
        <FlatList
            numColumns={1}
            horizontal={false}
            data={comments}
            renderItem={({item}) => (
                <View>
                    {item.user !== undefined ? 
                    <Text style= {styles.containerText}>
                        {item.user.username}
                    </Text>
                : null}
                    <Text style = {styles.container}
                    >{item.text}</Text>
                </View>
            )}
        />

        <View>
            <TextInput
                
                placeholder='Comment..'
                onChangeText={(text) => setText(text)} />
                <Button
                    onPress={() => onCommentSend()}
                    title="Send"
                    color={'#D2B48C'}
                />
        </View>

    </View>
  )
}

const styles = StyleSheet.create({

    topBar: {
      paddingTop: 50,
      backgroundColor: '#006700'
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#f4f4f4',
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
      paddingTop: 50,
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
    comments: {
      flex: 1,
      paddingTop: 15,
      marginTop: 4,
      fontWeight: 'bold',
      fontSize: 15,
      backgroundColor: "#fff",
      paddingBottom: 10,
      paddingLeft: 5,
      shadowColor: '#006700'

    },
    container: {
      flex: 1,
      paddingTop: 15,
      marginTop: 10,
      fontWeight: 'bold',
      paddingLeft: 10,
      paddingRight: 10
    },
    containerText: {
      flex: 1,
      paddingTop: 15,
      marginTop: 10,
      fontWeight: 'bold',
      paddingLeft: 10,
      fontSize: 20,
      borderRadius: 10,
    
      backgroundColor: "#fff",

    }

})


const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);