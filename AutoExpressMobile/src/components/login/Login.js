//toDo :  -- react-native link react-native-gesture-handler when navigation don't work
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

class Login extends Component {
  /*static navigationOptions = {
    title: 'Login / Register',
  };*/

  constructor(props) {
    super(props);
  }

  callRegisterForm() {
    this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'RegisterForm' })
          ]
        }))
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
          <TextInput style={Styles.inputLogin}
           placeholder="Entrer Votre Compte ..."
           returnKeyType="default"
           onSubmitEditing={() => this.passwordInput.focus()}
          />
          <TextInput style={Styles.inputLogin}
           placeholder="Entrer Votre Mot de Passe ..."
           secureTextEntry = {true}
           returnKeyType="default"
           ref={(input) => this.passwordInput = input}
           autoCapitalize="none"
           autoCorrect={false}
          />
          <View style={Styles.buttonViewContainer}>
            <TouchableOpacity style={Styles.buttonLeftContainer}>
              <Text style={Styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.buttonRightContainer} onPress={this.callRegisterForm.bind(this)}>
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
    screen: Login,
  },
  RegisterForm: {
    screen: RegisterForm,
  },
}, {
    initialRouteName: 'Login',
});

export default createAppContainer(RootNavigator);