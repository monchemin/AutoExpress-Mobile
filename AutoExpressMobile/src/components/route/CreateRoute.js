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

class CreateRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isDateTimePickerVisible: false,
      routeDateInput: "",
      routeDateError: "",
      routeNbrPlaceInput: "",
      routeNbrPlaceError: "",
      routePriceInput: "",
      routePriceError: "",
      hourDatas: "",
      hourDatasError: "",
      routeHourError: "",
      routeHourInput: "",
      stageDatas: "",
      stageDatasError: "",
      departureStageInput: "",
      departureStageError: "",
      arrivalStageInput: "",
      arrivalStageError: "", 
    };
  }

  routeRegister () {
    //last validation 
    this.inputControle(this.state.routeDateInput, 'routeDateInput');
    this.inputControle(this.state.routeNbrPlaceInput, 'routeNbrPlaceInput');
    this.inputControle(this.state.routePriceInput, 'routePriceInput');
    this.inputControle(this.state.routeHourInput, 'routeHourInput');
    this.inputControle(this.state.departureStageInput, 'departureStageInput');
    this.inputControle(this.state.arrivalStageInput, 'arrivalStageInput');

    if (this.state.errorInput === 0) {
      var registerData = JSON.stringify({
        routeDate: this.state.routeDateInput,
        routePlace: this.state.routeNbrPlaceInput,
        routePrice: this.state.routePriceInput,
        FK_Hour: this.state.departureStageInput,
        FK_Driver: this.props.navigation.state.params.userId,
        FK_DepartureStage: this.state.departureStageInput,
        FK_ArrivalStage: this.state.arrivalStageInput
      });
      fetch('http://autoexpress.gabways.com/api/route.php', {
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
    var errorInput = 0;
    switch(inputName) {
      
      case 'routeDateInput':
      var routeDateError = '';
        if(!inputValue){
          routeDateError = 'Date requis';
          errorInput = 1;
        }
        this.setState({
            errorInput: errorInput,
            routeDateError: routeDateError,
            routeDateInput: inputValue
          });
        break;

      case 'routeNbrPlaceInput':
      var routeNbrPlaceError = '';
        if(!inputValue){
          errorInput = 1;
          routeNbrPlaceError = 'Nombre de places requis';
        }
        this.setState({
            errorInput: errorInput,
            routeNbrPlaceError: routeNbrPlaceError,
            routeNbrPlaceInput: inputValue
          })
        break;

      case 'routePriceInput':
      var routePriceError = '';
        if(!inputValue){
          errorInput = 1;
          routePriceError = 'Prix requis';
        }
        this.setState({
            errorInput: errorInput,
            routePriceError: routePriceError,
            routePriceInput: inputValue
          });
        break;

      case 'routeHourInput':
      var routeHourError = '';
        if(!inputValue){
          errorInput = 1;
          routeHourError = 'Heure de départ requis';
        }
        this.setState({
            errorInput: errorInput,
            routeHourError: routeHourError,
            routeHourInput: inputValue
          });
        break;

      case 'departureStageInput':
      var departureStageError = '';
        if(!inputValue){
          errorInput = 1;
          departureStageError = 'Lieu de départ requis';
        }
        this.setState({
            errorInput: errorInput,
            departureStageError: departureStageError,
            departureStageInput: inputValue
          });
        break;

      case 'arrivalStageInput':
      var arrivalStageError = '';
        if(!inputValue){
          errorInput = 1;
          arrivalStageError = 'Lieu de départ requis';
        }
        this.setState({
            errorInput: errorInput,
            arrivalStageError: arrivalStageError,
            arrivalStageInput: inputValue
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

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  handleDatePicked = (date) => {
    this.setState({routeDateInput: Moment(date).format('YYYY-MM-DD')});
    this.hideDateTimePicker();
  };

  handleHourPicker = (datas) => {
    hourPicker = [];
    datas.map((item, key) => (
      rObj = {},
      rObj["value"] = item.PK,
      rObj["label"] = item.hour,
      hourPicker.push(rObj)
      ));
    this.setState({hourDatas: hourPicker}); 
  }

  handleStagePicker = (datas) => {
    stagePicker = [];
    datas.map((item, key) => (
      rObj = {},
      rObj["value"] = item.PK,
      rObj["label"] = item.stationName,
      stagePicker.push(rObj)
      ));
    this.setState({stageDatas: stagePicker});
  }

  componentDidMount() {
    fetch('http://autoexpress.gabways.com/api/pickuphour.php', {
        method: 'GET',
        headers: { 
         'Accept': 'application/json', 
         'Content-Type': 'application/json',
        }

        }).then((response) => response.json())
          .then((responseJson) => { 
            this.handleHourPicker(responseJson.response);
          })
          .catch((err) => { this.setState({ hourDatasError: err });})
          .then(
            fetch('http://autoexpress.gabways.com/api/routestation.php', {
            method: 'GET',
            headers: { 
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
            }

            }).then((response) => response.json())
              .then((responseJson) => { 
                this.handleStagePicker(responseJson.response);
                this.setState({ isLoading: false });
              })
              .catch((err) => { this.setState({ stageDatasError: err });})
          );
  }

  render() {
    if (this.state.isLoading) {
     return (
       <View style={Styles.wrapperGame}>
         <ActivityIndicator />
       </View>
     );
   }
   const hourPlaceholder = {
    label: "Selectionner heure de départ...",
   };

   const departureStagePlaceholder = {
    label: "Selectionner lieu de départ...",
   };

   const arrivalStagePlaceholder = {
    label: "Selectionner lieu de d'arrivé...",
   };

	return (
    <KeyboardAvoidingView behavior="padding" style={Styles.container}>
      <View style={Styles.wrapperGame}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.titleMove}></Text>
        </View>

    	  <ScrollView style={Styles.subContainer}>
         <View style={Styles.formContainer}>

           <Text style={Styles.smallTitleMove}>DATE <Text style={Styles.errorTitleRed}>*</Text> </Text>
           <Text style={Styles.errorTitleRed}>{this.state.routeDateError}</Text>
              
              <TextInput style={Styles.inputProfile}
                placeholder="Entrer la date ..."
                editable={true}
                value={this.state.routeDateInput}
                returnKeyType="default"
                onFocus={this.showDateTimePicker}              
              />


            <DateTimePicker
              minimumDate={new Date()}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />

            <Text style={Styles.smallTitleMove}>NOMBRE DE PLACES <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.routeNbrPlaceError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer le nombre de places ..."
              returnKeyType="default"
              keyboardType = 'numeric'
              value={this.state.routeNbrPlaceInput}
              onChangeText={(text) => {
                this.inputControle(text.replace(/[^0-9]/g, ''), 'routeNbrPlaceInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'routeNbrPlaceInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>PRIX <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.routePriceError}</Text>
            <TextInput style={Styles.inputProfile}
              placeholder="Entrer le prix ..."
              returnKeyType="default"
              keyboardType = 'numeric'
              value={this.state.routePriceInput}
              onChangeText={(text) => {
                this.inputControle(text.replace(/[^0-9]/g, ''), 'routePriceInput');
              }}
              onSubmitEditing={(event) => {
                this.inputControle(event.nativeEvent.text, 'routePriceInput');
              }}
            />

            <Text style={Styles.smallTitleMove}>HEURE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.routeHourError}</Text>
            <RNPickerSelect
              placeholder = {hourPlaceholder}
              items={ this.state.hourDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'routeHourInput')
              }}
              style={Styles.inputProfile}
              value={this.state.routeHourInput}
              doneText='OK'
            />
            <Text></Text>
            
            <Text style={Styles.smallTitleMove}>LIEU DEPART <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.departureStageError}</Text>            
            <RNPickerSelect
              placeholder = {departureStagePlaceholder}
              items={ this.state.stageDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'departureStageInput')
              }}
              style={Styles.inputProfile}
              value={this.state.departureStageInput}
              doneText='OK'
            />
            <Text></Text>

            <Text style={Styles.smallTitleMove}>LIEU D'ARRIVÉ <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.arrivalStageError}</Text>
            <RNPickerSelect
              placeholder = {arrivalStagePlaceholder}
              items={ this.state.stageDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'arrivalStageInput')
              }}
              style={Styles.inputProfile}
              value={this.state.arrivalStageInput}
              doneText='OK'
            />
            <Text></Text>

            <View style={Styles.buttonViewContainer}>
              <TouchableOpacity style={Styles.buttonContainer} onPress={this.routeRegister.bind(this)}>
                <Text style={Styles.buttonText}>CREER ROUTE</Text>
              </TouchableOpacity>
            </View>
           </View>
          </ScrollView>
      </View>
    </KeyboardAvoidingView>
	);
	}
}

export default CreateRoute;