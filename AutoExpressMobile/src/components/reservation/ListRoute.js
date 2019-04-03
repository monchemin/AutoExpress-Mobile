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

  callForm(form) {
    this.props.navigation.navigate(form)
    /* this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: form, 
              
            })
          ]
        })) */
  }

  componentDidMount() {
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
      //subtitle={item.fStation}
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
      onPress={this.callForm.bind(this,'SearchRoute')}
      leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
    />
  )

  render() {

    let routess = this.state.routeDatas.map((item, key) => (
         <ListItem
            roundAvatar
            //leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
            key={key}
            title = {item.tStation}
            subtitle = {item.fStation}
            onPress={() => console.log('Click onPress')}
            leftIcon={{ name: 'flight-takeoff' }}
          />
        ));
 
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
  SearchRoute: {
    screen: SearchRoute
  },
}, 
{
  initialRouteName: 'ListRoute'
});

export default createAppContainer(ListRouteNavigator);

//export default ListRoute;