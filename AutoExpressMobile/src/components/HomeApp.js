import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from 'react-native';
import { Icon } from "react-native-elements";

import Styles from '../styles/Styles';

class HomeApp extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
   // console.log('LOl homeApp', this.props.navigation.state.params.userId);
   // console.log('LOl homeApp', this.props.navigation.state);
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
