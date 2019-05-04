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

import ReservationRoute from './ReservationRoute'

import { 
  List, 
  ListItem,
} from 'react-native-elements';

import { 
  TabNavigator,
  createStackNavigator,
  createAppContainer,
  StackActions, 
  NavigationActions
} from 'react-navigation';

class ListRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      routeDatas: [],
      routeDatasError: "",
    };
  }

  callForm(form, confirmDateHour, confirmFromZone, confrimfromStation, confirmToZone, confrimToStation, confrimPrice, confrimRemaningPlace, confirmRouteId) {
   // console.log('LOl listRoute', this.props);
    this.props.navigation.navigate(form, 
      {
        confirmDateHour: confirmDateHour, 
        confirmFromZone: confirmFromZone, 
        confrimfromStation : confrimfromStation,
        confirmToZone: confirmToZone,
        confrimToStation: confrimToStation,
        confrimPrice: confrimPrice,
        confrimRemaningPlace: confrimRemaningPlace,
        confirmRouteId: confirmRouteId,
        customerId : this.props.screenProps.navigation.state.params.userId
      })
  }

  componentDidMount() { //toDo les les parametres de recherche devront etre dans le state pour les utiliser  this.props.navigation.state.params.userId 
    console.log('LOl listRoute', this.props.screenProps.navigation.state.params.userId);
    fetch('http://autoexpress.gabways.com/api/internalRoutes.php', {
        method: 'GET',
        headers: { 
         'Accept': 'application/json', 
         'Content-Type': 'application/json',
        }

        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ isLoading: false, routeDatas: responseJson.maindata.response });
          })
          .catch((err) => { this.setState({ routeDatasError: err });});
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.routeDate + ' - ' + item.hour}
      subtitle={
        <ListRouteSub
          fromZone={item.fZone}
          fromStation={item.fStation}
          toZone={item.tZone}
          toStation={item.tStation}
          routePrice={item.routePrice}
          remaningPlace={item.remaningPlace}
        />
      }
      onPress={this.callForm.bind(this,'ReservationRoute', 
        item.routeDate + ' - ' + item.hour, 
        item.fZone,
        item.fStation,
        item.tZone,
        item.tStation,
        item.routePrice,
        item.remaningPlace,
        item.PK
        )}
      leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
    />
  )

  render() {
 
    if (this.state.isLoading) {
     return (
       <View style={Styles.wrapperGame}>
         <ActivityIndicator />
       </View>
     );
    }
    return (
      <View style={Styles.wrapperGame}>
        <FlatList
        onRefresh={this.componentDidMount.bind(this)}
        refreshing={this.state.isLoading}
        keyExtractor={this.keyExtractor}
        data={this.state.routeDatas}
        renderItem={this.renderItem}
        />
      </View>
	  );
	}
}

const ListRouteNavigator = createStackNavigator({
  ListRoute: {
    screen: ListRoute
  },
  ReservationRoute: {
    screen: ReservationRoute
  },
}, 
{
  initialRouteName: 'ListRoute'
});

export default createAppContainer(ListRouteNavigator);