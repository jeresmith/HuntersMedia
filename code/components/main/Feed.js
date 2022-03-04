import React from 'react'

import {View, Text, Button, ScrollView, Image, StyleSheet} from 'react-native';



export default function Feed() {
    return (
      <ScrollView>
         <View style={styles.topBar}></View>
        <View style = {styles.row}>
          <Image
          style = {styles.image}
          source={require("../../assets/adaptive-icon.png")}>
          </Image>
          <View style={{paddingTop: 20, paddingRight: 10, paddingLeft: 200}}>
            <Button
            onPress={() => this.logOut()}
            title = "Log Out"
            style = {styles.button}
            color = '#D2B48C'
            />
          </View>
        </View>
        <View style={{paddingTop: 50}}></View>
        <View style={styles.post}>
          <Text>Posts go here.</Text>
        </View> 
      </ScrollView>
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
    }
})
