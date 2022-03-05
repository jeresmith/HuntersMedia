import React, { Component } from 'react'
import { StyleSheet, Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'
import firebase from 'firebase/compat'

import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return (null);
}
import FeedScreen  from './main/Feed'
import ProfileScreen  from './main/Profile'
import SearchScreen  from './main/Search'

import { version } from 'react-dom';
import MapPage from './main/MapPage';


export class Main extends Component {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();

    }
  render() {
      
    return (
        <Tab.Navigator initialRouteName='Feed' labeled = {false}>
            <Tab.Screen key={Date.now()} name="Feed" component = {FeedScreen}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "home" color= {color} size = {26} />
                 ),
             }}/>
             <Tab.Screen name="Search" component = {SearchScreen} navigation = {this.props.navigation}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "search" color= {color} size = {26} />
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
              listeners = {({navigation}) =>({
                tabPress: event =>{
                    event.preventDefault();
                    navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                }})}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "account-circle" color= {color} size = {26} />
                 ),
             }}/>
             <Tab.Screen name="MapPage" component = {MapPage}
             options={{ 
                 tabBarIcon: ({color, size}) =>(
                    <MaterialCommunityIcons name= "map" color= {color} size = {26} />
                 ),
             }}/>
        </Tab.Navigator>
    )
  }
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);