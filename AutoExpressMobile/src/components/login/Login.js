//toDo :  -- react-native link react-native-gesture-handler when navigation don't work
//JSON data and send it to API
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
  TouchableHighlight
} from 'react-native';
import { 
  TabNavigator,
  createStackNavigator,
  createAppContainer,
  StackActions, 
  NavigationActions
} from 'react-navigation';
import Styles from '../../styles/Styles';
import RegisterForm from './RegisterForm';
import HomeApp from '../HomeApp';

class Login extends Component {
  /*static navigationOptions = {
    title: 'Login / Register',
  };*/

  constructor(props) {
    super(props);
    this.state = {
      compteInput: "",
      compteError: "",
      passwordInput: "",
      passwordError: "",
      inputError: "",
      responseData: "",
      responseError: ""
    };
  }

  callForm(form) {
    this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: form })
          ]
        }))
  }

  authenticationCheck() {
    //last validation 
    this.inputControle(this.state.compteInput, 'compteInput');
    this.inputControle(this.state.passwordInput, 'passwordInput');

    if (this.state.errorInput === 0) {
      var registerData = JSON.stringify({
        checkLogin: this.state.compteInput,
        //customerPassword: this.state.passwordInput
      });
      fetch('http://autoexpress.gabways.com/api/customer.php', {
        method: 'POST',
        headers: { 
         'Accept': 'application/json', 
         'Content-Type': 'application/json',
        },
        body: registerData

        }).then((response) => response.json())
          .then((responseJson) => { 
            this.setState({ responseData: responseJson });
            if (responseJson.loginExists) {
              this.callForm('HomeApp');
            }
            else { 
              alert ("Compte ou mot de passe incorrect");
            }
          })
          .catch((err) => { this.setState({ responseError: err });});
      }
  }

    inputControle(inputValue, inputName){
    var errorInput = 0;
    switch(inputName) {
      
      case 'compteInput':
      var compteError = '';
        if(!inputValue){
          compteError = 'Compte requis';
          errorInput = 1;
        }
        this.setState({
            errorInput: errorInput,
            compteError: compteError,
            compteInput: inputValue
          });
        break;

      case 'passwordInput':
      var passwordError = '';
        if(!inputValue){
          errorInput = 1;
          passwordError = 'Mot de passe requis';
        }
        this.setState({
            errorInput: errorInput,
            passwordError: passwordError,
            passwordInput: inputValue
          })
        break;
    } 
  }

  render() {
    return ( 
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
       
       <View style={Styles.logoContainer}>
	        <Image 
            style={Styles.logo}
            source={require('../../images/logo2.jpg')}
          />
          
	     </View>

       <View style={Styles.formContainer}>
          <Text style={Styles.errorTitleRed}>{this.state.compteError}</Text>
          <TextInput style={Styles.inputLogin}
          placeholder="Entrer Votre Compte ..."
          returnKeyType="default"
          autoCapitalize="none"
          value={this.state.compteInput}
          onChangeText={(text) => {
            this.inputControle(text, 'compteInput');
          }}
          onSubmitEditing={(event) => {
            this.inputControle(event.nativeEvent.text, 'compteInput');
          }}
         />
          <Text style={Styles.errorTitleRed}>{this.state.passwordError}</Text>
          <TextInput style={Styles.inputLogin}
           placeholder="Entrer Votre Mot de Passe ..."
           secureTextEntry = {true}
           returnKeyType="default"
           autoCapitalize="none"
           autoCorrect={false}
           value={this.state.passwordInput}
           onChangeText={(text) => {
            this.inputControle(text, 'passwordInput');
           }}
           onSubmitEditing={(event) => {
            this.inputControle(event.nativeEvent.text, 'passwordInput');
           }}
          />
          <View style={Styles.buttonViewContainer}>
            <TouchableOpacity style={Styles.buttonLeftContainer} onPress={this.authenticationCheck.bind(this)}>
              <Text style={Styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonRightContainer} onPress={this.callForm.bind(this,'RegisterForm')}>
              <Text style={Styles.buttonText}>S'ENREGISTRER</Text>
            </TouchableOpacity>
          </View>

       </View>

      </KeyboardAvoidingView>
      
    );
  }
}

const RootNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  RegisterForm: {
    screen: RegisterForm
  },
  HomeApp: {
    screen: HomeApp
  },
}, 
{
  initialRouteName: 'Login'
});

export default createAppContainer(RootNavigator);