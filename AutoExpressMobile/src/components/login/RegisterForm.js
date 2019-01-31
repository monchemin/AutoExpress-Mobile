//toDo : call API
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Styles from '../../styles/Styles';

class RegisterForm extends Component {
  render() {
	return (
    <KeyboardAvoidingView behavior="padding" style={Styles.container}>
      <View style={Styles.wrapperGame}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.titleMove}></Text>
        </View>

    	  <ScrollView style={Styles.subContainer}>
         <View style={Styles.formContainer}>
           <Text style={Styles.smallTitleMove}>PRÉNOM</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre Prénom ..."
              returnKeyType="default"
              onSubmitEditing={() => this.nomInput.focus()}
            />
            <Text style={Styles.smallTitleMove}>NOM</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre Nom ..."
              returnKeyType="default"
              onSubmitEditing={() => this.telephoneInput.focus()}
              ref={(input) => this.nomInput = input}
            />
            <Text style={Styles.smallTitleMove}>NUMÉRO DE TELEPHONE</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre numéro de télephone ..."
              returnKeyType="default"
              onSubmitEditing={() => this.emailInput.focus()}
              ref={(input) => this.telephoneInput = input}
            />
            <Text style={Styles.smallTitleMove}>E-MAIL</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre E-Mail ..."
              returnKeyType="default"
              keyboardType = "email-address"
              onSubmitEditing={() => this.compteInput.focus()}
              ref={(input) => this.emailInput = input}
            />
            <Text style={Styles.smallTitleMove}>COMPTE</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre compte ..."
              returnKeyType="default"
              onSubmitEditing={() => this.passwordInput.focus()}
              ref={(input) => this.compteInput = input}
            />
            <Text style={Styles.smallTitleMove}>MOT DE PASSE</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre mot de passe ..."
              returnKeyType="default"
              onSubmitEditing={() => this.password2Input.focus()}
              ref={(input) => this.passwordInput = input}
            />
            <TextInput style={Styles.inputProfile}
              placeholder="Confirmer votre mot de passe ..."
              returnKeyType="default"
              ref={(input) => this.password2Input = input}
            />
            <View style={Styles.buttonViewContainer}>
              <TouchableOpacity style={Styles.buttonContainer}>
                <Text style={Styles.buttonText}>CREER COMPTE</Text>
              </TouchableOpacity>
            </View>
           </View>
          </ScrollView>
      </View>
    </KeyboardAvoidingView>
	);
	}
}

export default RegisterForm;

AppRegistry.registerComponent('AutoExpressMobile', () => RegisterForm);