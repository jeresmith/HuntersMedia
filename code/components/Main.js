import React, { Component } from 'react'
import { StyleSheet, Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'

import { fetchUser } from '../redux/actions/index';



import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return (null);
}
import FeedScreen  from './main/Feed'
import ProfileScreen  from './main/Profile'

import { version } from 'react-dom';


export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();

    }
  render() {
      
    return (
        <Tab.Navigator initialRouteName='Feed' labeled = {false}>
            <Tab.Screen name="Feed" component = {FeedScreen}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "home" color= {color} size = {26} />
                 ),
             }}/>
             <Tab.Screen name="AddContainer" component = {EmptyScreen}
             listeners = {({navigation}) =>({
                tabPress: event =>{
                    event.preventDefault();
                    navigation.navigate("Add")
                }
             })}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "add-circle-outline" color= {color} size = {26} />
                 ),
             }}/>
             <Tab.Screen name="Profile" component = {ProfileScreen}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "account-circle" color= {color} size = {26} />
                 ),
             }}/>
        </Tab.Navigator>
    )
  }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);



export default connect(mapStateToProps, mapDispatchProps)(Main);