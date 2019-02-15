import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import Styles from '../styles/Styles';

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


export default HomeApp;
