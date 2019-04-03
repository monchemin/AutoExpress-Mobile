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

import Moment from 'moment';

import { 
  List, 
  ListItem,
  Icon,
} from 'react-native-elements';

class ListRouteSub extends Component {

  render() {
    let placeArray = []
    for (i=1; i<= parseInt(this.props.remaningPlace, 10); i++) {
      placeArray.push(i)
    }
    let remaningPalceIcone = placeArray.map((item, key) => ( 
        <Icon
          name='weekend' 
          color='#8e44ad'
        />
      ))

    return (
      <View style={Styles.subContainerOnRow}>
        <View style={Styles.subContainer}>
          <Text style={Styles.titleMove}>{this.props.fromZone.toString()}</Text>
          <Text>{this.props.fromStation.toString()}</Text>
          <Text style={Styles.titleMove}>{this.props.toZone.toString()}</Text>
          <Text>{this.props.toStation.toString()}</Text>
        </View>
        <View style={Styles.subContainer}>
        <Text style={Styles.smallTitleMove}>{this.props.routePrice+' F CFA'}</Text>
        <View style={Styles.subContainerOnRow}>
          {remaningPalceIcone}
        </View>
        </View>
      </View>
    );
	}
}

export default ListRouteSub;