import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from 'react-native';

import { 
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

import Styles from '../styles/Styles';

import HomeSideMenu from './menu/HomeSideMenu';
import stacknav from './menu/stacknav';

class HomeApp extends Component {
  /*static navigationOptions = {
    title: 'Login / Register',
  };*/

  constructor(props) {
    super(props);
  }

  render() {
    return ( 
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
       
       <View style={Styles.logoContainer}>
          <Image 
            style={Styles.logo}
            source={require('../images/logo2.jpg')}
          />
          
       </View>

       <View style={Styles.formContainer}>
          
          <Text> Home App</Text>

       </View>

      </KeyboardAvoidingView>
      
    );
  }
}

const drawernav = createDrawerNavigator({
  Item1: {
      screen: stacknav,
    }
  }, {
    contentComponent: HomeSideMenu,
    drawerWidth: Dimensions.get('window').width - 120,  
});

export default createAppContainer(drawernav);
//export default HomeApp;
