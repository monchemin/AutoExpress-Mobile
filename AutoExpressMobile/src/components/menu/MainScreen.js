import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';


class MainScreen extends Component {
  render () {
    return (
      <View>
        <Text>Main</Text>
        <Button onPress={() => this.props.navigation.navigate("Detail")} title="Detail Page" />
      </View>
    );
  }
}

export default MainScreen;
