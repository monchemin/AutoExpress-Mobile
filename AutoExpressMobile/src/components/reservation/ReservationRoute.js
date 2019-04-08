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

import ListRouteSub from './ListRouteSub';

import SearchRoute from './SearchRoute'

import { 
  List, 
  ListItem,
  Icon,
} from 'react-native-elements';

import { 
  TabNavigator,
  createStackNavigator,
  createAppContainer,
  StackActions, 
  NavigationActions
} from 'react-navigation';

class ReservationRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nbrPlaceError: "",
      nbrPlaceInput: "",
      nbrPlaceDatas: "",
    };
  }

  inputControle(inputValue, inputName){
    var errorInput = 0;
    switch(inputName) {
      
      case 'nbrPlaceInput':
      var nbrPlaceError = '';
        if(!inputValue){
          nbrPlaceError = 'Nombre de place requis';
          errorInput = 1;
        }
        this.setState({
            errorInput: errorInput,
            nbrPlaceError: nbrPlaceError,
            nbrPlaceInput: inputValue
          });
        break;

    } 
  }

  routeReservation () {
    //last validation 
    this.inputControle(this.state.nbrPlaceInput, 'nbrPlaceInput');

    if (this.state.errorInput === 0) {
      var registerData = JSON.stringify({
        reservationDate: Moment(new Date()).format('YYYY-MM-DD'),
        FK_Route: this.props.navigation.state.params.confirmRouteId,
        FK_Customer: this.props.navigation.state.params.customerId,
        place: this.state.nbrPlaceInput
      });
      
      fetch('http://autoexpress.gabways.com/api/reservation.php', {
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
            console.log(responseJson)
           alert (responseJson.errorMessage);
          }
          else {
            alert ("Message de confirmation");
          }
        })
        .catch((err) => { this.setState({ responseError: err });});

    } 
  } 

  callForm(form, confirmDateHour, confirmFromZone, confrimfromStation, confirmToZone, confrimToStation, confrimPrice, confrimRemaningPlace) {
    this.props.navigation.navigate(form, 
      {
        confirmDateHour: confirmDateHour, 
        confirmFromZone: confirmFromZone, 
        confrimfromStation : confrimfromStation,
        confirmToZone: confirmToZone,
        confrimToStation: confrimToStation,
        confrimPrice: confrimPrice,
        confrimRemaningPlace: confrimRemaningPlace
      })
  }

  componentDidMount() {
    this.handleNbrPlacePicker()
  }

  handleNbrPlacePicker = () => {
     let placeArray = []
    for (i=1; i<= parseInt(this.props.navigation.state.params.confrimRemaningPlace, 10); i++) {
      placeArray.push(i)
    }

    nbrPlacePicker = [];
    placeArray.map((item, key) => (
      rObj = {},
      rObj["value"] = item.toString(),
      rObj["label"] = item+' Place'+(item > 1 ? 's' : ''),
      nbrPlacePicker.push(rObj)
      ));
    this.setState({nbrPlaceDatas: nbrPlacePicker});

  }


  render() {

    let placeArray = []
    for (i=1; i<= parseInt(this.props.navigation.state.params.confrimRemaningPlace, 10); i++) {
      placeArray.push(i)
    }

    let remaningPalceIcone = placeArray.map((item, key) => ( 
        <Icon
          name='weekend' 
          color='#8e44ad'
        />
      ))

    const nbrPlacePlaceholder = {
      label: "Selectionner le nombre de place...",
    };

    return (
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
      <View style={Styles.wrapperGame}>
        <View style={Styles.titleContainer}>
          <View style={Styles.subContainerOnRow}>
            <View style={Styles.subContainer}>
              <Text style={Styles.titleMove}>{this.props.navigation.state.params.confirmDateHour}</Text>
            </View>
            <View style={Styles.subContainer}>
              <Text style={Styles.titleMove}>{this.props.navigation.state.params.confrimPrice+' F CFA'}</Text>
              <View style={Styles.subContainerOnRow}>
                {remaningPalceIcone}
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={Styles.subContainer}>
          <View style={Styles.subContainer}>
            <Text style={Styles.titleMove}>{this.props.navigation.state.params.confirmFromZone.toString()}</Text>
            <Text>{this.props.navigation.state.params.confrimfromStation.toString()}</Text>
            <Text style={Styles.titleMove}>{this.props.navigation.state.params.confirmToZone.toString()}</Text>
            <Text>{this.props.navigation.state.params.confrimToStation.toString()}</Text>
            <Text></Text>
          </View>

          <Text style={Styles.smallTitleMove}> NOMBRE DE PLACE <Text style={Styles.errorTitleRed}>*</Text> </Text>
            <Text style={Styles.errorTitleRed}>{this.state.nbrPlaceError}</Text>
            <RNPickerSelect
              placeholder = {nbrPlacePlaceholder}
              items={ this.state.nbrPlaceDatas}
              onValueChange={(value) => {
                  this.inputControle(value, 'nbrPlaceInput')
              }}
              style={Styles.inputProfile}
              value={this.state.nbrPlaceInput}
              doneText='OK'
            />
            <Text></Text>

            <View style={Styles.buttonViewContainer}>
              <TouchableOpacity style={Styles.buttonContainer} onPress={this.routeReservation.bind(this)}>
                <Text style={Styles.buttonText}>RESERVER</Text>
              </TouchableOpacity>
            </View>


        </ScrollView>

      </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ReservationRoute;