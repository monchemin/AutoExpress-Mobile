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
} from 'react-native-elements';

class ListRouteSub extends Component {

  render() {

    return (
      <View style={Styles.subContainerOnRow}>
        <View style={Styles.subContainer}>
          <Text style={Styles.titleMove}>{this.props.fromZone.toString()}</Text>
          <Text style={Styles.smallTitleMove}>{this.props.fromStation.toString()}</Text>
          <Text style={Styles.titleMove}>{this.props.toZone.toString()}</Text>
          <Text style={Styles.smallTitleMove}>{this.props.toStation.toString()}</Text>
        </View>
        <View style={Styles.subContainer}>
        </View>
      </View>
	  );
	}
}

export default ListRouteSub;