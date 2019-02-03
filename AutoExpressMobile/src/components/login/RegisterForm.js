//toDo : joli message pupUp rouge pour les erreurs et move pour les messages de confirmation
//       afficher conirmation uniquemnet lorsque c'est necesssaire
//       derniere validation du formulaire onSubmit()
//       vider toutes les entrées apres l'ajout
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
      passwordError: "",
      inputError: "",
      responseData: "",
      responseError: ""
    };
  }

  customerRegister () {
    var formData = new FormData();
    formData.append("customerFistName", "Az");
    formData.append("customerLastName", "Az");
    formData.append("customerPhoneNumber", "1233444");
    formData.append("customerEMailAddress", "mab@hh");
    formData.append("customerLogin", "az");
    formData.append("customerPassword", "az");

    var registerData = JSON.stringify({
      customerFistName: this.state.prenomInput,
      customerLastName: this.state.nomInput,
      customerPhoneNumber: this.state.telephoneInput,
      customerEMailAddress: this.state.emailInput,
      customerLogin: this.state.compteInput,
      customerPassword: this.state.passwordInput
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

      })
      .catch((err) => { this.setState({ responseError: err }); });

        
    alert ("Message de confirmation");

  }

  inputControle(inputValue, inputName){
    switch(inputName) {
      case 'prenomInput':
        if(!inputValue){
          this.setState({
            errorInput: 'error',
            prenomError: 'Prenom requis',
          })
        }
        else {
          this.setState({
            errorInput: '',
            prenomError: '',
            prenomInput: inputValue
          })
        } 
        break;
      case 'nomInput':
        if(!inputValue){
          this.setState({
            errorInput: 'error',
            nomError: 'Prenom requis',
          })
        }
        else {
          this.setState({
            errorInput: '',
            nomError: '',
            nomInput: inputValue
          })
        } 
        break;
      case 'telephoneInput':
        if(!inputValue){
          this.setState({
            errorInput: 'error',
            telephoneError: 'Telephone requis',
          })
        }
        else {
          this.setState({
            errorInput: '',
            telephoneError: '',
            telephoneInput: inputValue
          })
        } 
        break;
      case 'emailInput':
        if(!inputValue || inputValue.includes("@")){
          this.setState({
            errorInput: 'error',
            emailError: 'Email requis ou incorrect',
          })
        }
        else {
          this.setState({
            errorInput: '',
            emailError: '',
            emailInput: inputValue
          })
        } 
        break;
      case 'compteInput':
        if(!inputValue){
          this.setState({
            errorInput: 'error',
            compteError: 'Compte requis',
          })
        }
        else {
          this.setState({
            errorInput: '',
            compteError: '',
            compteInput: inputValue
          })
        } 
        break;
      case 'passwordInput':
        if(!inputValue){
          this.setState({
            errorInput: 'error',
            passwordError: 'Mot de passe requis',
          })
        }
        else {
          this.setState({
            errorInput: '',
            passwordError: '',
            passwordInput: inputValue
          })
        } 
        break;
      case 'password2Input':
        if(!inputValue || inputValue != this.state.passwordInput){
          this.setState({
            errorInput: 'error',
            passwordError: 'Erreur confirmation mot de passe',
          })
        }
        else {
          this.setState({
            errorInput: '',
            passwordError: ''
          })
        } 
        break;
    } 
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
              onChangeText={(text) => {
                this.inputControle(text, 'nomInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'nomInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>NUMÉRO DE TELEPHONE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer votre numéro de télephone ..."
              returnKeyType="default"
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
              onChangeText={(text) => {
                this.inputControle(text, 'password2Input');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'password2Input');
              }}
            />

            <Text style={Styles.errorTitleRed}>{this.state.prenomInput}</Text>
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

AppRegistry.registerComponent('AutoExpressMobile', () => RegisterForm);