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

  constructor(props) {
    super(props);
    this.state = {
      nomInput: "",
      nomError: "",
      prenomInput: "",
      prenomError: "",
      telephoneInput: "",
      telephoneError: "",
      emailInput: "",
      emailError: "",
      compteInput: "",
      compteError: "",
      passwordInput: "",
      password2Input: "",
      passwordError: "",
      inputError: "",
      responseData: "",
      responseError: ""
    };
  }

  customerRegister () {
    //last validation 
    this.inputControle(this.state.prenomInput, 'prenomInput');
    this.inputControle(this.state.nomInput, 'nomInput');
    this.inputControle(this.state.telephoneInput, 'telephoneInput');
    this.inputControle(this.state.emailInput, 'emailInput');
    this.inputControle(this.state.compteInput, 'compteInput');
    this.inputControle(this.state.passwordInput, 'passwordInput');
    this.inputControle(this.state.password2Input, 'password2Input');

    if (this.state.errorInput === 0) {
      var registerData = JSON.stringify({
        customerFistName: this.state.prenomInput,
        customerLastName: this.state.nomInput,
        customerPhoneNumber: this.state.telephoneInput,
        customerEMailAddress: this.state.emailInput,
        customerLogin: this.state.compteInput,
        customerPassword: this.state.passwordInput
      });

      /*var registerData = JSON.stringify({
        customerFistName: 'De',
        customerLastName: 'De',
        customerPhoneNumber: '5544778',
        customerEMailAddress: 'De',
        customerLogin: 'de',
        customerPassword: 'de'
      });*/

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
          if (responseJson.errorMessage) {
           alert (responseJson.errorMessage);
          }
          else {
            alert ("Message de confirmation");
            this.resetAllInput();
          }
        })
        .catch((err) => { this.setState({ responseError: err });});

    }
  }

  inputControle(inputValue, inputName){
    var errorInput = '0';
    switch(inputName) {
      
      case 'prenomInput':
      var prenomError = '';
        if(!inputValue){
          prenomError = 'Prenom requis';
          errorInput = '1';
        }
        this.setState({
            errorInput: errorInput,
            prenomError: prenomError,
            prenomInput: inputValue
          });
        break;

      case 'nomInput':
      var nomError = '';
        if(!inputValue){
          errorInput = '1';
          nomError = 'Prenom requis';
        }
        this.setState({
            errorInput: errorInput,
            nomError: nomError,
            nomInput: inputValue
          })
        break;

      case 'telephoneInput':
      var telephoneError = '';
        if(!inputValue){
          errorInput = '1';
          telephoneError = 'Telephone requis';
        }
        this.setState({
            errorInput: errorInput,
            telephoneError: telephoneError,
            telephoneInput: inputValue
          });
        break;

      case 'emailInput':
      var emailError = '';
        if(!inputValue || !inputValue.includes("@")) {
          emailError = 'Email requis ou incorrect';
          inputError = '1';
          this.setState({
            errorInput: 'error',
            emailError: 'Email requis ',
          })
        }
        this.setState({
            errorInput: errorInput,
            emailError: emailError,
            emailInput: inputValue
          });
        break;

      case 'compteInput':
      var compteError = '';
        if(!inputValue){
          errorInput = '1';
          compteError = 'Compte requis';
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
          errorInput = '1';
          passwordError = 'Mot de passe requis';
        }
        this.setState({
            errorInput: errorInput,
            passwordError: passwordError,
            passwordInput: inputValue
          })
        break;

      case 'password2Input':
      var passwordError = '';
        if(!inputValue || inputValue != this.state.passwordInput){
          errorInput = '1';
          passwordError = 'Erreur confirmation mot de passe';
        }
        else {
          passwordError = '';
        } 
        this.setState({
            errorInput: errorInput,
            passwordError: passwordError,
            password2Input: inputValue
          })
        break;
        
    } 
  }

  resetAllInput() {
    this.state = {
      nomInput: "",
      prenomInput: "",
      telephoneInput: "",
      emailInput: "",
      compteInput: "",
      passwordInput: "",
      password2Input: ""
    };
  }

  render() {
	return (
    <KeyboardAvoidingView behavior="padding" style={Styles.container}>
      <View style={Styles.wrapperGame}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.titleMove}></Text>
        </View>

    	  <ScrollView style={Styles.subContainer}>
         <View style={Styles.formContainer}>

           <Text style={Styles.smallTitleMove}>PRÉNOM <Text style={Styles.errorTitleRed}>*</Text> </Text>
           <Text style={Styles.errorTitleRed}>{this.state.prenomError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre Prénom ..."
              returnKeyType="default"
              value={this.state.prenomInput}
              onChangeText={(text) => {
                this.inputControle(text, 'prenomInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'prenomInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>NOM <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.nomError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre Nom ..."
              returnKeyType="default"
              value={this.state.nomInput}
              onChangeText={(text) => {
                this.inputControle(text, 'nomInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'nomInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>NUMÉRO DE TELEPHONE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.telephoneError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre numéro de télephone ..."
              returnKeyType="default"
              value={this.state.telephoneInput}
              onChangeText={(text) => {
                this.inputControle(text, 'telephoneInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'telephoneInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>E-MAIL <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.emailError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre E-Mail ..."
              returnKeyType="default"
              value={this.state.emailInput}
              keyboardType = "email-address"
              onChangeText={(text) => {
                this.inputControle(text, 'emailInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'emailInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>COMPTE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.compteError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre compte ..."
              returnKeyType="default"
              value={this.state.compteInput}
              onChangeText={(text) => {
                this.inputControle(text, 'compteInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'compteInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>MOT DE PASSE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.passwordError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre mot de passe ..."
              returnKeyType="default"à
              secureTextEntry = {true}
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

            <TextInput style={Styles.inputProfile}
              placeholder="Confirmer votre mot de passe ..."
              returnKeyType="default"
              secureTextEntry = {true}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.password2Input}
              onChangeText={(text) => {
                this.inputControle(text, 'password2Input');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'password2Input');
              }}
            />

            <View style={Styles.buttonViewContainer}>
              <TouchableOpacity style={Styles.buttonContainer} onPress={this.customerRegister.bind(this)}>
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