import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  AppRegistry
} from 'react-native';
import Styles from '../../styles/Styles';

class Login extends Component {
  /*static navigationOptions = {
    title: 'Login / Register',
  };*/
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
       
       <View style={Styles.logoContainer}>
	        <Image 
            style={Styles.logo}
            source={require('../../images/logo2.jpg')}
          />
          
	     </View>

       <View style={Styles.formContainer}>
          <TextInput style={Styles.inputLogin}
           placeholder=""
           returnKeyType="default"
           onSubmitEditing={() => this.passwordInput.focus()}
          />
          <TextInput style={Styles.inputLogin}
           placeholder=""
           secureTextEntry = {true}
           returnKeyType="default"
           ref={(input) => this.passwordInput = input}
           keyboardType = "email-address"
           autoCapitalize="none"
           autoCorrect={false}
          />
          <View style={Styles.buttonViewContainer}>
            <TouchableOpacity style={Styles.buttonLeftContainer}>
              <Text style={Styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonRightContainer}>
              <Text style={Styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>

       </View>

      </KeyboardAvoidingView>
      
    );
  }
}

export default Login;

AppRegistry.registerComponent('AutoExpressMobile', () => Login);