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
  Picker,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

import Styles from '../../styles/Styles';

import DateTimePicker from 'react-native-modal-datetime-picker';

import Moment from 'moment';

import RNPickerSelect from 'react-native-picker-select';

import SearchableDropdown from 'react-native-searchable-dropdown';

class Driver extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      drivingPermitInput: "",
      drivingPermitError: "",
      driverPhoneInput: "",
      driverPhoneError: "", 
      carBrandInput: "",
      carBrandError: "",
      carBrandDatas: "",
      carBrandDatasError: "",
      carModeleInput: "",
      carModeleError: "",
      modeleByBrandDatas: "",
      modeleDatas: "",
      modeleDatasError: "",
      modelYearInput: "",
      modelYearError: "",
      modelYearDatas: "",
      carColorInput: "",
      carColorError: "",
      carColorDatas: "",
      carColorDatasError: "",
    };
  }

  driverRegister () {
    //last validation  
    this.inputControle(this.state.drivingPermitInput, 'drivingPermitInput');
    this.inputControle(this.state.driverPhoneInput, 'driverPhoneInput');
    this.inputControle(this.state.carModeleInput, 'carModeleInput');
    this.inputControle(this.state.modelYearInput, 'modelYearInput');
    this.inputControle(this.state.carColorInput, 'carColorInput');

    if (this.state.errorInput === 0) {
      var registerData = JSON.stringify({
        drivingPermitNumber: this.state.drivingPermitInput,
        carRegistrationNumber: this.state.driverPhoneInput,
        carYear: this.state.modelYearInput,
        FK_carmodel: this.state.carModeleInput,
        PK: this.props.navigation.state.params.userId,
        FK_carcolor: this.state.carColorInput,
        driverDateCreate: Moment(Date.now()).format('YYYY-MM-DD')
      });
      fetch('http://autoexpress.gabways.com/api/driver.php', {
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
            //this.resetAllInput();
          }
        })
        .catch((err) => { this.setState({ responseError: err });});

    }
  } 

  inputControle(inputValue, inputName){
    var errorInput = 0;
    switch(inputName) {
      
      case 'drivingPermitInput':
      var drivingPermitError = '';
        if(!inputValue){
          drivingPermitError = 'N° de permis de conduire requis';
          errorInput = 1;
        }
        this.setState({
            errorInput: errorInput,
            drivingPermitError: drivingPermitError,
            drivingPermitInput: inputValue
          });
        break;

      case 'driverPhoneInput':
      var driverPhoneError = '';
        if(!inputValue){
          errorInput = 1;
          driverPhoneError = 'N° plaque de vehicule requis';
        }
        this.setState({
            errorInput: errorInput,
            driverPhoneError: driverPhoneError,
            driverPhoneInput: inputValue
          })
        break;

      case 'carBrandInput':
      var carBrandError = '';
        if(!inputValue){
          errorInput = 1;
          carBrandError = 'Marque du véhicule requis';
        }
        this.setState({
            errorInput: errorInput,
            carBrandError: carBrandError,
            carBrandInput: inputValue
          });
        break;

      case 'carModeleInput':
      var carModeleError = '';
        if(!inputValue){
          errorInput = 1;
          carModeleError = 'Modèle de véhicule requis';
        }
        this.setState({
            errorInput: errorInput,
            carModeleError: carModeleError,
            carModeleInput: inputValue
          });
        break;

      case 'modelYearInput':
      var modelYearError = '';
        if(!inputValue){
          errorInput = 1;
          modelYearError = 'Année de modèle de véhicule requis';
        }
        this.setState({
            errorInput: errorInput,
            modelYearError: modelYearError,
            modelYearInput: inputValue
          });
        break; 

      case 'carColorInput':
      var carColorError = '';
        if(!inputValue){
          errorInput = 1;
          carColorError = 'Couleur de véhicule requis';
        }
        this.setState({
            errorInput: errorInput,
            carColorError: carColorError,
            carColorInput: inputValue
          });
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

  handleBrandPicker = (datas) => {
    brandPicker = [];
    datas.map((item, key) => (
      rObj = {},
      rObj["value"] = item.PK,
      rObj["label"] = item.brandName,
      brandPicker.push(rObj)
      ));
    this.setState({carBrandDatas: brandPicker}); 
  }

  handleModeleByBrandPicker = (brandValue) => {
    modelePicker = [];
    this.state.modeleDatas.filter(function (item) {
      return item.FK_brand === brandValue;
    }).map((item, key) => (
      rObj = {},
      rObj["value"] = item.PK,
      rObj["label"] = item.modelName,
      modelePicker.push(rObj)
      ));
    if (modelePicker.length > 0) {
      this.setState({modeleByBrandDatas: modelePicker});
    }
  }

  handleModelePicker = (datas) => {
    modelePicker = [];
    datas.map((item, key) => (
      rObj = {},
      rObj["value"] = item.PK,
      rObj["label"] = item.modelName,
      modelePicker.push(rObj)
      ));
    this.setState({modeleByBrandDatas: modelePicker});
  }

  handleYearPicker = () => {
    yearPicker = [];
    maximumYear = new Date().getFullYear();
    for (i = maximumYear; i >= maximumYear - 20 ; i--) {
      rObj = {}
      rObj["value"] = ''.concat(i)
      rObj["label"] = ''.concat(i)
      yearPicker.push(rObj)
    }
    this.setState({modelYearDatas: yearPicker});   
  }

  handleColorPicker = (datas) => {
    colorPicker = [];
    datas.map((item, key) => (
      rObj = {},
      rObj["value"] = item.PK,
      rObj["label"] = item.colorName,
      colorPicker.push(rObj)
      ));
    this.setState({carColorDatas: colorPicker}); 
  }

  componentDidMount() {
    fetch('http://autoexpress.gabways.com/api/carbrand.php', {
        method: 'GET',
        headers: { 
         'Accept': 'application/json', 
         'Content-Type': 'application/json',
        }

        }).then((response) => response.json())
          .then((responseJson) => { 
            this.handleBrandPicker(responseJson.response);
          })
          .catch((err) => { this.setState({ carBrandDatasError: err });})
          .then(
            fetch('http://autoexpress.gabways.com/api/carColor.php', {
            method: 'GET',
            headers: { 
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
            }

            }).then((response) => response.json())
              .then((responseJson) => { 
                this.handleColorPicker(responseJson.response);
              })
              .catch((err) => { this.setState({ carColorDatasError: err });}))
          .then(
            fetch('http://autoexpress.gabways.com/api/carModel.php', {
            method: 'GET',
            headers: { 
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
            }

            }).then((response) => response.json())
              .then((responseJson) => { 
                this.setState({ modeleDatas: responseJson.response, isLoading: false });
                this.handleModelePicker(responseJson.response);
              })
              .catch((err) => { this.setState({ modeleDatasError: err }); })
          );
          this.handleYearPicker();
  }

  render() {
    if (this.state.isLoading) {
     return (
       <View style={Styles.wrapperGame}>
         <ActivityIndicator />
       </View>
     );
   }
   const brandPlaceholder = {
    label: "Selectionner la marque du véhicule...",
   };

   const modelePlaceholder = {
    label: "Selectionner le modèle...",
   };

   const colorPlaceholder = {
    label: "Selectionner la couleur...",
   };

	return (
    <KeyboardAvoidingView behavior="padding" style={Styles.container}>
      <View style={Styles.wrapperGame}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.titleMove}></Text>
        </View>

    	  <ScrollView style={Styles.subContainer}>
         <View style={Styles.formContainer}>

           <Text style={Styles.smallTitleMove}>N° PERMIS DE CONDUIRE <Text style={Styles.errorTitleRed}>*</Text> </Text>
           <Text style={Styles.errorTitleRed}>{this.state.drivingPermitError}</Text>
              
              <TextInput style={Styles.inputProfile}
                placeholder="Entrer le numéro de permis de conduire ..."
                editable={true}
                value={this.state.drivingPermitInput}
                returnKeyType="default"
                onChangeText={(text) => {
                this.inputControle(text, 'drivingPermitInput');
                }}
                onSubmitEditing={(event) => {
                  this.inputControle(event.nativeEvent.text, 'drivingPermitInput');
                }}              
              />

            <Text style={Styles.smallTitleMove}>N° PLAQUE DU VEHICULE<Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.driverPhoneError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer N° de la plaque du véhicule ..."
              returnKeyType="default"
              keyboardType = 'default'
              value={this.state.driverPhoneInput}
              onChangeText={(text) => {
                this.inputControle(text, 'driverPhoneInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'driverPhoneInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>MARQUE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.carBrandError}</Text>
            <RNPickerSelect
              placeholder = {brandPlaceholder}
              items={ this.state.carBrandDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'carBrandInput')
                  this.handleModeleByBrandPicker(value)
              }}
              style={Styles.inputProfile}
              value={this.state.carBrandInput}
              doneText='OK'
            />
            <Text></Text>
            
            <Text style={Styles.smallTitleMove}>MODÈLE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.carModeleError}</Text>            
            <RNPickerSelect
              placeholder = {modelePlaceholder}
              items={ this.state.modeleByBrandDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'carModeleInput')
              }}
              style={Styles.inputProfile}
              value={this.state.carModeleInput}
              doneText='OK'
            />
            <Text></Text>

            <Text style={Styles.smallTitleMove}>ANNÉE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.modelYearError}</Text>
            <RNPickerSelect
              placeholder = {modelePlaceholder}
              items={ this.state.modelYearDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'modelYearInput')
              }}
              style={Styles.inputProfile}
              value={this.state.modelYearInput}
              doneText='OK'
            />
            <Text></Text>

            <Text style={Styles.smallTitleMove}>COULEUR <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.carColorError}</Text>
            <RNPickerSelect
              placeholder = {colorPlaceholder}
              items={ this.state.carColorDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'carColorInput')
              }}
              style={Styles.inputProfile}
              value={this.state.carColorInput}
              doneText='OK'
            />
            <Text></Text>
            
            <View style={Styles.buttonViewContainer}>
              <TouchableOpacity style={Styles.buttonContainer} onPress={this.driverRegister.bind(this)}>
                <Text style={Styles.buttonText}>DEVENIR CONDUCTEUR</Text>
              </TouchableOpacity>
            </View>
           </View>
          </ScrollView>
      </View>
    </KeyboardAvoidingView>
	);
	}
}

export default Driver;