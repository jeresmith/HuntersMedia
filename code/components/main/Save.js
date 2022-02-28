
//save image post

import React, {useState} from 'react'
import { View, TextInput, Image, Button} from 'react-native';

//firebase
//import firebase from 'firebase';
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import firebase from 'firebase/compat';
require("firebase/firestore")
//require("firebase/firebase-storage")


export default function Save(props) 
{
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random.toString(36)}`;
        console.log(childPath)

        const reponse = await fetch(uri);//fetch image and get data form image
        //create blob of uri 
        //pass along to firestore 
        //and then upload image 
        const blob = await reponse.blob();

        const task = firebase
            .storage()
            .ref
            .child(childPath)
            .put(blob);//tells firebase with file it is and start the upload process

        
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompeleted = ()  => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        //actives task on state change using above task functions
        task.on("state_changed", taskProgress, taskError, taskCompeleted);
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then((function () {
                props.navigation.popToTop()
            }))
    }
        
  return (
    <View style={{flex: 1}}>
        <Image source={{uri: props.route.params.image}}/>
        <TextInput
            placeholder="Write a Caption. . ."
            onChangeText={(caption) => setCaption(caption)}
        />

        <Button title="Save" onPress={() => uploadImage()}/>
    </View>
  )
}
